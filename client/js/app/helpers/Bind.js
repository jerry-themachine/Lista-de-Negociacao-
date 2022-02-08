"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Associando os dados da classe ListaNegociacoes com a classe NegociacoesView, quando o método "adiciona()" e o método "esvazia()", ou a property "texto()" forem acessados
var Bind = function Bind(model, view) {
    _classCallCheck(this, Bind);

    for (var _len = arguments.length, props = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        props[_key - 2] = arguments[_key];
    }

    //['adiciona', 'esvazia'] => Retirado o sinal de array "[]" na classe NegociacaoController para uso do rest operator (...), com a mesma função do array

    //criando a variável proxy através da classe ProxyFactory
    var proxy = ProxyFactory.create(model, props, function (model) {
        view.update(model);
    });

    //Atualizando a "view" antes de retornar a variável proxy
    view.update(model);

    return proxy;
};
//# sourceMappingURL=Bind.js.map