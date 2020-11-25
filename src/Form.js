import React from 'react';
import './SubmitButton';
import './TweetList';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(){
    console.log("clicked");
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text"/>
        </form>
      </div>
    );
  }
}

export default Form;
