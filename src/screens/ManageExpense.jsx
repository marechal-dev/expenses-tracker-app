import { useContext, useLayoutEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { colors } from "../theme/colors";

import { IconButton } from "../components/UI/IconButton"
import { Button } from "../components/UI/Button";
import { ExpensesContext } from "../store/context/expenses-context";
import { ExpenseForm } from "../components/ManageExpense/ExpenseForm";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: colors.primary200,
    alignItems: "center"
  },
})

export function ManageExpense({ navigation, route }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useContext(ExpensesContext)

  const expenseId = route.params?.expenseId
  const isEditing = !!expenseId

  const selectedExpense = expenses.find(
    expense => expense.id === expenseId
  )

  function handleDeleteButtonPress() {
    deleteExpense(expenseId);
    navigation.goBack();
  }

  function handleCancelButtonPress() {
    navigation.goBack()
  }

  function handleConfirm(expenseData) {
    if (isEditing) {
      updateExpense(expenseId, expenseData)
    } else {
      addExpense(expenseData)
    }
    
    navigation.goBack()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense"
    })
  }, [navigation, isEditing])

  return (
    <View style={styles.container}>
      <ExpenseForm
        defaultValues={selectedExpense}
        submitButtonLabel={isEditing ? "Edit" : "Add"}
        onCancel={handleCancelButtonPress}
        onSubmit={handleConfirm}
      />
      {
        isEditing &&
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={colors.error500}
            onPress={handleDeleteButtonPress}
          />
        </View>
      }
    </View>
  )
}