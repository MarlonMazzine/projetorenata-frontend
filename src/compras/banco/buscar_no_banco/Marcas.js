import React from 'react'

export default class Marcas extends React.Component {
    async carregarMarcas() {
        const URL = process.env.REACT_APP_URL_API + '/todasasmarcas'
        return await fetch(
            URL
        ).then(async res => {
            const resposta = await res.json()

            if (resposta.rowCount === 0) {
                return 'Não há nenhuma marca cadastrada no banco.'
            }

            return resposta.rows
        }).catch(err => {
            return 'Houve um erro ao obter as marcas cadastradas. Tente novamente, por favor. Erro: ' + err.message
        })
    }
}