import React from 'react'
import ExportarTabela from '../../classes/ExportarTabela'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'

export default class BotaoExportarXls extends React.Component {
    exportarEmXls() {
        const elementTable = this.props.elemetoTabelaDeCompras
                ? document.querySelector(this.props.elemetoTabelaDeCompras)
                : document.getElementById('tabelaDeCompras')

        new ExportarTabela().exportarTabelaDeComprasEmXls(`compras_${this.props.codigoCatmat}`, elementTable, this.props.id)
    }

    render() {
        return (
            <React.Fragment>
                <a id={this.props.id}
                    href="/"
                    type="button"
                    className="btn btn-info"
                    onClick={this.exportarEmXls.bind(this)}
                    title="Exportar para XLS">
                        <FontAwesomeIcon icon={faFileExcel} /> {this.props.textoBotao}
                </a>
            </React.Fragment>
        )
    }
}