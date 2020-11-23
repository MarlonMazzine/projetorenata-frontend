import React from 'react'
import FetchGet from '../../classes/FetchGet'

export default class UnidadeDeFornecimento extends React.Component {
    async obterUnidadeDeFornecimento(numeroDaLicitacao, numeroDoItemDaLicitacao) {
        const URL = `${process.env.REACT_APP_TRATAMENTO_CORS}http://compras.dados.gov.br/licitacoes/id/licitacao/${numeroDaLicitacao}/itens/${numeroDoItemDaLicitacao}.json`
        var resposta

        do {
            resposta = await new FetchGet().obterRespostaFetchGetEmJson(URL)

            if (resposta !== '') {
                return resposta.unidade.toUpperCase().trim()
            }
        } while (resposta === '')
    }
}