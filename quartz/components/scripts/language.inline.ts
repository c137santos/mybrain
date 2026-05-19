import { FullSlug, resolveRelative } from "../../util/path"

document.addEventListener("nav", (e: CustomEventMap["nav"]) => {
  const currentSlug = e.detail.url
  const currentLang = currentSlug.startsWith("en/") ? "en" : "pt"

  localStorage.setItem("locale", currentLang === "en" ? "en-US" : "pt-BR")

  for (const btn of document.getElementsByClassName("language-toggle")) {
    for (const label of btn.getElementsByClassName("lang-label")) {
      const isActive = (label as HTMLElement).textContent?.trim().toLowerCase() === currentLang
      label.classList.toggle("active", isActive)
    }
  }

  const handleClick = async (): Promise<void> => {
    const targetLang: "pt" | "en" = currentLang === "pt" ? "en" : "pt"
    const translations = await fetchTranslations
    const targetSlug = (translations[currentSlug] ?? `${targetLang}/index`) as FullSlug
    const relative = resolveRelative(currentSlug, targetSlug)
    window.spaNavigate(new URL(relative, window.location.toString()))
  }

  for (const btn of document.getElementsByClassName("language-toggle")) {
    btn.addEventListener("click", handleClick)
    window.addCleanup(() => btn.removeEventListener("click", handleClick))
  }
})
