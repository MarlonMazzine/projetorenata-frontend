import React from 'react'

export default class Orgao extends React.Component {
    obterOrgao(nomeDoOrgao) {
        return nomeDoOrgao.replace(/.+:.(.+)/, '$1')
    }
}