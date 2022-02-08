

class NegociacaoService {

    constructor() {

        this._http = new HttpService();
    }

    //Negociações da semana
    obterNegociacoesDaSemanaAtual() {

        return new Promise((resolve, reject) => {

            let atual = 'negociacoes/semana';   
            this._http
            .get(atual)
            .then((negociacoes) => {

                resolve(negociacoes
                .map(objeto => new Negociacao(objeto.banco, objeto.pais, new Date(objeto.data), objeto.variacao, objeto.bolsa, objeto.codigo, objeto.retorno, objeto.cota, objeto.valor)))
            })
                .catch((erro) => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana atual');
                });   
            
                     
            console.log('Negociações da semana atual inseridas com sucesso');  
                    
        });

    };
    

    //Negociações da semana anterior
    obterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {

    

            let anterior = 'negociacoes/anterior';
            this._http
            .get(anterior)
            .then((negociacoes) => {

                resolve(negociacoes
                .map(objeto => new Negociacao(objeto.banco, objeto.pais, new Date(objeto.data), objeto.variacao, objeto.bolsa, objeto.codigo, objeto.retorno, objeto.cota, objeto.valor)))
            })
                .catch((erro) => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior');
                });   
            
                    
            console.log('Negociações da semana anterior inseridas com sucesso');  
                      
          
        });
    };


    //Negociações da semana retrasada
    obterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {
            
            let retrasada = 'negociacoes/retrasada';
            this._http
            .get(retrasada)
            .then((negociacoes) => {

                resolve(negociacoes
                .map(objeto => new Negociacao(objeto.banco, objeto.pais, new Date(objeto.data), objeto.variacao, objeto.bolsa, objeto.codigo, objeto.retorno, objeto.cota, objeto.valor)))
            })
                .catch((erro) => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior');
                });   
            
                  
            console.log('Negociações da semana inseridas com sucesso');  
           
        });
    };
};

