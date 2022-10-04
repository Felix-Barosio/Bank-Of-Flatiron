import React, { useState } from "react";

function AddTransactionForm(props) {

  const transactions = props.transactions;
  const setTransactions = props.setTransactions;

  const [transactionState, formData] = useState({});

  function handleTransactionSubmit(e) {
    e.preventDefault();
    fetch('http://127.0.0.1:8001/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(transactionState)
    })
      .then(res => res.json())
      .then(data => {
        setTransactions([
          ...transactions,
          data
        ]);
      })
  }

  function handleTransactionChange(e) {
    formData({
      ...transactionState,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="ui segment">
      <form onSubmit={handleTransactionSubmit} className="ui form">
        <div className="inline fields">
          <input onChange={handleTransactionChange} type="date" name="date" />
          <input onChange={handleTransactionChange} type="text" name="description" placeholder="Description" />
          <input onChange={handleTransactionChange} type="text" name="category" placeholder="Category" />
          <input onChange={handleTransactionChange} type="number" name="amount" placeholder="Amount" step="0.01" />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
