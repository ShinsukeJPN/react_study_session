import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Form.css';
import AddForm from './AddForm';
import SubmitButton from './SubmitButton';
import Tweet from './Tweet'

class App extends Component {
  render(){
    return (
      <div>
        <AddForm />
        <Tweet />
      </div>
    );
  }
}

export default connect()(App);