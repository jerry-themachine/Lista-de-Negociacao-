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
                            <td>${n.ativo}</td>
                            <td>${DateHelper.dataParaTexto(n.data)}</td>
                            <td>${n.quantidade}</td>
                            <td>R$ ${n.valor}</td>
                            <td>R$ ${n.volume}</td>
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
                    
                    return total;
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

