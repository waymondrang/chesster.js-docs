function initDarkMode() {
    const savedTheme = localStorage.getItem("theme");
    const systemDarkTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    // todo: verify saved theme is either light, dark, or system

    const darkMode =
        savedTheme === "dark" ||
        (savedTheme === "system" && systemDarkTheme) ||
        (!savedTheme && systemDarkTheme);

    if (darkMode) {
        document.documentElement.classList.add("dark_mode");
    } else {
        // sanity check
        document.documentElement.classList.remove("dark_mode");
    }
}

export { initDarkMode };
