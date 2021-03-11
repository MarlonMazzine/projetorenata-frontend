import React from 'react'
import ExportarTabela from '../../classes/ExportarTabela'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'

export default class BotaoExportarXls extends React.Component {
    exportarEmXls() {
        const elementTable = document.getElementById('tabelaDeCompras')
        new ExportarTabela().exportarTabelaDeComprasEmXls(`compras_${this.props.codigoCatmat}`, elementTable)
    }

    render() {
        return (
            <React.Fragment>
                <a id="botaoExportarXls"
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