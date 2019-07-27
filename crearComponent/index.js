//Creamos por medio de una clase el elemento a crear o personalizar
class AlertarGrande extends HTMLElement{
    constructor(){
        super()
        this.pintado=false
    }
    connectedCallback(){
        //console.log('conectado')
        //console.log(this.getAttribute('nombre'))
        this.pintado=true
        this.innerHTML=this.saludo
    }
    disconnectedCallback(){
        this.pintado=false
    }
    attributeChangedCallback(nombre, valorAnterior, newValor){
        if(nombre==='nombre'){
            this.saludo=`Hola Sr ${newValor}`
        }
        if(this.pintado){
            this.innerHTML=this.saludo
        }
    }
    static get observedAttributes(){
        return ['nombre']
    }
}

//Lo debemos definir para que lo podamos usar en el html
window.customElements.define('alertar-grande', AlertarGrande)