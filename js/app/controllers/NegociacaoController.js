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

          
        let data = DateHelper.textoParaData(this._inputData.value);
                
        //Criando a negociação com base nos valores dos dados obtidos através do formulário
        let negociacao = new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        );       
        
        
    }
};





