import React from 'react';

class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button type="submit">{this.props.value}</button>
    );
  }
}

export default SubmitButton;
