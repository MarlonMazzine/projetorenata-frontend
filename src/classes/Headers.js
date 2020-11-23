import React from 'react'

export default class Headers extends React.Component {
    obterContentTypeHeaderJson() {
        return { 
            "Content-type": "application/json; charset=UTF-8"
        }
    }
    
    obterContentTypeHeaderFormUrlEncoded() {
        return {
            "Content-Type": "application/x-www-form-urlencoded; charset=\"iso-8859-1\""
        }
    }
}