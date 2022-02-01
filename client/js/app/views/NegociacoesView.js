class NegociacoesView extends View {

    constructor(elemento) {
        
        super(elemento);
    }

    template(model) {
        
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th style="text-align: center; vertical-align:middle">BANCO - RAZÃO SOCIAL</th>
                    <th style="text-align: center; vertical-align:middle">PAÍS</th>
                    <th style="text-align: center; vertical-align:middle; cursor: pointer" onclick="negociacaoController.ordena('data')"; cursor: "pointer">DATA<br>COMPRA</th>

                    <th style="text-align: center; vertical-align:middle; cursor: pointer" onclick="negociacaoController.ordena('variacao')">VARIAÇÂO<br>(%)</th>
                    <th style="text-align: center; vertical-align:middle">BOLSA</th> 
                    <th style="text-align: center; vertical-align:middle">CÒDIGO</th>   
                                    
                    <th style="text-align: center; vertical-align:middle; cursor: pointer" onclick="negociacaoController.ordena('retorno')">RETORNO<br>30 DIAS</th>
                    <th style="text-align: center; vertical-align:middle; cursor: pointer" onclick="negociacaoController.ordena('cota')">COTA</th>
                    <th style="text-align: center; vertical-align:middle; cursor: pointer" onclick="negociacaoController.ordena('valor')">VALOR <br> UNIT.</th>
                    <th style="text-align: center; vertical-align:middle; cursor: pointer" onclick="negociacaoController.ordena('total')">TOTAL <br> COMPRA</th>
                </tr>
            </thead>
            
            <tbody>

                ${model.negociacoes.map((n) => {

//Criando uma nova lista para que cada negociação criada, seja criado também uma "tr" com os dados da negociação percorrida pelo "map"
                    return `
                        <tr>
                            <td>${

                                (function () {

                                    //Convertendo primeiro caractére em maiúsculo
                                   let textToUper = n.banco.charAt(0).toUpperCase() + n.banco.slice(1);
                                                                   
                                    for (let i = 0; i < textToUper.length; i++) {
                                        if (textToUper.charAt(i) === " ") {
                                
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
                            <td>${
                                
                                (function () {

                                    //Convertendo primeiro caractére em maiúsculo
                                   let textToUper1 = n.pais.charAt(0).toUpperCase() + n.pais.slice(1);
                                                                   
                                    for (let i = 0; i < textToUper1.length; i++) {
                                        if (textToUper1.charAt(i) === " ") {
                                
                                            //Convertendo caractére após o espaço em maiúsculo
                                            let textConvert = textToUper1.charAt(i+1).toUpperCase();
                                
                                            //Inserindo texto antes do espaço na variável
                                            let textBegin = textToUper1.slice(0, (i+1));
                                
                                            //Inserindo texto depois do espaço na variável
                                            let textEndSpace = textToUper1.slice(i + 2);
                                
                                            //Concatenando todas as strings em apenas uma 
                                            textToUper1 = textBegin + textConvert + textEndSpace;
                                
                                        } 
                                    }
                                    return textToUper1;
                                })()                             
                                
                            }</td>
                            <td style="font-weight: bold ">${DateHelper.dataParaTexto(n.data)}</td>
                            <td>${n.variacao}</td>
                            <td style="text-align: center">${n.bolsa.toUpperCase()}</td>
                            <td style="text-align: center">${n.codigo.toUpperCase()}</td>
                            <td style="text-align: center">${n.retorno}</td>
                            <td style="text-align: center">${n.cota}</td>
                            <td>US$ ${n.valor}</td>
                            <td>US$ ${n.total.toFixed(3)}</td>
                        </tr>
                    `
//Transformando o array que contém strings em uma string gigante para ser inserido na interpolação do conteúdo do "tbody"
                }).join('')}
            </tbody>
            <tfoot>
            <th colspan="9">TOTAL INVESTIMENTO</th>
            <td>US$ ${model.volumeTotal}</td>
            </tfoot>
        </table>
        `;
    }
}

