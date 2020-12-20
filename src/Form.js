import React from 'react';
import SubmitButton from './SubmitButton';
import favImage from './images/favorited.png';
import unFavImage from './images/unfavorited.png';

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
      data: [],
      text: '',
      favList: [],
      replyText: ''
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

  // Tweet
  onSubmit(e){
    let d = new Date(),
        second = '' + d.getSeconds(),
        min  = '' + d.getMinutes(),
        hour = '' + d.getHours(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    let formatted_date = [year, month, day].join('-') + ' ' + hour + ':' + min + ':' + second;

    const tweetList = this.state.data.concat({tweet: this.state.text, timeStamp: formatted_date, isFavorited: false, replies: []});

    this.setState((state)=>({
      data: tweetList,
      text: ''
    }));

    e.preventDefault();
  }

  // Delete
  deleteItem(e){
    let id = e.currentTarget.getAttribute('data-id');
    this.state.data.splice(id, 1)
    this.setState((state)=>({
      data: state.data.reverse()
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
    const items = this.state.data.slice();
    items[id].isFavorited = !items[id].isFavorited
    this.setState((state)=>({
      data: items,
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

  switchVisibilityReplyForm(e){
    let target_form = e.currentTarget.children("form");
    target_form.className = "show"
  }

  onReplyChange(e){
    this.setState((state)=>({
      replyText: e.target.value
    }));
  }

  onReplySubmit(e){
    let id = e.currentTarget.getAttribute('data-id')
    console.log(this.state.data);
    this.setState((state)=>({
      data: "",
      replyText: ''
    }));

    e.preventDefault();

  }


//   let d = new Date(),
//   second = '' + d.getSeconds(),
//   min  = '' + d.getMinutes(),
//   hour = '' + d.getHours(),
//   month = '' + (d.getMonth() + 1),
//   day = '' + d.getDate(),
//   year = d.getFullYear();
// let formatted_date = [year, month, day].join('-') + ' ' + hour + ':' + min + ':' + second;


  render() {
    return (
      <div style={this.form}>
        <form onSubmit={this.onSubmit}>
          <textarea onChange={this.onChange} required="true" maxLength="140" value={this.state.text}/>
          <SubmitButton value="ツイート"/>
        </form>

        {this.state.data.map((value, i)=>(
         <li key={i}>
           {value.tweet} / {value.timeStamp} {i}
           <button onClick={this.deleteItem} data-id={i}>削除</button>
           <button onClick={this.copyClipBoardItem} data-text={value.tweet}>クリップボードにコピー</button>
           {value.isFavorited ?
              <img src={favImage} data-id={i} style={this.fav} onClick={this.favoriteItem}/>
            :
              <img src={unFavImage} data-id={i} style={this.fav} onClick={this.favoriteItem}/>
           }
             {value.replies.map((reply, ri)=>(
               <li>
                 {reply}
               </li>
             ))}
          {/* <button onClick={this.switchVisibilityReplyForm} data-id={i}>リプ */}
            <form onSubmit={this.onReplySubmit} data-id={i}>
              <textarea onChange={this.onReplyChange} required="true" maxLength="140" value={this.state.replyText}　key={i}/>
              <SubmitButton value="リプ"/>
            </form>
          {/* </button> */}
         </li>
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
