import React from 'react';
import './App.css';
import Layout from "./hoc/Layout/Layout"
import Quiz from './containers/Quiz/Quiz'
import { Switch, Route } from 'react-router-dom';
import QuizList from '../src/containers/QuizList/QuizList'
import Auth from '../src/containers/Auth/Auth'
import QuizCreator from '../src/containers/QuizCreator/QuizCreator'


function App() {
  return (
    <Layout>
     
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/quiz-creator' component={QuizCreator}/>
        <Route path='/quiz/:id' component={Quiz}/>
        <Route path ='/' component={QuizList}/>
      </Switch>
    </Layout>
  );
}

export default App;
