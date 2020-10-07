import React from 'react'
import Compras from '../banco/buscar_no_banco/Compras'
import ModalMarcas from './ModalListaDeMarcas'
import Modal from './ModalAtualizando'
import 'bootstrap/dist/css/bootstrap.css'

function isComecaComTrecho(texto, paramentros) {
    for (var string in paramentros) {
        if (texto.startsWith(string)) {
            return true
        }
    }

    return false
}

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
    async carregarComprasSemLicitacaoDoBanco(codigoDoMaterial) {
        new Modal().setModalState('modalCarregando')
        const comprasDoBanco = await new Compras().carregarComprasComCodigoDoMaterial(codigoDoMaterial)

        if (isComecaComTrecho(comprasDoBanco.toString(), ['Não há nenhuma', 'Houve um erro'])) {
            alert(comprasDoBanco)
        } else {
            const marcas = obterMarcaDasCompras(comprasDoBanco)
            this.props.setListaDeMarcas(marcas)
            this.props.setListaDeCompras(comprasDoBanco)
            this.props.setCodigoDoMaterialAtual(codigoDoMaterial)
        }

        new Modal().setModalState('modalCarregando')
        new ModalMarcas().mostrarModal()
    }

    render() {
        return (
            <React.Fragment>
                <button
                    type="button"
                    className="btn btn-info"
                    onClick={this.carregarComprasSemLicitacaoDoBanco.bind(this, this.props.material)}>
                        Sem licitação
                </button>
            </React.Fragment>
        )
    }
}