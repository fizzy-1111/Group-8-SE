import React from "react";
import { SafeAreaView } from "react-native";
import { icons, Colors } from "../constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feedk, FA, Feed, Profile } from "../screens";
import TabComponent from "./TabButton";
const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
        }}
        screenOpitons={{
          tabBarHideOnKeyboard: true,
          tabBarVisible: false,
        }}
        const
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors.whiteColor,
            position: "absolute",
            bottom: 25,
            marginHorizontal: 20,
            height: 60,
            borderRadius: 10,
            //shadowColor: "#000",
            // shadowOpacity: 0.06,
            // shadowOffset: {
            //   width: 10,
            //   height: 10,
            // },
          },
        }}
      >
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarButton: (props) => (
              <TabComponent iconname={icons.feed} {...props} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Food Analysis"
          component={FA}
          options={{
            tabBarButton: (props) => (
              <TabComponent iconname={icons.checklist} {...props} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="About us"
          component={Feedk}
          options={{
            tabBarButton: (props) => (
              <TabComponent iconname={icons.about} {...props} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarButton: (props) => (
              <TabComponent iconname={icons.profile} {...props} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
export default Tabs;
