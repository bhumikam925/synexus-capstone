import { globalStore } from "../core/store.js";

class ProductButton extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                button {
                    padding: 10px 18px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: bold;
                }
            </style>

            <button id="add-to-cart">Add to Cart</button>
        `;
    }

    connectedCallback() {
        const button = this.shadowRoot.querySelector("#add-to-cart");

        button.addEventListener("click", () => {
            globalStore.setState({
                cartCount: globalStore.state.cartCount + 1
            });
        });
    }
}

customElements.define("product-button", ProductButton);
