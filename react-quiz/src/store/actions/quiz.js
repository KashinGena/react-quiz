import Axios from "axios";
import { FETCH_QUIZES_SUCCESS, FETCH_QUIZES_START, FETCH_QUIZES_ERROR } from "./actionsTypes";

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