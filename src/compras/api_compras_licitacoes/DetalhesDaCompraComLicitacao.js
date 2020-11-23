import React from 'react'
import FetchPost from '../../classes/FetchPost'
import DetalheDeTodasAsCompras from './DetalheDeTodasAsCompras'
import Headers from '../../classes/Headers'
import FormBody from '../../classes/FormBody'

async function obterDetalhesDeTodasAsCompras(numeroDaLicitacaoCompleto, codigoDoMaterial, detalhesDaCompra) {
    const html = new DOMParser().parseFromString(detalhesDaCompra, 'text/html')
    var colunaNumeroDosItens = Array.from(html.querySelectorAll('form:nth-child(3) table:nth-child(18) tr td:nth-child(2)'))
    colunaNumeroDosItens.shift()
    var numerosDosItens = ''
    
    for (var coluna in colunaNumeroDosItens) {
        numerosDosItens += colunaNumeroDosItens[coluna].innerText
    }
    
    return await new DetalheDeTodasAsCompras()
        .obterDetalhesDeTodasAsCompras(numeroDaLicitacaoCompleto, codigoDoMaterial, numerosDosItens)
}

function obterFormBody(codigoDoMaterial, numeroDaLicitacao) {
    const body = {
        'CodigoMatServ': codigoDoMaterial.toString(),
        'NuLicitacao': numeroDaLicitacao
    }

    return new FormBody().obterFormBody(body)
}

export default class DetalhesDaCompraComLicitacao extends React.Component {
    async obterDetalhesDaCompraComLicitacao(numeroDaLicitacaoCompleto, codigoDoMaterial) {
        const URL = process.env.REACT_APP_TRATAMENTO_CORS + 'http://comprasnet.gov.br/Livre/Ata/ConsultaAta02.asp'
        const numeroDaLicitacao = numeroDaLicitacaoCompleto.slice(0, 17)
        const formBody = obterFormBody(codigoDoMaterial, numeroDaLicitacao)
        const header = new Headers().obterContentTypeHeaderFormUrlEncoded()
        var detalhesDaCompra
        
        do {
            detalhesDaCompra = await new FetchPost().obterRespostaFetchPostEmTexto(URL, formBody, header)
        } while (detalhesDaCompra === '')
        
        if (detalhesDaCompra.toLowerCase().includes('detalhar todos')) {
            return await obterDetalhesDeTodasAsCompras(numeroDaLicitacaoCompleto, codigoDoMaterial, detalhesDaCompra)
        }

        return new DOMParser().parseFromString(detalhesDaCompra, "text/html")
    }
}