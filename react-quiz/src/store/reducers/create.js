import { CREATE_QUIZ_QUESTION, CREATE_QUIZ_ERROR, CREATE_QUIZ_SUCCESS } from "../actions/actionsTypes"

const initialState ={
    quiz:[]
}


export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_QUIZ_QUESTION:
            return {
                ...state, 
                quiz:[...state.quiz,action.item]
            }
       

        case CREATE_QUIZ_SUCCESS:
                return {
                    ...state, quiz:[]
                }
        case CREATE_QUIZ_ERROR:
                return  {
                    ...state,  error:action.error
                }
        default:
            return state
    }
}