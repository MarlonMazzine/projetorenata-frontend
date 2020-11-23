import React from 'react'
import FetchGet from '../../classes/FetchGet'

export default class Itens extends React.Component {
    async obterItens(linkDoItem) {
        const URL = process.env.REACT_APP_TRATAMENTO_CORS + process.env.REACT_APP_URL_API_COMPRAS + linkDoItem
        var respostaDaRequisicao

        do {
            respostaDaRequisicao = await new FetchGet().obterRespostaFetchGetEmJson(URL)

            if (respostaDaRequisicao === 404) {
                return linkDoItem
            }
        } while (respostaDaRequisicao === '')

        return await respostaDaRequisicao._embedded.compras
    }
}