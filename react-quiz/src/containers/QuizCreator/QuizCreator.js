import React from 'react'
import './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import { createControl } from '../../formFramework/formFramework'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import {validate, validateForm} from '../../formFramework/formFramework'
import Axios from 'axios'
import { connect } from 'react-redux'
import {finishCreateQuiz, createQuizQuestion} from '../../store/actions/create'



function createFormControls () {
    return {
        question:createControl({
            label:'Введите вопрос',
            errorMessage:'Вопрос не может быть пустым'

        },{required:true}),


        option1:createControl({
            label:'Вариант 1',
            id:1,
            errorMessage:'Поле не должно быть пустым'

        },{required:true}),

        option2:createControl({
            label:'Вариант 2',
            id:2,
            errorMessage:'Поле не должно быть пустым'
        },{required:true}),

        option3:createControl({
            label:'Вариант 3',
            id:3,
            errorMessage:'Поле не должно быть пустым'
        },{required:true}),

        option4:createControl({
            label:'Вариант 4',
            id:4,
            errorMessage:'Поле не должно быть пустым'
        },{required:true})
       

    }
}
 class QuizCreator extends React.Component{

    state={
       
        formControls:createFormControls(),
        rightAnswerId:1,
        isFormValid:false
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName,index) => {
            const control=this.state.formControls[controlName]
            return (
                <React.Fragment key={controlName + index}>
                <Input
                   
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    onChange={event => {this.onChangeHandler(event.target.value,controlName)}}

                />
                {index===0?<hr/>:null}
                </React.Fragment>
            )
        })
    }

    onChangeHandler = (value,controlName) => {
        console.log(this.state.isFormValid)
        const formControls={...this.state.formControls}
        const control={...formControls[controlName]}

        control.touched=true
        control.value=value
        control.valid=validate(control.value,control.validation)

        formControls[controlName]=control
        this.setState({
            formControls,
            isFormValid:validateForm(formControls)
        })

    }

    submitHandler = (event) => {
        event.preventDefault()
    }

    addQuestionHandler = (event) => {
        event.preventDefault()
      
        
        const questionItem ={
            question:this.state.formControls.question.value,
            id:this.props.quiz.length+1,
            rightAnswerId:this.state.rightAnswerId,
            answers: [
                {text:this.state.formControls.option1.value, id:this.state.formControls.option1.id},
                {text:this.state.formControls.option2.value, id:this.state.formControls.option2.id},
                {text:this.state.formControls.option3.value, id:this.state.formControls.option3.id},
                {text:this.state.formControls.option4.value, id:this.state.formControls.option4.id},
            ]
        }
        this.props.createQuizQuestion(questionItem)
        this.setState({
          
            isFormValid:false,
            rightAnswerId:1,
            formControls:createFormControls()
        })

    }

    addQuizHandler = async (event) => {
        event.preventDefault()
        this.props.finishCreateQuiz()
        
       
        
    }

    selectChangeHandler = (event) => {
        
        this.setState({
            rightAnswerId:+event.target.value
        })
    }
    
    render() {
        return (
            <div className='QuizCreator'> 
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderInputs()}
                        <Select
                            label='Выберите правильный ответ'
                            value={this.state.rightAnswerId}
                            onChange={(event) => {this.selectChangeHandler(event)}}
                            options ={[
                                {text:'1', value:1},
                                {text:'2', value:2},
                                {text:'3', value:3},
                                {text:'4', value:4}
                            ]}
                        />
                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>

                        <Button
                            type='success'
                            onClick={this.addQuizHandler}
                            disabled={this.props.quiz.length===0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        quiz:state.create.quiz
    }
}


function mapDispatchToProps (dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz : () => dispatch(finishCreateQuiz())
    }
    

}

export default connect(mapStateToProps,mapDispatchToProps)(QuizCreator)