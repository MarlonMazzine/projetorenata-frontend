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
        const url = "http://compras.dados.gov.br/compraSemLicitacao/v1/itens_compras_slicitacao.json?co_conjunto_materiais=" + codigosDosMateriais + "&order_by=dtDeclaracaoDispensa"
        var tentarDeNovo = false
        console.log('URL: ' + url)

        do {
            tentarDeNovo = await fetch(
                url
            ).then(async res => {
                if (res.status !== 200) {
                    console.log('Status code: ' + res.status)
                    await sleep(2000)
                    return true
                } else {
                    const resposta = await res.json()
                    console.log('Resposta: ' + resposta)
                    obterComprasDe2015Ate2020(resposta._embedded.compras)
                    return false
                }
            })
        } while (tentarDeNovo)

        return listaDeComprasDe2015Ate2020
    }
}