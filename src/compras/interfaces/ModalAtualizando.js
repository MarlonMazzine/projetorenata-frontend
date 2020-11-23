import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles.css'

export default class ModalAtualizado extends React.Component {
    async setModalState(nomeDoIdDoModal) {
        var modal = document.getElementById(nomeDoIdDoModal)

        if (modal.style.display === 'none') {
            modal.style.display = 'block'
        } else {
            modal.style.display = 'none'
        }
    }

    render() {
        return (
            <React.Fragment>
                <div id="modalCarregando" className="modal fade show" style={{ display: "none" }}>
                    <div id="modal-backgound"></div>
                    <div className="modal-dialog modal-dialog-centered fixed-top position-absolute" tabIndex="-1" role="dialog" aria-labelledby="modalCarregando" aria-modal="true">
                        <div className="modal-dialog w-100">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-striped progress-bar-animated w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p className="mt-2 mb-0 text-center">Atualizando...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}