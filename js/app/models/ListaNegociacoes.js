class ListaNegociacoes {
    constructor() {
        //Propriedades de negociações => lista vazia
        this._negociacoes = [];
    }

    adiciona(negociacao) {//Método para adicionar informações na lista

        this._negociacoes.push(negociacao);
    }

    get negociacoes() {//Método para leitura das informações da lista
        
        return this._negociacoes;
    }



}

