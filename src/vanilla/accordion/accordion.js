export class WoiAccordion extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render()
        this.addEventListeners()
    }

    addEventListeners() {
        const items = this.querySelectorAll('woi-accordion-item')

        items.forEach((item) => {
            item.addEventListener('click', (event) => {
                const openItem = this.querySelector(
                    'woi-accordion-item[open=true]'
                )

                if (openItem) {
                    openItem.removeAttribute('open')
                }

                const target = event.currentTarget as HTMLElement

                target.setAttribute('open', String(target !== openItem))
            })
        })
    }

    render() {
        if (!this.shadowRoot) return

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    max-width: 650px;
                }
            </style>
            <slot></slot>
        `
    }
}

customElements.define('woi-accordion', WoiAccordion)