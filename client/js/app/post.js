'use strict';

function sendPost(event) {

    event.preventDefault();

    console.log("Enviando post");

    var $ = document.getElementById.bind(document);

    inputBanco = $('banco');
    inputPais = $('pais');
    inputData = $('data');
    inputVariacao = $('variacao');
    inputBolsa = $('bolsa');
    inputCodigo = $('codigo');
    inputRetorno = $('retorno');
    inputCota = $('cota');
    inputValor = $('valor');

    var negociacao = {

        banco: inputBanco.value,
        pais: inputPais.value,
        data: DateHelper.textoParaData(inputData.value),
        variacao: inputVariacao.value,
        bolsa: inputBolsa.value,
        codigo: inputCodigo.value,
        retorno: inputRetorno.value,
        cota: inputCota.value,
        valor: inputValor.value

    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/negociacoes", true);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4) {

            if (xhr.status == 200) {

                inputBanco.value = '';
                inputPaisvalue = '';
                inputData.value = '';
                inputVariacao.value = 0.000.toFixed(3);
                inputBolsa.value = '';
                inputCodigo.value = '';
                inputRetorno.value = 0.000.toFixed(3);
                inputCota.value = 1;
                inputValor.value = 0.000.toFixed(3);

                inputBanco.focus();

                alert('Negociação enviada com sucesso');
            } else {
                alert('N\xE3o foi poss\xEDvel enviar a negocia\xE7\xE3o: ' + xhr.responseText);
            }
        }
    };
    xhr.send(JSON.stringify(negociacao));
}
//# sourceMappingURL=post.js.map