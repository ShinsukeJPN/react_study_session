import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Form.css';
import favImage from './images/favorited.png';
import unFavImage from './images/unfavorited.png';
import AddForm from './AddForm';
import SubmitButton from './SubmitButton';
import Tweet from './Tweet'

class App extends Component {
  render(){
    return (
      <div>
        <AddForm />
        <SubmitButton />
        <Tweet />
      </div>
    );
  }
}

export default connect()(App);