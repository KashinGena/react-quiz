import React from 'react'
import './ActiveQuiz.css'
import '../AnswerList/AnswerList'
import AnswerList from '../AnswerList/AnswerList'

 const ActiveQuiz = props => (

    <div className="ActiveQuiz">
        <p className='Question'>
            <span >
                <strong>1</strong>&nbsp;
                {props.question}
            </span>
            <small>{props.number} из 12</small>
        </p>
        <AnswerList
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
        />
    </div>
)

export default ActiveQuiz

