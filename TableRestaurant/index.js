class TableRestaurant extends HTMLElement {
  type = "circle";
  radio = 40;
  npersons = 5;
  anguloSeparacion = 360 / this.npersons;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return ["type", "radio", "npersons"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "type") {
      this.type = newValue;
      this.render();
    }
    if (name === "radio") {
      this.radio = parseInt(newValue);
      this.render();
    }
    if (name === "npersons") {
      this.npersons = parseInt(newValue);
      this.anguloSeparacion = 360 / this.npersons;
      this.render();
    }
  }

  renderImage(radio) {
    let medioImagen = ((radio-10)/2)+5
    let d = "";
    for (let i = 0; i < this.npersons; i++) {
      const angulo = i * this.anguloSeparacion;
      const radianes = (angulo * Math.PI) / 180;
      const x = this.radio * Math.cos(radianes) + this.radio;
      const y = this.radio * Math.sin(radianes) + this.radio;
      d += `<image href="./person.svg" transform="rotate(${angulo} ${x+medioImagen} ${y+medioImagen})" x="${x+5}" y="${y+5}" width="${radio-10}" height="${radio-10}" />`;
    }
    return d;
  }

  render() {
    let tam = this.radio * 3;
    this.shadowRoot.innerHTML = /*html*/ `
            <svg style="border:1px solid red" width="${tam}" height="${tam}">
                
                <circle cx="${tam / 2}" cy="${tam / 2}" r="${this.radio-10}" fill="red" />
                ${this.renderImage(this.radio)}
                <text x="${tam / 2}" y="${tam / 2}"
                    font-family="Verdana"
                    font-size="5" text-anchor="middle" >
                Hello, out there
            </text>
            </svg>
        `;
  }
}

customElements.define("table-restaurant", TableRestaurant);
