class DataFeed extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        const template = document.createElement("template");

        template.innerHTML = `
            <style>
                .feed {
                    padding: 20px;
                    border-radius: 10px;
                    background: white;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                h3 {
                    margin-top: 0;
                    color: #4b6cb7;
                }
            </style>

            <div class="feed">
                <h3>Data Feed</h3>
                <slot></slot>
            </div>
        `;

        this.shadowRoot.appendChild(
            template.content.cloneNode(true)
        );
    }
}

customElements.define(
    "data-feed",
    DataFeed
);
