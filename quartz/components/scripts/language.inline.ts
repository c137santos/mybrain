const initLocale = (): void => {
  if (!localStorage.getItem("locale")) {
    const lang = window.location.pathname.includes("/en/") ? "en" : "pt"
    localStorage.setItem("locale", lang === "en" ? "en-US" : "pt-BR")
  }
}

initLocale()

function currentLang(pathname: string): "pt" | "en" {
  return pathname.includes("/en/") ? "en" : "pt"
}

function toggledPathname(pathname: string): string {
  if (pathname.includes("/pt/")) return pathname.replace("/pt/", "/en/")
  if (pathname.includes("/en/")) return pathname.replace("/en/", "/pt/")
  return pathname.replace(/\/?$/, "") + "/en/"
}

function langHomePath(pathname: string, lang: "pt" | "en"): string {
  const ptIdx = pathname.indexOf("/pt/")
  const enIdx = pathname.indexOf("/en/")
  const langIdx = ptIdx >= 0 ? ptIdx : enIdx >= 0 ? enIdx : pathname.length
  const base = pathname.slice(0, langIdx)
  return `${base}/${lang}/`
}

document.addEventListener("nav", () => {
  const updateActiveLabel = (): void => {
    const lang = currentLang(window.location.pathname)
    for (const btn of document.getElementsByClassName("language-toggle")) {
      for (const label of btn.getElementsByClassName("lang-label")) {
        const isActive = (label as HTMLElement).textContent?.trim().toLowerCase() === lang
        label.classList.toggle("active", isActive)
      }
    }
  }

  const handleClick = async (): Promise<void> => {
    const pathname = window.location.pathname
    const targetLang: "pt" | "en" = currentLang(pathname) === "pt" ? "en" : "pt"
    const targetPath = toggledPathname(pathname)

    localStorage.setItem("locale", targetLang === "en" ? "en-US" : "pt-BR")

    try {
      const res = await fetch(targetPath, { method: "HEAD" })
      window.location.href = res.ok ? targetPath : langHomePath(pathname, targetLang)
    } catch {
      window.location.href = langHomePath(pathname, targetLang)
    }
  }

  updateActiveLabel()

  for (const btn of document.getElementsByClassName("language-toggle")) {
    btn.addEventListener("click", handleClick)
    window.addCleanup(() => btn.removeEventListener("click", handleClick))
  }
})
