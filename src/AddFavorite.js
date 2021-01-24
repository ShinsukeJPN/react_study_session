import React, { Component } from 'react';
import { connect } from 'react-redux';
import { favoriteTweet } from './Store';
import favImage from './images/favorited.png';
import unFavImage from './images/unfavorited.png';

class AddFavorite extends Component{
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
  }

  favAction(e){
    let action = favoriteTweet(this.props.index);
    this.props.dispatch(action);
    this.state = {
      index: 0
    }
  }

  render(){
    return (
      <React.Fragment>
        {this.props.tweets[this.props.index].isFavorited ?
          <img src={favImage} index={this.props.index} style={this.fav} onClick={this.favAction}/>
        :
          <img src={unFavImage} index={this.props.index} style={this.fav} onClick={this.favAction}/>
        }
      </React.Fragment>
    );
  }
}

export default connect((state)=>state)(AddFavorite);