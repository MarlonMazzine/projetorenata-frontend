import React from 'react'
import FetchPost from '../../../classes/FetchPost'
import Headers from '../../../classes/Headers'

export default class AtualizarComprasComLicitacao extends React.Component {
    async atualizarTabelaDeComprasComLicitacao(jsonDeComprasComLicitacao) {
        const URL = process.env.REACT_APP_URL_API + '/atualizartabeladecomprascomlicitacao'
        const header = new Headers().obterContentTypeHeaderJson()
        const resposta = await new FetchPost().obterRespostaFetchPostEmJson(URL, jsonDeComprasComLicitacao, header)
        
        if (resposta === 404 || resposta === '') {
            throw new Error(`Houve um erro ao atualizar as compras com licitação. Resposta: ${resposta}`)
        }
    }
}