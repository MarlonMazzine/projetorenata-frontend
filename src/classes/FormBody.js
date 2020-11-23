import React from 'react'

export default class FormBody extends React.Component {
    obterFormBody(informacoes) {
        var formBody = [];
            
        for (var property in informacoes) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(informacoes[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
    
        formBody = formBody.join("&");
        return formBody
    }
}