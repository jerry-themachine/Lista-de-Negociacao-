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
        
        //Criando uma instância de XMLHttprequest
        let xhr = new XMLHttpRequest();

        //Indicando qual o método utilizar e qual endereço acessar
        xhr.open('GET', 'negociacoes/semana');

        /*CONFIGURAÇÕES*/
        
       /*  
       //Estados de uma requisição AJAX

       0: requisição ainda não iniciada

        1: conexão com o servidor ainda não estabelecida

        2: requisição recebida

        3: processando requisição

        4: requisição concluída e a resposta está pronta
        */
        xhr.onreadystatechange = () => {

            if(xhr.readyState == 4){

                if(xhr.status == 200) {//Status code genérico, indivca que foi executado sem problema
                    console.log('Obtendo requisições do servidor');
                    //Retornando dados obtidos através dos servidor e convertendo objeto para string 
                    JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(objeto.ativo, new Date(objeto.data), objeto.quantidade, objeto.valor))                    
                    .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                    //this._mensagem.texto = 
                    console.log('Negociações da semana inseridas com sucesso');  
                    this._mensagem.texto = 'Negociação inserida com sucesso';
                                    
                    
                } else {
                    
                    //Retornando mensagem de erro do servidor
                    console.log(xhr.responseText);
                    this._mensagem.texto = 'Não foi possível obter as negociações da semana';
                }
            }
        };

        //Enviando
        xhr.send();
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





