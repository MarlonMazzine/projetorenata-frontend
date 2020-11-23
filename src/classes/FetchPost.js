import React from 'react'
import Fetch from './Fetch'

async function obterResposta(url, body, header) {
    const configuracoes = {
        method: "POST",
        headers: header,
        body: body
    }

    const resposta = await new Fetch().obterRespostaFetch(url, configuracoes)
    return resposta
}

export default class FetchPost extends React.Component {
    async obterRespostaFetchPostEmTexto(url, body, header) {
        const resposta = await obterResposta(url, body, header)

        if (resposta === '' || resposta === 404) {
            return resposta
        }
        
        return resposta.text()
    }
    
    async obterRespostaFetchPostEmJson(url, body, header) {
        const resposta = await obterResposta(url, body, header)
        
        if (resposta === '' || resposta === 404) {
            return resposta
        }

        return resposta.json()
    }
}