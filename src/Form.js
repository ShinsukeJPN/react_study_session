import React from 'react';
import SubmitButton from './SubmitButton';
import TweetItem from './TweetItem';

class Form extends React.Component {
  form = {
    marginLeft: "auto",
    marginRight: "auto",
    width: "300px",
  }

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
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
      data: state.data.concat({tweet: this.input, timeStamp: formatted_date}).reverse()
      
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

  render() {
    return (
      <div style={this.form}>
        <form onSubmit={this.onSubmit}>
          <textarea onChange={this.onChange} required="true" maxLength="140" />
          <SubmitButton value="ツイート"/>
        </form>

        {this.state.data.map((value, i)=>(
         <li key={i}>{value.tweet} / {value.timeStamp}<button onClick={this.deleteItem} data-id={i}>{i}を削除</button></li>
         ))}
      </div>
    );
  }
}

export default Form;
