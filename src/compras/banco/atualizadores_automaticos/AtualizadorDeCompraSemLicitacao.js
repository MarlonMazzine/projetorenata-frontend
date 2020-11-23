import React from 'react'
import Fornecedor from '../../api_compras/Fornecedor'
import Materiais from '../../../classes/todos_os_materiais/Materiais'
import Uasg from '../../api_compras/Uasg'
import FetchPost from '../../../classes/FetchPost'
import Headers from '../../../classes/Headers'

function obterValorUnitario(valorTotal, qtdDeMateriais) {
    return parseFloat(valorTotal / qtdDeMateriais).toFixed(2)
}

async function obterCorpoDaRequisicao(compraAtual, itemDaCompra, codigoDoMaterialAtual) {
    const materiais = new Materiais().obterTodosOsMateriais()
    const nomeDoFornecedor = await new Fornecedor().obterNomeDoFornecedor(itemDaCompra._links.fornecedor)
    const uasg = await new Uasg().obterUasg(compraAtual.co_uasg)
    const nomeDaUf = uasg.nome

    return JSON.stringify({
        codigodacompra: compraAtual._links.self.title.replace(/.+?(\d.+)/g, '$1'),
        nomedamarca: itemDaCompra.no_marca_material.toUpperCase().trim(),
        datadacompra: compraAtual.dtDeclaracaoDispensa.slice(0, -9),
        modalidade: compraAtual._links.modalidade_licitacao.title.replace(/.+:\s(.+)/g, '$1'),
        codigocatmat: parseInt(codigoDoMaterialAtual),
        descricaodoitem: materiais.get(codigoDoMaterialAtual).replace(/(\s{2,})/g, ''),
        unidadedefornecimento: itemDaCompra.no_unidade_medida.trim(),
        quantidadeofertada: parseInt(itemDaCompra.qt_material_alt),
        valorunitario: obterValorUnitario(itemDaCompra.vr_estimado, parseInt(itemDaCompra.qt_material_alt)),
        nomedofornecedor: nomeDoFornecedor,
        uasg: compraAtual._links.uasg.title.toString().replace(/.+:\s(.+)/g, '$1'),
        uf: nomeDaUf
    })
}

export default class AtualizadorDeCompraSemLicitacao extends React.Component {
    async atualizarTabelaDeComprasSemLicitacao(compraAtual, itemDaCompra, codigoDoMaterialAtual) {
        const URL = process.env.REACT_APP_URL_API + '/atualizartabeladecomprassemlicitacao'
        const requestBody = await obterCorpoDaRequisicao(compraAtual, itemDaCompra, codigoDoMaterialAtual)
        const header = new Headers().obterContentTypeHeaderJson()
        const resposta = await new FetchPost().obterRespostaFetchPostEmJson(URL, requestBody, header);

        if (resposta === 404 || resposta === '') {
            throw new Error(`Houve um erro ao atualizar as compras sem licitação. Resposta: ${resposta}`)
        }
    }
}