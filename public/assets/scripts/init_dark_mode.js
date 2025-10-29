(function () {
    window.__THEME__ = {
        theme: null,
        resolvedTheme: null,
    };

    const savedTheme = localStorage.getItem("theme");
    const darkSystemPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    // todo: verify saved theme is either light, dark, or system

    window.__THEME__.theme = savedTheme ? savedTheme : darkSystemPreference;

    const darkMode =
        savedTheme === "dark" ||
        (savedTheme === "system" && darkSystemPreference) ||
        (!savedTheme && darkSystemPreference);

    if (darkMode) {
        document.documentElement.classList.add("dark_mode");
        window.__THEME__.resolvedTheme = "dark";
    } else {
        window.__THEME__.resolvedTheme = "light";
    }
})();
