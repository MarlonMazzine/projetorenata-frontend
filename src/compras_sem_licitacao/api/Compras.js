import React from 'react'

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
        const url = process.env.REACT_APP_URL_API_COMPRAS + "/compraSemLicitacao/v1/itens_compras_slicitacao.json?co_conjunto_materiais=" + codigosDosMateriais + "&order_by=dtDeclaracaoDispensa"
        var tentarDeNovo = false
        var tentativas = 0
        const maxTentativas = 5

        do {
            tentarDeNovo = await fetch(
                process.env.REACT_APP_TRATAMENTO_CORS + url
            ).then(async res => {
                if (res.status !== 200) {
                    await sleep(2000)
                    return true
                } else {
                    const resposta = await res.json()
                    obterComprasDe2015Ate2020(resposta._embedded.compras)
                    return false
                }
            }).catch(() => {
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