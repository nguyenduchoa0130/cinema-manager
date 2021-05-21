import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

export default function OptInput() {

  const [state, setState] = useState({ otp: '' })

  const handleChange = otp => setState({ otp });


  return (
    <OtpInput
      value={state.otp}
      onChange={handleChange}
      numInputs={6}
      separator={<span>-</span>}
    />
  );
}


export default OptInput;