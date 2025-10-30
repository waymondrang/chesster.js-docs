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

export { jxc, isMobileLayout };
