
//Associando os dados da classe ListaNegociacoes com a classe NegociacoesView, quando o método "adiciona()" e o método "esvazia()", ou a property "texto()" forem acessados
class Bind {

    constructor(model, view, ...props) {//['adiciona', 'esvazia'] => Retirado o sinal de array "[]" na classe NegociacaoController para uso do rest operator (...), com a mesma função do array

        //criando a variável proxy através da classe ProxyFactory
        let proxy = ProxyFactory.create(model, props, (model) => {
            view.update(model);
        });

        //Atualizando a "view" antes de retornar a variável proxy
        view.update(model);
        
        return proxy;
    } 
}