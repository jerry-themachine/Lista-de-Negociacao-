class MensagemView extends View {

    constructor(elemento) {
        super(elemento);
    }

    template(model) {

        return model.texto ? `<p class="alert alert-info"><b>${model.texto}</b></p>` : `<p></p>`;
    }
}