class DateHelper {

    constructor() {
        throw new Error('DateHelper não deve ser instanciada'); 
    }
    
    //Formatando a data no formato dia/mês/ano
    static dataParaTexto(data) {//método "static" é usado para estnaciar o método diretamente no objeto 

        return (`${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}`);
    }


    //Utilizando 'spread operator' para desmembrar o array (1º parâmetro - 2º parâmetro - 3º parâmetro => 2022 - 01 - 15)
    static textoParaData(texto) {//inserindo (-) com 'split'

        //Fazendo validação do formato da data através de expressões regulares
        if (!/\d{4}-\d{2}-\d{2}/.test(texto)){
            throw new Error ('A data deve seguir o formato aaaa-mm-dd')
        }

        return new Date(...texto.split('-').map((item, indice) => {//Percorrendo item e índice com 'map'

            if(indice == 1){
                return item - 1;//retornando o item '1 => mês' subtraindo 1
            }

            return item;//retornando o item '0 => ano' e '2 => dia'
        })    
    );
    }

}