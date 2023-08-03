import { StyleSheet, FlatList } from "react-native";
import { ExpenseItem } from "./ExpenseItem";

const styles = StyleSheet.create({})

function expenseKeyExtractor(expense) {
  return expense.id;
}

function renderExpenseItem({ item }) {
  return (
    <ExpenseItem
      id={item.id}
      description={item.description}
      date={item.date}
      amount={item.amount}
    />
  )
}

export function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={expenseKeyExtractor}
      renderItem={renderExpenseItem}
    />
  )
}