'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpService = function () {
    function HttpService() {
        _classCallCheck(this, HttpService);
    }

    _createClass(HttpService, [{
        key: 'get',
        value: function get(url) {
            return new Promise(function (resolve, reject) {

                //Criando uma instância de XMLHttprequest
                var xhr = new XMLHttpRequest();

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
                xhr.onreadystatechange = function () {

                    if (xhr.readyState == 4) {

                        if (xhr.status == 200) {
                            //Status code genérico, indivca que foi executado sem problema

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
        }
    }, {
        key: 'post',
        value: function post(url, dado) {

            return new Promise(function (resolve, reject) {

                var xhr = new XMLHttpRequest();
                xhr.open('POST', url, true);
                xhr.setRequestHeader('Content-Type', 'application/jason');
                xhr.onreadystatechange = function () {

                    if (xhr.readyState == 4) {

                        if (xhr.status == 200) {
                            //Status code genérico, indivca que foi executado sem problema

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
        }
    }]);

    return HttpService;
}();
//# sourceMappingURL=HttpService.js.map