import React from 'react'
import CabecalhoTabelaDeCompras from './CabecalhoTabelaDeCompras'
import CorpoTabelaDeCompras from './CorpoTabelaDeCompras'

export default class TabelaDeCompras extends React.Component {
    render() {
        return (
            <React.Fragment>
                <table id="tabelaDeCompras" className="table table-striped table-bordered table-hover">
                    <CabecalhoTabelaDeCompras/>
                    <CorpoTabelaDeCompras compras={this.props.compras} />
                </table>
            </React.Fragment>
        )
    }
}