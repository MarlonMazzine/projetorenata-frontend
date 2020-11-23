import React from 'react'
import BotaoCarregarComprasDoBanco from './BotaoCarregarComprasDoBanco'

export default class BotaoCarregarComprasComLicitacao extends React.Component {
    render() {
        return (
            <React.Fragment>
                <BotaoCarregarComprasDoBanco
                    material={this.props.material}
                    setListaDeMarcas={this.props.setListaDeMarcas}
                    setListaDeCompras={this.props.setListaDeCompras}
                    setCodigoDoMaterialAtual={this.props.setCodigoDoMaterialAtual}
                    endpoint={'/comprascomlicitacao'}
                    textoDoBotao={'Licitações/Pregões'}/>
            </React.Fragment>
        )
    }
}