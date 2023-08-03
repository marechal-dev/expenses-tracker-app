import { Ionicons } from "@expo/vector-icons"

import { StyleSheet, View, Pressable } from "react-native"

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  }
})

export function IconButton({ icon, size, color, onPress }) {
  function onIconButtonPress() {
    onPress()
  }
  
  return <Pressable
    style={({ pressed }) => pressed && styles.pressed}
    onPress={onIconButtonPress}
  >
    <View style={styles.buttonContainer}>
      <Ionicons name={icon} size={size} color={color} />
    </View>
  </Pressable>
}