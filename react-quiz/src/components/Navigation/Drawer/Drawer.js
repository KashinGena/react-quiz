import React, {Component} from 'react'
import './Drawer.css'
import BackDrop from '../../UI/Backdrop/Backdrop'

const links=[1,2,3]

export default class Drawer extends Component {

    renderLinks(){
        return links.map((link,index)=>{
            return (
            <li className='Link'
            key={index}>
               <a >Ссылка {link}</a> 
                </li>
            )
        })
    }


    render(){
        return (
            <>
            <nav className='Drawer'>
                <ul>
                    {this.renderLinks()}
                </ul>
            </nav>
            <BackDrop onClick={this.props.onClick}/>
            </>
        )
    }
}