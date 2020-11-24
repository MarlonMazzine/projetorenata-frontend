import React from 'react'
import FetchGet from '../../classes/FetchGet'

export default class Itens extends React.Component {
    async obterItens(linkDoItem) {
        const URL = process.env.REACT_APP_TRATAMENTO_CORS + process.env.REACT_APP_URL_API_COMPRAS + linkDoItem
        var respostaDaRequisicao
        const tentativasMaximas = 20
        var tentativas = 0

        do {
            respostaDaRequisicao = await new FetchGet().obterRespostaFetchGetEmJson(URL)

            if (respostaDaRequisicao === 404) {
                return linkDoItem
            }

            if (respostaDaRequisicao === '') {
                tentativas++
            } else {
                break;
            }
        } while (tentativas < tentativasMaximas)

        if (tentativas === tentativasMaximas) {
            throw new Error('Não foi possível obter os itens da compra atual no momento. Aguarde um instante para atualizar novamente.')
        }

        return await respostaDaRequisicao._embedded.compras
    }
}