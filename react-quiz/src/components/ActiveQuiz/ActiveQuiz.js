import React from 'react'
import './ActiveQuiz.css'
import '../AnswerList/AnswerList'
import AnswerList from '../AnswerList/AnswerList'

 const ActiveQuiz = props => (

    <div className="ActiveQuiz">
        <p className='Question'>
            <span >
                <strong>1</strong>&nbsp;
                How are you?
            </span>
            <small>4 из 12</small>
        </p>
        <AnswerList
            answers={props.answers}
        />
    </div>
)

export default ActiveQuiz

