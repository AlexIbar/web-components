class NotificationMedia extends HTMLElement{
    constructor(){
        super()
        this.template = document.getElementById('notificacion');
        this.DOMimportado = document.importNode(this.template.content, true) 
        //Impide que el css externo nodifique los estilos internos
        this._root =this.attachShadow({mode:'closed'})
    }
    connectedCallback(){
        //Sin el attachShadow({mode:'open'})
            //this.appendChild(this.DOMimportado)
        //Con el this.attachShadow({mode:'open'})
        this._root.appendChild(this.DOMimportado)
    }
    attributeChangedCallback(name, previusValue, newValue){
        let a = JSON.parse(newValue)
        /*this.DOMimportado.querySelector('.baner').children[0].children[0].src=a.logo
        this.DOMimportado.querySelector('.baner').children[1].children[0].innerHTML=a.nombre
        this.DOMimportado.querySelector('.contenido-info').children[0].children[0].children[0].innerHTML=a.title
        this.DOMimportado.querySelector('.contenido-info').children[0].children[1].children[0].innerHTML='"'+a.content+'"'
        this.DOMimportado.querySelector('.contenido-info').children[1].children[0].src=a.logoEmpresa*/
    }
    static get observedAttributes(){
        //return ['props']
    }
}
window.customElements.define('notificacion-alert', NotificationMedia)