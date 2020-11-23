import React from 'react'
import Fetch from './Fetch'

async function obterResposta(url) {
    const configuracoes = {
        method: 'GET'
    }

    const resposta = await new Fetch().obterRespostaFetch(url, configuracoes)
    return resposta
}

export default class FetchGet extends React.Component {
    async obterRespostaFetchGetEmTexto(url) {
        const resposta = await obterResposta(url)//new Fetch().obterRespostaFetch(url, _configuracoes)// this.obterRespostaFetchGet(url)
        
        if (resposta === '') {
            return resposta
        }
        
        return resposta.text()
    }
    
    async obterRespostaFetchGetEmJson(url) {
        debugger
        const resposta = await obterResposta(url)//new Fetch().obterRespostaFetch(url, _configuracoes)// this.obterRespostaFetchGet(url)
        
        if (resposta === '') {
            return resposta
        }
        
        return resposta.json()
    }
}