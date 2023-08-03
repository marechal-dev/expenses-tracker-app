import { StyleSheet, View, Pressable, Text } from "react-native";

import { colors } from "../../theme/colors";
import { dateToHumanString } from "../../utils/date-to-human-string"
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
  },
  pressableContainer: {
    flex: 1,
    width: "100%",
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: colors.gray500,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: colors.primary50,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    minWidth: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  amountText: {
    color: colors.primary500,
    fontWeight: "bold"
  },
  pressed: {
    opacity: 0.75,
  },
})

const ANDROID_RIPPLE_SETTINGS = {
  color: colors.gray500
}

export function ExpenseItem({ id, description, amount, date }) {
  const navigation = useNavigation()
  
  function onExpensePress() {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    })
  }
  
  return (
    <View
      style={styles.outerContainer}
    >
      <Pressable
        style={({ pressed }) => pressed ? [styles.pressableContainer, styles.pressed] : [styles.pressableContainer]}
        android_ripple={ANDROID_RIPPLE_SETTINGS}
        onPress={onExpensePress}
      >
        <View style={styles.expenseItem}>
          <View style={styles.dataWrapper}>
            <Text style={[styles.textBase, styles.descriptionText]}>{description}</Text>
            <Text style={styles.textBase}>{dateToHumanString(date)}</Text>
          </View>
          
          <View style={styles.amountContainer}>
            <Text style={[styles.textBase, styles.amountText]}>R${amount.toFixed(2)}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}