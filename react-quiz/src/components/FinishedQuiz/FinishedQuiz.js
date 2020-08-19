import React from 'react'
import './FinishedQuiz.css'


const FinishedQuiz = (props) => {
    const sum=Object.keys(props.results).reduce((total,key) =>{
        if (props.results[key]==='success') total++
        return total
    },0)
    return (
        <div className='FinishedQuiz'>
            <ul>
                {props.quiz.map((quizItem,index)=>{
                    const cls=['fa', props.results[index]==='success'?'fa-check':'fa-times',props.results[index]]
                    console.log(cls)
                    return (
                        <li 
                        key={index}
                        >
                            <strong>{index+1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}></i>
                        </li>
                    )
                })}

            </ul>
            <p>Правильно {sum} из {props.quiz.length}</p>
            <div>
                <button>Повторить</button>
            </div>
        </div>
    )
}

export default FinishedQuiz