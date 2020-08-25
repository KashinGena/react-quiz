import React, {Component} from 'react'
import './Drawer.css'
import BackDrop from '../../UI/Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'

const links=[
    {to:'/', label: 'Список тестов', exact:true},
    {to:'/quiz-creator', label: 'Создание тестов', exact:true},
    {to:'/quiz/:id', label: 'Тест', exact:true},
    {to:'/auth', label: 'Авторизация', exact:true},
]

export default class Drawer extends Component {

    clickHandler=()=> {
        this.props.onClick()
    }
    renderLinks(){
        return links.map((link,index)=>{
            return (
            <li className='Link'
            key={index}>
                    <NavLink to={link.to} 
                    exact={link.exact}
                    onClick={this.clickHandler}>
                   {link.label}
                    </NavLink> 
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