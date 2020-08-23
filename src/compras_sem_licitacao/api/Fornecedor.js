import React from 'react'

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

export default class Fornecedor extends React.Component {
    async obterNomeDoFornecedor(fornecedor) {
        if (fornecedor === undefined) {
            return "ESTRANGEIRO"
        }
        
        const linkDoFornecedor = fornecedor.href
        const cpfCnpj = 'CPF / CNPJ: ' + linkDoFornecedor.replace(/\D/g, '')
        var respostaDaRequisicao

        do {
            respostaDaRequisicao = await fetch(
                "http://compras.dados.gov.br/compraSemLicitacao/" + linkDoFornecedor.replace('/id/', '/doc/') + '.json',
                {
                    mode: 'no-cors'
                }
            ).then(async res => {
                if (res.status === 502 || res.status === 503) {
                    await sleep(2000)
                    return res.status
                } else if (res.status !== 200) {
                    return cpfCnpj
                } else {
                    const resposta = await res.json()
                    return resposta.razao_social
                }
            }).catch(() => {
                return cpfCnpj
            })
        } while (respostaDaRequisicao === 502 || respostaDaRequisicao === 503)

        return await respostaDaRequisicao
    }
}