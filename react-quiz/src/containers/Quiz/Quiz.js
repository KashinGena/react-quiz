import React, {Component} from 'react'
// import classes from './Quiz.css'
import "./Quiz.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz"
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'



export default class Quiz extends Component {
    state={
        results:{},
        isFinished:false,
        activeQuizNumber:0,
        answerState:null,
        quiz:[
            {
                question:"Какого цвета небо?",
               
                rigthAnswerId:3,
                answers: [
                    {text:"Синее", id:1},
                    {text:"Зеленое", id:2},
                    {text:"Голубое", id:3},
                    {text:"Черное", id:4}
                ]
            },

            {
                question:"В каком году основа Санкт-Петербург",
               
                rigthAnswerId:3,
                answers: [
                    {text:"1700", id:1},
                    {text:"1701", id:2},
                    {text:"1703", id:3},
                    {text:"1803", id:4}
                ]
            },
        ]
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key=Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key]==='success') return
        }
       
        const results=this.state.results
        const question=this.state.quiz[this.state.activeQuizNumber]
        if (answerId===question.rigthAnswerId) {
            if(results[this.state.activeQuizNumber]!=='error')
           results[this.state.activeQuizNumber]='success'
            this.setState(
                {
                    results,
                    answerState:{[answerId]:'success'},
                   
                }
            )

            const timeout=window.setTimeout(()=>{

                if (!this.isQuizFinished())
                {
                    this.setState(
                        {
                            activeQuizNumber:this.state.activeQuizNumber+1,
                            answerState:null
                        })
                }
                else {
                    this.setState(
                        {
                            isFinished:true
                        })
                }
    
                window.clearTimeout(timeout)
            },500)
          
        }
        else {
            results[this.state.activeQuizNumber]='error'
            this.setState({
                results,
                answerState:{[answerId]:'error'}
            })
        }
       

       

        console.log(this.state.results)
    }



    isQuizFinished() {
        return this.state.activeQuizNumber+1>=this.state.quiz.length
    }


    render() {
        return (
            <div className='Quiz'>
                
                <div className='QuizWrapper'>
                <h1>
                    Ответьте на все вопросы
                </h1>
                {
                    this.state.isFinished
                    ?
                   <FinishedQuiz
                   results={this.state.results}
                   quiz={this.state.quiz}
                   />
                    :
                    <ActiveQuiz
                    answers={this.state.quiz[this.state.activeQuizNumber].answers}
                    number ={this.state.activeQuizNumber+1}
                    question ={this.state.quiz[this.state.activeQuizNumber].question}
                    onAnswerClick={this.onAnswerClickHandler}
                    quizLength={this.state.quiz.length}
                    state={this.state.answerState}
                />
                }
                    
                </div>
            </div>
        )
    }
}