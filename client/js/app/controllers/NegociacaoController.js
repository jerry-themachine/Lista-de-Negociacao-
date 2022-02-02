class NegociacaoController{

    constructor() {

        //Com a página carregada não existirá critério, só existirá quando o usuário clicar nas colunas
        this._ordemAtual = '';

        //transformando "document.getElementById" em uma variável => "$", através de "bind" ele irá manter a associação com "document"
        let $ = document.getElementById.bind(document);
          
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
        this._listaNegociacoes = new Bind(      // => (model, view, props)
            new ListaNegociacoes(), // => (model)
            
            //Instanciando  a classe NegociacoesView
            new NegociacoesView($('negociacoesView')), // => (view)
            //['adiciona', 'esvazia'] => Retirado o sinal de array "[]" para uso do rest operator(...) na classe Bind
            
            'adiciona', 'esvazia', 'ordena', 'inverte' // => (props)
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
                   
    };
   
    //Método para adicionar negociação 
    adiciona(event){

        event.preventDefault();      
        
        //Tratando erros
        try {

            this._listaNegociacoes.adiciona(this._criaNegociacao());
            
            this._mensagem.texto = 'Negociação inserida com sucesso';
            //this._mensagemView.update(this._mensagem);//Foi para o ProxyFactory
            
            this._limpaFormulario();

            console.log(this._listaNegociacoes.negociacoes);

        } catch(erro) {

            this._mensagem.texto = erro;
        };
    };

    //Método para importar negociações 
    importaNegociacoes() {
        
        let service = new NegociacaoService();

        let promiseSemanaAtual = service.obterNegociacoesDaSemanaAtual();
        let promiseSemanaAnterior = service.obterNegociacoesDaSemanaAnterior();
        let promiseSemanaRetrasada = service.obterNegociacoesDaSemanaRetrasada();

        //Resolvendo as promises na ordem especificada
        Promise.all([
            promiseSemanaAtual, 
            promiseSemanaAnterior, 
            promiseSemanaRetrasada]
            )
        .then((negociacoes) => {            
            negociacoes
            .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
            .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso'; 
        })
        .catch((erro) => {
            this._mensagem.text = erro;
        });
                                                                           
    };

    //Método para deletar lista de negociações
    apaga() {

        this._listaNegociacoes.esvazia();        

        this._mensagem.texto = 'Negociações deletadas com sucesso';
        //this._mensagemView.update(this._mensagem);//Foi para o ProxyFactory

    };

    //Método para criar negociação com base nos valores dos dados obtidos através do formulário
    _criaNegociacao() {

        return new Negociacao(
            this._inputBanco.value,
            this._inputPais.value,
            DateHelper.textoParaData(this._inputData.value),
            this._inputVariacao.value,
            this._inputBolsa.value,
            this._inputCodigo.value,
            this._inputRetorno.value,
            this._inputCota.value,
            this._inputValor.value);
    };

    //Método para limpeza do formulário preenchido e após ser submetido
    _limpaFormulario() {

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
    };
    
    //Método para ordenar a lista de negociações, renderizando-a através da interação do usuário com cliques
    ordena(coluna) {

        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverte();
        }else {
            this._listaNegociacoes.ordena((a,b) => a[coluna] - b[coluna]);
        };

        this._ordemAtual = coluna;
        
    };
   
};





