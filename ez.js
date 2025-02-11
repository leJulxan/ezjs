const EZ = {
    select: (selector) => document.querySelector(selector),
    selectAll: (selector) => document.querySelectorAll(selector),

    click: (selector, action) => {
        let el = EZ.select(selector);
        if (el) el.addEventListener("click", action);
    },

    on: (selector, event, action) => {
        let el = EZ.select(selector);
        if (el) el.addEventListener(event, action);
    },

    store: (key, value) => {
        if (typeof value === "object") {
            localStorage.setItem(key, JSON.stringify(value)); // Konvertiert Objekte/Arrays in JSON
        } else {
            localStorage.setItem(key, value); // Speichert Strings direkt
        }
    },


    load: (key) => {
        let data = localStorage.getItem(key);
        if (data === null) return null; // Falls kein Wert gespeichert ist
        try {
            return JSON.parse(data); // Falls es JSON ist, parsen
        } catch (e) {
            return data; // Falls es KEIN JSON ist, als normalen String zurückgeben
        }
    },

    removeStorage: (key) => {
        localStorage.removeItem(key);
    },

    setText: (selector, text) => {
        let el = EZ.select(selector);
        if (el) {
            if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                el.value = text;
            } else {
                el.textContent = text;
            }
        }
    },

    scrollToTop: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    },

    scrollToBottom: () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    },

    checked: (selector) => {
        let el = EZ.select(selector);
        return el ? el.checked : false;
    },

    copyToClipboard: (text) => {
        navigator.clipboard.writeText(text).then(() => {
            console.log("✅ Text wurde erfolgreich in die Zwischenablage kopiert!");
        }).catch(err => {
            console.error("❌ Fehler beim Kopieren des Textes: ", err);
        });
    },

    randomNumber: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    rgbToHex: (r, g, b) => {
        const toHex = (value) => {
            let hex = value.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    },

    toggleFullScreen: () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error("❌ Fehler beim Aktivieren des Vollbildmodus:", err);
            });
        } else {
            document.exitFullscreen();
        }
    },

    if: (selector, cases) => {
        let el = EZ.select(selector);
        if (!el) return console.warn("Kein Element gefunden für den Selektor:", selector);

        let value;

        // Prüfe, um welchen Element-Typ es sich handelt
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
            // Falls Checkbox → checked-Status verwenden
            if (el.type === "checkbox") {
                value = el.checked ? "checked" : "unchecked";
            } else {
                value = el.value.trim();
            }
        } else {
            // Falls kein Input-Feld → textContent verwenden
            value = el.textContent.trim();
        }

        let executed = false;

        for (let condition in cases) {
            if (condition === 'default') continue;
            if (value === condition || EZ.compare(value, condition)) {
                EZ.execute(cases[condition]);
                executed = true;
                break;
            }
        }

        if (!executed && cases.default) EZ.execute(cases.default);
    },



    execute: (action) => {
        if (typeof action === 'string' && action.includes(" ")) {
            let [selector, ...textArray] = action.split(" ");
            let text = textArray.join(" ");
            let el = EZ.select(selector);

            if (!el) return console.warn("Kein Element gefunden für:", selector);
            el.tagName === "INPUT" || el.tagName === "TEXTAREA" ? el.value = text : el.textContent = text;
        } else if (typeof action === 'function') {
            action();
        }
    },

    compare: (value, condition) => {
        let match = condition.match(/^([><]=?|==|!=|=)(.+)$/);
        if (!match) return false;
        let operator = match[1];
        let compareVal = parseFloat(match[2].trim());
        let numericValue = parseFloat(value);

        switch (operator) {
            case '>': return numericValue > compareVal;
            case '<': return numericValue < compareVal;
            case '>=': return numericValue >= compareVal;
            case '<=': return numericValue <= compareVal;
            case '==': case '=': return numericValue == compareVal;
            case '!=': return numericValue != compareVal;
            default: return false;
        }
    },

    hasClass: (selector, className) => {
        let el = EZ.select(selector);
        return el ? el.classList.contains(className) : false;
    },

    toggle: (selector, condition, classIfTrue, classIfFalse) => {
        let el = EZ.select(selector);
        if (!el) return;
        if (condition) {
            el.classList.add(classIfTrue);
            if (classIfFalse) el.classList.remove(classIfFalse);
        } else {
            el.classList.remove(classIfTrue);
            if (classIfFalse) el.classList.add(classIfFalse);
        }
    },

    append: (selector, content) => {
        let el = EZ.select(selector);
        if (el) el.insertAdjacentHTML('beforeend', content);
    },

    prepend: (selector, content) => {
        let el = EZ.select(selector);
        if (el) el.insertAdjacentHTML('afterbegin', content);
    },

    getValue: (selector) => {
        let el = EZ.select(selector);
        return el ? el.value : null;
    },

    getText: (selector) => {
        let el = EZ.select(selector);
        return el ? el.textContent : null;
    },

    setHTML: (selector, html) => {
        let el = EZ.select(selector);
        if (el) el.innerHTML = html;
    },

    clear: (selector) => {
        let el = EZ.select(selector);
        if (el) el.innerHTML = "";
    },

    debounce: (func, delay) => {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    },

    throttle: (func, delay) => {
        let lastCall = 0;
        return function (...args) {
            const now = new Date().getTime();
            if (now - lastCall >= delay) {
                lastCall = now;
                func(...args);
            }
        };
    },

    // ========================
    // 🎨 Styling & CSS
    // ========================
    css: (selector, property, value) => {
        let el = EZ.select(selector);
        if (el) el.style[property] = value;
    },

    addClass: (selector, className) => {
        let el = EZ.select(selector);
        if (el) el.classList.add(className);
    },

    removeClass: (selector, className) => {
        let el = EZ.select(selector);
        if (el) el.classList.remove(className);
    },

    toggleClass: (selector, className) => {
        let el = EZ.select(selector);
        if (el) el.classList.toggle(className);
    },

    hide: (selector) => {
        EZ.css(selector, "display", "none");
    },

    show: (selector, displayType = "block") => {
        EZ.css(selector, "display", displayType);
    },

    fadeIn: (selector, duration) => {
        let el = EZ.select(selector);
        if (!el) return;
        el.style.opacity = 0;
        el.style.display = "block";
        el.style.transition = `opacity ${duration}ms`;
        setTimeout(() => el.style.opacity = 1, 10);
    },

    fadeOut: (selector, duration) => {
        let el = EZ.select(selector);
        if (!el) return;
        el.style.transition = `opacity ${duration}ms`;
        el.style.opacity = 0;
        setTimeout(() => el.style.display = "none", duration);
    },

    center: (selector) => {
        EZ.css(selector, "position", "absolute");
        EZ.css(selector, "top", "50%");
        EZ.css(selector, "left", "50%");
        EZ.css(selector, "transform", "translate(-50%, -50%)");
    }
};

if (typeof globalThis !== "undefined") {
    globalThis.EZ = EZ;
}
