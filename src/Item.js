import React, { Component } from 'react';
import { connect } from 'react-redux';
import DelButton from './DelButton'
import { clipboardTweet } from './Store'
import AddFavorite from './AddFavorite';

class Item extends Component{
  fav = {
    width: "20px",
    height: "20px"
  }
  
  favoriteList = {
    marginLeft: "auto",
    marginRight: "auto",
    width: "300px"
  }

  replyForm = {
    display: "none"
  }

  constructor(props){
    super(props)
    this.copyClipBoardItem = this.copyClipBoardItem.bind(this);
  }

  copyClipBoardItem(e){
    let action = clipboardTweet(this.props.value.tweet);
    this.props.dispatch(action);
    this.state = {
      text: this.props.text
    }
  }

  render(){
    return (
    <ul className="list_item">
    {this.props.value.tweet} / {this.props.value.timeStamp} / {this.props.value.isFavorited}
    <DelButton value="削除" index={this.props.index}/>
    
    <button onClick={this.copyClipBoardItem}>クリップ</button>
    <AddFavorite index={this.props.index}/>
    </ul>
    );
  }
}

export default connect()(Item);