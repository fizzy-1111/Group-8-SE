
import { Text, View } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack"
import {NavigationContainer} from "@react-navigation/native"
import {Home,Feed} from "./screens"
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
          initialRouteName="Tabs"
      >
      <Stack.Screen name="Tabs" component={Tabs} /> 
      </Stack.Navigator>
    </NavigationContainer> 
  )
}
export default HelloWorldApp;