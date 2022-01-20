class View {

    constructor(elemento) {

        this._elemento = elemento;
    }

    template() {
        
        throw new Error(`O método template deve ser implamentado`);
    }

    update(model) {

        this._elemento.innerHTML = this.template(model);
    }

}