import React, {Component} from 'react'
// import classes from './Quiz.css'
import "./Quiz.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz"



export default class Quiz extends Component {
    state={
        quiz:[
            {
                question:"Какого цвета небо?",
                number:1,
                rigthAnswerId:3,
                answers: [
                    {text:"Синее", id:1},
                    {text:"Зеленое", id:2},
                    {text:"Голубое", id:3},
                    {text:"Черное", id:4}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        console.log(answerId)
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
                        number ={this.state.quiz[0].number}
                        question ={this.state.quiz[0].question}
                        onAnswerClick={this.onAnswerClickHandler}
                    />
                </div>
            </div>
        )
    }
}