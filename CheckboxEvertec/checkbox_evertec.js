class CheckboxEvertec extends HTMLElement {
    value = false;
    labelTrue = "ON";
    labelFalse = "OFF";
    labelFalse = true;
    bColorOk ="#fd7e14"
    bColorError = "#dde9f8"
    iconTrue = `https://pvot-us-portal-rebrand-development.azurewebsites.net/Assets/Evertec/img/switch_ok.svg`
    iconFalse = `https://pvot-us-portal-rebrand-development.azurewebsites.net/Assets/Evertec/img/switch_cancel.svg`

    constructor(){
        super();
    }
    static get observedAttributes() {
        return ['color', 'labelTrue', 'labelFalse', 'id', 'labelVisible']
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if(attr === 'id' && newValue !== oldValue) this[attr] = newValue
    }

    connectedCallback(){
        this.render()
    }
    disconnectedCallback(){
        super.disconnectedCallback()
        this.removeEventListener('change', this.keyUpEvent)
        this.removeEventListener('keyup', this.keyUpEvent)
        this.removeEventListener('input', this.keyUpEvent)
    }
    setValue(value) {
        this.value = value
        this.keyUpEvent({
            target: {
                checked: value
            }
        })
    }

    dispatchEventChange(value) {
        const messageEvent = new CustomEvent("change:input-value", {
            detail: { value }
        });
        this.dispatchEvent(messageEvent);
    }

    keyUpEvent = (e) => {
        this.changeStatus(e.target.checked)
        this.value = e.target.checked
        this.dispatchEventChange(this.value)
        if(this.labelVisible) this.querySelector('label').innerText = this.value ? this.labelTrue : this.labelFalse
    }

    style(){
        return `
        #${this.id} {
            position: relative;
        }
        #${this.id} input {
            position: absolute;
            left: 0px;
            top: 0px;
            z-index: 2;
            padding: 0px;
            margin: 0px;
            width: 40px;
            height: 24px;
            opacity: 0;
        }
        .checkboxEvertec {
            position:relative;
            width:40px;
            height:24px;
            border-radius: 34px;
            overflow:hidden;
        }
        .checkboxEvertec__container__icon {
            position:absolute;
        }
        .checkboxEvertec__container__icon:nth-child(1) {
            left:2px;
            top: 2px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-size: 51px;
            background-position-x: 35px;
            background-position-y: 38px;
            background-image: url("${this.iconFalse}");
            -webkit-transition: .4s;
            transition: .4s;
        }
        .checkboxEvertec__container__icon:nth-child(2) {
            right:2px;
            top: 2px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-size: 51px;
            background-position-x: 35px;
            background-position-y: 38px;
            background-image: url("${this.iconTrue}");
            -webkit-transition: .4s;
            transition: .4s;
        }
        .checkBoxStatusOkTrue {
            right: 2px;
            opacity: 1;
        }
        .checkBoxStatusNotTrue {
            left: 2px;
            opacity: 1;
        }
        `
    }

    changeStatus(status){
        if(status){
            this.querySelector('#checkboxTrue').style.right = "2px"
            this.querySelector('#checkboxFalse').style.left = "18px"
            this.querySelector('#checkboxFalse').style.transform = "rotate(180deg)"
            this.querySelector('#checkboxTrue').style.transform = "rotate(0deg)"
            setTimeout(() => {
                this.querySelector('#checkboxTrue').style.opacity = "1"
                this.querySelector('#checkboxFalse').style.opacity = "0"
            },100)
            this.querySelector('.checkboxEvertec').style.backgroundColor = this.bColorOk
        }else{
            this.querySelector('#checkboxFalse').style.left = "2px"
            this.querySelector('#checkboxTrue').style.right = "18px"
            this.querySelector('#checkboxFalse').style.transform = "rotate(0deg)"
            this.querySelector('#checkboxTrue').style.transform = "rotate(180deg)"
            setTimeout(() => {
                this.querySelector('#checkboxTrue').style.opacity = "0"
                this.querySelector('#checkboxFalse').style.opacity = "1"
            },100)
            this.querySelector('.checkboxEvertec').style.backgroundColor = this.bColorError
        }
    }

    render(){
        this.value = this.querySelector('input').checked
        this.innerHTML += `
        <style>${this.style()}</style>
        <div style="display:flex">
            <div class="checkboxEvertec" style="background-color :${this.value ? this.bColorOk : this.bColorError}">
                <div id="checkboxFalse" class="checkboxEvertec__container__icon" style="opacity:${this.value ? 0 : 1}"></div>
                <div id="checkboxTrue" class="checkboxEvertec__container__icon" style="opacity:${this.value ? 1 : 0}"></div>
            </div>
            ${this.labelVisible ? `<label style="align-self:center; margin-left:4px">${this.value ? this.labelTrue : this.labelFalse}</label>` : ''}
        </div>
        `
        this.querySelector('input').addEventListener('change', this.keyUpEvent)
    }
}

customElements.define('checkbox-evertec', CheckboxEvertec);