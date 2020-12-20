import React from 'react';
import SubmitButton from './SubmitButton';
import favImage from './images/favorited.png';
import unFavImage from './images/unfavorited.png';
import './Form.css';

class Form extends React.Component {
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

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      text: '',
      favList: []
    };

    this.onChange                  = this.onChange.bind(this);
    this.onSubmit                  = this.onSubmit.bind(this);
    this.deleteItem                = this.deleteItem.bind(this);
    this.copyClipBoardItem         = this.copyClipBoardItem.bind(this);
    this.favoriteItem              = this.favoriteItem.bind(this);
    this.switchVisibilityReplyForm = this.switchVisibilityReplyForm.bind(this);
    this.onReplyChange             = this.onReplyChange.bind(this);
    this.onReplySubmit             = this.onReplySubmit.bind(this);
  }

  // Assigns text state
  onChange(e){
    this.setState((state)=>({
      text: e.target.value
    }));
  }

  // tweets
  onSubmit(e){
    let d = new Date(),
        second = '' + d.getSeconds(),
        min  = '' + d.getMinutes(),
        hour = '' + d.getHours(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    let formattedDate = [year, month, day].join('-') + ' ' + hour + ':' + min + ':' + second;

    const tweetList = this.state.tweets.concat({tweet: this.state.text, timeStamp: formattedDate, isFavorited: false, replies: [], replyText: ""});

    this.setState((state)=>({
      tweets: tweetList,
      text: ''
    }));

    e.preventDefault();
  }

  // Delete
  deleteItem(e){
    let id = e.currentTarget.getAttribute('data-id');
    this.state.tweets.splice(id, 1)
    this.setState((state)=>({
      tweets: state.tweets.reverse()
    }));
  }

  // Favorite
  setFavList(items){
    const favList = items.filter(function(item){
      return item.isFavorited == true;
    });

    favList.sort(function(a, b){
      if(a.timeStamp > b.timeStamp) return -1;
      if(a.timeStamp < b.timeStamp) return 1;
      return 0
    })

    this.setState((state)=>({
      favList: favList
    }));
  }

  favoriteItem(e){
    let id = e.currentTarget.getAttribute('data-id');
    const items = this.state.tweets.slice();
    items[id].isFavorited = !items[id].isFavorited
    this.setState((state)=>({
      tweets: items,
    }));

    this.setFavList(items);
  }

  // Copy on clipboard
  copyClipBoardItem(e) {
    let text = e.currentTarget.getAttribute('data-text');
    if(navigator.clipboard){
        navigator.clipboard.writeText(text);
        return true;
    } else {
        return false;
    }
  }

  // Reply form
  switchVisibilityReplyForm(e){
    let target_form = e.currentTarget.children("form");
    target_form.className = "show"
  }

  onReplyChange(e){
    let id = e.currentTarget.getAttribute('data-id');
    // let text = e.target.value;
    // this.state.tweets[id].replyText = text;
    // this.setState((state)=>({
      // tweets: state.tweets
    // }));
    this.text = e.target.value;
  }

  onReplySubmit(e){
    let d = new Date(),
    second = '' + d.getSeconds(),
    min  = '' + d.getMinutes(),
    hour = '' + d.getHours(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    let formattedDate = [year, month, day].join('-') + ' ' + hour + ':' + min + ':' + second;

    let id = e.currentTarget.getAttribute('data-id')
    let ex_replies = this.state.tweets[id].replies;
    ex_replies.push({text: this.text, timeStamp: formattedDate});
    // let tweets = this.state.tweets[id].replies.push(ex_replies)
    this.setState((state)=>({
      tweets: state.tweets
    }));

    this.state.tweets[id].replyText = '';

    e.preventDefault();

  }

  // JSX rendering
  render() {
    return (
      <div style={this.form}>
        <form onSubmit={this.onSubmit}>
          <textarea onChange={this.onChange} required="true" maxLength="140" value={this.state.text}/>
          <SubmitButton value="ツイート"/>
        </form>

        {this.state.tweets.map((value, i)=>(
         <ul key={i} className="list_item">
           {value.tweet} / {value.timeStamp}
           <button onClick={this.deleteItem} data-id={i}>削除</button>
           <button onClick={this.copyClipBoardItem} data-text={value.tweet}>クリップ</button>
           リプ{value.replies.length}
           {value.isFavorited ?
              <img src={favImage} data-id={i} style={this.fav} onClick={this.favoriteItem}/>
            :
              <img src={unFavImage} data-id={i} style={this.fav} onClick={this.favoriteItem}/>
           }
             {value.replies.map((reply, ri)=>(
               <li key={"reply_" + ri}>
                 {reply.text} / {reply.timeStamp}
               </li>
             ))}
          <button onClick={this.switchVisibilityReplyForm} data-id={i}>リプ</button>
            <form onSubmit={this.onReplySubmit} data-id={i}>
              <textarea onChange={this.onReplyChange} data-id={i} required="true" maxLength="140" key={i}/>
              {/* <textarea onChange={this.onReplyChange} data-id={i} required="true" maxLength="140" value={this.state.tweets[i].replyText} key={i}/> */}
              <SubmitButton value="リプ"/>
            </form>
         </ul>
         )).reverse()}

        <div style={this.favoriteList}>
          <p>お気に入り</p>
          {this.state.favList.map((value, i)=>(
            <li key={i}>
              {value.tweet}
            </li>
          ))}
        </div>
      </div>
    );
  }
}

export default Form;
