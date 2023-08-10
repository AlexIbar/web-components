class ColorPicker extends HTMLElement {
  label = "Color";
  id = "";
  value = "#FF6C0C";
  slot = null;
  slotElement = null;
  $this = null;
  colorInput = null;

  ocultarIput() {
    if (this.id === "") return false;
    this.$this = document.querySelector("#" + this.id);
    if (this.$this !== null) {
        let myInput = this.$this.querySelector('input[slot="my-input"]').value
        this.value = myInput == "" ? "#FF6C0C" : myInput;
        myInput = this.value
      this.$this.querySelector('input[slot="my-input"]').style.display = "none";
      this.organizarComponent();
    }
  }

  static get observedAttributes() {
    return ["label", "id", "value", "colorfocus"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "label") {
      this[attr] = newVal;
      let lab = this.querySelector("label");
      if (lab) lab.innerHTML = newVal;
      return;
    }
    this[attr] = newVal;
    this.ocultarIput();
  }

  constructor() {
    super();
  }

  customDesingColor() {
    this.colorPickerContainer = document.createElement("div");
    this.colorPicker = null;

    this.colorPickerRound = document.createElement("div");
    this.colorPickerContainer.appendChild(this.colorPickerRound);

    this.containerColors = document.createElement("div");
    this.containerColors.style = "margin-top: 20px;";

    // Agrega contenido HTML al colorPickerInnerDiv
    this.containerColors.innerHTML = `
                  <div class="grid-container-color">
                    <div class="grid-item-color" style="background-color: #009400;"></div>
                    <div class="grid-item-color" style="background-color: #FF9300;"></div>
                    <div class="grid-item-color" style="background-color: #F25E0F;"></div>
                    <div class="grid-item-color" style="background-color: #A1DDEF;"></div>
                    <div class="grid-item-color" style="background-color: #A7A1EF;"></div>
                  </div>
                `;

    this.colorPickerContainer.appendChild(this.containerColors);

    this.colorPickerContainer.style.display = "none";
    this.colorPickerContainer.classList.add("colorPickerContainer");

    document.addEventListener("click", (event) => {
      let divComponent = document.querySelector("#" + this.id + "color");
      if (!divComponent.contains(event.target)) {
        this.colorPickerContainer.style.display = "none";
      }
    });

    // Obtén todos los elementos con la clase grid-item-color
    const colorSquares =
      this.colorPickerContainer.querySelectorAll(".grid-item-color");

    // Agrega un evento clic a cada elemento
    colorSquares.forEach((square) => {
      square.addEventListener("click", () => {
        const rgb = square.style.backgroundColor;

        const match = rgb.match(/\d+/g);
        const r = parseInt(match[0]);
        const g = parseInt(match[1]);
        const b = parseInt(match[2]);
        const hexColor = `#${decimalToHex(r)}${decimalToHex(g)}${decimalToHex(
          b
        )}`;
        this.colorInput.value = hexColor;
        this.colorPicker.color.set(hexColor);
      });
    });
    return this.colorPickerContainer;
  }

  connectedCallback() {
    setTimeout(() => {
      this.ocultarIput();
    }, 1000);
    this.addEventListener("change-value-input", this.changeValueEvent);
  }

  toggleColorPicker() {
    if (!this.colorPicker) {
      this.colorPicker = new iro.ColorPicker(this.colorPickerRound, {
        width: 200,
        layout: [{ component: iro.ui.Wheel }, { component: iro.ui.Slider }],
      });

      this.colorPicker.on("color:change", (color) => {
        this.value = color.hexString;
        this.colorInput.value = this.value;
        this.renderIcon();
        this.keyUpEvent();
      });

      this.colorPicker.on("color:set", () => {
        this.colorPickerContainer.style.display = "none";
      });
    }

    this.colorPickerContainer.style.display = "block";
    this.colorPickerContainer.style.position = "absolute";
    this.colorPickerContainer.style.zIndex = 2;
    this.colorPickerContainer.style.right = "20px";
    //this.colorPickerContainer.style.top = 10+ this.colorInput.offsetTop + this.colorInput.offsetHeight + "px";
  }

  setValue(value) {
    this.value = value;
    this.changeValueEvent({
      detail: {
        value,
      },
    });
  }

  changeValueEvent(event) {
    this.querySelector(".claseElement").value = event?.detail?.value ?? "";
    this.keyUpEvent();
  }

  organizarComponent() {
    this.render();
  }

  keyUpEvent = () => {
    setTimeout(() => {
      this.value = this.querySelector(".claseElement").value;
      if (this.value !== this.querySelector('input[slot="my-input"]').value)
        this.querySelector('input[slot="my-input"]').value = this.value;
      if (this.value == "") {
        this.querySelector("label").classList.remove("labelValid");
      } else {
        this.querySelector("label").classList.add("labelValid");
      }
      this.renderIcon();
      this.dispatchEventChange(this.value);
    }, 30);
  };

  dispatchEventChange(value) {
    const messageEvent = new CustomEvent("change:input-value", {
      detail: { value },
    });
    this.dispatchEvent(messageEvent);
  }

  style() {
    return `
        .content-input-date {
            height: 44px;
            cursor: pointer;
            padding: 16px 10px 4px 10px;
            font-family: 'Lato', sans-serif;
            border-radius: 10px;
            border: 1px solid #3d393733;
            opacity: 1;
            position: relative;
            box-sizing: border-box;
            min-width: 113px;
            background-color: white;
        }
        
        .content-input-date input {
            border: none;
            outline: none;
            background: transparent !important;
            font-size: 16px;
            width: calc( 100% - 43px);
            letter-spacing: 0;
            text-align: left;
            color: #3D3937;
            padding: 16px 0px 3px 16px;
            top: 0px;
            position: absolute;
            left: 0px;
            z-index: 1;
            font: normal normal normal 15px/20px Lato !important;
            height: 43px;
            box-sizing: border-box;
        }
        
        .content-input-date label {
            position: absolute;
            top: 0;
            bottom: 0;
            height: 55%;
            margin: auto;
            left: 16px;
            font-size: 15px;
            color: #3d3937;
            transition: all 0.2s ease-in-out;
            color: #3d393766;
            z-index: 0;
            display:flex;
            flex-wrap:wrap;
            align-content: center;
        }

        .content-input-date:hover, .content-input-date:focus-within{
            border-color:#3d39376e
        }
        
        .content-input-date:focus-within label {
            top: -14px;
            font-size: 11px;
            color: ${this.colorFocus} !important;
            align-content: flex-start;
        }
        
        :host(:focus-within) input {
            color: #ff6c0c !important;
        }
        
        .labelValid {
            top: -14px !important;
            font-size: 11px !important;
            color: #3d393766 !important;
            display:flex;
            flex-wrap:wrap;
            align-content: flex-start !important;
        }
    `;
  }

  defineColorIcon() {
    if(this.value === "#FF6C0C") return "#ffffff"
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.value);
    var rgb = result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
    if (rgb === null) return "#000000";
    let C = [rgb.r / 255, rgb.g / 255, rgb.b / 255];

    for (var i = 0; i < C.length; ++i) {
      if (C[i] <= 0.03928) {
        C[i] = C[i] / 12.92;
      } else {
        C[i] = Math.pow((C[i] + 0.055) / 1.055, 2.4);
      }
    }
    let L = 0.2126 * C[0] + 0.7152 * C[1] + 0.0722 * C[2];

    if (L > 0.179) {
      return "black";
    } else {
      return "white";
    }
  }

  renderIcon() {
    let idColor = this.id + "color";
    let existElement = this.querySelector("#" + idColor);
    if (existElement) {
      existElement.remove();
    }
    let div = document.createElement("div");
    div.setAttribute("id", idColor);
    div.style.backgroundColor = this.value;
    div.style.height = "37px";
    div.style.width = "37px";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.borderRadius = "10px";
    div.style.margin = "3px";
    div.style.position = "absolute";
    div.style.right = "0px";
    div.style.top = "0px";
    div.style.cursor = "pointer";

    let icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <path id="icons8-paint-palette" d="M12.714,2.025A10,10,0,0,0,2.025,12.713,10.2,10.2,0,0,0,12.307,22H13a2,2,0,0,0,2-2V17a2,2,0,0,1,2-2h3a2,2,0,0,0,2-2v-.693A10.2,10.2,0,0,0,12.714,2.025ZM10.5,4A1.5,1.5,0,1,1,9,5.5,1.5,1.5,0,0,1,10.5,4Zm-5,11A1.5,1.5,0,1,1,7,13.5,1.5,1.5,0,0,1,5.5,15Zm1-5A1.5,1.5,0,1,1,8,8.5,1.5,1.5,0,0,1,6.5,10ZM11,20a2,2,0,1,1,2-2A2,2,0,0,1,11,20ZM15.5,8A1.5,1.5,0,1,1,17,6.5,1.5,1.5,0,0,1,15.5,8Zm3,5A1.5,1.5,0,1,1,20,11.5,1.5,1.5,0,0,1,18.5,13Z" transform="translate(-2 -2)" fill="${this.defineColorIcon()}"/>
        </svg>`;
    div.innerHTML = icon;
    div.addEventListener("click", () => {
      this.toggleColorPicker();
    });

    this.querySelector("section").appendChild(div);
  }

  render() {
    let section = this.querySelector("section");
    if (section !== null) {
      section.remove();
    }

    let sectionElement = document.createElement("section");
    sectionElement.style.position = "relative";
    let styleElement = document.createElement("style");
    styleElement.innerHTML = this.style();

    let divElement = document.createElement("div");
    divElement.className = "content-input-date";

    let labelElement = document.createElement("label");
    labelElement.textContent = this.label;

    let elementN = this.querySelector('input[slot="my-input"]').cloneNode();
    elementN.style.display = "block";
    elementN.setAttribute("id", "cxc");
    elementN.setAttribute("minlength", "1");
    elementN.classList.add("claseElement");
    elementN.setAttribute("readonly", true);
    if (elementN.value == "") {
      labelElement.classList.remove("labelValid");
    } else {
      labelElement.classList.add("labelValid");
    }

    divElement.appendChild(elementN);
    divElement.appendChild(labelElement);
    sectionElement.appendChild(divElement);
    sectionElement.appendChild(styleElement);

    this.colorInput = elementN;
    this.appendChild(sectionElement);
    this.appendChild(this.customDesingColor());
    this.renderIcon();
  }
}

// Función para convertir valor decimal a hexadecimal
function decimalToHex(decimal) {
  const hex = decimal.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

customElements.define("color-picker", ColorPicker);
