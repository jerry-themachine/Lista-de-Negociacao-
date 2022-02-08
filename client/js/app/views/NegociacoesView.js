"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NegociacoesView = function (_View) {
    _inherits(NegociacoesView, _View);

    function NegociacoesView(elemento) {
        _classCallCheck(this, NegociacoesView);

        return _possibleConstructorReturn(this, (NegociacoesView.__proto__ || Object.getPrototypeOf(NegociacoesView)).call(this, elemento));
    }

    _createClass(NegociacoesView, [{
        key: "template",
        value: function template(model) {

            return "\n        <table class=\"table table-hover table-bordered\">\n            <thead>\n                <tr>\n                    <th style=\"text-align: center; vertical-align:middle\">BANCO - RAZ\xC3O SOCIAL</th>\n                    <th style=\"text-align: center; vertical-align:middle\">PA\xCDS</th>\n                    <th style=\"text-align: center; vertical-align:middle; cursor: pointer\" onclick=\"negociacaoController.ordena('data')\"; cursor: \"pointer\">DATA<br>COMPRA</th>\n\n                    <th style=\"text-align: center; vertical-align:middle; cursor: pointer\" onclick=\"negociacaoController.ordena('variacao')\">VARIA\xC7\xC2O<br>(%)</th>\n                    <th style=\"text-align: center; vertical-align:middle\">BOLSA</th> \n                    <th style=\"text-align: center; vertical-align:middle\">C\xD2DIGO</th>   \n                                    \n                    <th style=\"text-align: center; vertical-align:middle; cursor: pointer\" onclick=\"negociacaoController.ordena('retorno')\">RETORNO<br>30 DIAS</th>\n                    <th style=\"text-align: center; vertical-align:middle; cursor: pointer\" onclick=\"negociacaoController.ordena('cota')\">COTA</th>\n                    <th style=\"text-align: center; vertical-align:middle; cursor: pointer\" onclick=\"negociacaoController.ordena('valor')\">VALOR <br> UNIT.</th>\n                    <th style=\"text-align: center; vertical-align:middle; cursor: pointer\" onclick=\"negociacaoController.ordena('total')\">TOTAL <br> COMPRA</th>\n                </tr>\n            </thead>\n            \n            <tbody>\n\n                " + model.negociacoes.map(function (n) {

                //Criando uma nova lista para que cada negociação criada, seja criado também uma "tr" com os dados da negociação percorrida pelo "map"
                return "\n                        <tr>\n                            <td>" + function () {

                    //Convertendo primeiro caractére em maiúsculo
                    var textToUper = n.banco.charAt(0).toUpperCase() + n.banco.slice(1);

                    for (var i = 0; i < textToUper.length; i++) {
                        if (textToUper.charAt(i) === " ") {

                            //Convertendo caractére após o espaço em maiúsculo
                            var textConvert = textToUper.charAt(i + 1).toUpperCase();

                            //Inserindo texto antes do espaço na variável
                            var textBegin = textToUper.slice(0, i + 1);

                            //Inserindo texto depois do espaço na variável
                            var textEndSpace = textToUper.slice(i + 2);

                            //Concatenando todas as strings em apenas uma 
                            textToUper = textBegin + textConvert + textEndSpace;
                        }
                    }
                    return textToUper;
                }() + "</td>\n                            <td>" + function () {

                    //Convertendo primeiro caractére em maiúsculo
                    var textToUper1 = n.pais.charAt(0).toUpperCase() + n.pais.slice(1);

                    for (var i = 0; i < textToUper1.length; i++) {
                        if (textToUper1.charAt(i) === " ") {

                            //Convertendo caractére após o espaço em maiúsculo
                            var textConvert = textToUper1.charAt(i + 1).toUpperCase();

                            //Inserindo texto antes do espaço na variável
                            var textBegin = textToUper1.slice(0, i + 1);

                            //Inserindo texto depois do espaço na variável
                            var textEndSpace = textToUper1.slice(i + 2);

                            //Concatenando todas as strings em apenas uma 
                            textToUper1 = textBegin + textConvert + textEndSpace;
                        }
                    }
                    return textToUper1;
                }() + "</td>\n                            <td style=\"font-weight: bold \">" + DateHelper.dataParaTexto(n.data) + "</td>\n                            <td>" + n.variacao + "</td>\n                            <td style=\"text-align: center\">" + n.bolsa.toUpperCase() + "</td>\n                            <td style=\"text-align: center\">" + n.codigo.toUpperCase() + "</td>\n                            <td style=\"text-align: center\">" + n.retorno + "</td>\n                            <td style=\"text-align: center\">" + n.cota + "</td>\n                            <td>US$ " + n.valor + "</td>\n                            <td>US$ " + n.total.toFixed(3) + "</td>\n                        </tr>\n                    ";
                //Transformando o array que contém strings em uma string gigante para ser inserido na interpolação do conteúdo do "tbody"
            }).join('') + "\n            </tbody>\n            <tfoot>\n            <th colspan=\"9\">TOTAL INVESTIMENTO</th>\n            <td>US$ " + model.volumeTotal + "</td>\n            </tfoot>\n        </table>\n        ";
        }
    }]);

    return NegociacoesView;
}(View);
//# sourceMappingURL=NegociacoesView.js.map