import React from 'react'
import FetchGet from '../../classes/FetchGet'

export default class Uasg extends React.Component {
    async obterUasg(codigoUasg) {
        const URL = `${process.env.REACT_APP_TRATAMENTO_CORS}http://compras.dados.gov.br/licitacoes/id/uasg/${codigoUasg}.json`
        var tentarDeNovo = true
        var uasg

        do {
            uasg = await new FetchGet().obterRespostaFetchGetEmJson(URL)

            if (uasg !== "") {
                tentarDeNovo = false
            }
        } while (tentarDeNovo)

        return uasg
    }
}