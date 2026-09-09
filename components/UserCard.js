
class UserCard extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({
            mode: "open"
        });
    }

    connectedCallback() {

        const name = this.getAttribute("name");
        const role = this.getAttribute("role");

        this.shadowRoot.innerHTML = `
            <style>

                .card {
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 12px;
                    background: white;
                    text-align: center;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                }

                h3 {
                    margin: 0 0 8px;
                }

                p {
                    margin: 0;
                    color: #666;
                }

            </style>

            <div class="card">
                <h3>${name}</h3>
                <p>${role}</p>
            </div>
        `;
    }
}

customElements.define("user-card", UserCard);
