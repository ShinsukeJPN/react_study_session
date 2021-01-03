import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { deleteTweet } from './Store';

class DelButton extends Component{
  constructor(props){
    super(props);
    this.doAction = this.doAction.bind(this);
  }

  doAction(e){
    e.preventDefault();
    console.log(this.props.index);
    let action = deleteTweet(this.props.index);
    this.props.dispatch(action);  
  }

  render(){
    return(
    <button onClick={this.doAction} index={this.props.index}>{this.props.value}</button>
    )
  }
}

export default connect((state)=>state)(DelButton);