import { CREATE_QUIZ_QUESTION, CREATE_QUIZ_SUCCESS,CREATE_QUIZ_ERROR } from "./actionsTypes";
import Axios from "axios";


export function createQuizQuestion(item) {
    return {
        type:CREATE_QUIZ_QUESTION, 
        item
    }
}


export function createQuizSuccess() {
    return {
        type:CREATE_QUIZ_SUCCESS
    }
}

export function createQuizError(error) {
    return {
        type:CREATE_QUIZ_ERROR,
        error
        
    }
}


export function finishCreateQuiz() {
    return async (dispatch,getState) => {
        try {
            const state=getState().create
            console.log('quiz1',state)
            const response =await Axios.post('https://quiz-34eaa.firebaseio.com/quiz.json',state.quiz)
            console.log(response.data)
            dispatch(createQuizSuccess())
            console.log('quiz2',state)
         
        }
        catch(error) {
            dispatch(createQuizError(error))
        }
    }
}
   