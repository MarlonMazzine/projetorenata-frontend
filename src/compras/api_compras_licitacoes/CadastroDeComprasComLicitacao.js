import React from 'react'
import Uasg from '../api_compras/Uasg'
import DetalhesDaCompraComLicitacao from './DetalhesDaCompraComLicitacao'
import UnidadeDeFornecimento from './UnidadeDeFornecimento'
import Materiais from '../../classes/todos_os_materiais/Materiais'
import Fornecedor from '../api_compras/Fornecedor'
import AtualizarComprasComLicitacao from '../banco/atualizadores_automaticos/AtualizarComprasComLicitacao'

var _dataDaCompra
var _comprasDoBanco
var _uasg

function obterTabelaComAsCompras(comprasComLicitacaoEmHtml) {
    return comprasComLicitacaoEmHtml.querySelectorAll('form[name=\'MostraDados\'] table[width=\'80%\'] tbody tr')
}

function obterTextoDoElemento(elemento, seletor) {
    return elemento.querySelector(seletor).innerText.trim()
}

async function obterUasg(linhaDaTabela) {
    const codigoUasg = obterTextoDoElemento(linhaDaTabela, 'td:nth-child(3)').replaceAll(/(^.{1,6}).+/g, "$1")
    const uasg = await new Uasg().obterUasg(codigoUasg)
    return uasg
}

function obterModalidade(linhaDaTabela) {
    return obterTextoDoElemento(linhaDaTabela, 'td:nth-child(4)').includes('Preg�o')
        ? 'Pregão'
        : 'Precisamos verificar'
}

async function obterDetalhesDaCompra(numeroDaLicitacaoCompleto, codigoDoMaterial) {
    return await new DetalhesDaCompraComLicitacao().obterDetalhesDaCompraComLicitacao(numeroDaLicitacaoCompleto, codigoDoMaterial)
}

function obterNomeDaMarca(detalhesDeTodosOsItens) {
    return obterTextoDoElemento(detalhesDeTodosOsItens, 'tbody tr:nth-child(2) td:nth-child(6)').toUpperCase()
}

function obterNumeroDoItemDaLicitacao(detalhesDaCompra) {
    const numeroDoItemDaLicitacaoString =
        obterTextoDoElemento(detalhesDaCompra, 'table:nth-child(1) tbody tr td:nth-child(5)')

    return parseInt(numeroDoItemDaLicitacaoString)
}

async function obterUnidadeDeFornecimento(numeroDaLicitacao, detalhesDeTodosOsItens) {
    const numeroDoItemDaLicitacao = obterNumeroDoItemDaLicitacao(detalhesDeTodosOsItens)
    return await new UnidadeDeFornecimento().obterUnidadeDeFornecimento(numeroDaLicitacao, numeroDoItemDaLicitacao)
}

function obterQuantidadeOfertada(detalhesDeTodosOsItens) {
    const quantidadeOfertada = obterTextoDoElemento(detalhesDeTodosOsItens, 'table:nth-child(2) tr:nth-child(2) td:nth-child(3)')
    return parseInt(quantidadeOfertada.replaceAll('.', ''))
}

function obterValorUnitario(detalhesDeTodosOsItens) {
    const valorUnitario = obterTextoDoElemento(detalhesDeTodosOsItens, 'table:nth-child(2) tr:nth-child(2) td:nth-child(4)')
    return parseFloat(valorUnitario.replace(',', '.')).toFixed(2)
}

function obterCpfCnpjDoFornecedor(detalhesDeTodosOsItens) {
    return obterTextoDoElemento(detalhesDeTodosOsItens, 'table:nth-child(2) tr:nth-child(2) td:nth-child(2)')
        .replaceAll(/\D/g, "")
}

async function obterNomeDoFornecedor(cpfCnpjDoFornecedor) {
    return await new Fornecedor().obterNomeDoFornecedorPeloCpfCnpj(cpfCnpjDoFornecedor)
}

function obterNumeroCompletoDaLicitacao(linhaDaTabela) {
    return linhaDaTabela.querySelector('input').getAttribute('value')
}

function obterNumroDoItem(detalhesDeTodosOsItens) {
    const numeroDoItem = obterTextoDoElemento(detalhesDeTodosOsItens, 'table:nth-child(1) tbody td:nth-child(5)')
    return parseInt(numeroDoItem)
}

