class NegociacaoController{

    constructor() {

        //transformando "document.getElementById" em uma variável => "$", através de "bind" ele irá manter a associação com "document"
        let $ = document.getElementById.bind(document);
        
        this._inputData = $('data');
        this._inputQuantidade = $('quantidade');
        this._inputValor = $('valor');
    }
   
    adiciona(event){
        event.preventDefault();   

                             
        //Criando a negociação com base nos valores dos dados obtidos através do formulário
        let negociacao = new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );       
        
        this._listaNegociacoes.adiciona(negociacao);

        console.log(this._listaNegociacoes.negociacoes);
        
    }
};





