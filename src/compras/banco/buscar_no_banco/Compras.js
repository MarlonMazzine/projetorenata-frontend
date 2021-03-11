import React from 'react'
import FetchPost from '../../../classes/FetchPost'
import FetchGet from '../../../classes/FetchGet'

function obterComprasDoBanco(resposta) {
    if (resposta === '' || resposta === 404 || resposta === undefined) {
        throw new Error(`Não foi possível obter as compras do banco no momento. Resposta: ${resposta}`)
    } else if (resposta.rowCount === 0) {
        return 'Não há nenhuma compra cadastrada no banco.'
    }

    return resposta.rows
}

export default class Compras extends React.Component {
    async carregarCompras() {
        const URL = process.env.REACT_APP_URL_API + '/comprassemlicitacao'
        const resposta = await new FetchGet().obterRespostaFetchGetEmJson(URL)
        return obterComprasDoBanco(resposta)
    }

    async carregarComprasComCodigoDoMaterial(endpoint, codigoDoMaterial) {
        const headers = { 
            "Content-type": "application/json; charset=UTF-8"
        }

        const requestBody = JSON.stringify({
            codigocatmat: codigoDoMaterial
        })

        const URL = process.env.REACT_APP_URL_API + endpoint
        const resposta = await new FetchPost().obterRespostaFetchPostEmJson(URL, requestBody, headers)
        return obterComprasDoBanco(resposta)
    }
}