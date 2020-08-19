import React from 'react'
import './ActiveQuiz.css'
import '../AnswerList/AnswerList'
import AnswerList from '../AnswerList/AnswerList'

 const ActiveQuiz = props => (

    <div className="ActiveQuiz">
        <p className='Question'>
            <span >
                <strong>{props.number}</strong>&nbsp;
                {props.question}
            </span>
            <small>{props.number} из {props.quizLength}</small>
        </p>
        <AnswerList
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
            state={props.state}
        />
    </div>
)

export default ActiveQuiz

