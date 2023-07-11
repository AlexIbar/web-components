class TableRestaurant extends HTMLElement {
  type = "circle";
  radio = 40;
  npersons = 4;
  anguloSeparacion = 360 / this.npersons;
  color = "#663300";
  aumento = 5;
  mesa = 1;
  estado = "libre";
  cuenta = 0;
  forma_pago = "efectivo";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.organizarMedidas();
  }

  organizarMedidas(){
    if(this.npersons <= 7){
      this.radio = 40;
      this.aumento = 5;
    }else if(this.npersons <= 12){
      this.radio = 62;
      this.aumento = 16;
    }else if(this.npersons <= 15){
      this.radio = 75;
      this.aumento = 23;
    }else{
      this.radio = 100;
      this.aumento = 35;
    }
    this.anguloSeparacion = 360 / this.npersons;
    this.render();
  }
  static get observedAttributes() {
    return ["type", "npersons", "color", "mesa", "estado", "cuenta", "forma_pago"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "npersons":
        this.npersons = parseInt(newValue);
        this.organizarMedidas();
        break;
      default:
        this[name] = newValue;
        this.render();
        break;
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
      d += `<image href="./person.svg" transform="rotate(${angulo} ${x+medioImagen} ${y+medioImagen})" x="${x+this.aumento}" y="${y+this.aumento}" width="30" height="30" />`;
    }
    return d;
  }

  render() {
    let tam = this.radio * 3;
    this.shadowRoot.innerHTML = /*html*/ `
            <style>
              :host{
                position: relative;
                display: inline-block;
              }
              .element {
                position: absolute;
                width: ${tam}px;
                height: ${tam}px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 6px;
                text-align: center;
                color: white
              }
            </style>
            <div class="element">
              <div>
                <div><b>Mesa: </b> ${this.mesa}</div>
                <div><b>Estado: </b> ${this.estado}</div>
                <div><b>Cuenta: </b> $${this.cuenta}</div>
                <div><b>Forma de pago: </b> ${this.forma_pago}</div>
              </div>
            </div>
            <svg width="${tam}" height="${tam}">
                <circle cx="${tam / 2}" cy="${tam / 2}" r="${this.radio-10}" fill="${this.color}" />
                ${this.renderImage(this.radio)}
            </svg>
        `;
  }
}

customElements.define("table-restaurant", TableRestaurant);
