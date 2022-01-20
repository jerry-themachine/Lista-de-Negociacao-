class MensagemView {

    constructor(elemento) {
        this._elemento = elemento;
    }

    _template(model) {

        return model.texto ? `<p class="alert alert-info"><b>${model.texto}</b></p>` : `<p></p>`;
    }

    update(model) {
        this._elemento.innerHTML = this._template(model);
    }
}