class NegociacaoController{

    constructor() {

        //transformando "document.getElementById" em uma variável => "$", através de "bind" ele irá manter a associação com "document"
        let $ = document.getElementById.bind(document);
                
        this._inputAtivo = $('ativo');
        this._inputData = $('data');
        this._inputQuantidade = $('quantidade');
        this._inputValor = $('valor');
        

        //??????? => Achar soluções para o código
        this._listaNegociacoes = new ListaNegociacoes(model => this._negociacoesView.update(model));

        this._negociacoesView = new NegociacoesView($('negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('mensagemView'));
        this._mensagemView.update(this._mensagem);
    }
   
    //Método para adicionar negociação 
    adiciona(event){
        event.preventDefault();       
        
        this._listaNegociacoes.adicionaInformacoesLista(this._criaNegociacao());
        
        this._mensagem.texto = 'Negociação inserida com sucesso';
        this._mensagemView.update(this._mensagem);
        
        this._limpaFormulario();

        console.log(this._listaNegociacoes.negociacoes);        
    }

    //Método para deletar lista de negociações
    deleta() {

        this._listaNegociacoes.criaListaVazia();        

        this._mensagem.texto = 'Negociações deletadas com sucesso';
        this._mensagemView.update(this._mensagem);

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

        this._inputData.focus(); 
    }
};





