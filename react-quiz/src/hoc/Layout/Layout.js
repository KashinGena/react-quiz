import React, {Component} from 'react'
import './Layout.css'

 export default class Layout extends Component {
    render() {
        return (
            <div className='Layout'>
                {this.props.children}
            </div>
        )
    }
}