import React from 'react'

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

export default class Uf extends React.Component {
    async obterNomeDaUf(codigoUasg) {
        const url = "http://compras.dados.gov.br/compraSemLicitacao/licitacoes/doc/uasg/" + codigoUasg + ".json"
        var respostaDaRequisicao

        do {
            respostaDaRequisicao = await fetch(
                process.env.REACT_APP_TRATAMENTO_CORS + url
            ).then(async res => {
                if (res.status === 502 || res.status === 503) {
                    await sleep(2000)
                    return res.status
                } else if (res.status !== 200) {
                    return codigoUasg
                } else {
                    const resposta = await res.json()
                    return resposta.sigla_uf.toUpperCase()
                }
            }).catch(erro => {
                return erro.message
            })
        } while (respostaDaRequisicao === 502 || respostaDaRequisicao === 503)

        return respostaDaRequisicao
    }
}