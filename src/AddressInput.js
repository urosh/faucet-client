import React, { Component } from 'react';
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-google';

class AddressInput extends Component{
  
  componentDidMount(){
    loadReCaptcha();
    this.props.onLoadRecaptcha();
  }

  render(){
    return (
      <div className="address-input-container row">
        <div className="col-sm-12 faucet-title"><h4>PMA Faucet</h4><span>(Limit of 50 per day)</span></div>
        <div className="address-input-field text-input col-sm-12 col-md-9">
          
          <label className="address-input-label">Enter your address</label>
          <input
            type="text"
            className={this.props.addressInvalid ? 'error' : ''}
            placeholder=""
            value={this.props.addressValue}
            onChange={(e) => {
              return this.props.onAddressChange(e.currentTarget.value);
            }}
          />
          <div className="address-error-container">
            {(!this.props.addressValid ? this.props.addressError : '')}
          </div>
          <div className="address-message-container">
            {this.props.addressMessage}
          </div>
          
        </div>
        <div className="address-input-field button-input col-sm-12 col-md-3">
          <button
            onClick={() => this.props.addAddress()}
            className={"custom-btn donate "}
            text="Donate" > Submit </button>
  
        </div>
        <div className="col-sm-12 recaptcha-container">
          <ReCaptcha
            ref={(el) => this.props.initializeRecaptchaElement(el)}
            size="normal"
            data-theme="dark"            
            render="explicit"
            sitekey="6LeiY2cUAAAAAGaQA0WBoNQtRd8J9cmjUUD5Zi-p"
            onloadCallback={this.props.onLoadRecaptcha.bind(this)}
            verifyCallback={this.props.verifyCallback}
          />
        </div>
  
      </div>
    );

  }
}

export default AddressInput;
