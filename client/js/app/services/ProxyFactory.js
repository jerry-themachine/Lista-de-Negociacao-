class ProxyFactory {

    static create(objeto, props, acao) {

        return new Proxy(objeto, {
            
            get(target, prop, receiver) {//Para lidar com métodos
                
                if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
                    
                    return function() {
                        
                         console.log(`interceptando ${prop}`);
                         Reflect.apply(target[prop], target, arguments);
                         return acao(target);
                    }
                }
                
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {//para lidar com propriedades

                if(props.includes(prop)) {
                    //target(prop) = value;
                    acao(target);
                }
                return Reflect.set(target, prop, value, receiver);
                acao(target);
            }
            
        });       

    }
    

    static _ehFuncao(func){

        return typeof(func) == typeof(Function);
    }
}