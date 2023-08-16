class InputDate extends HTMLElement {
    color = "#3D3937"
    label = "Date"
    id = ""
    value = ""
    colorFocus = "#ff6c0c"
    type = "date"
    slot = null;
    slotElement = null
    $this = null;
    labelTwo = ""


    constructor() {
        
        super()
    }

    ocultarIput() {
        if (this.id === "") return false;
        this.$this = document.querySelector("#" + this.id)
        if (this.$this !== null) {
            this.value = this.querySelector('input').value
            this.organizarComponent()
        }
    }

    static get observedAttributes() {
        return ['color', 'label', 'id', 'value', 'colorfocus', 'type', 'format', 'label-two']
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if (attr === "label") {
            this[attr] = newVal
            let lab = this.querySelector("label")
            if (lab) lab.innerHTML = newVal
            return;
        }
        if(attr === "label-two"){
            this.labelTwo = newVal
            this.completeLabelTwo()
            return;
        }
        if (attr === "colorfocus") {
            this.colorFocus = newVal
        } else {
            this[attr] = newVal
        }
        //this.ocultarIput()
    }

    connectedCallback() {
        this.ocultarIput()
        this.addEventListener('change-value-input', this.changeValueEvent)
    }

    setValue(value) {
        this.value = value
        this.changeValueEvent({
            detail: {
                value
            }
        })
    }

    changeValueEvent(event) {
        if (this.type === "date") {
            $(this).find(".claseElement").datepicker("update", event?.detail?.value ?? "");
        } else if (this.type === "time") {
            if (event?.detail?.value ?? "" !== "") {
                $(this).find(".claseElement").timepicker("setTime", event?.detail?.value ?? "");
            } else {
                this.querySelector("input").value = ""
            }
        } else {
            this.querySelector(".claseElement").value = event?.detail?.value ?? ""
        }
        this.keyUpEvent()
    }

    organizarComponent() {
        this.render()
    }


    validateDate(date) {

    }

    keyUpEvent = (fechaSelect = null) => {
        setTimeout(() => {
            this.value = this.querySelector(".claseElement").value
            if (this.value !== this.querySelector('input').value) this.querySelector('input').value = this.value
            if (this.value == "") {
                this.querySelector("label").classList.remove("labelValid")
            } else {
                this.querySelector("label").classList.add("labelValid")
            }
            this.dispatchEventChange(this.value)
        }, 30)
    }

    dispatchEventChange(value = "") {
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
            display:block
        }
        
        .content-input-date input {
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

    completeLabelTwo() {
        if(this.querySelector(".labelTwo") !== null){
            this.querySelector(".labelTwo").remove()
        };
        let labelElementTwo = document.createElement("div");
        labelElementTwo.classList.add("labelTwo")
        labelElementTwo.textContent = this.labelTwo;
        labelElementTwo.style.position = "absolute"
        labelElementTwo.style.lineHeight = "43px"
        labelElementTwo.style.width = "30px"
        labelElementTwo.style.right = "0px"
        labelElementTwo.style.textAlign = "center"
        labelElementTwo.style.margin = "0px"
        labelElementTwo.style.padding = "0px"
        labelElementTwo.style.top = "0px"
        this.querySelector("input").style.paddingRight = "30px"
        this.appendChild(labelElementTwo);
    }

    render() {
        this.classList.add("content-input-date")
        this.querySelector('input').classList.add("claseElement")

        let labelElement = document.createElement("label");
        labelElement.textContent = this.label;

        let elementN = this.querySelector('input');
        if (elementN.value == "") {
            labelElement.classList.remove("labelValid")
        } else {
            labelElement.classList.add("labelValid")
        }

        let styleElement = document.createElement("style");
        styleElement.textContent = this.style();
        this.appendChild(labelElement);
        this.appendChild(styleElement);

        if(this.labelTwo !== ""){
            console.log("entro")
            this.completeLabelTwo();
        }

        this.querySelector('input').addEventListener('change', this.keyUpEvent)
        this.querySelector('input').addEventListener('keyup', this.keyUpEvent)
        this.querySelector('input').addEventListener('input', this.keyUpEvent)


        if (this.type == "time") {

            $("#" + this.id).find(".claseElement").clockpicker({
                default: 'now',
                placement: 'bottom',
                align: 'left',
                twelvehour: true,
                autoclose: true,
                fromnow: 0,
                afterHide: () => { this.keyUpEvent() }
            });

        }

        if (this.type == "date") {
            if (!this.format) {
                $("#" + this.id).find(".claseElement").datepicker({
                    format: this.format ?? 'mm/dd/yyyy',
                    orientation: "bottom auto",
                    endDate: '+1d',
                    autoclose: true,
                    maxViewMode: 2,
                    todayHighlight: true,

                }).on("changeDate", () => {
                    this.keyUpEvent()
                })
            } else {
                $("#" + this.id).find(".claseElement").datepicker({
                    autoclose: true,
                    minViewMode: 1,
                    startView: 1,
                    format: this.format,
                    endDate: '+1d',
                    orientation: "bottom auto",
                    autoclose: true
                }).on('changeDate', (selected) => {
                    this.keyUpEvent()
                });
            }

            $('.date-picker').prop('readonly', true);
            $('.date-picker').css('background-color', '#FFFFFF');
        }
    }
}

customElements.define('input-date', InputDate)