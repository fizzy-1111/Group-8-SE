import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors, icons } from "../constants";
import { setAccountInformation } from "../redux/actions";
import { checkToken, userLogin } from "../server";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const B = (props) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);
const onChangeText = () => {};
const onPress = () => {};
const Login = () => {
  const state = useSelector((state) => state.auth.accountInformation);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!state) return;
    checkToken(state.token, (response) => {
      if (response.status == 1) {
        dispatch(
          setAccountInformation({ token: state.token, user: response.data })
        );
        navigation.replace("Tabs");
      }
    });
  }, []);
  const onRegister = () => {
    navigation.navigate("Sign up");
  };
  const onLogin = () => {
    userLogin(username, password, (response) => {
      if (response.status == 1) {
        dispatch(setAccountInformation(response.data));
        navigation.replace("Tabs");
      } else Alert.alert(response.message);
    });
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeview}>
        <Text style={styles.textStyle}>
          <B>Welcome Back</B>
        </Text>
        <Text style={styles.textStyle2}>Sign in to continue</Text>
        <SafeAreaView style={styles.input}>
          <Image style={styles.icon1} source={icons.human} />
          <TextInput
            style={styles.Tinput}
            onChangeText={setUsername}
            placeholder="Username"
          />
        </SafeAreaView>
        <SafeAreaView style={styles.input}>
          <Image style={styles.icon2} source={icons.lock} />
          <TextInput
            style={styles.Tinput}
            onChangeText={setPassword}
            placeholder="Password"
          />
        </SafeAreaView>
        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.textStyle3}>
            <B>Login</B>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={onRegister}>
          <Text style={styles.textStyle4}>
            <B> Sign Up</B>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button3} onPress={onPress}>
          <Text style={styles.textStyle5}>
            <B>Sign in as Guest</B>
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: windowHeight,
    width: windowWidth,
  },
  safeview: {
    alignItems: "center",
    flexDirection: "column",
    marginTop: 30,
    marginBottom: 30,
    flex: 1,
  },
  textStyle: {
    marginTop: 20,
    fontSize: 40,
    paddingBottom: 10,
  },
  textStyle2: {
    fontSize: 18,
    paddingBottom: 70,
  },
  input: {
    marginTop: 20,
    backgroundColor: Colors.whiteColor,
    borderRadius: 8,
    width: (windowWidth * 9) / 10,
    height: 50,
    flexDirection: "row",
  },
  Tinput: {
    marginVertical: 8,
    marginHorizontal: 10,
    fontSize: 18,
  },
  icon2: {
    width: 26,
    height: 30,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  icon1: {
    width: 26,
    height: 35,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  button: {
    width: (windowWidth * 9) / 10,
    height: 50,
    alignItems: "center",
    backgroundColor: Colors.iconColor,
    borderRadius: 8,
    marginTop: 130,
    bottom: 160,
    position: "absolute",
  },
  button2: {
    width: (windowWidth * 9) / 10,
    height: 50,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: 8,
    marginTop: 10,
    bottom: 100,
    position: "absolute",
  },
  button3: {
    width: (windowWidth * 7) / 10,
    height: 30,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
    bottom: 50,
    position: "absolute",
  },
  textStyle3: {
    fontSize: 18,
    color: Colors.whiteColor,
    marginVertical: 9,
  },
  textStyle4: {
    fontSize: 18,
    color: Colors.iconColor,
    marginVertical: 9,
  },
  textStyle5: {
    fontSize: 18,
  },
});
export default Login;
