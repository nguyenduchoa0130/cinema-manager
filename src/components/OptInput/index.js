import React  from 'react';
import OtpInput from 'react-otp-input';

class OptInput extends React.Component{

  state = { otp: '' };
 
  handleChange = otp => this.setState({ otp });
 
  render() {
    return (
      <OtpInput
        value={this.state.otp}
        onChange={this.handleChange}
        numInputs={6}
        separator={<span>-</span>}
      />
    );
  }
}

export default OptInput;