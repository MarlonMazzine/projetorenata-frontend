import React from 'react'

export default class CabecalhoTabelaDeCompras extends React.Component {
    render() {
        return (
            <React.Fragment>
                <thead className="thead-dark text-center">
                    <tr>
                        <th className="align-middle" scope="col">#</th>
                        <th className="align-middle" scope="col">Ano da compra</th>
                        <th className="align-middle" scope="col">Modalidade</th>
                        <th className="align-middle" scope="col">CATMAT</th>
                        <th className="align-middle" scope="col">Descrição</th>
                        <th className="align-middle" scope="col">Unidade de fornecimento</th>
                        <th className="align-middle" scope="col">Quantidade</th>
                        <th className="align-middle" scope="col">Valor unitário</th>
                        <th className="align-middle" scope="col">Fornecedor</th>
                        <th className="align-middle" scope="col">Marca</th>
                        <th className="align-middle" scope="col">UASG</th>
                        <th className="align-middle" scope="col">UF</th>
                        <th className="align-middle" scope="col">Ações</th>
                    </tr>
                </thead>
            </React.Fragment>
        )
    }
}