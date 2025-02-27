import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
// Actions
import { getTransactions } from "../../actions/expenseAction";

// Components
import { Transaction } from "./Transaction";

// Style
import styled from "styled-components";

//  icons

export const TransactionList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expensePerPage, setExpensePerPage] = useState(5);

  const { transactions } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  // Get current expenses
  const indexOfLastExpense = currentPage * expensePerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensePerPage;
  const currentExpense = transactions.slice(
    indexOfFirstExpense,
    indexOfLastExpense
  );

  // Next Expense
  const nextExpenseHandler = () => {
    if (transactions.length > 0) {
      let totalExpenses = transactions.length;
      let totalPages = Math.ceil(totalExpenses / expensePerPage);

      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      } else {
        setCurrentPage(totalPages);
      }
    }
  };

  // Prev expenses
  const prevExpenseHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <TransactionListStyle>
      <h3>History</h3>

      <ul className="list">
        {currentExpense.map((transaction) => (
          <Transaction
            key={transaction._id}
            className="lis"
            transaction={transaction}
          />
        ))}
      </ul>
      <button onClick={prevExpenseHandler}>Prev</button>
      <button onClick={nextExpenseHandler}>Next</button>
    </TransactionListStyle>
  );
};

const TransactionListStyle = styled.div`
  h3 {
    color: #fff;
  }
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }
`;
