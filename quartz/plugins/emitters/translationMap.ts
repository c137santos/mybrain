import { FullSlug, joinSegments } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"

export type TranslationMap = Record<string, string>

export const TranslationMap: QuartzEmitterPlugin = () => ({
  name: "TranslationMap",
  async *emit(ctx, content) {
    const map: TranslationMap = {}

    // Group slugs by base filename (last path segment)
    const byFilename = new Map<string, { pt?: string; en?: string }>()

    for (const [, file] of content) {
      const slug = file.data.slug!
      const filename = slug.split("/").at(-1)!

      if (!byFilename.has(filename)) byFilename.set(filename, {})
      const entry = byFilename.get(filename)!

      if (slug.startsWith("pt/")) entry.pt = slug
      else if (slug.startsWith("en/")) entry.en = slug
    }

    // Auto-match: same filename in both language trees = translation pair
    for (const { pt, en } of byFilename.values()) {
      if (pt && en) {
        map[pt] = en
        map[en] = pt
      }
    }

    // Frontmatter overrides take priority
    for (const [, file] of content) {
      const slug = file.data.slug!
      const translation = file.data.frontmatter?.translation as string | undefined
      if (!translation) continue
      map[slug] = translation
      if (!map[translation]) map[translation] = slug
    }

    yield write({
      ctx,
      content: JSON.stringify(map),
      slug: joinSegments("static", "translations") as FullSlug,
      ext: ".json",
    })
  },
  async *partialEmit() {},
})
