import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Octicons";
import FeatherIcon from "react-native-vector-icons/Feather";
import Home from "./Home";
import SignIn from "./SignIn";
import Account from "./Account";
const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name={"home"} color="#FF7B1C" size={26} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <FeatherIcon name={"user"} color="#95969B" size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
