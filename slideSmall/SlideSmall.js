
class SlideSmall extends HTMLElement {
    data = [
        "https://cdn.quasar.dev/img/mountains.jpg",
        "https://cdn.quasar.dev/img/parallax1.jpg",
        "https://cdn.quasar.dev/img/parallax2.jpg",
        "https://cdn.quasar.dev/img/donuts.png",
    ];
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    static get observedAttributes() {
        return ['data'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'data':
                this.data = JSON.parse(newValue);
                this.render();
                break;
            default:
                break; 
        }
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    agregarQuitarImagen(){
        let slide = this.shadowRoot.querySelector('.slide-small');
        let img = slide.querySelector('img');
        let imgClone = img.cloneNode(true);
        img.style.marginLeft = '-115px';
        setTimeout(() => {
            slide.removeChild(img);
            slide.innerHTML += imgClone.outerHTML;
        }, 500);
    }

    styles(){
        return /*css*/`
            :host{
                display: flex;
                justify-content: center;
                width: 100%;
                height: 100%;
            }
            .slide-small img{
                width: 100px;
                height: 100px;
                object-fit: cover;
                margin: 0px 15px;
                transition: margin 0.5s linear;
            }
            .slide-small{
                display: flex;
                width: 130px;
                overflow: hidden;
            }
            .mover-115{
                margin-left: -115px;
            }
            `;
    }

    render(){
        if(this.interval) clearInterval(this.interval)
        this.shadowRoot.innerHTML =/*html*/`
            <style>${this.styles()}</style>
            <div class="slide-small">
                ${this.data.map((el) => { return '<img  src="'+el+'" />' }).join("")}
            </div>
        `;
        this.interval = setInterval(() => {
            this.agregarQuitarImagen();
        }, 2500);
    }
}

customElements.define('slide-small', SlideSmall);