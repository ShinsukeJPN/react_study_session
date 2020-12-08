import React from 'react';

class TweetItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li key={this.props.test}>{this.props.value} / {this.props.time}</li>
    );
  }

}

export default TweetItem;
