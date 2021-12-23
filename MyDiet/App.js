
import { Text, View } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack"
import {NavigationContainer} from "@react-navigation/native"
import {FA,Feed,Intro1} from "./screens"
import Tabs from "./Navigation/tabs"
import * as React from 'react';
const Stack= createStackNavigator();
const HelloWorldApp = () => {
  return (
   <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName="Intro1"
      >
      <Stack.Screen name="Intro1" component={Tabs} /> 
      </Stack.Navigator>
    </NavigationContainer> 
  )
}
export default HelloWorldApp;