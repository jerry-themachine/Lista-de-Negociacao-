class HttpService {

    get(url) {
        return new Promise((resolve, reject) => {

            //Criando uma instância de XMLHttprequest
            let xhr = new XMLHttpRequest();                
    
    
            //Indicando qual o método utilizar e qual endereço acessar
            xhr.open('GET', url);
    
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
        
                if(xhr.readyState == 4) {
        
                    if(xhr.status == 200) {//Status code genérico, indivca que foi executado sem problema
                        
                        //Retornando dados obtidos através dos servidor e convertendo objeto para string 
                        resolve(JSON.parse(xhr.responseText));                              
                                                                                     
                    } else {
                        
                        //Retornando mensagem de erro do servidor                       
                        reject(xhr.responseText);
                    };
                };
            };
        
            //Enviando requisição para o servidor
            xhr.send();

        });
    };

    post(url, dado) {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/jason');
            xhr.onreadystatechange = () => {

                if(xhr.readyState == 4) {
        
                    if(xhr.status == 200) {//Status code genérico, indivca que foi executado sem problema
                        
                        //Retornando dados obtidos através dos servidor e convertendo objeto para string 
                        resolve(JSON.parse(xhr.responseText));                              
                                                                                     
                    } else {
                        
                        //Retornando mensagem de erro do servidor                       
                        reject(xhr.responseText);
                    };
                };
            };

            //Convertendo um objeto em uma string no formato JSON através de JSON.stringify().
            xhr.send(JASON.stringify(dado));
        });
    };
}