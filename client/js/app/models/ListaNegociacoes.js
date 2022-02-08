"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListaNegociacoes = function () {
    function ListaNegociacoes() {
        _classCallCheck(this, ListaNegociacoes);

        //Propriedades de negociações => lista vazia
        this._negociacoes = [];
        //this._armadilha = armadilha;//Chamando a atualização da view automaticamente 
    }

    //Método para adicionar informações na lista de negociações


    _createClass(ListaNegociacoes, [{
        key: "adiciona",
        value: function adiciona(negociacao) {

            this._negociacoes.push(negociacao);
            //this._negociacoes.push(negociacao);
            //this._armadilha(this);
        }
    }, {
        key: "esvazia",


        //Método para criar lista de negociações vazia
        value: function esvazia() {
            this._negociacoes = [];
            //this._armadilha(this);        
        }

        //Método get, utilizando 'reduce' para retornar o Total do Investimento

    }, {
        key: "ordena",


        //Método get, utilizando 'forEach' para retornar o Total do Investimento
        /* get volumeTotal() {
            let total = 0;
            this.negociacoes.forEach(n => total += n.volume);
            
            return total.toFixed(2);
        }; */

        //Método para interação do usuário com as tabelas
        value: function ordena(criterio) {
            this._negociacoes.sort(criterio);
        }
    }, {
        key: "inverte",
        value: function inverte() {
            this._negociacoes.reverse();
        }
    }, {
        key: "negociacoes",
        get: function get() {
            //Método para leitura das informações da lista

            //Blindando a lista através da criação de um array vazio concatenado com a lista (criando uma cópia da lista) para evitar a interação/alteração de terceiros com a mesma   
            return [].concat(this._negociacoes); //Método "concat" utilizado para concatenar o array vazio com as informações da lista, criando asssim uma cópia da lista 
        }
    }, {
        key: "volumeTotal",
        get: function get() {
            var totNeg = this.negociacoes.reduce(function (anterior, atual) {
                return anterior + atual.total;
            }, 0.000);

            return totNeg.toFixed(3);
        }
    }]);

    return ListaNegociacoes;
}();

;
//# sourceMappingURL=ListaNegociacoes.js.map