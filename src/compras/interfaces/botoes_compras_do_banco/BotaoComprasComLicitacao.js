import React from 'react'
import BotaoCarregarComprasDoBanco from './BotaoCarregarComprasDoBanco'

export default class BotaoCarregarComprasSemLicitacaoDoBanco extends React.Component {
    render() {
        return (
            <React.Fragment>
                <BotaoCarregarComprasDoBanco
                    material={this.props.material}
                    setListaDeMarcas={this.props.setListaDeMarcas}
                    setListaDeCompras={this.props.setListaDeCompras}
                    setCodigoDoMaterialAtual={this.props.setCodigoDoMaterialAtual}
                    endpoint={'/comprassemlicitacao'}
                    textoDoBotao={'Sem licitação'}/>
            </React.Fragment>
        )
    }
}