import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTweet } from './Store';
import SubmitButton from './SubmitButton'

class AddForm extends Component {
  form = {
    marginLeft: "auto",
    marginRight: "auto",
    width: "300px",
  }

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.doChange = this.doChange.bind(this);
    this.doAction = this.doAction.bind(this);
  }

  doChange(e){
    this.setState({
      text: e.target.value
    });
  }

  doAction(e){
    e.preventDefault();
    let action = addTweet(this.state.text);
    this.props.dispatch(action);
    this.setState({
      text: ''
    });
  }

  render(){
    return(
      <div style={this.form}>
        <form onSubmit={this.doAction}>
          <textarea onChange={this.doChange} required="true" maxLength="140" value={this.state.text}/>
          <SubmitButton value="ツイート"/>
        </form>
      </div>
    );
  }
}

export default connect((state)=>state)(AddForm);