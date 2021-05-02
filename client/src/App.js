import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

//components

// import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/:member/:client' component={ListTodos} />
      </Switch>
    </Router>
  );
}

export default App;
