import React from 'react'
import './QuizList.css'
import { NavLink } from 'react-router-dom'
import Axios from 'axios'
import Loader from '../../components/UI/Loader/Loader'

export default class QuizList extends React.Component{

    state={
        quizes:[],
        loading:true
    }

    renderQuizList() {
      return  this.state.quizes.map((quiz,index) => {
            return (
                <li  key={quiz.id}
                className=''>
                    <NavLink          
                    to={'quiz/' + quiz.id}>
                         {quiz.name}
                    </NavLink>
                </li>
                
            )
        })
    }

    async componentDidMount() {
        try {
            const response = await Axios.get('https://quiz-34eaa.firebaseio.com/quiz.json')
            console.log(response.data);
            
            const quizes=[]
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id:key,
                    name:`Тест № ${index+1}`
                })
            })
            
            this.setState({
                quizes,
                loading:false
            })
        }
        catch (error) {
            console.log(error)
        }
      
    }

    render() {
        return (
            <div className='QuizList'>
                <div>
                    <h1>Список тестов</h1>
                <ul>{this.renderQuizList()}</ul> 
                {this.state.loading?<Loader/>:null}
                </div>
                
            </div>
        )
    }
}