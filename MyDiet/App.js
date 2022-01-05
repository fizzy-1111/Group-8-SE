import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  FA,
  Feed,
  Intro1,
  Login,
  SignUp,
  ProfileDetails,
  Profile,
  EditProfile,
  ChangePassword,
  DietianList,
} from "./screens";
import Tabs from "./Navigation/tabs";
import { userLogin } from "./server";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import * as React from "react";

const Stack = createStackNavigator();
const HelloWorldApp = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Login"
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Sign up" component={SignUp} />
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="Profile Detail" component={ProfileDetails} />
            <Stack.Screen name="Change Password" component={ChangePassword} />
            <Stack.Screen name="Edit Profile" component={EditProfile} />
            <Stack.Screen name="Dietian List" component={DietianList} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
export default HelloWorldApp;
