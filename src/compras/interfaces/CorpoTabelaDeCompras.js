import React from 'react'

export default class CorpoTabelaDeCompras extends React.Component {
    render() {
        return (
            <React.Fragment>
                <tbody>
                    {this.props.compras.map((compra, index) => {
                        return <tr key={index + 1}>
                            <th id={(this.props.compras.length - 1) === index ? "ultimoDaTabela" : ""} className="align-middle" scope="row">{index + 1}</th>
                            <td className="text-nowrap text-center align-middle">{compra.datadacompra.slice(0, 4)}</td>
                            <td className="text-nowrap text-center align-middle">{compra.datadacompra.replace(/(\d{4})-(\d{2})-(\d{2}).+/, "$3/$2/$1")}</td>
                            <td className="text-nowrap text-center align-middle">{compra.modalidade}</td>
                            <td className="text-nowrap text-center align-middle">{compra.codigocatmat}</td>
                            <td className="align-middle">{compra.descricaodoitem}</td>
                            <td className="align-middle">{compra.unidadedefornecimento}</td>
                            <td className="text-nowrap text-center align-middle">{compra.quantidadeofertada}</td>
                            <td className="text-nowrap text-center align-middle">R$ {compra.valorunitario}</td>
                            <td className="align-middle">{compra.nomedofornecedor}</td>
                            <td className="text-nowrap text-center align-middle">{compra.nomedamarca}</td>
                            <td className="align-middle">{compra.uasg}</td>
                            <td className="align-middle">{compra.orgao}</td>
                            <td className="text-nowrap text-center align-middle">{compra.uf}</td>
                        </tr>
                    })}
                </tbody>
            </React.Fragment>
        )
    }
}