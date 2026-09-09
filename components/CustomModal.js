import { } from "../core/store.js";

class CustomModal extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        const template =
            document.getElementById("modal-template");

        this.shadowRoot.appendChild(
            template.content.cloneNode(true)
        );
    }
}

customElements.define(
    "custom-modal",
    CustomModal
);
