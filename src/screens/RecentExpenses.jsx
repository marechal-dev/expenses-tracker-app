import { useContext } from "react";
import { ExpensesOutput } from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/context/expenses-context";
import { getDateMinusDays } from "../utils/get-date-minus-days";

export function RecentExpenses() {
  const { expenses } = useContext(ExpensesContext)

  const recentExpenses = expenses.filter(
    expense => {
      const today = new Date()
      const dateSevenDaysAgo = getDateMinusDays(today, 7) 

      return (expense.date >= dateSevenDaysAgo) && (expense.date <= today);
    }
  )

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      fallback="No expenses registered for the last 7 days!"
      periodName="Last 7 Days"
    />
  )
}