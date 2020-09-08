import Axios from "axios";
import { AUTH_SUCCESS, AUTO_LOGOUT } from "./actionsTypes";

export function authSuccess(token) {
    return {
        type:AUTH_SUCCESS,
        token
    }
}
export function autologin() {
    return dispatch => {
        const token = localStorage.getItem('tokenId')
        if (!token) {
            dispatch(logout())
        }
        else {
            const expirationDate=new Date(localStorage.getItem('expirationData'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            }else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime() -new Date().getTime())/1000))
                }
            }
        }
    }

export function logout() {
    localStorage.removeItem('TokenID')
    localStorage.removeItem('UserID')
    localStorage.removeItem('expirationData')
    return {
        type:AUTO_LOGOUT,
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        },time*1000)
    }
    
}


export function auth(email,password, isLogin) {
    return async dispatch => {

        const authData ={
            email,
            password,
            returnSecureToken:true

        }
        console.log(authData);
        
        
                
       
            const response= (isLogin)?
            Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDe26ov0RDg5hwwySnPg9jCdbSC7doYg8',
            authData )
            :
            await Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCDe26ov0RDg5hwwySnPg9jCdbSC7doYg8'
            ,
            authData )
            
           const data=response.data
           
           const expirationData=new Date(new Date().getTime + data.expiresIn*1000)

           localStorage.setItem('TokenID',data.idToken)
           localStorage.setItem('UserID',data.localId)
           localStorage.setItem('expirationData',expirationData)

           dispatch(authSuccess(data.idToken))
           dispatch(autoLogout(data.expiresIn))



           
       
            
       
       
    }
}