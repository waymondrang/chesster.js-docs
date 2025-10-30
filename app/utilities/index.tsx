/**
 * Joins class names while ignoring falsy values.
 * @param x Array of class names which may include falsy values.
 * @returns {string} A single string with class names joined by spaces.
 *
 * @example
 * jxc("class1", false, "class2", null, "class3");
 * // Returns: "class1 class2 class3"
 *
 * @example
 * const isActive = true;
 * const isDisabled = false;
 *
 * jxc("header", isActive && "active", isDisabled ? "disabled" : null);
 * // Returns: "header active"
 */
const jxc = (...x: (string | false | null | undefined)[]): string => {
    return x.filter(Boolean).join(" ");
};

/**
 * Uses window.innerWidth to determine if the current layout is mobile.
 * @returns {boolean} True if the layout is mobile, false otherwise.
 */
const isMobileLayout = (): boolean => {
    return window.innerWidth <= 850;
};

/**
 * Determines if a URL is an external link (not on the same domain).
 * @param url The URL to check
 * @returns {boolean} True if the URL is external, false otherwise
 */
const isExternalLink = (url: string): boolean => {
    try {
        const urlObj = new URL(url, window.location.origin);
        return urlObj.origin !== window.location.origin;
    } catch {
        return false;
    }
};

/**
 * Converts a rem value string to pixels.
 * @param rem The rem value string (e.g. "2.5rem")
 * @returns {number} The equivalent pixel value
 *
 * @example
 * convertRemToPx("2rem");
 * // Returns 24 if the root font size is 12px
 */
const convertRemToPx = (rem: string): number => {
    const value = parseFloat(rem);
    const unit = rem.replace(value.toString(), "");

    if (unit === "rem") {
        return (
            value *
            parseFloat(getComputedStyle(document.documentElement).fontSize)
        );
    }

    return 0;
};

export { jxc, isMobileLayout, isExternalLink, convertRemToPx };
