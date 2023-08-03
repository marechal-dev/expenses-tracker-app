import { Ionicons } from "@expo/vector-icons"

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors } from "../theme/colors"

import { IconButton } from "../components/UI/IconButton";

import { AllExpenses } from "../screens/AllExpenses"
import { RecentExpenses } from "../screens/RecentExpenses"

const BottomTabs = createBottomTabNavigator()

export function TabsNavigation() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.primary500,
        },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: colors.primary500,
        },
        tabBarActiveTintColor: colors.accent500,
        headerRight: ({ tintColor }) => {
          return <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate("ManageExpense")}
          />
        },
      })}
    >
      <BottomTabs.Screen
        name='RecentExpenses'
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" color={color} size={size} />,
        }}
        component={RecentExpenses}
      />
      <BottomTabs.Screen
        name='AllExpenses'
        options={{
          title: "All Expenses",
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" color={color} size={size} />,
        }}
        component={AllExpenses}
      />
    </BottomTabs.Navigator>
  )
}
