import React, {Component} from 'react'
// import classes from './Quiz.css'
import "./Quiz.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz"
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import {fetchQuizById,quizAnswerClick} from '../../store/actions/quiz';



class Quiz extends Component {
 


     componentDidMount() {
         this.props.fetchQuizById(this.props.match.params.id)

    }



    onAnswerClickHandler = (answerId) => {
        this.props.quizAnswerClick(answerId)
       
    }






    render() {
        return (
            <div className='Quiz'>
                
                <div className='QuizWrapper'>
                <h1>
                    Ответьте на все вопросы
                </h1>
                {this.props.loading || !this.props.quiz
                ?
                <Loader/>
                :
                this.props.isFinished
                    ?
                   <FinishedQuiz
                   results={this.props.results}
                   quiz={this.props.quiz}
                   />
                    :
                    <ActiveQuiz
                    answers={this.props.quiz[this.props.activeQuizNumber].answers}
                    number ={this.props.activeQuizNumber+1}
                    question ={this.props.quiz[this.props.activeQuizNumber].question}
                    onAnswerClick={this.props.quizAnswerClick}
                    quizLength={this.props.quiz.length}
                    state={this.props.answerState}
                />
                
                
                }
               
                    
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        loading:state.quiz.loading,
        results:state.quiz.results,
        isFinished:state.quiz.isFinished,
        activeQuizNumber:state.quiz.activeQuizNumber,
        answerState:state.quiz.answerState,
        quiz:state.quiz.quiz
    }

}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick : answerId => dispatch(quizAnswerClick(answerId))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Quiz)