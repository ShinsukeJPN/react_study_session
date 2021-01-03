import React,{ Componetn } from 'react';
import { connect } from 'react-redux';
import { delTweet } from './Store';

class DelButton extends Component{
  constructor(props){
    super(props);
    this.doAction = this.doAction.bind(this);
  }

  doAction(e){
    e.preventDefault();
    let action = addTweet(this.props.index);
    this.props.dispatch(action);  
  }

  render(){
    return(
      <button onClick={this.doAction} value={this.props.index}>削除</button>
    )
  }
}

export default connect((state)=>state)(DelButton);