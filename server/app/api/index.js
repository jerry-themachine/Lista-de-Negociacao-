/* Código simplório, apenas para fornecer o serviço para a aplicação */
var api = {}

var dataAtual = new Date();
var dataAnterior = new Date();
dataAnterior.setDate(dataAtual.getDate() - 7);
var dateRetrasada = new Date();
dateRetrasada.setDate(dataAtual.getDate() - 14);

var negociacoes = [
      { banco: "Bank Bilbao Vizcaya Argent. SA", pais: "Espanha", data: dataAtual, variacao: -2.400, bolsa: "NYSE", codigo: "BBVA", retorno: -7.05, cota: 15, valor: 31.672},
      { banco: "Toronto Dominion Bank", pais: "Canadá", data: dataAtual, variacao: -7.779, bolsa: "NYSE", codigo: "TD", retorno: -7.27, cota: 10, valor: 99.189},
      { banco: "Bradesco", pais: "Brasil", data: dataAtual, variacao: -7.028, bolsa: "BOVESPA", codigo: "BBDC4", retorno: -7.80, cota: 15, valor: 83.337},
      { banco: "HSBC Holdings PLC", pais: "Inglaterra", data:dataAtual,  variacao: -17.347, bolsa: "NYSE", codigo: "HSBC", retorno: -9.35, cota: 5, valor: 146.191},
      { banco: "JP Morgan Chase & CO", pais: "USA", data: dataAtual, variacao: -19.633, bolsa: "NYSE", codigo: "JPM", retorno: -5.29, cota: 5, valor: 31.276},
      { banco: "Northen Trust Corp", pais: "USA", data: dataAtual, variacao: -2.526, bolsa: "NASDAQ", codigo: "NTRS", retorno: -10.28, cota: 25, valor: 19.117},
      { banco: "UBS Group AG", pais: "Suiça", data: dataAtual, variacao: -2.199, bolsa: "NYSE", codigo: "UBS", retorno: -5.10, cota: 20, valor: 40.899},
      { banco: "Royal Bank Of Canada", pais: "Canadá", data: dataAtual, variacao: -5.973, bolsa: "NYSE", codigo: "RY", retorno: -5.26, cota: 15, valor: 107.605},
      { banco: "Fifth Third Bancorp", pais: "USA", data: dataAtual, variacao: -2.367, bolsa: "NASDAQ", codigo: "FITB", retorno: -10.91, cota: 5, valor: 205.192},



      { banco: "Bank Bilbao Vizcaya Argent. SA", pais: "Espanha", data: dataAnterior, variacao: -3.121, bolsa: "NYSE", codigo: "BBVA", retorno: -5.937, cota: 5, valor : 43.517},
      { banco: "Toronto Dominion Bank", pais: "Canadá", data: dataAnterior, variacao: -6.509, bolsa: "NYSE", codigo: "TD", retorno: -6.383, cota: 5, valor : 105.239},
      { banco: "Bradesco", pais: "Brasil", data: dataAnterior, variacao: -7.132, bolsa: "BOVESPA", codigo: "BBDC4", retorno: -7.693, cota: 20, valor : 77.395},
      { banco: "HSBC Holdings PLC", pais: "Inglaterra", data: dataAnterior, variacao: -13.098, bolsa: "NYSE", codigo: "HSBC", retorno: -7.29, cota: 10, valor : 125.357},
      { banco: "JP Morgan Chase & CO", pais: "USA", data: dataAnterior, variacao: -15.841, bolsa: "NYSE", codigo: "JPM", retorno: -7.96, cota: 10, valor : 23.253},
      { banco: "Northen Trust Corp", pais: "USA", data: dataAnterior, variacao: -3.627, bolsa: "NASDAQ", codigo: "NTRS", retorno: -12.529, cota: 15, valor : 45.803},
      { banco: "UBS Group AG", pais: "Suiça", data: dataAnterior, variacao: -2.753, bolsa: "NYSE", codigo: "UBS", retorno: -5.63, cota: 25, valor : 15.741},
      { banco: "Royal Bank Of Canada", pais: "Canadá", data: dataAnterior, variacao: -4.925, bolsa: "NYSE", codigo: "RY", retorno: -4.52, cota: 20, valor : 123.507},
      { banco: "Fifth Third Bancorp", pais: "USA", data: dataAnterior, variacao: -2.970, bolsa: "NASDAQ", codigo: "FITB", retorno: -9.375, cota: 5, valor : 196.373},

      { banco: "Bank Bilbao Vizcaya Argent. SA", pais: "Espanha", data: dateRetrasada, variacao: -4.572, bolsa: "NYSE", codigo: "BBVA", retorno: -7.38, cota:  5, valor : 47.893},
      { banco: "Toronto Dominion Bank", pais: "Canadá", data: dateRetrasada, variacao: -5.021, bolsa: "NYSE", codigo: "TD", retorno: -3.21, cota:  35, valor : 77.196},
      { banco: "Bradesco", pais: "Brasil", data: dateRetrasada, variacao: -9.261, bolsa: "BOVESPA" ,codigo: "BBCD4", retorno: -9.331, cota:  30, valor : 89.391},
      { banco: "HSBC Holdings PLC", pais: "Inglaterra", data: dateRetrasada, variacao: -11.539, bolsa: "NYSE", codigo: "HSBC", retorno: -9.374, cota: 20, valor : 107.403},
      { banco: "JP Morgan Chase & CO", pais: "USA", data: dateRetrasada, variacao: -10.073, bolsa: "NYSE", codigo: "JPM", retorno: -22.902, cota:  20, valor : 33.194},
      { banco: "Northen Trust Corp", pais: "USA", data: dateRetrasada, variacao: -6.402, bolsa: "NASDAQ", codigo: "NTRS", retorno: -16.991, cota:  45, valor : 32.313},
      { banco: "UBS Group AG", pais: "Suiça", data: dateRetrasada, variacao: -4.103, bolsa: "NYSE", codigo: "UBS", retorno: -8.339, cota:  20, valor : 11.783},
      { banco: "Royal Bank Of Canada", pais: "Canadá", data: dateRetrasada, variacao:-4.219 , bolsa: "NYSE", codigo: "RY", retorno: -4.13, cota:  30, valor : 119.135},
      { banco: "Fifth Third Bancorp", pais: "USA", data: dateRetrasada, variacao: -4.113, bolsa: "NASDAQ", codigo: "FITB", retorno: -14.725, cota:  10, valor : 183.561}
    ];


api.listaSemana = function(req, res) {
    var negociacoesAtuais = negociacoes.filter(function(negociacao) {
        return negociacao.data > dataAnterior;
    });
    res.json(negociacoesAtuais);
};

api.listaAnterior = function(req, res) {
   
   var negociacoesAnteriores = negociacoes.filter(function(negociacao) {
        return negociacao.data < dataAtual && negociacao.data > dateRetrasada;
    });
	setTimeout(function() {
		res.json(negociacoesAnteriores);	
	}, 500);
    
};

api.listaRetrasada = function(req, res) {

   var negociacoesRtrasadas = negociacoes.filter(function(negociacao) {
        return negociacao.data < dataAnterior;
    });
    res.json(negociacoesRtrasadas);
    
};

api.cadastraNegociacao = function(req, res) {

   console.log(req.body);
   req.body.data = new Date(req.body.data.replace(/-/g,'/'));
   negociacoes.push(req.body);
   res.status(200).json("Negociação recebida");
};



module.exports = api;