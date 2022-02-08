"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Negociacao = function () {
    function Negociacao(banco, pais, data, variacao, bolsa, codigo, retorno, cota, valor, total) {
        _classCallCheck(this, Negociacao);

        this._banco = banco;
        this._pais = pais;
        this._data = new Date(data.getTime());
        this._variacao = variacao;
        this._bolsa = bolsa;
        this._codigo = codigo;
        this._retorno = retorno;
        this._cota = cota;
        this._valor = valor;
        this._total = total;
        Object.freeze(this);
    }

    _createClass(Negociacao, [{
        key: "banco",
        get: function get() {
            return this._banco;
        }
    }, {
        key: "pais",
        get: function get() {
            return this._pais;
        }
    }, {
        key: "data",
        get: function get() {
            return new Date(this._data.getTime());
        }
    }, {
        key: "variacao",
        get: function get() {
            return this._variacao;
        }
    }, {
        key: "bolsa",
        get: function get() {
            return this._bolsa;
        }
    }, {
        key: "codigo",
        get: function get() {
            return this._codigo;
        }
    }, {
        key: "retorno",
        get: function get() {
            return this._retorno;
        }
    }, {
        key: "cota",
        get: function get() {
            return this._cota;
        }
    }, {
        key: "valor",
        get: function get() {
            return this._valor;
        }
    }, {
        key: "total",
        get: function get() {
            return this._cota * this._valor;
        }
    }]);

    return Negociacao;
}();
//# sourceMappingURL=Negociacao.js.map