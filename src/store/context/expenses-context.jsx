import { createContext, useReducer, useState } from "react";

import { randomUUID } from "expo-crypto"

const DUMMY = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2023-08-02"),
  },
  {
    id: "e2",
    description: "Xbox Series X",
    amount: 3500.99,
    date: new Date("2023-08-03"),
  },
  {
    id: "e3",
    description: "T-Shirt",
    amount: 49.99,
    date: new Date("2023-08-04"),
  },
  {
    id: "e4",
    description: "Book",
    amount: 14.99,
    date: new Date("2023-08-05"),
  },
  {
    id: "e5",
    description: "Another Book",
    amount: 14.99,
    date: new Date("2023-07-05"),
  },
  {
    id: "e6",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2023-08-02"),
  },
  {
    id: "e7",
    description: "Xbox Series X",
    amount: 3500.99,
    date: new Date("2023-08-03"),
  },
  {
    id: "e8",
    description: "T-Shirt",
    amount: 49.99,
    date: new Date("2023-08-04"),
  },
  {
    id: "e9",
    description: "Book",
    amount: 14.99,
    date: new Date("2023-08-05"),
  },
  {
    id: "e10",
    description: "Another Book",
    amount: 14.99,
    date: new Date("2023-07-05"),
  },
  {
    id: "e11",
    description: "Another Book",
    amount: 14.99,
    date: new Date("2023-08-01"),
  },
]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [{ ...action.payload }, ...state]
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        expense => expense.id === action.payload.id
      )
      const updatableExpense = state[updatableExpenseIndex]
      const updatedItem = { ...updatableExpense, ...action.payload.data }
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem
      return updatedExpenses
    case "DELETE":
      return state.filter(expense => expense.id !== action.payload)
    default:
      return state;
  }
}

export function ExpensesProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY)

  function addExpense({ description, amount, date }) {
    dispatch({
      type: "ADD",
      payload: {
        id: randomUUID(),
        description,
        amount,
        date
      },
    })
  }
  
  function deleteExpense(id) {
    dispatch({
      type: "DELETE",
      payload: id,
    })
  }

  function updateExpense(id, { description, amount, date }) {
    dispatch({
      type: "UPDATE",
      payload: {
        id,
        data: {
          description,
          amount,
          date
        },
      }
    })
  }
  
  return (
    <ExpensesContext.Provider
      value={{
        expenses: expensesState,
        addExpense,
        deleteExpense,
        updateExpense
      }}
    >
      {children}
    </ExpensesContext.Provider>
  )
}
