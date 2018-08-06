import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import AddressInput from './AddressInput';
import TransactionInfo from './TransactionInfo';

const isAddress = (address) =>  {
  return /^(0x)?[0-9a-f]{40}$/i.test(address);
}

class App extends Component {

  state = {
    addressValid: false,
    addressValue: '',
    addressError: '',
    addressMessage: '',
    completedTransactions: [],
    pendingTransactions: [],
    userValid: false,
    recaptchToken: null
  }

  componentDidMount() {
    
    let socket = io('/',{
      path: '/faucet/socket.io',
    });

    socket.on('pendingUpdate', data => {
      this.setState({
        pendingTransactions: data.reverse()
      })
    });

    socket.on('completedUpdate', data => {
      this.setState({
        completedTransactions: data.reverse()
      })
    });
    
  }

  onAddressChange(e){
    this.setState({
      addressValue: e,
      addressValid: isAddress(e),
      addressError: (e === '') ? '' : (isAddress(e) ?'': 'Incorrect address format'),
      addressMessage: '' 
    })
  }

  addAddress() {
    if(!this.state.addressValue) {
      this.setState({
        addressError: 'Please add wallet address',
        addressMessage: '' 
      })
      return;
    }
    if(this.state.addressValid){
      // Need to pass the address to the server
      fetch('donate/' + this.state.addressValue + '/' + this.state.recaptchaToken, {
        method: 'GET',
      })
      .then(res => res.json())
      .then(res => {
        this.resetRecaptcha();
        if(res.status && res.status === 'success'){
          this.setState({
            addressValue: '',
            addressValid: false,
            addressError: '',
            addressMessage: res.message
          }, () => {
            setTimeout(() => {
              this.setState({
                addressMessage: ''
              })
            }, 2000);
          })
        }else if(res.status && res.status === 'error'){
          this.setState({
            addressValid: false,
            addressError: res.message
          })
        }
      })
      .catch(err => {
        this.resetRecaptcha();
        this.setState({
          addressValid: false,
          addressError: 'There was an error when connecting to the server. Please try again ',
        })
      })

    }
  }
  
  captchaDemo = null;

  initializeRecaptchaElement(el) {
    this.captchaDemo = el;
  }
  
  verifyCallback(recaptchaToken){
    this.setState({
      userValid: true,
      recaptchaToken
    })
  }

  resetRecaptcha(){
    if(this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }
  render() {
    return (
      <div className="content">
        <div className="App">
          <div className="faucet container">
            <div className="row">
              <div className="col-lg-7   col-sm-12  balances">
                <div className="welcome-content">
                  <h1>Future of Payments</h1>
                  <p>
                    PumaPay enables flexible, fast and affordable cryptocurrency payments, allowing merchants to avoid the drawbacks of credit cards and other payment tools.
                  </p>
                  <div className="d-xs-block d-lg-none"><img src={require('./wallet-Icon.png')}></img></div>
                </div>
                <AddressInput 
                  addressValid={this.state.addressValid && this.state.userValid}
                  addressValue={this.state.addressValue}
                  addressError={this.state.addressError}
                  addressMessage={this.state.addressMessage}
                  onAddressChange={(e) => {
                    this.onAddressChange(e)
                  }}
                  resetRecaptcha = {this.resetRecaptcha.bind(this)}
                  verifyCallback = {this.verifyCallback.bind(this)}
                  onLoadRecaptcha = {this.resetRecaptcha.bind(this)}
                  initializeRecaptchaElement={this.initializeRecaptchaElement.bind(this)}
                  enableUser={(recaptchToken) => this.enableUser(recaptchToken)}
                  addAddress={this.addAddress.bind(this)}
                />
              </div>
              <div className="col-lg-5 ">
                  <div className="d-none d-lg-block"><img src={require('./wallet-Icon.png')}></img></div>
                  
              </div>
              
              <div className=" col-sm-12 history">
                <TransactionInfo completed={this.state.completedTransactions} pending={this.state.pendingTransactions} />
                
              </div>
             
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
