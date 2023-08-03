import { StyleSheet, View, ActivityIndicator } from "react-native";

import { colors } from "../../theme/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: colors.primary700
  },
})

export function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="white"
      />
    </View>
  )
}