import React, { Component } from 'react';

const TransactionInfo = (props) => {
  let pendingItems = props.pending.map(id => <li key={id}>{id}</li>)
  return (
    <div className="row transactions-container">
      <div className="col-sm-12 col-md-6">
        <div className="transaction-info-label">Pending transactions </div>
        <div className="transactions-list-container pending">
          <ul className="transaction-list pending-list">
            {props.pending.map(id => <li key={id}>{id}</li>)}

          </ul>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="transaction-info-label">Completed transactions</div>
        <div className="transactions-list-container completed">
          <ul className="transaction-list completed-list">
            {props.completed.map(id => <li key={id}>{id}</li>)}

          </ul>
        </div>
      </div>

    </div>
  );
}

export default TransactionInfo;
