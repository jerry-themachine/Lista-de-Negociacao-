class NegociacaoController{

    constructor() {

        //transformando "document.getElementById" em uma variável => "$", através de "bind" ele irá manter a associação com "document"
        let $ = document.getElementById.bind(document);
        let cap =
        
        this._inputAtivo = $('ativo');
        this._inputData = $('data');
        this._inputQuantidade = $('quantidade');
        this._inputValor = $('valor');
        this._listaNegociacoes = new ListaNegociacoes();
        this._negociacoesView = new NegociacoesView($('negociacoesView'));

        this._negociacoesView.update(this._listaNegociacoes);
    }
   
    //Método para adicionar negociação 
    adiciona(event){
        event.preventDefault();       
        
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._negociacoesView.update(this._listaNegociacoes);   
        this._limpaFormulario();

        console.log(this._listaNegociacoes.negociacoes);        
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





