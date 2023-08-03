import { useContext } from "react";
import { ExpensesOutput } from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/context/expenses-context";

export function AllExpenses() {
  const { expenses } = useContext(ExpensesContext)

  return (
    <ExpensesOutput
      periodName="Total"
      fallback="You have no expenses at all! Julius would be proud ;)"
      expenses={expenses}
    />
  )
}