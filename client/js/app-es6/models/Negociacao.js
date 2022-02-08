class Negociacao {
    
    constructor(banco, pais, data, variacao, bolsa, codigo, retorno, cota, valor, total) {
        this._banco = banco;
        this._pais = pais;
        this._data = new Date(data.getTime());
        this._variacao = variacao;
        this._bolsa = bolsa;
        this._codigo = codigo;
        this._retorno = retorno;  
        this._cota = cota;
        this._valor = valor;
        this._total = total;
        Object.freeze(this);
    }

    get banco() {        
        return this._banco;
    }

    get pais() {        
        return this._pais;
    }


    get data() {
        return new Date(this._data.getTime());
    }


    get variacao() {
        return this._variacao;
    }

    get bolsa() {
        return this._bolsa;
    }

    get codigo() {
        return this._codigo;
    }


    get retorno() {        
        return this._retorno;
    }

    get cota() {        
        return this._cota;
    }   

    get valor() {
        return this._valor;
    }

    get total() {
        return this._cota * this._valor;
    }       

}