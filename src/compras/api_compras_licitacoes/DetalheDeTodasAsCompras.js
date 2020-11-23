import React from 'react'
import FetchPost from '../../classes/FetchPost'
import Headers from '../../classes/Headers'
import FormBody from '../../classes/FormBody'

export default class DetalheDeTodasAsCompras extends React.Component {
    async obterDetalhesDeTodasAsCompras(numeroDaLicitacaoCompleto, codigoDoMaterial, numeroDosItens) {
        const URL = process.env.REACT_APP_TRATAMENTO_CORS + 'http://comprasnet.gov.br/Livre/Ata/ConsultaAta03.asp'
        const numeroDaLicitacao = numeroDaLicitacaoCompleto.slice(0, 17)
        const informacoes = {
            'CodigoMatServ': codigoDoMaterial.toString(),
            'NuLicitacao': numeroDaLicitacao,
            'NuItemMult': numeroDosItens
        }
        const formBody = new FormBody().obterFormBody(informacoes)
        const headers = new Headers().obterContentTypeHeaderFormUrlEncoded()
        var todasAsCompras = ''

        do {
            todasAsCompras = await new FetchPost().obterRespostaFetchPostEmTexto(URL, formBody, headers)
        } while (todasAsCompras === '')

        return new DOMParser().parseFromString(todasAsCompras, "text/html")
    }
}