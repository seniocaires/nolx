const axios = require('axios');
const cheerio = require('cheerio');

const buscarRegioes = async (url, filtros = []) => {
  const html = await axios
    .get(url)
    .then((response) => response.data)
    .catch((erro) => {
      console.error(`Erro ao buscar as regiões ${url}. ${JSON.stringify(erro)}`);
      throw erro;
    });

  const $ = cheerio.load(html);
  const itens = $(`a[data-lurker_region]`);
  let dados = [];
  for (const item of itens) {
    // console.log(item)
    const itemObj = { link: extrairLink(item), descricao: extrairDescricao(item) };
    if (filtros.length == 0 || filtros.includes(itemObj.descricao)) {
      dados.push(itemObj);
    }
  }
  return dados;
};

const extrairLink = (item) => {
  try {
    return item['attribs']['href'];
  } catch {
    return '';
  }
};

const extrairDescricao = (item) => {
  try {
    return item['children'][0]['data'];
  } catch {
    return '';
  }
};

module.exports = { buscarRegioes };
