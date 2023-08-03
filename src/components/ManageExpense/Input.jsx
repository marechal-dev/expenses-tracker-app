import { StyleSheet, View, Text, TextInput } from "react-native"
import { colors } from "../../theme/colors"

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    color: colors.primary100,
    marginBottom: 4,
  },
  invalidLabel: {
    color: colors.error500,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: colors.primary700,
  },
  invalidInput: {
    backgroundColor: colors.error50,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
})

export function Input({
  label,
  invalid,
  style,
  textInputConfig,
}) {
  const inputStyles = [
    styles.input,
  ];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline)
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput)
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput
        {...textInputConfig}
        cursorColor={colors.primary700}
        placeholderTextColor={colors.primary700}
        style={inputStyles}
      />
    </View>
  )
}