import React from 'react'
import './QuizList.css'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import {fetchQuizes} from '../../store/actions/quiz';

 class QuizList extends React.Component{



    renderQuizList() {
      return  this.props.quizes.map((quiz,index) => {
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
        this.props.fetchQuizes()
        // try {
        //     const response = await Axios.get('https://quiz-34eaa.firebaseio.com/quiz.json')
        //     console.log(response.data);
            
        //     const quizes=[]
        //     Object.keys(response.data).forEach((key, index) => {
        //         quizes.push({
        //             id:key,
        //             name:`Тест № ${index+1}`
        //         })
        //     })
            
        //     this.setState({
        //         quizes,
        //         loading:false
        //     })
        // }
        // catch (error) {
        //     console.log(error)
        // }
      
    }

    render() {
        return (
            <div className='QuizList'>
                <div>
                    <h1>Список тестов</h1>
                <ul>{this.renderQuizList()}</ul> 
                {this.props.loading && this.props.quizes.length!==0?<Loader/>:null}
                </div>
                
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        quizes:state.quiz.quizes,
        loading:state.quiz.loading
    }

}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)