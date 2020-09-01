import React from 'react'
import './QuizList.css'
import { NavLink } from 'react-router-dom'
import Axios from 'axios'

export default class QuizList extends React.Component{
    renderQuizList() {
      return  [1,2,3].map((quiz,index) => {
            return (
                <li  key={index}
                className=''>
                    <NavLink          
                    to={'quiz/' + index}>
                        Тест {quiz}
                    </NavLink>
                </li>
                
            )
        })
    }

    componentDidMount() {
        Axios.get('https://quiz-34eaa.firebaseio.com/quiz.json').then(response => {
            console.log(response)
        })
    }

    render() {
        return (
            <div className='QuizList'>
                <div>
                    <h1>Список тестов</h1>
                <ul>{this.renderQuizList()}</ul> 
                </div>
                
            </div>
        )
    }
}