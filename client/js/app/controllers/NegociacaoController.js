class NegociacaoController{

    constructor() {

        //transformando "document.getElementById" em uma variável => "$", através de "bind" ele irá manter a associação com "document"
        let $ = document.getElementById.bind(document);
          
        //Atribuindo os id's do DOM à variáveis
        this._inputAtivo = $('ativo');
        this._inputData = $('data');
        this._inputQuantidade = $('quantidade');
        this._inputValor = $('valor');
        
       
        //Padrão de projeto ProxyFactory para atualizar a ListaNegociacoes quando inserido ou deletado uma nova negociação    
        

        //Instanciando  a classe NegociacoesView
        this._negociacoesView = new NegociacoesView($('negociacoesView'));
        
        //Instanciando a classe Bind
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), 
            this._negociacoesView, 
            ['adiciona', 'esvazia']
            );
                     

        //Padrão de projeto ProxyFactory para atualizar a Mensagem quando inserido ou deletado uma nova negociação
        
        //Instanciando a classe MensagemView
        this._mensagemView = new MensagemView($('mensagemView'));
        
        //Instanciando a classe Bind
        this._mensagem = new Bind (
            new Mensagem(),
            this._mensagemView,
            ['texto']
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





