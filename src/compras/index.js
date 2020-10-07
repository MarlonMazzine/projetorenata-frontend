import React, { Component, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ModalAtualizando from './interfaces/ModalAtualizando'
import ListaDeMateriais from './interfaces/ListaDeMaterias'

class index extends Component {
    constructor() {
        super()

        this.state = {
            listaDeMarcas: []
        }
    }
    
    setListaDeMarcas = (marcas) => {
        this.setState({ listaDeMarcas: marcas })
    }
    
    render() {
        return (
            <Fragment>
                <ListaDeMateriais />
                <ModalAtualizando />
            </Fragment>
        );
    }
}

export default index;