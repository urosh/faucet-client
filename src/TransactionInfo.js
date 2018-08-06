import React, { Component } from 'react';
let i = 0;
const TransactionInfo = (props) => {
  return (
    <div className="row transactions-container">
      <div className="col-sm-12 col-md-6 transaction-block">
        <div className="transaction-info-label">Pending transactions </div>
        <div className="transactions-list-container pending">
          <ul className="transaction-list pending-list">
            {props.pending.map(id => <li key={i++}>{id}</li>)}

          </ul>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="transaction-info-label">Completed transactions</div>
        <div className="transactions-list-container completed">
          <ul className="transaction-list completed-list">
            {props.completed.map(id => <li key={i++}>{id}</li>)}

          </ul>
        </div>
      </div>

    </div>
  );
}

export default TransactionInfo;
