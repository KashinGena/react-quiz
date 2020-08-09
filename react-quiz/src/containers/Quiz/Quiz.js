import React, {Component} from 'react'
// import classes from './Quiz.css'
import "./Quiz.css"



export default class Quiz extends Component {
    state={
        quiz:[]
    }
    render() {
        return (
            <div className='Quiz'>
                <h1>
                    Quiz
                </h1>
            </div>
        )
    }
}