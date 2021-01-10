import React, { Component } from 'react';
import { connect } from 'react-redux';

import Item from './Item';

class Tweet extends Component {
  render(){
    let tweets;
    let n = 0;
    switch (this.props.mode){
      case 'default':
        tweets = this.props.tweets.map((value, i)=>(
          <Item key={n++} value={value} index={i} />
        ));
      break;

      case 'delete':
        tweets = this.props.tweets.map((value, i)=>(
          <Item key={n++} value={value} index={i} />
        ));
      break;

      default:
      tweets = this.props.tweets.map((value, i)=>(
        <Item key={n++} value={value} index={i} />
      ));
    };

    return(
    <div>{tweets}</div>
    );
  }
}

export default connect((state)=>state) (Tweet);