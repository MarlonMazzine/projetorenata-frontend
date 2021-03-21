import React from 'react'
import BotaoExportarXls from './BotaoExportarParaXls'
import TabelaDeCompras from './TabelaDeCompras'

export default class ModalTabelaDeCompras extends React.Component {
    removerModal() {
        document.getElementById('modalTabelaDeCompras').style.display = 'none'
    }
    
    render() {
        const compras = this.props.compras
        
        if (compras === undefined || compras.length === 0) {
            return null
        }

        return (
            <React.Fragment>
                <div id="modalTabelaDeCompras"
                    className="modal"
                    tabIndex="-1"
                    style={{
                        display: 'block'
                    }}>

                    <div id="modal-backgound"></div>
                    <div className="modal-dialog modal-dialog-scrollable min-vw-100 pr-4 pl-4 m-0 h-100 mh-100" tabIndex="-1" role="dialog" aria-modal="true">
                        <div className="modal-dialog mw-100 w-100 mt-1 mb-0">
                            <div className="modal-content h-100">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.removerModal.bind(this)}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <TabelaDeCompras compras={compras} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.removerModal.bind(this)}>Fechar</button>
                                    <BotaoExportarXls id={"botaoExportarCodigoAtual"}
                                        elemetoTabelaDeCompras={"div[class] #tabelaDeCompras"}
                                        codigoCatmat={compras[0].codigocatmat}
                                        textoBotao="Exportar todos"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}