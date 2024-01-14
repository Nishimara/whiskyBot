export const formatHTMLString = (str: string) => {
    return str
        .replaceAll(/</g, '&lt;')
        .replaceAll(/>/g, '&gt;')
        .replaceAll(/&/g, '&amp;');
};
