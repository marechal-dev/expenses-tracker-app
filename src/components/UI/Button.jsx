import { StyleSheet, View, Text, Pressable } from "react-native";
import { colors } from "../../theme/colors";

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: colors.primary500,
  },
  flat: {
    backgroundColor: "transparent"
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: colors.primary100,
    borderRadius: 4,
  },
})

export function Button({ style, mode, onPress, children }) {
  return (
    <View style={style}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={onPress}
      >
        <View style={[
          styles.button,
          mode === "flat" ? styles.flat : null,
        ]}>
          <Text style={[
            styles.buttonText,
            mode === "flat" ? styles.flatText : null,
          ]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}
