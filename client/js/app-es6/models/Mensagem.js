class Mensagem {

    constructor(texto = '') {//Adotanto valor em branco caso não houver texto na classe Mensagem
        
        this._texto = texto;
    }

    get texto() {

        return this._texto;
    }

    set texto(texto) {

        this._texto = texto;
    } 
    
}



