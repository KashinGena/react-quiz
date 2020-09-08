import React, {Component} from 'react'
import './Drawer.css'
import BackDrop from '../../UI/Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'



export default class Drawer extends Component {

    clickHandler=()=> {
        this.props.onClick()
    }
    renderLinks(){
        const links=[
            {to:'/', label: 'Список тестов', exact:true},
            
            
            
        ]

        if (this.props.isAuthenticated) {
            links.push({to:'/quiz-creator', label: 'Создание тестов', exact:true})
            links.push({to:'/logout', label: 'Выйти', exact:false})
        }
        else {
            links.push({to:'/auth', label: 'Авторизация', exact:true})
        }
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