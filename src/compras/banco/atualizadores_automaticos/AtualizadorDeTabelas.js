import React from 'react'
import Itens from '../../api_compras/Itens'
import AtualizadorDeCompraSemLicitacao from './AtualizadorDeCompraSemLicitacao'

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

export default class AtualizadorDeTabelas extends React.Component {
    async atualizarTabelas(listaDeCompras, codigoDoMaterialAtual) {
        const qtdDeComprasDe2015Ate2020 = listaDeCompras.length

        for (var i = 0; i < qtdDeComprasDe2015Ate2020; i++) {
            const linkDoItem = listaDeCompras[i]._links.Itens.href.replace('/id/', '/doc/') + '.json'
            const itensDaCompra = await new Itens().obterItens(linkDoItem)

            if (itensDaCompra === linkDoItem || itensDaCompra === undefined) {
                await sleep(1500)
                continue
            }

            const indexDoMaterialAtual = itensDaCompra.findIndex(c => c.co_conjunto_materiais === parseInt(codigoDoMaterialAtual))

            if (itensDaCompra[indexDoMaterialAtual] === undefined) {
                await sleep(1500)
                continue
            }

            await new AtualizadorDeCompraSemLicitacao()
                .atualizarTabelaDeComprasSemLicitacao(listaDeCompras[i], itensDaCompra[indexDoMaterialAtual], codigoDoMaterialAtual)
        }
    }
}