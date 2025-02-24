import { getPath } from "./getpath.js";

describe('getPath', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        container.remove();
    });

    test('should find element by id', () => {
        container.innerHTML = `
            <div id="unique">Target</div>
        `;
        const element = container.querySelector('#unique');
        expect(getPath(element)).toBe('#unique');
        expect(document.querySelector(getPath(element))).toBe(element);
    });

    test('should find element by class and position', () => {
        container.innerHTML = `
            <div class="container">
                <div class="item">First</div>
                <div class="item">Target</div>
                <div class="item">Third</div>
            </div>
        `;
        const element = container.querySelectorAll('.item')[1];
        const path = getPath(element);
        expect(document.querySelector(path)).toBe(element);
        expect(document.querySelectorAll(path).length).toBe(1);
    });

    test('should handle nested elements', () => {
        container.innerHTML = `
            <div class="parent">
                <div class="child">
                    <span>Target</span>
                </div>
            </div>
        `;
        const element = container.querySelector('span');
        const path = getPath(element);
        expect(document.querySelector(path)).toBe(element);
        expect(document.querySelectorAll(path).length).toBe(1);
    });

    test('should handle elements without classes or IDs', () => {
        container.innerHTML = `
            <div>
                <p>First</p>
                <p>Target</p>
                <p>Third</p>
            </div>
        `;
        const element = container.querySelectorAll('p')[1];
        const path = getPath(element);
        expect(document.querySelector(path)).toBe(element);
        expect(document.querySelectorAll(path).length).toBe(1);
    });

    test('should throw error for invalid input', () => {
        expect(() => getPath(null)).toThrow('Invalid input');
        expect(() => getPath({})).toThrow('Invalid input');
    });
});
