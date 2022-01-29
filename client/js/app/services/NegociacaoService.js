

class NegociacaoService {

    obterNegociacoesDaSemana(cb) {

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
                    cb(null, JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(objeto.ativo, new Date(objeto.data), objeto.quantidade, objeto.valor)));                 
                   
                    console.log('Negociações da semana inseridas com sucesso');  
                    
                                    
                    
                } else {
                    
                    //Retornando mensagem de erro do servidor
                    console.log(xhr.responseText);
                    cb('Não foi possível obter as negociações da semana', null);
                }
            }
        };

        //Enviando
        xhr.send();
    }
}