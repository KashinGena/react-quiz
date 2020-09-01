import React, {Component} from 'react'
// import classes from './Quiz.css'
import "./Quiz.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz"
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Axios from 'axios'
import Loader from '../../components/UI/Loader/Loader'



export default class Quiz extends Component {
    state={
        loading:true,
        results:{},
        isFinished:false,
        activeQuizNumber:0,
        answerState:null,
        quiz:[]
    }


    async componentDidMount() {
        try {
            const response = await Axios.get(`https://quiz-34eaa.firebaseio.com/quiz/${this.props.match.params.id}.json`)
            const quiz=response.data
            console.log(quiz)
            
           
            this.setState({
                quiz,
                loading:false
            })
        }
        catch (error) {
            console.log(error)
        }
      
    }



    onAnswerClickHandler = (answerId) => {
        console.log(this.state.quiz[this.state.activeQuizNumber].rigthAnswerId)
        console.log(answerId)
        if (this.state.answerState) {
            const key=Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key]==='success') return
        }
       
        const results=this.state.results
        const question=this.state.quiz[this.state.activeQuizNumber]
        console.log(question)
        if (answerId===question.rightAnswerId) {
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
                {this.state.loading
                ?
                <Loader/>
                :
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