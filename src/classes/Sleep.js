import React from 'react'

export default class Sleep extends React.Component {
    sleep(ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }
}