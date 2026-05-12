// @ts-ignore
import langScript from "./scripts/language.inline"
import styles from "./styles/languagetoggle.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const LanguageToggle: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
  const slug = fileData.slug ?? ""
  const activeLang = slug.startsWith("en/") ? "en" : "pt"

  return (
    <button class={classNames(displayClass, "language-toggle")} aria-label="Toggle language">
      <span class={`lang-label${activeLang === "pt" ? " active" : ""}`}>PT</span>
      <span class="lang-separator"> | </span>
      <span class={`lang-label${activeLang === "en" ? " active" : ""}`}>EN</span>
    </button>
  )
}

LanguageToggle.afterDOMLoaded = langScript
LanguageToggle.css = styles

export default (() => LanguageToggle) satisfies QuartzComponentConstructor
