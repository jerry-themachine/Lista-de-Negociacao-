class ListaNegociacoes {
    constructor() {
        //Propriedades de negociações => lista vazia
        this._negociacoes = [];
    }

    adiciona(negociacao) {//Método para adicionar informações na lista

        this._negociacoes.push(negociacao);
    }

    get negociacoes() {//Método para leitura das informações da lista
        
        //Blindando a lista através da criação de um array vazio concatenado com a lista (criando uma cópia da lista) para evitar a interação/alteração de terceiros com a mesma   
        return [].concat(this._negociacoes);//Método "concat" utilizado para concatenar o array vazio com as informações da lista, criando asssim uma cópia da lista 
    }

}

