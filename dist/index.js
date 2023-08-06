/**
 * @customElement modal-control
 * @attr target - ID of the target `<dialog>`
 * @attr {'toggle'|'show'|'hide'} target-action - What should happen to the dialog when clicking the control (default: 'toggle')
 * @fires modal-control-before-toggle
 * @fires modal-control-toggle
 */ class $9f887c14bb5fffd1$export$2e2bcd8739ae039 extends HTMLElement {
    /** @type {string|null} */ #target = null;
    /** @type {string|null} */ #targetAction = "toggle";
    static observedAttributes = [
        "target",
        "target-action"
    ];
    /**
   * @param {string}  name
   * @param {string}     _oldVal
   * @param {string}     newVal
   */ attributeChangedCallback(name, _oldVal, newVal) {
        if (name === "target") this.#target = newVal;
        if (name === "target-action") this.#targetAction = newVal;
    }
    /** @type {string|null} */ get target() {
        return this.#target;
    }
    set target(value) {
        this.#target = value;
        if (value === null) this.removeAttribute("target");
        else this.setAttribute("target", value);
    }
    /** @type {string|null} */ get targetAction() {
        return this.#targetAction;
    }
    set targetAction(value) {
        this.#targetAction = value;
        if (value === null) this.removeAttribute("target-action");
        else this.setAttribute("target-action", value);
    }
    /** @type {HTMLDialogElement|null} */ get targetElement() {
        const root = /** @type {Document|ShadowRoot} */ this.getRootNode();
        const el = this.target ? root.getElementById(this.target) : null;
        if (!(el instanceof HTMLDialogElement)) return null;
        return el;
    }
    connectedCallback() {
        this.addEventListener("click", this.#handleClick);
    }
    disconnectedCallback() {
        this.removeEventListener("click", this.#handleClick);
    }
    /** @returns {boolean} */ #dispatchBeforeToggle() {
        return this.dispatchEvent(new Event("modal-control-before-toggle", {
            cancelable: true
        }));
    }
    /** @returns {boolean} */ #dispatchToggle() {
        return this.dispatchEvent(new Event("modal-control-toggle"));
    }
    /**
   * @param {MouseEvent} event
   * @returns {void}
   */ #handleClick = (event)=>{
        const target = /** @type {Element} */ event.target;
        if (!target.closest('button, input[type="button"]')) return;
        const { targetElement: targetElement } = this;
        if (!targetElement) return;
        switch(this.targetAction){
            case "show":
                if (!targetElement.open && this.#dispatchBeforeToggle()) {
                    targetElement.showModal();
                    this.#dispatchToggle();
                }
                break;
            case "hide":
                if (targetElement.open && this.#dispatchBeforeToggle()) {
                    targetElement.close();
                    this.#dispatchToggle();
                }
                break;
            case "toggle":
                if (this.#dispatchBeforeToggle()) {
                    if (targetElement.open) targetElement.close();
                    else targetElement.showModal();
                    this.#dispatchToggle();
                }
        }
    };
}


/**
 * @param {string} [name]
 * @returns {void}
 */ const $d832f2ef8a5ce6ac$export$f36d6a7a5c09a23e = (name = "modal-control")=>{
    if ("customElements" in window) customElements.define(name, (0, $9f887c14bb5fffd1$export$2e2bcd8739ae039));
};


export {$d832f2ef8a5ce6ac$export$f36d6a7a5c09a23e as define, $9f887c14bb5fffd1$export$2e2bcd8739ae039 as ModalControlElement};
//# sourceMappingURL=index.js.map
