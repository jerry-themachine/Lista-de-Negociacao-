class NegociacaoDao {

    constructor(connection) {
        
        this._connection = connection;
        this._store = 'negociacoes';
    };

    adiciona(negociacao) {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)               
                .add(negociacao);

                request.onsuccess = e => {

                    console.log('Negociação inserida com sucesso');
                    resolve();                    
                };
        
                request.onerror = e => {
        
                    console.log(e.target.error);
                    reject('Não foi possível inserir a negociação');
                };

        });
    };

    listaTodos() {

        return new Promise((resolve, reject) => {

            let cursor = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).openCursor();

            let negociacoes = [];

            cursor.onsuccess = e => {

                let atual = e.target.result;

                if(atual) {

                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._banco, dado._pais, dado._data, dado._variacao, dado._bolsa, dado._codigo, dado._retorno, dado._cota, dado._valor));

                    atual.continue();

                } else {

                    resolve(negociacoes);
                };
            };

            cursor.onerror = e => {

                console.log(e.target.error.name);
                reject('Não foi possível listar as negociações');
            }; 
        });
    };

    apagaTodos() {

        return new Promise((resolve, reject) => {

            let request = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).clear();

            request.onsuccess = ((e) => {
                resolve('Negociações deletadas com sucesso');                
            });

            request.onerror = ((e) => {
                console.log(e.target.error);
                reject('Não foi possível deletar as negociações')
            });
        })
    }


    
};