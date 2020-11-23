import React from 'react'
import FetchGet from '../../classes/FetchGet'

export default class Itens extends React.Component {
    async obterItens(linkDoItem) {
        const URL = process.env.REACT_APP_URL_API_COMPRAS + linkDoItem
        var respostaDaRequisicao

        do {
            respostaDaRequisicao = await new FetchGet().obterRespostaFetchGetEmJson(URL)

            // await sleep(3000)
            // respostaDaRequisicao = await fetch(
            //     process.env.REACT_APP_TRATAMENTO_CORS + url
            // ).then(async res => {
            //     if (res.status === 502 || res.status === 503) {
            //         return res.status
            //     } else if (res.status !== 200) {
            //         return linkDoItem
            //     } else {
            //         return await res.json()
            //     }
            // }).catch(() => {
            //     return 502
            // })

            if (respostaDaRequisicao === 404) {
                return linkDoItem
            }
        } while (respostaDaRequisicao === '')//respostaDaRequisicao === 502 || respostaDaRequisicao === 503)

        return await respostaDaRequisicao
    }
}