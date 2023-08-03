import { useContext, useEffect, useState } from "react";

import { ExpensesOutput } from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/context/expenses-context";
import { getDateMinusDays } from "../utils/get-date-minus-days";
import { fetchExpenses } from "../utils/requests";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";

export function RecentExpenses() {
  const { expenses, setExpenses } = useContext(ExpensesContext)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    const getRecentExpenses = async () => {
      setIsFetching(true)
      try {
        const expenses = await fetchExpenses()
        setExpenses(expenses)
      } catch (error) {
        setError("Could not fetch expenses!")
      }
      setIsFetching(false)
    }

    getRecentExpenses()
  }, [])

  function handleErrorButtonPress() {
    setError(null)
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={handleErrorButtonPress} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

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