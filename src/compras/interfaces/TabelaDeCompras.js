import React from 'react'
import CabecalhoTabelaDeCompras from './CabecalhoTabelaDeCompras'
import CorpoTabelaDeCompras from './CorpoTabelaDeCompras'

export default class TabelaDeCompras extends React.Component {
    render() {
        const className = "table table-striped table-bordered table-hover "
        const displayNone = this.props.hidden ? className + "d-none" : className

        return (
            <React.Fragment>
                <table id="tabelaDeCompras" className={displayNone}>
                    <CabecalhoTabelaDeCompras/>
                    <CorpoTabelaDeCompras compras={this.props.compras} />
                </table>
            </React.Fragment>
        )
    }
}