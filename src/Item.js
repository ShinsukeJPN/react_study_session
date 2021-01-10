import React, { Component } from 'react';
import { connect } from 'react-redux';
import DelButton from './DelButton'
import { favoriteTweet } from './Store';
import { clipboardTweet } from './Store'
import favImage from './images/favorited.png';
import unFavImage from './images/unfavorited.png';

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
    this.favAction = this.favAction.bind(this);
    this.copyClipBoardItem = this.copyClipBoardItem.bind(this);
  }

  favAction(e){
    let action = favoriteTweet(this.props.index);
    this.props.dispatch(action);
    this.state = {
      index: 0
    }
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
      {this.props.value.isFavorited ?
        <img src={favImage} index={this.props.index} style={this.fav} onClick={this.favAction}/>
      :
        <img src={unFavImage} index={this.props.index} style={this.fav} onClick={this.favAction}/>
      }
    </ul>
    );
  }
}

export default connect()(Item);