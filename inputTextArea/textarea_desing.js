class TextAreaDesing extends HTMLElement {
    color = "#3D3937"
    label = "Data"
    id = ""
    value = ""
    colorFocus = "#ff6c0c"
    slot = null;
    slotElement = null
    $this = null;
    maxlength = 0;
    tiempoMessage = null;
    errorMessage = null;

    constructor() {
        super()
    }

    ocultarIput() {
        if (this.id === "") return false;
        this.$this = document.querySelector("#" + this.id)
        if (this.$this !== null) {
            this.value = this.$this.querySelector('textarea').value
            this.$this.querySelector('textarea').style.display = "none"
            this.organizarComponent()
        }
    }

    static get observedAttributes() {
        return ['color', 'label', 'id', 'value', 'colorfocus', 'maxlength', 'error-message']
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        console.log(attr, newVal)
        if (attr === "maxlength" && !isNaN(parseInt(newVal))) {
            this.maxlength = parseInt(newVal)
            return;
        }
        if (attr === "error-message") {
            this.errorMessage = newVal
            let err = this.querySelector('.error')
            if (err !== null) err.innerHTML = this.errorMessage
            return;
        }
        this[attr] = newVal
    }

    validateLength() {
        if (this.maxlength != 0) {
            if (this.value.length > this.maxlength) {
                clearTimeout(this.tiempoMessage)
                this.querySelector('.errorTextArea').innerHTML = `<span>
                Maximum length of ${this.maxlength} characters</span>`
                this.tiempoMessage = setTimeout(() => { this.querySelector('.errorTextArea').innerHTML = "" }, 2000);
                this.querySelector('textarea').value = this.value.substring(0, this.maxlength);
            }
        }
    }

    connectedCallback() {
        setTimeout(() => { })
        this.render()
    }

    setValue(value) {
        this.value = value
        this.keyUpEvent({
            target: {
                value
            }
        })
    }

    keyUpEvent = (e) => {
        setTimeout(() => {
            this.value = e.target.value
            if (this.value !== this.querySelector('textarea').value) this.querySelector('textarea').value = this.value
            if (this.value == "") {
                this.querySelector("label").classList.remove("labelValidTextArea")
            } else {
                this.querySelector("label").classList.add("labelValidTextArea")
            }
            this.validateLength()
        }, 30)
    }

    dispatchEventChange(value) {
        const messageEvent = new CustomEvent("change:input-value", {
            detail: { value }
        });
        this.dispatchEvent(messageEvent);
    }

    removeEvents() {
        this.removeEventListener('change', this.keyUpEvent)
        this.removeEventListener('keyup', this.keyUpEvent)
        this.removeEventListener('input', this.keyUpEvent)
    }

    styles() {
        return `
        #${this.id} {
            display: inline-block;
            width: 100%;
            position: relative;
            box-sizing: border-box;
            margin-bottom: 16px;
            border: 1px solid #3d393733;
            cursor: pointer;
            padding: 16px 10px 4px 10px;
            font-family: 'Lato', sans-serif;
            border-radius: 10px;
            opacity: 1;
            position: relative;
            box-sizing: border-box;
            min-width: 113px;
            background-color: white;
        }
        
        .textarea-evertec textarea {
            border: none;
            outline: none;
            background: transparent !important;
            font-size: 16px;
            width: calc(100% - 16px);
            letter-spacing: 0;
            text-align: left;
            color: ${this.color};
            padding: 16px 0px 3px 0px;
            top: 0px;
            position: absolute;
            left: 16px;
            z-index: 1;
            min-height: 39.8px;
            font: normal normal normal 15px/20px Lato !important;
            box-sizing: border-box;
            height: 100%;
        }
        .textarea-evertec {
            min-height: 120px;
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
        
        .textarea-evertec label {
            position: absolute;
            top: 20px;
            bottom: 0;
            margin: auto;
            left: 16px;
            font-size: 15px;
            color: #3d3937;
            transition: all 0.2s ease-in-out;
            color: #3d393766;
            z-index: 0;
            align-content: center;
            display:block;
        }

        .textarea-evertec:hover, .textarea-evertec:focus-within{
            border-color:#3d39376e
        }
        
        .textarea-evertec:focus-within label {
            top: 5px;
            font-size: 11px;
            color: ${this.colorFocus} !important;
            align-content: flex-start;
        }
        
        :host(:focus-within) input {
            color: #ff6c0c !important;
        }
        
        .labelValidTextArea {
            top: 5px !important;
            font-size: 11px !important;
            color: #3d393766 !important;
            display:flex;
            flex-wrap:wrap;
            align-content: flex-start !important;
        }
        .errorTextArea{
            position: absolute;
            top:105%;
        }`
    }

    render() {
        this.idTextarea = this.id + "textarea"
        this.classList.add('textarea-evertec')
        let reference = this.querySelector('textarea')
        reference.setAttribute('id', this.placeholder)
        let newElement = document.createElement('label')
        newElement.setAttribute('for', this.idTextarea)

        if (reference.value != "") newElement.classList.add("labelValidTextArea")

        newElement.textContent = this.label
        this.insertBefore(newElement, reference)
        this.innerHTML += `<div class="errorTextArea">${this.errorMessage !== null ? this.errorMessage : ""}</div>`;
        this.innerHTML += `<style>${this.styles()}</style>`;

        this.querySelector('textarea').addEventListener('change', this.keyUpEvent)
        this.querySelector('textarea').addEventListener('keyup', this.keyUpEvent)
        this.querySelector('textarea').addEventListener('input', this.keyUpEvent)

    }
}

customElements.define('textarea-evertec', TextAreaDesing)