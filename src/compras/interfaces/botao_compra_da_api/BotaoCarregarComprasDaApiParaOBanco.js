import React from 'react'
import ComprasSemLicitacao from '../../api_compras_sem_licitacao/ComprasSemLicitacao'
import ComprasComLicitacao from '../../api_compras_licitacoes/ComprasComLicitacoes'
import ComprasDoBanco from '../../banco/buscar_no_banco/Compras'
import Materiais from '../../../classes/todos_os_materiais/Materiais'
import AtualizadorDeTabelas from '../../banco/atualizadores_automaticos/AtualizadorDeTabelas'
import Modal from '../ModalAtualizando'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.css'

export default class BotaoCarregarComprasDaApiParaOBanco extends React.Component {
    async carregarComprasSemLicitacao() {
        new Modal().setModalState('modalCarregando')
        
        try {
            const comprasCadastradasNoBanco = await new ComprasDoBanco().carregarCompras()
            const materiais = new Materiais().obterTodosOsMateriais()
            const codigosDosMateriais = Array.from(materiais.keys())
            const qtdDeCodigosDosMateriais = codigosDosMateriais.length
            
            for (var i = 0; i < qtdDeCodigosDosMateriais; i++) {
                var comprasDe2015Ate2020 = []
                await new ComprasComLicitacao().atualizarComprasNoBanco(codigosDosMateriais[i])
                const codigoDoMaterialAtual = codigosDosMateriais[i]
                comprasDe2015Ate2020 =
                    await this.obterComprasQueSeraoCadastradas(codigoDoMaterialAtual, comprasCadastradasNoBanco)

                await new AtualizadorDeTabelas().atualizarTabelas(comprasDe2015Ate2020, codigoDoMaterialAtual)
            }
        } catch (e) {
            alert(e.message)
        }
        
        new Modal().setModalState('modalCarregando')
    }

    async obterComprasQueSeraoCadastradas(codigoDoMaterialAtual, comprasCadastradasNoBanco) {
        const comprasDaApiSemLicitacoes = await new ComprasSemLicitacao().obterComprasSemLicitacao(codigoDoMaterialAtual)
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
            x.codigocatmat === parseInt(codigoDoMaterialAtual) &&
            x.codigodacompra === codigoDaCompraApi
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