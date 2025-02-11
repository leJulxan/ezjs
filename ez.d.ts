declare global {
    const EZ: {
        select: (selector: string, context?: Document | Element) => Element | null;
        selectAll: (selector: string, context?: Document | Element) => NodeListOf<Element>;
        click: (selector: string, action: (event: Event) => void, context?: Document | Element) => void;
        on: (selector: string, event: string, action: (event: Event) => void, context?: Document | Element) => void;
        store: (key: string, value: any) => void;
        load: (key: string) => any;
        removeStorage: (key: string) => void;
        setText: (selector: string, text: string, context?: Document | Element) => void;
        setHTML: (selector: string, html: string, context?: Document | Element) => void;
        clear: (selector: string, context?: Document | Element) => void;
        append: (selector: string, content: string, context?: Document | Element) => void;
        prepend: (selector: string, content: string, context?: Document | Element) => void;
        getValue: (selector: string, context?: Document | Element) => string | null;
        getText: (selector: string, context?: Document | Element) => string | null;
        conditional: (selector: string, cases: { [key: string]: string | (() => void) }, context?: Document | Element) => void;
        execute: (action: string | (() => void), context?: Document | Element) => void;
        compare: (value: string | number, condition: string) => boolean;
        hasClass: (selector: string, className: string, context?: Document | Element) => boolean;
        addClass: (selector: string, className: string, context?: Document | Element) => void;
        removeClass: (selector: string, className: string, context?: Document | Element) => void;
        toggleClass: (selector: string, className: string, context?: Document | Element) => void;
        toggle: (selector: string, condition: boolean, classIfTrue: string, classIfFalse?: string, context?: Document | Element) => void;
        css: (selector: string, property: string, value: string, context?: Document | Element) => void;
        hide: (selector: string, context?: Document | Element) => void;
        show: (selector: string, displayType?: string, context?: Document | Element) => void;
        fadeIn: (selector: string, duration: number, context?: Document | Element) => void;
        fadeOut: (selector: string, duration: number, context?: Document | Element) => void;
        center: (selector: string, context?: Document | Element) => void;
        debounce: (func: Function, delay: number) => (...args: any[]) => void;
        throttle: (func: Function, delay: number) => (...args: any[]) => void;
    };
}

export {};
