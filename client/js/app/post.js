function sendPost(event) {

    event.preventDefault();

    console.log("Enviando post");

    let $ = document.getElementById.bind(document);

    inputBanco = $('banco');
    pais = $('pais');
    inputData = $('data');
    inputVariacao = $('variacao');
    inputBolsa = $('bolsa');
    inputCodigo = $('codigo');
    retorno = $('retorno');
    inputCota = $('cota');
    inputValor = $('valor');   

    let negociacao = {

        banco: inputBanco.value,
        pais: pais.value,
        data: DateHelper.textoParaData(inputData.value),
        variacao: inputVariacao.value,
        bolsa: inputBolsa.value,
        codigo: inputCodigo.value,
        retorno: retorno.value,
        cota: inputCota.value,
        valor: inputValor.value
        
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/negociacoes", true);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = () => {

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
                alert(`Não foi possível enviar a negociação: ${xhr.responseText}`);
            }
        }
    }
    xhr.send(JSON.stringify(negociacao));

}