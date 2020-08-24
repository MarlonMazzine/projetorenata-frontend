import React from 'react'
import $ from 'jquery'

var listaDeComprasDe2015Ate2020 = []

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

function obterComprasDe2015Ate2020(compras) {
    var dataRecebida

    for (var compra in compras) {
        dataRecebida = new Date(compras[compra].dtDeclaracaoDispensa)

        if (dataRecebida.getFullYear() >= '2015') {
            listaDeComprasDe2015Ate2020.push(compras[compra])
        }
    }
}

export default class Compras extends React.Component {
    async obterCompras(codigosDosMateriais) {
        const url = "http://compras.dados.gov.br/compraSemLicitacao/v1/itens_compras_slicitacao.json?co_conjunto_materiais=" + codigosDosMateriais + "&order_by=dtDeclaracaoDispensa"
        var tentarDeNovo = false
        var tentativas = 0
        const maxTentativas = 10

        do {
            tentarDeNovo = await fetch(
                process.env.REACT_APP_TRATAMENTO_CORS + url
            ).then(async res => {
                debugger

                if (res.status !== 200) {
                    await sleep(2000)
                    return true
                } else {
                    const resposta = await res.json()
                    console.log(resposta)
                    obterComprasDe2015Ate2020(resposta._embedded.compras)
                    return false
                }
            }).catch((err) => {
                debugger
                return false
            })

            tentativas++
        } while (tentarDeNovo && tentativas < maxTentativas)

        if (tentativas === maxTentativas) {
            return 'O serviço da API não está disponível no momento. Tente novamente mais tarde.'
        }

        return listaDeComprasDe2015Ate2020
    }
}