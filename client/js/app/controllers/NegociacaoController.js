class NegociacaoController{

    constructor() {

        //transformando "document.getElementById" em uma variável => "$", através de "bind" ele irá manter a associação com "document"
        let $ = document.getElementById.bind(document);
          
        //Atribuindo os id's do DOM à variáveis
        this._inputAtivo = $('ativo');
        this._inputData = $('data');
        this._inputQuantidade = $('quantidade');
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
        service.obterNegociacoesDaSemana((erro, negociacoes) => {

            //Gerando mensagem de erroo e parando execução
            if(erro) {
                this._mensagem.texto = erro;
                return;
            }

            //Executando e adicionando normalmente as negociações exibindo a mensagem abaixo
            negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
            })
            this._mensagem.texto = 'Negociações importadas com sucesso';    

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
            this._inputAtivo.value,
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
    }

    //Método para limpeza do formulário preenchido e após ser submetido
    _limpaFormulario() {

        this._inputAtivo.value = '';
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.00.toFixed(2);

        this._inputAtivo.focus(); 
    }
};





