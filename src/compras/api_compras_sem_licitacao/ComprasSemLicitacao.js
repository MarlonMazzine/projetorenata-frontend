import React from 'react'
import FetchGet from '../../classes/FetchGet'

function obterComprasDe2015Ate2020(compras) {
    var listaDeComprasDe2015Ate2020 = []
    var dataRecebida

    for (var compra in compras) {
        dataRecebida = new Date(compras[compra].dtDeclaracaoDispensa)

        if (dataRecebida.getFullYear() >= '2015') {
            listaDeComprasDe2015Ate2020.push(compras[compra])
        }
    }

    return listaDeComprasDe2015Ate2020
}

export default class ComprasSemLicitacao extends React.Component {
    async obterComprasSemLicitacao(codigosDosMateriais) {
        const URL = `${process.env.REACT_APP_TRATAMENTO_CORS}${process.env.REACT_APP_URL_API_COMPRAS}/compraSemLicitacao/v1/itens_compras_slicitacao.json?co_conjunto_materiais=${codigosDosMateriais}&order_by=dtDeclaracaoDispensa`
        var compras
        
        do {
            compras = await new FetchGet().obterRespostaFetchGetEmJson(URL)
        } while (compras === '')

        return obterComprasDe2015Ate2020(compras._embedded.compras)
    }
}