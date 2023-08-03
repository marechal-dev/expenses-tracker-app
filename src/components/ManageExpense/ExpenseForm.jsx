import { useState } from "react"
import { StyleSheet, View, Text } from "react-native"

import { dateToHumanString } from "../../utils/date-to-human-string"

import { Button } from "../UI/Button"
import { Input } from "./Input"
import { colors } from "../../theme/colors"

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  rowInputsContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: colors.error500,
    fontWeight: "bold",
    margin: 8,
  },
})

export function ExpenseForm({ defaultValues, submitButtonLabel, onSubmit, onCancel }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? String(defaultValues.amount) : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? dateToHumanString(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  })

  function handleInputChange(inputIdentifier, value) {
    setInputs(oldState => {
      return {
        ...oldState,
        [inputIdentifier]: {
          value,
          isValid: true,
        },
      }
    })
  }

  function handleSubmitForm() {
    const [day, month, year] = inputs.date.value.split("/")

    const formattedDate = `${year}-${month}-${day}`;

    const expense = {
      amount: Number(inputs.amount.value),
      date: new Date(formattedDate),
      description: inputs.description.value
    }

    const amountIsValid = !Number.isNaN(expense.amount) && expense.amount > 0
    const dateIsValid = expense.date.toString() !== "Invalid Date"
    const descriptionIsValid = expense.description.trim().length > 0

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs(oldState => {
        return {
          amount: {
            value: oldState.amount.value,
            isValid: amountIsValid
          },
          date: {
            value: oldState.date.value,
            isValid: dateIsValid
          },
          description: {
            value: oldState.description.value,
            isValid: descriptionIsValid
          },
        }
      })
      return;
    }

    onSubmit(expense)
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Your Expense</Text>
      <View
        style={styles.rowInputsContainer}
      >
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (text) => handleInputChange("amount", text),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "DD/MM/YYYY",
            maxLength: 10,
            onChangeText: (text) => handleInputChange("date", text),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: (text) => handleInputChange("description", text),
          value: inputs.description.value,
        }}
      />
      {
        formIsInvalid && (
          <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>
        )
      }
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.button}
          mode="flat"
          onPress={onCancel}
        >Cancel</Button>
        <Button
          style={styles.button}
          onPress={handleSubmitForm}
        >
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  )
}