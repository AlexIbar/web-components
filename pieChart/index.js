class PieChart extends HTMLElement {

    data = [];
    radius = 25;

    static get observedAttributes() {
        return ['data'];
    }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    obtenerCoordenadasAngulo(){
        let total = this.data.reduce((acc, el) => acc + el.y, 0);
        let startAngle = 0;

        return this.data.map((el) => {
            let angle = (el.y / total) * 2 * Math.PI;
            const angleAct = startAngle;
            startAngle += angle;
            return {
                startX : this.radius-5 + Math.cos(angleAct) * this.radius-5,
                startY : this.radius-5 + Math.sin(angleAct) * this.radius-5,
                endX : this.radius-5 + Math.cos(angleAct + angle) * this.radius-5,
                endY : this.radius-5 + Math.sin(angleAct + angle) * this.radius-5,
                percentage : el.y / total * 100,
                color : el.color,
                name: el.label,
                angle: angleAct
            }
        })
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Cambio')
        if (name === 'data') {
            this.data = JSON.parse(newValue);
            this.renderAngle(this.obtenerCoordenadasAngulo());
            this.render();
        }
    }

    renderAngle(_coord){
        let svg = this.shadowRoot.querySelector('#chart');
        console.log(svg)
        svg.innerHTML = '';
        _coord.forEach((el) => {
            let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('fill', el.color);
            path.setAttribute('d', `M${this.radius}, ${this.radius} L${el.startX}, ${el.startY} A${this.radius}, ${this.radius} 0 ${el.angle > Math.PI ? '1' : '0'}, 1, ${el.endX}, ${el.endY} Z`);
            console.log(path)
            svg.appendChild(path);
        })
    }

    render(){
        console.log('render')
        this.shadowRoot.innerHTML =/*html*/`
        <svg id="chart" viewBox="0 0 400 400"></svg>`
    }
}

customElements.define('pie-chart', PieChart);