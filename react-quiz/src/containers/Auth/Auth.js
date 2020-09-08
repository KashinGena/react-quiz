import React from 'react'
import './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { auth } from '../../store/actions/auth'
import { connect } from 'react-redux'

 class Auth extends React.Component{
    state = {
        isFormValid:false,
        formControls:{
            email: {
                value: '',
                type: 'email',
                label: 'Логин',
                errorMessage: 'Введите корректный email!',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }


            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Неверный пароль!',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minlength: 6
                }

            }
        }
    }


    

    onChangeHandler = (event, controlName) => {
      
        const formControls={...this.state.formControls}
        const control={...formControls[controlName]}
        control.value=event.target.value
        control.touched=true
        control.valid=this.validateControl(control.value, control.validation)
        formControls[controlName]=control
        let isFormValid=true;
        Object.keys(formControls).forEach(name => {
            isFormValid=formControls[name].valid && isFormValid
        })
        this.setState({
            formControls, 
            isFormValid
        })
    }

    validateControl(value, validation) {
        if (!validation)  return true
        let isValid=true
        if (validation.required) {
            isValid=value.trim()!==''
        }

        if (validation.email) {
            
            isValid=this.validateEmail(value) && isValid
        }

        if (validation.minlength) {
           
            isValid=value.trim().length>=validation.minlength && isValid
        }
        return isValid
    }

     validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
     }

    loginHandler = () => {
        console.log(this.state.formControls.email.value,
            this.state.formControls.password.value);
        
        this.props.auth(this.state.formControls.email.value,
            this.state.formControls.password.value,true)
    
    }



    registerHandler =  () => {
        console.log(this.state.formControls.email.value,
            this.state.formControls.password.value);
        this.props.auth(this.state.formControls.email.value,
            this.state.formControls.password.value,false)

       
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control= this.state.formControls[controlName]
            return (
                <Input
                    key={controlName +index}
                    type={control.type}
                    value ={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={(event) => this.onChangeHandler(event, controlName)}

                
                />
            )
        })
    }


    render() {
        return (
            <div className='Auth'>
                <div>
                    <h1>Auth</h1>
                    <form className='Auth_form' onSubmit={this.onSubmitHandler}>
                       {/* <Input type='text' label ='Логин' value='Логин'/>
                       <Input type='password'  label ='Пароль' value='Пароль'/> */}
                       {this.renderInputs()}

                        <Button  disabled={!this.state.isFormValid} type='success' onClick={this.loginHandler}>Войти</Button>
                        <Button  disabled={!this.state.isFormValid} type='primary' onClick={this.registerHandler}>Регистрация</Button>
                    </form>
                </div>
               >
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        auth:(email,password,isLogin) => dispatch(auth(email,password,isLogin))
    }
    
}

export default connect(null, mapDispatchToProps)(Auth)