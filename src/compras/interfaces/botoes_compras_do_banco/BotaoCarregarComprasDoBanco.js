import React from 'react'
import Compras from '../../banco/buscar_no_banco/Compras'
import ModalListaDeMarcas from '../ModalListaDeMarcas'
import Modal from '../ModalAtualizando'
import 'bootstrap/dist/css/bootstrap.css'

function obterMarcaDasCompras(comprasDoBanco) {
    var marcas = [];
    var compras = {};
    
    for (var i in comprasDoBanco) {
        compras[comprasDoBanco[i]['nomedamarca']] = comprasDoBanco[i];
    }

    for (i in compras) {
        marcas.push(compras[i]['nomedamarca']);
    }

    return marcas
}

export default class BotaoCarregarComprasDoBanco extends React.Component {
    async carregarComprasSemLicitacaoDoBanco() {
        new Modal().setModalState('modalCarregando')
        
        try {
            const comprasDoBanco = await new Compras()
                .carregarComprasComCodigoDoMaterial(this.props.endpoint, this.props.material)

            if (comprasDoBanco.toString().includes('Não há nenhuma')) {
                alert(comprasDoBanco)
            } else {
                const marcas = obterMarcaDasCompras(comprasDoBanco)
                this.props.setListaDeMarcas(marcas)
                this.props.setListaDeCompras(comprasDoBanco)
                this.props.setCodigoDoMaterialAtual(this.props.material)
                new ModalListaDeMarcas().mostrarModal()
            }
        } catch(e) {
            alert(e.message)
        }

        new Modal().setModalState('modalCarregando')
    }

    render() {
        return (
            <React.Fragment>
                <button
                    type="button"
                    className="btn btn-info"
                    onClick={this.carregarComprasSemLicitacaoDoBanco.bind(this)}>
                        {this.props.textoDoBotao}
                </button>
            </React.Fragment>
        )
    }
}