async function obterValoresParaMontarJsonSeCompraNaoEstaCadastradaNoBanco(codigoDoMaterial, linhaDaTabela, nomeDoMaterial) {
    const numeroDaLicitacaoCompleto = obterNumeroCompletoDaLicitacao(linhaDaTabela)
    const numeroDaLicitacao = numeroDaLicitacaoCompleto.slice(0, 17)
    const detalhesDaCompra = await obterDetalhesDaCompra(numeroDaLicitacaoCompleto, codigoDoMaterial)
    const detalhesDeTodosOsItens = Array.from(detalhesDaCompra.querySelectorAll('form[name=\'MostraDados\']'))
    const modalidade = obterModalidade(linhaDaTabela)
    var valoresParaMontarOJson = []
    
    for (var i in detalhesDeTodosOsItens) {
        const detalhesDoItemAtual = detalhesDeTodosOsItens[i]
        const numeroDoItem = obterNumroDoItem(detalhesDoItemAtual)
        const indexDaCompraCadastradaNoBanco = obterIndexDaCompraCadastradaNoBanco(numeroDaLicitacao, codigoDoMaterial, numeroDoItem)

        if (indexDaCompraCadastradaNoBanco !== -1) {
            continue
        }

        valoresParaMontarOJson.push(await obterValoresParaMontarOJson(detalhesDoItemAtual, numeroDaLicitacao, nomeDoMaterial,
            codigoDoMaterial, linhaDaTabela, modalidade, numeroDoItem))
    }

    return valoresParaMontarOJson
}

async function obterValoresParaMontarOJson(detalhesDoItemAtual, numeroDaLicitacao, nomeDoMaterial, codigoDoMaterial,
        linhaDaTabela, modalidade, numeroDoItem) {
    await carregarUasgSeEstiverUndefined(linhaDaTabela)

    const nomeDaUasg = _uasg.nome
    const uf = _uasg.sigla_uf
    _uasg = undefined
    const nomeDaMarca = obterNomeDaMarca(detalhesDoItemAtual)
    const unidadeDeFornecimento = await obterUnidadeDeFornecimento(numeroDaLicitacao, detalhesDoItemAtual)
    const quantidadeOfertada = obterQuantidadeOfertada(detalhesDoItemAtual)
    const valorUnitario = obterValorUnitario(detalhesDoItemAtual)
    const cpfCnpjDoFornecedor = obterCpfCnpjDoFornecedor(detalhesDoItemAtual)
    const nomeDoFornecedor = await obterNomeDoFornecedor(cpfCnpjDoFornecedor)
    
    return [numeroDaLicitacao, nomeDaMarca, _dataDaCompra, modalidade, codigoDoMaterial,
        nomeDoMaterial, unidadeDeFornecimento, quantidadeOfertada, valorUnitario, nomeDoFornecedor, nomeDaUasg, uf,
        numeroDoItem]
}

async function carregarUasgSeEstiverUndefined(linhaDaTabela) {
    if (_uasg === undefined) {
        _uasg = await obterUasg(linhaDaTabela)
    }
}

function obterJsonDeComprasComLicitacao(valoresParaMontarOJson) {
    return {
        codigodacompra: valoresParaMontarOJson[0],
        nomedamarca: valoresParaMontarOJson[1],
        datadacompra: valoresParaMontarOJson[2],
        modalidade: valoresParaMontarOJson[3],
        codigocatmat: valoresParaMontarOJson[4],
        descricaodoitem: valoresParaMontarOJson[5],
        unidadedefornecimento: valoresParaMontarOJson[6],
        quantidadeofertada: valoresParaMontarOJson[7],
        valorunitario: valoresParaMontarOJson[8],
        nomedofornecedor: valoresParaMontarOJson[9],
        uasg: valoresParaMontarOJson[10],
        uf: valoresParaMontarOJson[11],
        numerodoitem: valoresParaMontarOJson[12]
    }
}

function obterIndexDaCompraCadastradaNoBanco(numeroDaLicitacao, codigoDoMaterial, numeroDoItem) {
    if (_comprasDoBanco.includes("Não há nenhuma compra cadastrada no banco.")) {
        return -1
    }
    
    return _comprasDoBanco.findIndex(compra =>
        compra.codigodacompra === numeroDaLicitacao &&
        compra.codigocatmat === parseInt(codigoDoMaterial) &&
        compra.numerodoitem === parseInt(numeroDoItem)
    )
}

export default class CadastroDeComprasComLicitacao extends React.Component {
    async atualizarTabela(comprasComLicitacaoEmHtml, codigoDoMaterial, comprasComLicitacaoDoBanco) {
        const tabelaComAsCompras = obterTabelaComAsCompras(comprasComLicitacaoEmHtml)
        const materiais = new Materiais().obterTodosOsMateriais()
        const nomeDoMaterial = materiais.get(codigoDoMaterial)
        _comprasDoBanco = comprasComLicitacaoDoBanco

        for (var i = 1; i < tabelaComAsCompras.length; i++) {
            const linhaDaTabela = tabelaComAsCompras.item(i)
            _dataDaCompra = linhaDaTabela.querySelector('td:nth-child(5)').innerText.trim().slice(0, 10).split("/").reverse().join("-")
            const valoresParaMontarOJson =
                await obterValoresParaMontarJsonSeCompraNaoEstaCadastradaNoBanco(codigoDoMaterial, linhaDaTabela, nomeDoMaterial)
            
            for (var v in valoresParaMontarOJson) {
                const jsonDeComprasComLicitacao = JSON.stringify(obterJsonDeComprasComLicitacao(valoresParaMontarOJson[v]))
                await new AtualizarComprasComLicitacao()
                    .atualizarTabelaDeComprasComLicitacao(jsonDeComprasComLicitacao)
            }
        }
    }
}