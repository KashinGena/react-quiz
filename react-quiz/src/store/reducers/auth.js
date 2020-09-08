import { AUTH_SUCCESS, AUTO_LOGOUT } from "../actions/actionsTypes"

const initiaState ={
    token:null
}

export default function authReducer(state =initiaState, action) {
    switch(action.type) {
        case AUTH_SUCCESS:
            return {
                ...state, token:action.token
            }
        case AUTO_LOGOUT: 
            return {
                ...state, token:null
            }
        
        default:
            return state
    }
}

