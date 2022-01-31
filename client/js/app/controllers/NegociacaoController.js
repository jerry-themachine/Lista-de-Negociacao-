class NegociacaoController{

    constructor() {

        //transformando "document.getElementById" em uma variável => "$", através de "bind" ele irá manter a associação com "document"
        let $ = document.getElementById.bind(document);
          
        //Atribuindo os id's do DOM à variáveis
        this._inputBanco = $('banco');
        this._pais = $('pais');
        this._inputData = $('data');
        this._inputVariacao = $('variacao');
        this._inputBolsa = $('bolsa');
        this._inputCodigo = $('codigo');
        this._retorno = $('retorno');
        this._inputCota = $('cota');
        this._inputValor = $('valor');     
                          
        
        //Instanciando a classe Bind para chamar o padrão de projeto ProxyFactory que atualiza a ListaNegociacoes quando é inserida ou deletada uma nova negociação  
        this._listaNegociacoes = new Bind(      // => (model, view, props)
            new ListaNegociacoes(), // => (model)
            
            //Instanciando  a classe NegociacoesView
            new NegociacoesView($('negociacoesView')), // => (view)
            //['adiciona', 'esvazia'] => Retirado o sinal de array "[]" para uso do rest operator(...) na classe Bind
            
            'adiciona', 'esvazia' // => (props)
            );
                     

        //Padrão de projeto ProxyFactory para atualizar a Mensagem quando inserido ou deletado uma nova negociação
        
       
               
        //Instanciando a classe Bind
        this._mensagem = new Bind (      // => (model, view, props)
            new Mensagem(), // => (model)
            
            //Instanciando a classe MensagemView
            new MensagemView($('mensagemView')), // => (view)
            //['texto'] => Retirado o sinal de array "[]" para uso do rest operator(...) na classe Bind

            'texto' // => (props)
        );
                   
    }
   
    //Método para adicionar negociação 
    adiciona(event){

        event.preventDefault();      
        
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        
        this._mensagem.texto = 'Negociação inserida com sucesso';
        //this._mensagemView.update(this._mensagem);//Foi para o ProxyFactory
        
        this._limpaFormulario();

        console.log(this._listaNegociacoes.negociacoes);        
    }

    //Método para importar negociações 
    importaNegociacoes() {
        
        let service = new NegociacaoService();

        //Convençao para lidar com programação assíncrona, denominada => 'error first'
        //Negociações da semana atual
        service.obterNegociacoesDaSemanaAtual((erro, negociacoes) => { 

            //Gerando mensagem de erroo e parando execução
            if(erro) {
                this._mensagem.texto = erro;
                return;
            }

            //Executando e adicionando normalmente as negociações 
            negociacoes.forEach(negociacao => { this._listaNegociacoes.adiciona(negociacao);
            })

            //Negociações da semana anterior
            //Convençao para lidar com programação assíncrona, denominada => 'error first'
            service.obterNegociacoesDaSemanaAnterior((erro, negociacoes) => {

                //Gerando mensagem de erroo e parando execução
                if(erro) {
                    this._mensagem.texto = erro;
                    return;
                }

                //Executando e adicionando normalmente as negociações 
                negociacoes.forEach(negociacao => { this._listaNegociacoes.adiciona(negociacao);
                })
                
                //Negociação da semana retrasada
                //Convençao para lidar com programação assíncrona, denominada => 'error first'
                service.obterNegociacoesDaSemanaRetrasada((erro, negociacoes) => {

                    //Gerando mensagem de erroo e parando execução
                    if(erro) {
                        this._mensagem.texto = erro;
                        return;
                    }

                    //Executando e adicionando normalmente as negociações 
                    negociacoes.forEach(negociacao => { this._listaNegociacoes.adiciona(negociacao);
                    })                       

                    //Exibindo a mensagem abaixo quando as negociaçãoes forem importadas 
                    this._mensagem.texto = 'Negociações importadas com sucesso'
                });
            });
        });                                                                                              
    }

    //Método para deletar lista de negociações
    apaga() {

        this._listaNegociacoes.esvazia();        

        this._mensagem.texto = 'Negociações deletadas com sucesso';
        //this._mensagemView.update(this._mensagem);//Foi para o ProxyFactory

    }

    //Método para criar negociação com base nos valores dos dados obtidos através do formulário
    _criaNegociacao() {

        return new Negociacao(
            this._inputBanco.value,
            this._pais.value,
            DateHelper.textoParaData(this._inputData.value),
            this._inputVariacao.value,
            this._inputBolsa.value,
            this._inputCodigo.value,
            this._retorno.value,
            this._inputCota.value,
            this._inputValor.value);
    }

    //Método para limpeza do formulário preenchido e após ser submetido
    _limpaFormulario() {

        this._inputBanco.value = '';
        this._paisvalue = '';
        this._inputData.value = '';
        this._inputVariacao.value = 0.00.toFixed(2);
        this._inputBolsa.value = '';
        this._inputCodigo.value = '';
        this._retorno.value = '';
        this._inputCota.value = 1;
        this._inputValor.value = 0.000.toFixed(3);

        this._inputBanco.focus(); 
    }
};





