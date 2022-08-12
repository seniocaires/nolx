const axios = require('axios');
const cheerio = require('cheerio');

const buscarEstados = async (filtros = []) => {
  const url = 'https://www.olx.com.br/';

  const html = await axios
    .get(url)
    .then((response) => response.data)
    .catch((erro) => {
      console.error(`Erro ao buscar os estados. ${JSON.stringify(erro)}`);
      throw erro;
    });

  const $ = cheerio.load(html);
  const itens = $(`a[lurker='state_btn']`);
  let dados = [];
  for (const item of itens) {
    const itemObj = { link: item['attribs']['href'], descricao: item['attribs']['data-lurker_state'] };

    if (filtros.length == 0 || filtros.includes(itemObj.descricao)) {
      dados.push(itemObj);
    }
  }
  return dados;
};

module.exports = { buscarEstados };
