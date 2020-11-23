import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'

export default class Alerta extends React.Component {


    render(mensagem) {
        return (
            <React.Fragment>
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    ${mensagem}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </React.Fragment>
        )
    }
}