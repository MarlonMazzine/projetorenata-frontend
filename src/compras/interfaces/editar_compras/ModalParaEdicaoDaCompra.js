import React from 'react'

export default class ModalParaEdicaoDaCompra extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div id="modalDeEdicao" className="modal fade show" style={{ display: "none" }}>
                    <div id="modal-backgound"></div>
                    <div className="modal-dialog modal-dialog-centered fixed-top position-absolute" tabIndex="-1" role="dialog" aria-labelledby="modalCarregando" aria-modal="true">
                        <div className="modal-dialog w-100">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Editar compra</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-row">
                                            <div className="form-group col-md-5">
                                                <label>Código da compra</label>
                                                <input type="text" className="form-control" id="codigoDaCompra" placeholder='12006605000482011' disabled />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label>Data da compra</label>
                                                <input type="text" className="form-control" id="dataDaCompra" placeholder='29/10/2020' disabled />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label>Modalidade</label>
                                                <input type="text" className="form-control" id="modalidade" placeholder="Dispensa" disabled />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-7">
                                                <label>Marca</label>
                                                <input type="text" className="form-control" id="nomeDaMarca" placeholder="INSUNORM NPH 10ML" disabled />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label>Unidade de fornecimento</label>
                                                <input type="text" className="form-control" id="unidadeDeFornecimento" placeholder="FRASCO" disabled />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label>Quantidade</label>
                                                <input type="text" className="form-control" id="quantidadeOfertada" placeholder="15623" disabled />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label>Valor unitário</label>
                                                <input type="text" className="form-control" id="valorUnitario" placeholder="R$ 20.0" disabled />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="nomeDoForncedor">Nome do fornecedor</label>
                                            <input type="text" className="form-control" id="nomeDoForncedor" defaultValue="COSTA CAMARGO COM. DE PRODUTOS HOSPITALARES LTDA" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="inputAddress2">UASG</label>
                                            <input type="text" className="form-control" id="uasg" defaultValue="NUCLEO DO HOSPITAL DE FORÇA AEREA DE S.PAULO" />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary">Salvar alterações</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}