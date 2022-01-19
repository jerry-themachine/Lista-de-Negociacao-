class NegociacoesView {

    constructor(elemento) {
        this._elemento = elemento;
    }

    _template(model) {
        
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>CÓDIGO DO ATIVO</th>
                    <th>DATA NEGOCIAÇÃO</th>
                    <th>QUANTIDADE DE ATIVOS</th>
                    <th>PREÇO DO ATIVO</th>
                    <th>VOLUME INVESTIMENTO</th>
                </tr>
            </thead>
            
            <tbody>

                ${model.negociacoes.map((n) => {

//Criando uma nova lista que para cada negociação criada, seja criado também uma "tr" com os dados da negociação percorrida pelo "map"
                    return `
                        <tr>
                            <td>${

                                (function () {

                                    //Convertendo primeiro caractére em maiúsculo
                                   let textToUper = n.ativo.charAt(0).toUpperCase() + n.ativo.slice(1);
                                
                                    for (let i = 0; i < textToUper.length; i++) {
                                        if (textToUper.charAt(i) ===" ") {
                                
                                            //Convertendo caractére após o espaço em maiúsculo
                                            let textConvert = textToUper.charAt(i+1).toUpperCase();
                                
                                            //Inserindo texto antes do espaço na variável
                                            let textBegin = textToUper.slice(0, (i+1));
                                
                                            //Inserindo texto depois do espaço na variável
                                            let textEndSpace = textToUper.slice(i + 2);
                                
                                            //Concatenando todas as strings em apenas uma 
                                            textToUper = textBegin + textConvert + textEndSpace;
                                
                                        } 
                                    }
                                    return textToUper;
                                })()                             
                                                                                   
                            }</td>
                            <td>${DateHelper.dataParaTexto(n.data)}</td>
                            <td>${n.quantidade}</td>
                            <td>R$ ${n.valor}</td>
                            <td>R$ ${n.volume.toFixed(2)}</td>
                        </tr>
                    `
//Transformando o array que contém strings em uma string gigante para ser inserido na interpolação do conteúdo do "tbody"
                }).join('')}
            </tbody>
            <tfoot>
            <th colspan="4">TOTAL INVESTIMENTO</th>
            <td>R$ ${
                
                (function() {
                    let total = 0;
                    model.negociacoes.forEach(n => total += n.volume);
                    
                    return total.toFixed(2);
                })()
            }</td>
            </tfoot>
        </table>
        `;
    }

    update(model) {

        this._elemento.innerHTML = this._template(model);
    }
}

