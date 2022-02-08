'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._http = new HttpService();
    }

    //Negociações da semana


    _createClass(NegociacaoService, [{
        key: 'obterNegociacoesDaSemanaAtual',
        value: function obterNegociacoesDaSemanaAtual() {
            var _this = this;

            return new Promise(function (resolve, reject) {

                var atual = 'negociacoes/semana';
                _this._http.get(atual).then(function (negociacoes) {

                    resolve(negociacoes.map(function (objeto) {
                        return new Negociacao(objeto.banco, objeto.pais, new Date(objeto.data), objeto.variacao, objeto.bolsa, objeto.codigo, objeto.retorno, objeto.cota, objeto.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana atual');
                });

                console.log('Negociações da semana atual inseridas com sucesso');
            });
        }
    }, {
        key: 'obterNegociacoesDaSemanaAnterior',


        //Negociações da semana anterior
        value: function obterNegociacoesDaSemanaAnterior() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                var anterior = 'negociacoes/anterior';
                _this2._http.get(anterior).then(function (negociacoes) {

                    resolve(negociacoes.map(function (objeto) {
                        return new Negociacao(objeto.banco, objeto.pais, new Date(objeto.data), objeto.variacao, objeto.bolsa, objeto.codigo, objeto.retorno, objeto.cota, objeto.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior');
                });

                console.log('Negociações da semana anterior inseridas com sucesso');
            });
        }
    }, {
        key: 'obterNegociacoesDaSemanaRetrasada',


        //Negociações da semana retrasada
        value: function obterNegociacoesDaSemanaRetrasada() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {

                var retrasada = 'negociacoes/retrasada';
                _this3._http.get(retrasada).then(function (negociacoes) {

                    resolve(negociacoes.map(function (objeto) {
                        return new Negociacao(objeto.banco, objeto.pais, new Date(objeto.data), objeto.variacao, objeto.bolsa, objeto.codigo, objeto.retorno, objeto.cota, objeto.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior');
                });

                console.log('Negociações da semana inseridas com sucesso');
            });
        }
    }]);

    return NegociacaoService;
}();

;
//# sourceMappingURL=NegociacaoService.js.map