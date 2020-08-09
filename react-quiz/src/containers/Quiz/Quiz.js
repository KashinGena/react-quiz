import React, {Component} from 'react'
// import classes from './Quiz.css'
import "./Quiz.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz"



export default class Quiz extends Component {
    state={
        quiz:[]
    }
    render() {
        return (
            <div className='Quiz'>
                
                <div className='QuizWrapper'>
                <h1>
                    Quiz
                </h1>
                    <ActiveQuiz/>
                </div>
            </div>
        )
    }
}