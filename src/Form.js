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

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      text: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.copyClipBoardItem = this.copyClipBoardItem.bind(this);
    this.favoriteItem = this.favoriteItem.bind(this);
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

    const tweetList = this.state.data.concat({tweet: this.state.text, timeStamp: formatted_date, isFavorited: false});

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
  favoriteItem(e){
    let id = e.currentTarget.getAttribute('data-id');
    const item = this.state.data.slice();
    item[id].isFavorited = !item[id].isFavorited
    this.setState((state)=>({
      data: item
    }));
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

  render() {
    return (
      <div style={this.form}>
        <form onSubmit={this.onSubmit}>
          <textarea onChange={this.onChange} required="true" maxLength="140" value={this.state.text}/>
          <SubmitButton value="ツイート"/>
        </form>

        {this.state.data.map((value, i)=>(
         <li key={i}>
           {value.tweet} / {value.timeStamp}　{i}
           <button onClick={this.deleteItem} data-id={i}>削除</button>
           <button onClick={this.copyClipBoardItem} data-text={value.tweet}>クリップボードにコピー</button>
           {value.isFavorited ?
              <img src={favImage} data-id={i} style={this.fav} onClick={this.favoriteItem}/>
            :
              <img src={unFavImage} data-id={i} style={this.fav} onClick={this.favoriteItem}/>
           }
         </li>
         )).reverse()}
      </div>
    );
  }
}

export default Form;
