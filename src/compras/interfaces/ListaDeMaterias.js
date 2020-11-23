import React from 'react'
import BotaoComprasSemLicitacao from './botoes_compras_do_banco/BotaoComprasComLicitacao'
import BotaoComprasComLicitacao from './botoes_compras_do_banco/BotaoComprasSemLicitacao'
import BotaoCarregarComprasDaApiParaOBanco from './botao_compra_da_api/BotaoCarregarComprasDaApiParaOBanco'
import Materiais from '../../classes/todos_os_materiais/Materiais'
import ModalListaDeMarcas from './ModalListaDeMarcas'
import ModalParaEdicaoDaCompra from './editar_compras/ModalParaEdicaoDaCompra'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class ListaDeMateriais extends React.Component {
    constructor() {
        super()
        
        this.state = {
            listaDeMarcas: [],
            listaDeCompras: [],
            codigoDoMaterialAtual: ''
        }
    }

    setListaDeMarcas = (marcas) => {
        this.setState({ listaDeMarcas: marcas })
    }

    setListaDeCompras = (compras) => {
        this.setState({ listaDeCompras: compras })
    }

    setCodigoDoMaterialAtual = (codigoDoMaterialAtual) => {
        this.setState({ codigoDoMaterialAtual: codigoDoMaterialAtual})
    }

    render() {
        const materiais = new Materiais().obterTodosOsMateriais()

        return(
            <React.Fragment>
                <div className="w-50 m-auto">
                    <ol className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <h2>Lista de insulinas</h2>
                            <BotaoCarregarComprasDaApiParaOBanco />
                        </li>
                        {Array.from(materiais).map((material, i) => {
                            return <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                {material[0]} - {material[1].substring(0, 56)}...
                                <div className="dropdown">
                                    <button className="btn btn-secondary">
                                        <FontAwesomeIcon icon={faCaretLeft} /> Carregar compras
                                    </button>
                                    <div className="dropdown-content btn-group">
                                        <BotaoComprasSemLicitacao material={material[0]} setListaDeMarcas={this.setListaDeMarcas} setListaDeCompras={this.setListaDeCompras} setCodigoDoMaterialAtual={this.setCodigoDoMaterialAtual}/>
                                        
                                        <BotaoComprasComLicitacao material={material[0]} setListaDeMarcas={this.setListaDeMarcas} setListaDeCompras={this.setListaDeCompras} setCodigoDoMaterialAtual={this.setCodigoDoMaterialAtual}/>
                                    </div>
                                </div>
                            </li>
                        })}
                    </ol>
                </div>
                
                <ModalParaEdicaoDaCompra />

                <ModalListaDeMarcas
                    marcas={this.state.listaDeMarcas}
                    compras={this.state.listaDeCompras}
                    codigoDoMaterialAtual={this.state.codigoDoMaterialAtual} />
            </React.Fragment>
        )
    }
}