import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TabsNavigation } from "./tabs-navigation";

import { ManageExpense } from "../screens/ManageExpense" 
import { colors } from "../theme/colors";

const Stack = createNativeStackNavigator();

export function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary500,
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="ExpensesOverview"
        options={{
          headerShown: false,
        }}
        component={TabsNavigation}
      />

      <Stack.Screen
        name="ManageExpense"
        options={{
          presentation: "modal"
        }}
        component={ManageExpense}
      />
    </Stack.Navigator>
  )
}
