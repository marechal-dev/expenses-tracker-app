import { randomUUID } from "expo-crypto";
import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => { },
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state]
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        expense => expense.id === action.payload.id
      )
      const updatableExpense = state[updatableExpenseIndex]
      const updatedItem = { ...updatableExpense, ...action.payload.data }
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem
      return updatedExpenses
    case "SET":
      const inverted = action.payload.reverse()
      return inverted;
    case "DELETE":
      return state.filter(expense => expense.id !== action.payload)
    default:
      return state;
  }
}

export function ExpensesProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, [])

  function addExpense({ id, description, amount, date }) {
    dispatch({
      type: "ADD",
      payload: {
        id,
        description,
        amount,
        date
      },
    })
  }
  
  function setExpenses(expenses) {
    dispatch({
      type: "SET",
      payload: expenses
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
        setExpenses,
        deleteExpense,
        updateExpense
      }}
    >
      {children}
    </ExpensesContext.Provider>
  )
}
