import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Colors, icons } from "../constants";
import { userSignup } from "../server";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const B = (props) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);
const onChangeText = () => {};

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const onCreateAccount = () => {
    if (password !== confirmPassword) {
      Alert.alert("Password do not match");
      return;
    }
    userSignup(username, fullname, email, phone, password, (response) => {
      Alert.alert(response.message);
      if (response.status == 1) {
        navigation.goBack();
      }
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex:1, justifyContent:'center'}}>
        <View style={styles.Tinput}>
          <View style={styles.input}>
            <Image style={styles.icon1} source={icons.human} />
            <TextInput
              style={styles.Tinput}
              onChangeText={setUsername}
              placeholder="Username"
              placeholderStyle
            />
          </View>
          <View style={styles.input}>
            <Image style={styles.icon1} source={icons.human} />
            <TextInput
              style={styles.Tinput}
              onChangeText={setFullname}
              placeholder="Full name"
            />
          </View>
        </View>
        <View style={styles.Tinput}>
          <View style={styles.input}>
            <Image style={styles.icon1} source={icons.email} />
            <TextInput
              style={styles.Tinput}
              onChangeText={setEmail}
              placeholder="Email"
            />
          </View>
          <View style={styles.input}>
            <Image style={styles.icon1} source={icons.phone} />
            <TextInput
              style={styles.Tinput}
              onChangeText={setPhone}
              placeholder="Phone"
            />
          </View>
        </View>
        <View style={styles.Tinput}>
          <View style={styles.input}>
            <Image style={styles.icon2} source={icons.lock} />
            <TextInput
              style={styles.Tinput}
              onChangeText={setPassword}
              placeholder="Password"
            />
          </View>
          <View style={styles.input}>
            <Image style={styles.icon2} source={icons.lock} />
            <TextInput
              style={styles.Tinput}
              onChangeText={setConfirmPassword}
              placeholder="Confirm password"
            />
          </View>
        </View>
      </View>
      <View style={styles.safeview}>
        <TouchableOpacity style={styles.button} onPress={onCreateAccount}>
          <Text style={styles.textStyle3}>
            <B>Sign up</B>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={()=>{navigation.navigate("Login")}}>
          <Text style={styles.textStyle4}>
            <B> Log In</B>
          </Text>
        </TouchableOpacity>
        <View style={styles.button3} >
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: windowHeight,
    width: windowWidth,
    flex: 1,
    flexDirection: "column",
  },
  safeview: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    width:'100%',
    height:'20%'
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
    alignItems: "center",
    justifyContent: "center",

    width: windowWidth,
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
    justifyContent: "center",
    backgroundColor: Colors.iconColor,
    borderRadius: 8,

    flex: 1,
  },
  button2: {
    width: (windowWidth * 9) / 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: 8,
    marginTop: 15,
    flex: 1,
  },
  button3: {
    width: (windowWidth * 7) / 10,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 10,
    flex: 1,
  },
  textStyle3: {
    fontSize: 18,
    color: Colors.whiteColor,
  },
  textStyle4: {
    fontSize: 18,
    color: Colors.iconColor,
  },
  textStyle5: {
    fontSize: 18,
  },
  scroll: {
    alignItems: "center",
    height: "60%",
    //backgroundColor:Colors.whiteColor,
  },
});
export default SignUp;
