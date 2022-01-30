class ListaNegociacoes {

    constructor() {
        //Propriedades de negociações => lista vazia
        this._negociacoes = [];
        //this._armadilha = armadilha;//Chamando a atualização da view automaticamente 
    }

    //Método para adicionar informações na lista de negociações
    adiciona(negociacao) {

        this._negociacoes.push(negociacao);        
        //this._negociacoes.push(negociacao);
        //this._armadilha(this);
        
    }

    get negociacoes() {//Método para leitura das informações da lista
        
        //Blindando a lista através da criação de um array vazio concatenado com a lista (criando uma cópia da lista) para evitar a interação/alteração de terceiros com a mesma   
        return [].concat(this._negociacoes);//Método "concat" utilizado para concatenar o array vazio com as informações da lista, criando asssim uma cópia da lista 
    }

    //Método para criar lista de negociações vazia
 esvazia() {
        this._negociacoes = [];
        //this._armadilha(this);        
    }

    //Método get, utilizando 'reduce' para retornar o Total do Investimento
    get volumeTotal() {
        let totNeg = this.negociacoes.reduce((anterior, atual) => anterior + atual.total, 0.000);
                    
                    return totNeg.toFixed(3);
     }

    //Método get, utilizando 'forEach' para retornar o Total do Investimento
    /* get volumeTotal() {
        let total = 0;
        this.negociacoes.forEach(n => total += n.volume);
        
        return total.toFixed(2);
    }; */

};

