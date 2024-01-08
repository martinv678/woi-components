export class WoiAccordionItem extends HTMLElement {
    private height: number

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.height = 0
    }

    static get observedAttributes() {
        return ['open']
    }

    attributeChangedCallback(name: string, _: string, newValue: string) {
        if (!this.shadowRoot) return

        if (name === 'open') {
            const body = this.shadowRoot.querySelector(
                '.body'
            ) as HTMLDivElement

            this.height = newValue === 'true' ? body.scrollHeight : 0
            body.style.height = `${this.height}px`
        }
    }

    connectedCallback() {
        this.render()
    }

    render() {
        if (!this.shadowRoot) return
        const label = this.getAttribute('label')

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    border-bottom: 1px solid var(--woi-accordion-item-border-color);
                }

                button {
                    display: block;
                    width: 100%;
                    background-color: transparent;
                    border: none;
                    text-align: left;
                    padding: 0;
                    font-size: 1.2rem;
                    font-weight: 500;
                    padding: 30px 0;
                    cursor: pointer;
                }

                .body {
                    line-height: 1.5;
                    overflow: hidden;
                    opacity: 0;
                    height: 0;
                    transition: all var(--woi-accordion-transition-duration, 300ms);
                    -webkit-transition: all var(--woi-accordion-transition-duration, 300ms); 
                }

                .body-inner {
                    padding: 0 0 30px 0;
                }

                :host([open=true]) .body {
                    opacity: 1;
                }
            </style>
            <button>
                ${label}
            </button>
            <div class="body" style="height: ${this.height}px;">
                <div class="body-inner">
                    <slot></slot>
                </div>
            </div>
        `
    }
}
