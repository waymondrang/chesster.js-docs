const jxc = (...x: (string | false | null | undefined)[]): string => {
    return x.filter(Boolean).join(" ");
};

const isMobileLayout = (): boolean => {
    return window.innerWidth <= 850;
};

export { jxc, isMobileLayout };
