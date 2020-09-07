import Axios from "axios";
import { FETCH_QUIZES_SUCCESS,
         FETCH_QUIZES_START,
         FETCH_QUIZES_ERROR,
         FETCH_QUIZ_SUCCESS,
         QUIZ_SET_STATE,
         QUIZ_FINISHED,
         QUIZ_NOT_FINISHED,
         RETRY_QUIZ } from "./actionsTypes";

export  function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
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
            
            // this.setState({
            //     quizes,
            //     loading:false
            // })
            dispatch(fetchQuizesSuccess(quizes))
        }
        catch (error) {
            dispatch(fetchQuizesError(error))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type:FETCH_QUIZES_START
    }

}

export function fetchQuizesSuccess(quizes) {
    return {
        type:FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(error) {
    return {
        type:FETCH_QUIZES_ERROR,
        error
    }
}

export function fetchQuizById(id) {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {
            const response = await Axios.get(`https://quiz-34eaa.firebaseio.com/quiz/${id}.json`)
            const quiz=response.data
            dispatch(fetchQuizeSuccess(quiz))   
        }
        catch (error) {
            dispatch(fetchQuizesError(error))
        }
      
    }
}

export function fetchQuizeSuccess (quiz){
    return {
        type:FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function quizSetState(answerState,results) {
    return {
        type:QUIZ_SET_STATE,
        answerState, 
        results
    }
}
export function quizFinished() {
    return {
        type:QUIZ_FINISHED,
       
    }
}

export function quizNotFinished(activeQuizNumber) {
    return {
        type:QUIZ_NOT_FINISHED,
        activeQuizNumber
    }
}
export function quizAnswerClick (answerId) {
    return (dispatch, getState) => {
        const state=getState().quiz
        console.log(state)
        if (state.answerState) {
            const key=Object.keys(state.answerState)[0]
            if (state.answerState[key]==='success') return
        }
       console.log()
        const results=state.results
        const question=state.quiz[state.activeQuizNumber]
        console.log('Answer',answerId, 'Right answer', question.rightAnswerId)
        if (answerId===question.rightAnswerId) {
           
            if(results[state.activeQuizNumber]!=='error')
           results[state.activeQuizNumber]='success'
           dispatch(quizSetState({[answerId]:'success'},results))
           

            const timeout=window.setTimeout(()=>{

                if (!isQuizFinished(state))
                {
                   dispatch(quizNotFinished(state.activeQuizNumber))
                   console.log('Acrive',state.activeQuizNumber);
                   
                    // this.setState(
                    //     {
                    //         activeQuizNumber:this.state.activeQuizNumber+1,
                    //         answerState:null
                    //     })
                }
                else {
                    dispatch(quizFinished())
     
                }
    
                window.clearTimeout(timeout)
            },500)
          
        }
        else {
            results[state.activeQuizNumber]='error'
            dispatch(quizSetState({[answerId]:'error'},results))
            console.log('Answer state',results[state.activeQuizNumber])
            // this.setState({
            //     results,
            //     answerState:{[answerId]:'error'}
            // })
        }
       
        
       
    
    }
}

export function retryHandler() {
    return {
        type:RETRY_QUIZ
    }
}

function isQuizFinished(state) {
    return state.activeQuizNumber+1>=state.quiz.length
}