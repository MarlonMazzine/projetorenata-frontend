import React from 'react'
import ComprasSemLicitacao from '../api_compras_sem_licitacao/Compras'
import ComprasDoBanco from '../banco/buscar_no_banco/Compras'
import Materiais from '../../classes/todos_os_materiais/Materiais'
import AtualizadorDeTabelas from '../banco/atualizadores_automaticos/AtualizadorDeTabelas'
import Modal from './ModalAtualizando'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.css'

export default class BotaoCarregarComprasDaApi extends React.Component {
    async carregarComprasSemLicitacao() {
        new Modal().setModalState('modalCarregando')
        const comprasCadastradasNoBanco = await new ComprasDoBanco().carregarCompras()
        const materiais = new Materiais().obterTodosOsMateriais()
        const codigosDosMateriais = Array.from(materiais.keys())
        const qtdDeCodigosDosMateriais = codigosDosMateriais.length
        var totalDeErros = 0
        var comprasDe2015Ate2020 = []
        
        for (var i = 0; i < qtdDeCodigosDosMateriais; i++) {
            const codigoDoMaterialAtual = codigosDosMateriais[i]
            comprasDe2015Ate2020 =
                await this.obterComprasQueSeraoCadastradas(codigoDoMaterialAtual, comprasCadastradasNoBanco)

            totalDeErros +=
                await new AtualizadorDeTabelas().atualizarTabelas(comprasDe2015Ate2020, codigoDoMaterialAtual)
            comprasDe2015Ate2020.length = 0
        }

        this.falharSeTiverErros(totalDeErros)
        new Modal().setModalState('modalCarregando')
    }

    falharSeTiverErros(totalDeErros) {
        if (totalDeErros > 0) {
            alert(`Foram encontrados ${totalDeErros} erros durante a atualização. Convém atualizar novamente.`)
        }
    }

    async obterComprasQueSeraoCadastradas(codigoDoMaterialAtual, comprasCadastradasNoBanco) {
        const comprasDaApiSemLicitacoes = await new ComprasSemLicitacao().obterCompras(codigoDoMaterialAtual)
        const qtdComprasDaApi = comprasDaApiSemLicitacoes.length
        var comprasDe2015Ate2020 = []
        
        for (var i = 0; i < qtdComprasDaApi; i++) {
            const codigoDaCompraApi = comprasDaApiSemLicitacoes[i]._links.self.title.replace(/.+?(\d.+)/g, '$1')
            const indexDaCompraCadastradaNoBanco =
                this.obterIndexDaCompraCadastradaNoBanco(comprasCadastradasNoBanco, codigoDoMaterialAtual, codigoDaCompraApi)
            
            if (indexDaCompraCadastradaNoBanco !== -1) {
                continue
            }

            comprasDe2015Ate2020.push(comprasDaApiSemLicitacoes[i])
        }

        comprasDaApiSemLicitacoes.length = 0
        return comprasDe2015Ate2020
    }

    obterIndexDaCompraCadastradaNoBanco(comprasCadastradasNoBanco, codigoDoMaterialAtual, codigoDaCompraApi) {
        if (comprasCadastradasNoBanco.includes("Não há nenhuma compra cadastrada no banco.")) {
            return -1
        }

        return comprasCadastradasNoBanco.findIndex(x =>
            x.codigocatmat === parseInt(codigoDoMaterialAtual) && x.codigodacompra === codigoDaCompraApi
        )
    }

    render() {
        return (
            <React.Fragment>
                <button type="button"
                className="btn btn-primary"
                onClick={this.carregarComprasSemLicitacao.bind(this)}>
                    <FontAwesomeIcon className="mr-3" icon={faSyncAlt} />
                    Atualizar compras
                </button>
            </React.Fragment>
        )
    }
}