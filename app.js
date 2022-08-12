const estadoScrapper = require('./app/scrappers/estadoScrapper');
const regiaoScrapper = require('./app/scrappers/regiaoScrapper');

estadoScrapper.buscarEstados(['mg']).then((estados) => {
  for (let estado of estados) {
    regiaoScrapper.buscarRegioes(estado.link, []).then((regioes) => {
      if (regioes.length == 0) {
        regioes.push(estado);
      }
      console.log('***************');
      console.log('', estado);

      console.log('  ', regioes);
    });
  }
});
