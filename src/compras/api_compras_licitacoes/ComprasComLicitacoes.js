import React from 'react'
import CadastroDeComprasComLicitacao from './CadastroDeComprasComLicitacao'
import Headers from '../../classes/Headers'
import FetchPost from '../../classes/FetchPost'
import Compras from '../banco/buscar_no_banco/Compras'

const formatoDaData = { year: 'numeric', month: '2-digit', day: '2-digit' }
var _comprasComLicitacaoDoBancoDoCodigoAtual
const _dataDeHoje = new Date()
_dataDeHoje.setHours(0,0,0,0)

function isComecaComTrecho(texto, paramentros) {
    for (var string of paramentros) {
        if (texto.startsWith(string)) {
            return true
        }
    }

    return false
}

function obterDataInicial(comprasDoBanco, dataInicialPadrao, dataFinal) {
    if (!isComecaComTrecho(comprasDoBanco.toString(), ['Não há nenhuma', 'Houve um erro'])) {
        const dataInicialDoBanco = new Date(comprasDoBanco[0].datadacompra)
        const dataFinalToDate = convertStringToDate(dataFinal)

        if (dataFinalToDate.getTime() > dataInicialDoBanco.getTime()) {
            dataFinalToDate.setDate(dataFinalToDate.getDate() + 1)
            return convertDateToString(dataFinalToDate)
        }

        dataInicialDoBanco.setDate(dataInicialDoBanco.getDate() - 30)
        return dataInicialDoBanco.toLocaleDateString('pt-BR', formatoDaData)
    }

    return dataInicialPadrao.toLocaleString('pt-BR', formatoDaData)
}

function convertStringToDate(dataString) {
    const dataInicialSplit = dataString.split('/')
    return new Date(dataInicialSplit[2], dataInicialSplit[1] - 1, dataInicialSplit[0])
}

function convertDateToString(date) {
    return date.toLocaleDateString('pt-BR', formatoDaData)
}

function obterDataFinal(dataInicialDiaMesEAno, dataInicialPadrao, dataFinalPadrao) {
    const dataInicial = convertStringToDate(dataInicialDiaMesEAno)

    if (dataInicial.getTime() === dataInicialPadrao.getTime() && dataFinalPadrao.getTime() < _dataDeHoje.getTime()) {
        return dataFinalPadrao.toLocaleString('pt-BR', formatoDaData)
    } else if (dataFinalPadrao.getTime() > _dataDeHoje.getTime()) {
        return _dataDeHoje.toLocaleDateString('pt-BR', formatoDaData)
    }

    dataInicial.setFullYear(dataInicial.getFullYear() + 1)
    return dataInicial.toLocaleString('pt-BR', formatoDaData)
}

function obterFormBody(codigoDoMaterial, dataInicial, dataFinal) {
    const formData = new URLSearchParams()
    formData.append("dt_ini", dataInicial)
    formData.append("dt_fim", dataFinal)
    formData.append("txtlstMateriais", codigoDoMaterial.toString())
    formData.append("QtdRetorno", "0")
    formData.append("AtualizarSession", "S")

    return formData
}

async function atualizarTabelaNoBanco(codigoDoMaterial, dataInicial, dataFinal) {
    const URL = process.env.REACT_APP_TRATAMENTO_CORS + 'http://comprasnet.gov.br/Livre/Ata/ConsultaAta01.asp'
    const header = new Headers().obterContentTypeHeaderFormUrlEncoded()
    const formBody = obterFormBody(codigoDoMaterial, dataInicial, dataFinal);
    var resposta

    do {
        resposta = await new FetchPost().obterRespostaFetchPostEmTexto(URL, formBody.toString(), header)

        if (resposta !== '') {
            const comprasComLicitacaoEmHtml = new DOMParser().parseFromString(resposta, 'text/html')
            await new CadastroDeComprasComLicitacao()
                .atualizarTabela(comprasComLicitacaoEmHtml, codigoDoMaterial, _comprasComLicitacaoDoBancoDoCodigoAtual)
        }
    } while (resposta === '')
}

export default class ComprasComLicitacoes extends React.Component {
    async atualizarComprasNoBanco(codigoDoMaterial) {
        _comprasComLicitacaoDoBancoDoCodigoAtual = await new Compras()
            .carregarComprasComCodigoDoMaterial('/comprascomlicitacao', codigoDoMaterial)
        var dataInicialPadrao = new Date(2015, 0, 1)
        var dataFinalPadrao = new Date(2015, 12, 0)
        var dataFinal = '31/12/2015'

        while (convertStringToDate(dataFinal).getTime() < _dataDeHoje.getTime()) {
            const dataInicial = obterDataInicial(_comprasComLicitacaoDoBancoDoCodigoAtual, dataInicialPadrao, dataFinal)
            dataFinal = obterDataFinal(dataInicial, dataInicialPadrao, dataFinalPadrao)

            await atualizarTabelaNoBanco(codigoDoMaterial, dataInicial, dataFinal)

            dataInicialPadrao.setFullYear(dataInicialPadrao.getFullYear() + 1)
            dataFinalPadrao.setFullYear(dataFinalPadrao.getFullYear() + 1)
        }

        _comprasComLicitacaoDoBancoDoCodigoAtual = []
    }
}