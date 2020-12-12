import React from 'react';
import SubmitButton from './SubmitButton';
import favImage from './images/favorited.png';
import unFavImage from './images/unfavorited.png';

const favSrcPath = './images/favorited.png';
const unFavSrcPath = './images/unfavorited.png';

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
      data: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.copyClipBoardItem = this.copyClipBoardItem.bind(this);
    this.favoriteItem = this.favoriteItem.bind(this);
  }

  onChange(e){
    this.input = e.target.value;
  }

  onSubmit(e){
    let d = new Date(),
        second = '' + d.getSeconds(),
        min  = '' + d.getMinutes(),
        hour = '' + d.getHours(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    let formatted_date = [year, month, day].join('-') + ' ' + hour + ':' + min + ':' + second;

    this.setState((state)=>({
      data: state.data.concat({tweet: this.input, timeStamp: formatted_date, isFavorited: false}).reverse()
      
    }));

    e.preventDefault();
  }

  deleteItem(e){
    let id = e.currentTarget.getAttribute('data-id');
    let deleted_data = this.state.data.splice(id, 1)
    this.setState((state)=>({
      data: state.data.reverse()
    }));
  }

  copyClipBoardItem(e){

  }

  favoriteItem(e){
    let id = e.currentTarget.getAttribute('data-id');
    const item = this.state.data.slice();
    item[id].isFavorited = true
    this.setState((state)=>({
      data: item
    }));
  }

  render() {
    return (
      <div style={this.form}>
        <form onSubmit={this.onSubmit}>
          <textarea onChange={this.onChange} required="true" maxLength="140" />
          <SubmitButton value="ツイート"/>
        </form>

        {this.state.data.map((value, i)=>(
         <li key={i}>
           {value.tweet} / {value.timeStamp}
           <button onClick={this.deleteItem} data-id={i}>削除</button>
           <button onClick={this.copyClipBoardItem} data-text={value.tweet}>クリップボードにコピー</button>
           {this.isFavorited ?
              <img src={favSrcPath} data-id={i} style={this.fav} onClick={this.favoriteItem}/>
            :
              <img src={unFavSrcPath} data-id={i} style={this.fav} onClick={this.favoriteItem}/>
           }
         </li>
         ))}
      </div>
    );
  }
}

export default Form;
