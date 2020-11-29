import React from 'react';
import SubmitButton from './SubmitButton';
import TweetList from './TweetList';
import TweetItem from './TweetItem';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.input = e.target.value;
  }

  onSubmit(e){
    let d = new Date(),
        min  = '' + d.getMinutes(),
        hour = '' + d.getHours(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    let formatted_date = [year, month, day].join('-') + ' ' + hour + ':' + min;

    this.setState((state)=>({
      data: state.data.concat({tweet: this.input, timeStamp: formatted_date}),
    }));
    e.preventDefault();
  }

  render() {
    let data = this.state.data.reverse();
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <textarea onChange={this.onChange} requeired="true" maxLength="140"/>
          <SubmitButton value="ツイート"/>
        </form>
        
        {data.map((value)=>(
         <TweetItem key={value.id} value={value.tweet} time={value.timeStamp}/>
         ))}
      </div>
    );
  }
}

export default Form;
