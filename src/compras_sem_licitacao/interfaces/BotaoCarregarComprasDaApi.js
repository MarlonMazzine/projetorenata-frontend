import React from 'react'
import Compras from '../api/Compras'
import Materiais from '../../classes/todos_os_materiais/Materiais'
import AtualizadorDeTabelas from '../banco/atualizadores_automaticos/AtualizadorDeTabelas'
import Modal from './Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.css'

export default class BotaoCarregarComprasDaApi extends React.Component {
    async carregarComprasSemLicitacao() {
        new Modal().setModalState('modalCarregando')

        const materiais = new Materiais().obterTodosOsMateriais()
        const codigosDosMateriais = Array.from(materiais.keys())
        const qtdDeCodigosDosMateriais = codigosDosMateriais.length
        var totalDeErros = 0
        var comprasDe2015Ate2020 = []

        for (var i = 0; i < qtdDeCodigosDosMateriais; i++) {
            const codigoDoMaterialAtual = codigosDosMateriais[i]
            comprasDe2015Ate2020 = await new Compras().obterCompras(codigoDoMaterialAtual)
            totalDeErros += await new AtualizadorDeTabelas().atualizarTabelas(comprasDe2015Ate2020, codigoDoMaterialAtual)
            comprasDe2015Ate2020.length = 0
        }

        if (totalDeErros > 0) {
            alert(`Foram encontrados ${totalDeErros} erros durante a atualização. Convém atualizar novamente.`)
        }

        new Modal().setModalState('modalCarregando')
    }

    render() {
        return (
            <React.Fragment>
                <li type="button"
                className="text-center minha-cor w-100 h-50p pt-3"
                onClick={this.carregarComprasSemLicitacao.bind(this)}>
                    <FontAwesomeIcon className="mr-3" icon={faSyncAlt} />
                    Atualizar compras
                </li>
            </React.Fragment>
        )
    }
}