import React from 'react'

function obterCorpoDaRequisicao(codigoDoMaterial) {
    return JSON.stringify({
        codigocatmat: codigoDoMaterial
    })
}

const URL = process.env.REACT_APP_URL_API + '/comprassemlicitacao'

export default class Compras extends React.Component {
    async carregarCompras() {
        return await fetch(
            URL
        ).then(async res => {
            const resposta = await res.json()

            if (resposta.rowCount === 0) {
                return 'Não há nenhuma compra cadastrada no banco.'
            }

            return resposta.rows
        }).catch(err => {
            return 'Houve um erro ao obter as compras sem licitação do banco. Erro: ' + err.message
        })
    }

    async carregarComprasComCodigoDoMaterial(codigoDoMaterial) {
        const requestBody = obterCorpoDaRequisicao(codigoDoMaterial)

        return await fetch(
            URL,
            {
                method: "POST",
                body: requestBody,
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        ).then(async res => {
            const resposta = await res.json()
            
            if (resposta.rowCount === 0) {
                return 'Não há nenhuma compra cadastrada no banco.'
            }

            return resposta.rows
        }).catch(err => {
            return 'Houve um erro ao obter as compras sem licitação do banco. Erro: ' + err.message
        })
    }
}