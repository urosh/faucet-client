import React, { Component } from 'react';

const AddressInput = props => {
  return (
    <div className="address-input-container row">
      <div className="address-input-field text-input col-sm-12 col-md-9">
        <label className="address-input-label">Enter your address</label>
        <input
          type="text"
          className={props.addressInvalid ? 'error' : ''}
          placeholder=""
          value={props.addressValue}
          onChange={(e) => {
            return props.onAddressChange(e.currentTarget.value);
          }}
        />
        <div className="address-error-container">
          {(!props.addressValid ? props.addressError : '')}
        </div>
        <div className="address-message-container">
          {props.addressMessage}
        </div>    
      </div>
      <div className="address-input-field button-input col-sm-12 col-md-3">
        <button
          onClick={() => props.addAddress()}
          className={"custom-btn donate " + (props.addressValid ? '' : ' disabled')}
          text="Donate" > Donate </button>

      </div>

    </div>
  );
}

export default AddressInput;
