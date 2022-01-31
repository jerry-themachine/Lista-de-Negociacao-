

class NegociacaoService {


    //Negociações da semana
    obterNegociacoesDaSemanaAtual(cb) {

        //Criando uma instância de XMLHttprequest
        let xhr = new XMLHttpRequest();
        let atual = 'negociacoes/semana';
        let semanaAnterior = 'negociacoes/anterior';
        let semanaRetrasada = 'negociacoes/retrasada';


        //Indicando qual o método utilizar e qual endereço acessar
        xhr.open('GET', atual);

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
                cb(null, JSON.parse(xhr.responseText)
                .map(objeto => new Negociacao(objeto.banco, objeto.pais, new Date(objeto.data), objeto.variacao, objeto.bolsa, objeto.codigo, objeto.retorno, objeto.cota, objeto.valor)));                 
                
                console.log('Negociações da semana inseridas com sucesso');  
                                
            } else {
                
                //Retornando mensagem de erro do servidor
                console.log(xhr.responseText);
                cb('Não foi possível obter as negociações da semana atual', null);
            }
        }
    };

    //Enviando requisição para o servidor
    xhr.send();
    }

    //Negociações da semana anterior
    obterNegociacoesDaSemanaAnterior(cb) {

        //Criando uma instância de XMLHttprequest
        let xhr = new XMLHttpRequest();        
        let semanaAnterior = 'negociacoes/anterior';        


        //Indicando qual o método utilizar e qual endereço acessar
        xhr.open('GET', semanaAnterior);

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
                cb(null, JSON.parse(xhr.responseText)
                .map(objeto => new Negociacao(objeto.banco, objeto.pais, new Date(objeto.data), objeto.variacao, objeto.bolsa, objeto.codigo, objeto.retorno, objeto.cota, objeto.valor)));                 
               
                console.log('Negociações da semana inseridas com sucesso');  
                              
            } else {
                
                //Retornando mensagem de erro do servidor
                console.log(xhr.responseText);
                cb('Não foi possível obter as negociações da semana anterior', null);
            }
        }
    };

    //Enviando requisição para o servidor
    xhr.send();
    }

    //Negociações da semana retrasada
    obterNegociacoesDaSemanaRetrasada(cb) {

        //Criando uma instância de XMLHttprequest
        let xhr = new XMLHttpRequest();       
        let semanaRetrasada = 'negociacoes/retrasada';


        //Indicando qual o método utilizar e qual endereço acessar
        xhr.open('GET', semanaRetrasada);

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
                cb(null, JSON.parse(xhr.responseText)
                .map(objeto => new Negociacao(objeto.banco, objeto.pais, new Date(objeto.data), objeto.variacao, objeto.bolsa, objeto.codigo, objeto.retorno, objeto.cota, objeto.valor)));                 
               
                console.log('Negociações da semana inseridas com sucesso');  
                              
            } else {
                
                //Retornando mensagem de erro do servidor
                console.log(xhr.responseText);
                cb('Não foi possível obter as negociações da semana retrasada', null);
            }
        }
    };

    //Enviando requisição para o servidor
    xhr.send();
    }
}

