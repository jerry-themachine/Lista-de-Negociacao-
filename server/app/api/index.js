/* Código simplório, apenas para fornecer o serviço para a aplicação */
var api = {}

var dataAtual = new Date();
var dataAnterior = new Date();
dataAnterior.setDate(dataAtual.getDate() - 7);
var dateRetrasada = new Date();
dateRetrasada.setDate(dataAtual.getDate() - 14);

var negociacoes = [
      { ativo: 'Vivo', data : dataAtual, quantidade : 10, valor : 150},
      { ativo: 'Coca-Cola', data : dataAtual, quantidade : 242, valor : 250},
      { ativo: 'Sapataria Dig', data : dataAtual, quantidade : 3, valor : 3050},
      { ativo: 'Comeem seguros', data :dataAtual, quantidade : 100, valor : 4.50},
      { ativo: 'Soulan empreiteira', data : dataAtual, quantidade : 75, valor : 15.20},
      { ativo: 'Faka utensílios domésticos', data : dataAtual, quantidade : 3, valor : 650},
      { ativo: 'Hugo Bess', data : dataAtual, quantidade : 100, valor : 0.75},
      { ativo: 'Hornet create & inovation', data : dataAtual, quantidade : 200, valor : 9.50},
      { ativo: 'Ulhugf bermudas', data : dataAtual, quantidade :115, valor : 95.00},

      { ativo: 'Vivo', data : dataAnterior, quantidade : 90, valor : 3.50},
      { ativo: 'Coca-Cola', data : dataAnterior, quantidade : 55, valor : 25.00},
      { ativo: 'Sapataria Dig', data : dataAnterior, quantidade : 400, valor : 0.35},
      { ativo: 'Comeem seguros', data : dataAnterior, quantidade : 1, valor : 4500},
      { ativo: 'Soulan empreiteira', data : dataAnterior, quantidade : 128, valor : 23.50},
      { ativo: 'Faka utensílios domésticos', data : dataAnterior, quantidade : 70, valor : 65.0},
      { ativo: 'Hugo Bess', data : dataAnterior, quantidade : 25, valor : 150.00},
      { ativo: 'Hornet create & inovation', data : dataAnterior, quantidade : 2, valor : 950.00},
      { ativo: 'Ulhugf bermudas', data : dataAnterior, quantidade : 13, valor : 855.20},

      { ativo: 'Vivo', data : dateRetrasada, quantidade : 1, valor : 3750.00},
      { ativo: 'Coca-Cola', data : dateRetrasada, quantidade : 35, valor : 95.10},
      { ativo: 'Sapataria Dig', data : dateRetrasada, quantidade : 30, valor : 35.0},
      { ativo: 'Comeem seguros', data : dateRetrasada, quantidade : 1000, valor : 0.45},
      { ativo: 'Soulan empreiteira', data : dateRetrasada, quantidade : 420, valor : 5.50},
      { ativo: 'Faka utensílios domésticos', data : dateRetrasada, quantidade : 45, valor : 16.35},
      { ativo: 'Hugo Bess', data : dateRetrasada, quantidade : 450, valor : 0.75},
      { ativo: 'Hornet create & inovation', data : dateRetrasada, quantidade : 12, valor : 250.15},
      { ativo: 'Ulhugf bermudas', data : dateRetrasada, quantidade : 65, valor : 9.50}
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