import { StyleSheet, Text, View } from "react-native"

import { ExpensesSummary } from "./ExpensesSummary"
import { ExpensesList } from "./ExpensesList"
import { colors } from "../../theme/colors"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
})

export function ExpensesOutput({ periodName, expenses, fallback }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary
        periodName={periodName}
        expenses={expenses}
      />

      {
        expenses.length === 0 ?
          <Text style={styles.infoText}>{fallback}</Text> :
          <ExpensesList
            expenses={expenses}
          />
      }
    </View>
  )
}
