import React from 'react'

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

export default class Itens extends React.Component {
    async obterItens(linkDoItem) {
        const url = process.env.REACT_APP_URL_API_COMPRAS + linkDoItem
        var respostaDaRequisicao

        do {
            await sleep(3000)
            respostaDaRequisicao = await fetch(
                process.env.REACT_APP_TRATAMENTO_CORS + url
            ).then(async res => {
                if (res.status === 502 || res.status === 503) {
                    return res.status
                } else if (res.status !== 200) {
                    return linkDoItem
                } else {
                    const resposta = await res.json()
                    return resposta._embedded.compras
                }
            }).catch(() => {
                return 502
            })
        } while (respostaDaRequisicao === 502 || respostaDaRequisicao === 503)

        return await respostaDaRequisicao
    }
}