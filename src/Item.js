import React, { Component } from 'react';
import { connect } from 'react-redux';

class Item extends Component{
  form = {
    marginLeft: "auto",
    marginRight: "auto",
    width: "300px",
  }

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

  render(){
    return (
    <ul className="list_item">
    {this.props.value.tweet} / {this.props.value.timeStamp}
    {/* <button onClick={this.deleteItem} data-id={i}>削除</button>
    <button onClick={this.copyClipBoardItem} data-text={value.tweet}>クリップ</button>
    リプ{value.replies.length} */}
    {/* {value.isFavorited ?
       <img src={favImage} data-id={i} style={this.fav} onClick={this.favoriteItem}/>
     :
       <img src={unFavImage} data-id={i} style={this.fav} onClick={this.favoriteItem}/>
    } */}
   {/* <button onClick={this.switchVisibilityReplyForm} data-id={i}>リプ</button>
     <form onSubmit={this.onReplySubmit} data-id={i}>
       <textarea onChange={this.onReplyChange} data-id={i} required="true" maxLength="140" key={i}/>
       {/* <textarea onChange={this.onReplyChange} data-id={i} required="true" maxLength="140" value={this.state.tweets[i].replyText} key={i}/> */}
       {/* <SubmitButton value="リプ"/> */}
    </ul>
  //   <div style={this.favoriteList}>
  //   <p>お気に入り</p>
  //   {this.state.favList.map((value, i)=>(
  //     <li key={i}>
  //       {value.tweet}
  //     </li>
  //   ))}
  // </div>
    );
  }
}

export default connect()(Item);