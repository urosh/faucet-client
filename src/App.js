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
    pendingTransactions: []
  }

  componentDidMount() {
    
    let socket = io('ws://localhost:3233', {
      path: '/faucet/socket.io',
    });

    socket.on('pendingUpdate', data => {
      this.setState({
        pendingTransactions: [...data]
      })
    });

    socket.on('completedUpdate', data => {
      this.setState({
        completedTransactions: [...data]
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
    console.log('TEST', this.state.addressValid);
    if(this.state.addressValid){
      // Need to pass the address to the server
      fetch('http://localhost:3233/donate/' + this.state.addressValue, {
        method: 'GET',
      })
      .then(res => res.json())
      .then(res => {
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

    }
  }


  render() {
    return (
      <div className="content">
        <div className="App">
          <div className="faucet container">
            <div className="row">
              <div className="col-sm-8 offset-sm-3  balances">
                <AddressInput 
                  addressValid={this.state.addressValid}
                  addressValue={this.state.addressValue}
                  addressError={this.state.addressError}
                  addressMessage={this.state.addressMessage}
                  onAddressChange={(e) => {
                    this.onAddressChange(e)
                  }}
                  addAddress={() => this.addAddress()}
                />
              </div>
              
              <div className="col-sm-8 offset-sm-2 history">
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
