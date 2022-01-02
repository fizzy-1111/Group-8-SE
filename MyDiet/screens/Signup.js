import React from "react";
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
} from "react-native";
import { Colors, icons } from "../constants";
import { userSignup } from "../server";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const B = (props) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);
const onChangeText = () => {};
const onPress = () => {};
const SignUp = () => {
  const onCreateAccount = () => {};
  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.safeview}>
        <Text style={styles.textStyle}>
          <B>Create Accout</B>
        </Text>

        <Text style={styles.textStyle2}>Create a new account</Text>
        </View>
        <ScrollView 
         horizontal={true}
         pagingEnabled={true}
         contentContainerStyle={styles.scroll}>
        <View  style={styles.Tinput}>
          <View style={styles.input}>
            <Image style={styles.icon1} source={icons.human} />
            <TextInput
              style={styles.Tinput}
              onChangeText={onChangeText}
              placeholder="Username"
              placeholderStyle
            />
          </View>
          <View style={styles.input}>
            <Image style={styles.icon1} source={icons.human} />
            <TextInput
              style={styles.Tinput}
              onChangeText={onChangeText}
              placeholder="Nickname"
            />
          </View>
          </View>
        <View  style={styles.Tinput}>
          <View style={styles.input}>
            <Image style={styles.icon1} source={icons.email} />
            <TextInput
              style={styles.Tinput}
              onChangeText={onChangeText}
              placeholder="Email"
            />
          </View>
          <View style={styles.input}>
          <Image style={styles.icon1} source={icons.phone} />
          <TextInput
            style={styles.Tinput}
            onChangeText={onChangeText}
            placeholder="Phone"
          />
          </View>
        </View>
        <View  style={styles.Tinput}>
          <View style={styles.input}>
            <Image style={styles.icon2} source={icons.lock} />
            <TextInput
              style={styles.Tinput}
              onChangeText={onChangeText}
              placeholder="Password"
            />
          </View>
          <View style={styles.input}>
            <Image style={styles.icon2} source={icons.lock} />
            <TextInput
              style={styles.Tinput}
              onChangeText={onChangeText}
              placeholder="Confirm password"
            />
          </View>
        </View>
        </ScrollView>
        <View  style={styles.safeview} >
        <TouchableOpacity style={styles.button} onPress={onCreateAccount}>
          <Text style={styles.textStyle3}>
            <B>Create Account</B>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={onPress}>
          <Text style={styles.textStyle4}>
            <B> Log In</B>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button3} onPress={onPress}>
          <Text style={styles.textStyle5}>
            <B>Sign in as Guest</B>
          </Text>
        </TouchableOpacity>
        </View>
      
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: windowHeight,
    width: windowWidth,
    flex:1,
    flexDirection:'column',
    
  },
  safeview: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent:'center',
    flex: 1.5,
    
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
    width: windowWidth*9/10,
    height: 50,
    flexDirection: "row",
  },
  Tinput: {
    marginVertical: 8,
    alignItems:'center',
    justifyContent:'center',
   
    width:windowWidth,
    
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
    justifyContent:'center',
    backgroundColor: Colors.iconColor,
    borderRadius: 8,

    flex:1,
  },
  button2: {
    width: (windowWidth * 9) / 10,
    height: 50,
    alignItems: "center",
    justifyContent:'center',
    backgroundColor: Colors.whiteColor,
    borderRadius: 8,
    marginTop: 15,
    flex:1
  },
  button3: {
    width: (windowWidth * 7) / 10,
    height: 30,
    alignItems: "center",
    justifyContent:'center',
    borderRadius: 8,
    marginTop: 10,
    flex:1
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
  scroll:{
    
    alignItems:'center',
    //backgroundColor:Colors.whiteColor,
  },
});
export default SignUp;
