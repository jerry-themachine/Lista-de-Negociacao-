class NegociacaoController{

    constructor() {

        //transformando "document.getElementById" em uma variável => "$", através de "bind" ele irá manter a associação com "document"
        let $ = document.getElementById.bind(document);
                
        this._inputAtivo = $('ativo');
        this._inputData = $('data');
        this._inputQuantidade = $('quantidade');
        this._inputValor = $('valor');
        
        /* let self = this;

        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {

            get(target, prop, receiver) {

                if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof (Function)){

                    return function() {

                        console.log(`Interceptando ${prop}`);  
                        Reflect.apply(target[prop], target, arguments);
                        self._negociacoesView.update(target);

                    }

               }

                return Reflect.get(target, prop, receiver);
            }
        });   */    

        //Padrão de projeto ProxyFactory para atualizar a ListaNegociacoes quando inserido ou deletado uma nova negociação       
        this._listaNegociacoes = ProxyFactory.create(new ListaNegociacoes(), ['adiciona', 'esvazia'], (model) => this._negociacoesView.update(model));

        this._negociacoesView = new NegociacoesView($('negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);

        //Padrão de projeto ProxyFactory para atualizar a Mensagem quando inserido ou deletado uma nova negociação
        this._mensagem = ProxyFactory.create(new Mensagem(), ['texto'], (model) => this._mensagemView.update(model));
        this._mensagemView = new MensagemView($('mensagemView'));
        this._mensagemView.update(this._mensagem);
        
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





