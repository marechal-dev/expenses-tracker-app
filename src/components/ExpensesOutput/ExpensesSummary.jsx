import { StyleSheet, View, Text } from "react-native"

import { colors } from "../../theme/colors"

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  periodNameText: {
    fontSize: 12,
    color: colors.primary400,
  },
  expensesSumText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary500,
  },
})

export function ExpensesSummary({ periodName, expenses }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount
  }, 0.0)
  
  return (
    <View style={styles.container}>
      <Text style={styles.periodNameText}>{periodName}</Text>
      <Text style={styles.expensesSumText}>R${expensesSum.toFixed(2)}</Text>
    </View>
  )
}