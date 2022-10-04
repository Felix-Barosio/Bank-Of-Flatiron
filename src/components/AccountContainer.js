import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [search, setSearch] = useState("");
  const [transactions, handleTransactions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8001/transactions')
      .then(res => res.json())
      .then(data => {
        handleTransactions(data);
      });
  }, []);

  return (
    <div>
      <Search setSearch={setSearch} />
      <AddTransactionForm
        transactions={transactions}
        handleTransactions={handleTransactions}
      />
      <TransactionsList transactions={transactions.filter(transaction => {
        if (search === '') {
          return true;
        }
        return transaction.description.includes(search);
      })} />
    </div>
  );
}

export default AccountContainer;
