import React from 'react'

export default class Compras extends React.Component {
    async carregarCompras() {
        return await fetch(
            'https://projetorenata-backend.herokuapp.com/comprassemlicitacao'
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