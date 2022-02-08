'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateHelper = function () {
    function DateHelper() {
        _classCallCheck(this, DateHelper);

        throw new Error('DateHelper não deve ser instanciada');
    }

    //Formatando a data no formato dia/mês/ano


    _createClass(DateHelper, null, [{
        key: 'dataParaTexto',
        value: function dataParaTexto(data) {
            //método "static" é usado para estnaciar o método diretamente no objeto 

            return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
        }

        //Utilizando 'spread operator' para desmembrar o array (1º parâmetro - 2º parâmetro - 3º parâmetro => 2022 - 01 - 15)

    }, {
        key: 'textoParaData',
        value: function textoParaData(texto) {
            //inserindo (-) com 'split'

            //Fazendo validação do formato da data através de expressões regulares
            if (!/\d{4}-\d{2}-\d{2}/.test(texto)) {
                throw new Error('A data deve seguir o formato aaaa-mm-dd');
            }

            return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(texto.split('-').map(function (item, indice) {
                //Percorrendo item e índice com 'map'

                if (indice == 1) {
                    return item - 1; //retornando o item '1 => mês' subtraindo 1
                }

                return item; //retornando o item '0 => ano' e '2 => dia'
            })))))();
        }
    }]);

    return DateHelper;
}();
//# sourceMappingURL=DateHelper.js.map