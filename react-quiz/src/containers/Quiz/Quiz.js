import React, {Component} from 'react'
// import classes from './Quiz.css'
import "./Quiz.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz"



export default class Quiz extends Component {
    state={
        quiz:[
            {
                answers: [
                    {text:"Quiestion 1"},
                    {text:"Quiestion 2"},
                    {text:"Quiestion 3"},
                    {text:"Quiestion 4"}
                ]
            }
        ]
    }
    render() {
        return (
            <div className='Quiz'>
                
                <div className='QuizWrapper'>
                <h1>
                    Quiz
                </h1>
                    <ActiveQuiz
                        answers={this.state.quiz[0].answers}
                    />
                </div>
            </div>
        )
    }
}