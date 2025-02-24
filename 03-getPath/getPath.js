export function getPath(element) {
    if (!element || !(element instanceof HTMLElement)) {
        throw new Error('Invalid input: element must be an HTMLElement');
    }

    function isUnique(selector) {
        const elements = document.querySelectorAll(selector);
        return elements.length === 1 && elements[0] === element;
    }

    function getNthChild(elem) {
        const parent = elem.parentNode;
        if (!parent) return null;

        const siblings = Array.from(parent.children);
        const index = siblings.indexOf(elem) + 1;
        return `:nth-child(${index})`;
    }

    function buildPath(elem) {
        if (!elem || elem === document.body) {
            return 'body';
        }

        let selector = elem.tagName.toLowerCase();

        if (elem.id) {
            selector += `#${elem.id}`;
            if (isUnique(`#${elem.id}`)) {
                return `#${elem.id}`;
            }
        }

        if (elem.classList.length) {
            selector += Array.from(elem.classList)
                .map(cls => `.${cls}`)
                .join('');
        }

        selector += getNthChild(elem);

        const path = `${buildPath(elem.parentElement)} > ${selector}`;

        if (isUnique(path)) {
            return path;
        }

        return path;
    }

    return buildPath(element).replace(/\s*>\s*body\s*>\s*/, '');
}
