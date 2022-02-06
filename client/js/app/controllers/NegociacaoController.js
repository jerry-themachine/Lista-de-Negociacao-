class NegociacaoController{

    constructor() {        

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

         //Instanciando a classe Bind
         this._mensagem2 = new Bind (      // => (model, view, props)
         new Mensagem(), // => (model)
         
         //Instanciando a classe MensagemView
         new MensagemView($('mensagemView2')), // => (view)
         //['texto'] => Retirado o sinal de array "[]" para uso do rest operator(...) na classe Bind

         'texto' // => (props)
     );

        //Com a página carregada não existirá critério, só existirá quando o usuário clicar nas colunas
        this._ordemAtual = '';

        ConnectionFactory
            .getConnection()
            .then((connection) => {
            return new NegociacaoDao(connection)
            })
            .then((dao) => {
            return dao.listaTodos()
            })
            .then((negociacoes) => {
                return negociacoes.forEach((negociacao) => 
                    this._listaNegociacoes.adiciona(negociacao))
            })
            .catch(erro => {
                console.log(erro)
                this._mensagem.texto = error
            });


        //Método para o usuário atualizar as importações através do botão "Atulizar Lista"   
        
        let hh = 0;
        let mm = 0;
        let ss = 0;
        let th = '';
        let tm = '';
        let ts = '';      


        setInterval(() => { 

            this.importaNegociacoes();
            this._mensagem2.texto = timer();                    
                            
        }, 1000);  
        
        

        function timer() {

            //MensagemView2 com informações em hora/min/seg sobre a útlima atualização executada 
            if(ss <= 60){
                ts = 'segundos';                
            }else if(ss == 0){
                ts = '';
            }

            if((mm >= 1) && (mm <= 60)){
                ts = '';
                tm = 'minutos';                    
            }

            if((hh == 1)){
                tm = '';
                ts = '';
                th = 'hora';                       
            } else if(hh >= 2){                        
                tm = '';
                ts = '';
                th = 'horas'
            }


            //cronômetro
            ss++;
            if(ss == 60) {
                ss = 0;
                mm++;
                if(mm == 60){
                    mm = 0;
                    hh++;                   

                }
            }
           
            
            let format = `Lista de negociações atualizada há ${hh < 10 ? '0' + hh:hh}:${mm < 10 ? '0' + mm:mm}:${ss < 10 ? '0' + ss:ss} ${ts}${tm}${th}`;
            return format;
        }                                    
    };
    
    //Método para adicionar negociação 
    adiciona(event){

        event.preventDefault();      

        ConnectionFactory.getConnection().then(connection => {

            let negociacao = this._criaNegociacao();

            new NegociacaoDao(connection).adiciona(negociacao).then(() => {
                    this._listaNegociacoes.adiciona(negociacao);
                    this._mensagem.texto = 'Negociação inserida com sucesso';
                    this._limpaFormulario();

                })
        }).catch(erro => this._mensagem.texto = erro);   
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

            return negociacoes.filter((negociacao) => {

                return !this._listaNegociacoes.negociacoes.some((negociacaoExistente) => {

                    return JSON.stringfy(negociacao) == JSON.stringify(negociacaoExistente)
                })
            })
        })
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

        ConnectionFactory
        .getConnection()
        .then((connection) => {
            return new NegociacaoDao(connection);
        })
        .then((dao) => {
            return dao.apagaTodos();
        })
        .then((mensagem) => {
            this._mensagem.texto = mensagem;
            this._listaNegociacoes.esvazia();
        });


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
            parseFloat(this._inputVariacao.value),
            this._inputBolsa.value,
            this._inputCodigo.value,
            parseFloat(this._inputRetorno.value),
            parseInt(this._inputCota.value),
            parseFloat(this._inputValor.value));
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





