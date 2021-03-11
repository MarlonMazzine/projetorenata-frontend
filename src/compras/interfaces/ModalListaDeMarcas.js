import React from 'react'
import ModalTabelaDeCompras from './ModalTabelaDeCompras'
import BotaoExportarXls from './BotaoExportarParaXls'
import 'bootstrap/dist/css/bootstrap.min.css'
import TabelaDeCompras from './TabelaDeCompras'

var comprasFiltradas

export default class ModalListaDeMarcas extends React.Component {
    constructor() {
        super()

        this.state = {
            modalState: false
        }
    }

    carregarTabelaDeCompras(ano, nomeDaMarca) {
        comprasFiltradas = []
        ano = ano === 'Todas' ? '20' : ano
        comprasFiltradas = this.props.compras.filter(x => x.nomedamarca === nomeDaMarca && x.datadacompra.startsWith(ano))

        if (comprasFiltradas.length !== 0) {
            this.mostrarModalTabelaDeComprasSeExistir()
            this.setState({ modalState: true })
        } else {
            alert(`Não há nenhuma compra para exibir da marca no ano selecionado.`)
        }
    }

    mostrarModalTabelaDeComprasSeExistir() {
        const modal = document.getElementById('modalTabelaDeCompras')

        if (modal !== null) {
            modal.style.display = 'block'
        }
    }

    esconderModal() {
        document.getElementById('modalListaDeMarcas').style.display = 'none'
    }

    mostrarModal() {
        document.getElementById('modalListaDeMarcas').style.display = 'block'
    }

    render() {
        const anos = ['2015', '2016', '2017', '2018', '2019', '2020', '2021']

        return (
            <React.Fragment>
                <div id="modalListaDeMarcas"
                    className="modal"
                    tabIndex="-1"
                    style={{
                        display: 'none'
                    }}>

                    <div id="modal-backgound"></div>
                    <div className="modal-dialog modal-lg modal-dialog-centered" tabIndex="-1" role="dialog" aria-labelledby="modalCarregando" aria-modal="true">
                        <div className="modal-dialog modal-dialog-scrollable mw-100 w-100 mt-1 mb-0">
                            <div className="modal-content h-100">
                                <div className="modal-header">
                                    <h4 className="modal-title">Lista de marcas: <strong>{this.props.codigoDoMaterialAtual}</strong></h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.esconderModal.bind(this)}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div id="listasDeMarcasDeComprasSLicitacao" className="w-100">
                                        <ul className="list-group">
                                            {this.props.marcas.map((marca, i) => {
                                                return <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                                    {marca}
                                                    <div className="btn-group">
                                                        {anos.map((ano, j) => {
                                                            return <button
                                                                key={j}
                                                                type="button"
                                                                className="btn btn-secondary"
                                                                onClick={this.carregarTabelaDeCompras.bind(this, ano, marca)}>
                                                                {ano}
                                                            </button>
                                                        })}
                                                        <button
                                                            type="button"
                                                            className="btn btn-info"
                                                            onClick={this.carregarTabelaDeCompras.bind(this, 'Todas', marca)}>
                                                                Todas
                                                        </button>
                                                    </div>
                                                </li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <BotaoExportarXls codigoCatmat={"todas"} textoBotao={"Exportar todos para XLS"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <TabelaDeCompras compras={this.props.compras} hidden={true}/>
                <ModalTabelaDeCompras compras={comprasFiltradas} modalState={this.state.modalState} />
            </React.Fragment>
        )
    }
}
