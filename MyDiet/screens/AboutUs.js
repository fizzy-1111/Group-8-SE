import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Modal,
} from "react-native";

import { Colors, icons, images } from "../constants";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { setAccountInformation } from "../redux/actions";
import { useNavigation } from "@react-navigation/native";
import { getPT } from "../server";
const Container = styled.TouchableWithoutFeedback``;

const AboutUs = () => {

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.whitesnake}>
      <Text style={{ fontSize: 35, fontWeight: "bold" }}>Get In Touch</Text>
      <Image source={images.orangePhone} style={{marginTop:70}} />
        
      </SafeAreaView>
      <SafeAreaView style={styles.bot}>
        <SafeAreaView style={styles.setting}>
          <Image source={icons.email} style={{ width: 33, height: 33     ,marginHorizontal:15}} />
          <View style={{ alignItems: "flex-start", width: "80%" }}>
            <Text style={{ fontSize: 16 }}>123@gmail.com</Text>
          </View>
         
        </SafeAreaView>
        <SafeAreaView style={styles.setting}>
          <Image source={icons.phone} style={{ width: 28, height: 32,marginHorizontal:15}} />
          <View style={{ alignItems: "flex-start", width: "80%" }}>
            <Text style={{ fontSize: 16 }}>0989015008</Text>
          </View>
        
        </SafeAreaView>
        <SafeAreaView style={styles.setting}>
          <Image source={icons.location} style={{ width: 32, height: 32,marginHorizontal:15 }} />
          <View style={{ alignItems: "flex-start", width: "80%" }}>
            <Text style={{ fontSize: 16 }}>44 Park AveTrion, Georgia(GA)</Text>
          </View>
         
        </SafeAreaView>
        <SafeAreaView style={styles.setting2}></SafeAreaView>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.primary,
  },
  top: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 15,
    flex: 1,
  },
  mid: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginHorizontal: 15,
    flex: 3,
    backgroundColor: Colors.whiteColor,
    marginTop: 15,
  },
  bot: {
    justifyContent: "center",
    flexDirection: "column",
    marginHorizontal: 15,
    flex: 4,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden",
  },
  whitesnake: {
    backgroundColor: Colors.greenColor,
    flex: 3,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',
  },
  setting: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical:15,
    flex: 1,
    backgroundColor:Colors.whiteColor,
    borderRadius:20,
  },
  setting2: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 15,
    flex: 1,    
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: Colors.grayColor,

    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
});
export default AboutUs;
