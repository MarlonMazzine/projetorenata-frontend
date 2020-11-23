import React from 'react'
import Sleep from './Sleep'

export default class Fetch extends React.Component {
    async obterRespostaFetch(url, configuracoes) {
        await new Sleep().sleep(3000)
        return await fetch(
            url, configuracoes
        ).then(async resposta => {
            const statusDeResposta = resposta.status
            if (resposta.ok) {
                return resposta
            } else if (statusDeResposta === 429) {
                throw new Error('Aguarde um instante para continuar está ocorrendo erro de muitas requisições.')
            } else if (statusDeResposta === 404) {
                return statusDeResposta
            }
            
            return ''
        }).catch(erro => {
            const mensagemDoErro = erro.message

            if (mensagemDoErro.includes('Failed to fetch')) {
                return ''
            }
            
            throw new Error('Houve um erro inesperado. Detalhes do erro: ' + erro.message)
        })
    }
}