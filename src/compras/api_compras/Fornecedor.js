import React from 'react'
import FetchGet from '../../classes/FetchGet'

export default class Fornecedor extends React.Component {
    async obterNomeDoFornecedor(fornecedor) {
        if (fornecedor === undefined) {
            return "ESTRANGEIRO"
        }
        
        const linkDoFornecedor = fornecedor.href
        const URL = process.env.REACT_APP_URL_API_COMPRAS + linkDoFornecedor.replace('/id/', '/doc/') + '.json'
        const cpfCnpj = `CPF / CNPJ: ${linkDoFornecedor.replace(/\D/g, '')}`
        var respostaDaRequisicao

        do {
            respostaDaRequisicao = await new FetchGet().obterRespostaFetchGetEmJson(URL)

            if (respostaDaRequisicao === 404) {
                return cpfCnpj
            }
        } while (respostaDaRequisicao === '')

        return await respostaDaRequisicao.razao_social
    }

    async obterNomeDoFornecedorPeloCpfCnpj(cpfCnpjDoFornecedor) {
        const URL = `${process.env.REACT_APP_TRATAMENTO_CORS}http://compras.dados.gov.br/fornecedores/doc/fornecedor_pj/${cpfCnpjDoFornecedor}.json`
        const cpfCnpj = `CPF / CNPJ: ${cpfCnpjDoFornecedor}`
        var respostaDaRequisicao

        do {
            respostaDaRequisicao = await new FetchGet().obterRespostaFetchGetEmJson(URL)

            if (respostaDaRequisicao === 404) {
                return cpfCnpj
            }
        } while (respostaDaRequisicao === '')

        return await respostaDaRequisicao.razao_social
    }
}