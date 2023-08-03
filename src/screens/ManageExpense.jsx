import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "../theme/colors";

import { IconButton } from "../components/UI/IconButton"
import { ExpensesContext } from "../store/context/expenses-context";
import { ExpenseForm } from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense as updateExpenseFirebase, deleteExpense as deleteExpenseFirebase } from "../utils/requests";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState()

  const expenseId = route.params?.expenseId
  const isEditing = !!expenseId

  const selectedExpense = expenses.find(
    expense => expense.id === expenseId
  )

  async function handleDeleteButtonPress() {
    setIsSubmitting(true)
    try {
      await deleteExpenseFirebase(expenseId)
      deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete your expense!")      
    }
    setIsSubmitting(false)
  }

  function handleCancelButtonPress() {
    navigation.goBack()
  }

  async function handleConfirm(expenseData) {
    setIsSubmitting(true)
    try {
      if (isEditing) {
        updateExpense(expenseId, expenseData)
        await updateExpenseFirebase(expenseId, expenseData)
      } else {
        const id = await storeExpense(expenseData)
        addExpense({
          id,
          ...expenseData
        })
      }
      
      navigation.goBack()
    } catch (error) {
      setError("Could not save your expense, please try again later!")
      setIsSubmitting(false)
    }
  }

  function handleOnErrorOverlayButtonPress() {
    setError(null)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense"
    })
  }, [navigation, isEditing])

  if (isSubmitting) {
    return (
      <LoadingOverlay />
    )
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={handleOnErrorOverlayButtonPress} />
  }

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