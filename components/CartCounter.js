import { globalStore } from "../core/store.js";

class CartCounter extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                .cart-counter {
                    display: inline-block;
                    padding: 12px 20px;
                    margin: 10px;
                    border-radius: 8px;
                    background: #f5f5f5;
                    font-size: 18px;
                    font-weight: bold;
                }
            </style>

            <div class="cart-counter">
                🛒 Cart Items: <span id="count">0</span>
            </div>
        `;
    }

    connectedCallback() {
        this.unsubscribe = globalStore.subscribe((state) => {
            this.shadowRoot.querySelector("#count").textContent =
                state.cartCount;
        });
    }

    disconnectedCallback() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}

customElements.define("cart-counter", CartCounter);
