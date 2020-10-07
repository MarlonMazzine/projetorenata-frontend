import React from 'react'

var listaDeComprasDe2015Ate2020 = []

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

function obterComprasDe2015Ate2020(compras) {
    var dataRecebida

    for (var compra in compras) {
        dataRecebida = new Date(compras[compra].dtDeclaracaoDispensa)

        if (dataRecebida.getFullYear() >= '2015') {
            listaDeComprasDe2015Ate2020.push(compras[compra])
        }
    }
}

export default class Compras extends React.Component {
    async obterCompras(codigosDosMateriais) {
        const URL = process.env.REACT_APP_URL_API_COMPRAS + "/licitacoes/v1/licitacoes.json?item_material=" + codigosDosMateriais + "&order_by=data_publicacao"
        var tentarDeNovo = false

        do {
            await sleep(3000)
            tentarDeNovo = await fetch(
                process.env.REACT_APP_TRATAMENTO_CORS + URL
            ).then(async res => {
                if (res.status !== 200) {
                    return true
                } else {
                    const resposta = await res.json()
                    obterComprasDe2015Ate2020(resposta._embedded.licitacoes)
                    return false
                }
            }).catch(() => {
                return true
            })
        } while (tentarDeNovo)

        return listaDeComprasDe2015Ate2020
    }
}