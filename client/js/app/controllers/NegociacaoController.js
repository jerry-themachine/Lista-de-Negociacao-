'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        var _this = this;

        _classCallCheck(this, NegociacaoController);

        //transformando "document.getElementById" em uma variável => "$", através de "bind" ele irá manter a associação com "document"
        var $ = document.getElementById.bind(document);

        //Atribuindo os id's do DOM à variáveis
        this._inputBanco = $('banco');
        this._inputPais = $('pais');
        this._inputData = $('data');
        this._inputVariacao = $('variacao');
        this._inputBolsa = $('bolsa');
        this._inputCodigo = $('codigo');
        this._inputRetorno = $('retorno');
        this._inputCota = $('cota');
        this._inputValor = $('valor');

        //Instanciando a classe Bind para chamar o padrão de projeto ProxyFactory que atualiza a ListaNegociacoes quando é inserida ou deletada uma nova negociação  
        this._listaNegociacoes = new Bind( // => (model, view, props)
        new ListaNegociacoes(), // => (model)

        //Instanciando  a classe NegociacoesView
        new NegociacoesView($('negociacoesView')), // => (view)
        //['adiciona', 'esvazia'] => Retirado o sinal de array "[]" para uso do rest operator(...) na classe Bind

        'adiciona', 'esvazia', 'ordena', 'inverte' // => (props)
        );

        //Padrão de projeto ProxyFactory para atualizar a Mensagem quando inserido ou deletado uma nova negociação


        //Instanciando a classe Bind
        this._mensagem = new Bind( // => (model, view, props)
        new Mensagem(), // => (model)

        //Instanciando a classe MensagemView
        new MensagemView($('mensagemView')), // => (view)
        //['texto'] => Retirado o sinal de array "[]" para uso do rest operator(...) na classe Bind

        'texto' // => (props)
        );

        //Instanciando a classe Bind
        this._mensagem2 = new Bind( // => (model, view, props)
        new Mensagem(), // => (model)

        //Instanciando a classe MensagemView
        new MensagemView($('mensagemView2')), // => (view)
        //['texto'] => Retirado o sinal de array "[]" para uso do rest operator(...) na classe Bind

        'texto' // => (props)
        );

        //Com a página carregada não existirá critério, só existirá quando o usuário clicar nas colunas
        this._ordemAtual = '';

        ConnectionFactory.getConnection().then(function (connection) {
            return new NegociacaoDao(connection);
        }).then(function (dao) {
            return dao.listaTodos();
        }).then(function (negociacoes) {
            return negociacoes.forEach(function (negociacao) {
                return _this._listaNegociacoes.adiciona(negociacao);
            });
        }).catch(function (erro) {
            console.log(erro);
            _this._mensagem.texto = erro;
        });

        //Método para o usuário atualizar as importações através do botão "Atulizar Lista"   

        var hh = 0;
        var mm = 0;
        var ss = 0;
        var th = '';
        var tm = '';
        var ts = '';

        setInterval(function () {

            _this.importaNegociacoes();
            _this._mensagem2.texto = timer();
        }, 1000);

        function timer() {

            //MensagemView2 com informações em hora/min/seg sobre a útlima atualização executada 
            if (ss <= 60) {
                ts = 'segundos';
            } else if (ss == 0) {
                ts = '';
            }

            if (mm >= 1 && mm <= 60) {
                ts = '';
                tm = 'minutos';
            }

            if (hh == 1) {
                tm = '';
                ts = '';
                th = 'hora';
            } else if (hh >= 2) {
                tm = '';
                ts = '';
                th = 'horas';
            }

            //cronômetro
            ss++;
            if (ss == 60) {
                ss = 0;
                mm++;
                if (mm == 60) {
                    mm = 0;
                    hh++;
                }
            }

            var format = 'Lista de negocia\xE7\xF5es atualizada h\xE1 ' + (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss) + ' ' + ts + tm + th;
            return format;
        }
    }

    _createClass(NegociacaoController, [{
        key: 'adiciona',


        //Método para adicionar negociação 
        value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();

            ConnectionFactory.getConnection().then(function (connection) {

                var negociacao = _this2._criaNegociacao();

                new NegociacaoDao(connection).adiciona(negociacao).then(function () {
                    _this2._listaNegociacoes.adiciona(negociacao);
                    _this2._mensagem.texto = 'Negociação inserida com sucesso';
                    _this2._limpaFormulario();
                });
            }).catch(function (erro) {
                return _this2._mensagem.texto = erro;
            });
        }
    }, {
        key: 'importaNegociacoes',


        //Método para importar negociações 
        value: function importaNegociacoes() {
            var _this3 = this;

            var service = new NegociacaoService();

            var promiseSemanaAtual = service.obterNegociacoesDaSemanaAtual();
            var promiseSemanaAnterior = service.obterNegociacoesDaSemanaAnterior();
            var promiseSemanaRetrasada = service.obterNegociacoesDaSemanaRetrasada();

            //Resolvendo as promises na ordem especificada
            Promise.all([promiseSemanaAtual, promiseSemanaAnterior, promiseSemanaRetrasada]).then(function (negociacoes) {

                return negociacoes.filter(function (negociacao) {

                    return !_this3._listaNegociacoes.negociacoes.some(function (negociacaoExistente) {

                        return JSON.stringfy(negociacao) == JSON.stringify(negociacaoExistente);
                    });
                });
            }).then(function (negociacoes) {
                negociacoes.reduce(function (arrayAchatado, array) {
                    return arrayAchatado.concat(array);
                }, []).forEach(function (negociacao) {
                    return _this3._listaNegociacoes.adiciona(negociacao);
                });
                _this3._mensagem.texto = 'Negociações importadas com sucesso';
            }).catch(function (erro) {
                _this3._mensagem.text = erro;
            });
        }
    }, {
        key: 'apaga',


        //Método para deletar lista de negociações
        value: function apaga() {
            var _this4 = this;

            ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.apagaTodos();
            }).then(function (mensagem) {
                _this4._mensagem.texto = mensagem;
                _this4._listaNegociacoes.esvazia();
            });

            this._listaNegociacoes.esvazia();

            this._mensagem.texto = 'Negociações deletadas com sucesso';
            //this._mensagemView.update(this._mensagem);//Foi para o ProxyFactory
        }
    }, {
        key: '_criaNegociacao',


        //Método para criar negociação com base nos valores dos dados obtidos através do formulário
        value: function _criaNegociacao() {

            return new Negociacao(this._inputBanco.value, this._inputPais.value, DateHelper.textoParaData(this._inputData.value), parseFloat(this._inputVariacao.value), this._inputBolsa.value, this._inputCodigo.value, parseFloat(this._inputRetorno.value), parseInt(this._inputCota.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: '_limpaFormulario',


        //Método para limpeza do formulário preenchido e após ser submetido
        value: function _limpaFormulario() {

            this._inputBanco.value = '';
            this._inputPais.value = '';
            this._inputData.value = '';
            this._inputVariacao.value = 0.000.toFixed(3);
            this._inputBolsa.value = '';
            this._inputCodigo.value = '';
            this._inputRetorno.value = 0.000.toFixed(3);;
            this._inputCota.value = 1;
            this._inputValor.value = 0.000.toFixed(3);

            this._inputBanco.focus();
        }
    }, {
        key: 'ordena',


        //Método para ordenar a lista de negociações, renderizando-a através da interação do usuário com cliques
        value: function ordena(coluna) {

            if (this._ordemAtual == coluna) {
                this._listaNegociacoes.inverte();
            } else {
                this._listaNegociacoes.ordena(function (a, b) {
                    return a[coluna] - b[coluna];
                });
            };

            this._ordemAtual = coluna;
        }
    }]);

    return NegociacaoController;
}();

;
//# sourceMappingURL=NegociacaoController.js.map