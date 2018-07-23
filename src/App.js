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
    completedTransactions: ['0x9d11DDd84198B30E56E31Aa89227344Cdb645e34', '0x9d11DDd84198B30E56E31Aa89227344Cdb645e34'],
    pendingTransactions: ['0x9d11DDd84198B30E56E31Aa89227344Cdb645e34', '0x9d11DDd84198B30E56E31Aa89227344Cdb645e34']
  }

  componentDidMount() {
    
    let socket = io('/',{
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
    if(this.state.addressValid){
      // Need to pass the address to the server
      fetch('donate/' + this.state.addressValue, {
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
              <div className="col-lg-8 offset-lg-2  col-sm-12  balances">
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
              
              <div className="col-lg-10 col-sm-12 offset-lg-1 history">
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
