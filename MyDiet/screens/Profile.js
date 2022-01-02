import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";

import { Colors, icons, images } from "../constants";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { setAccountInformation } from "../redux/actions";
import { useNavigation } from "@react-navigation/native";
const Container = styled.TouchableWithoutFeedback``;
const getImage = () => {
  var img = images.imageprofile;
  return img;
};
const getUsername = () => {
  return "Hoang Linh";
};
const onPress = () => {};

const Profile = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth.accountInformation);
  const navigation = useNavigation();
  const onExit = () => {
    dispatch(setAccountInformation(undefined));
    navigation.replace("Login");
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.whitesnake}>
        <SafeAreaView style={styles.top}>
          <Container onPress={onExit}>
            <Image source={icons.ExitSign} />
          </Container>
          <Text style={{ fontSize: 18 }}>User Account</Text>
          <Container
            onPress={() => {
              onPress();
            }}
          >
            <Image source={icons.Upgrade} />
          </Container>
        </SafeAreaView>
        <SafeAreaView style={styles.mid}>
          <Image
            source={{ uri: state?.user?.avatar }}
            style={styles.profileImage}
          />
          <Text style={{ fontSize: 24, marginTop: 5, fontWeight: "bold" }}>
            {state?.user?.fullname}
          </Text>
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.bot}>
        <SafeAreaView style={styles.setting}>
          <Image source={icons.profile} style={{ width: 28, height: 28 }} />
          <View style={{ alignItems: "flex-start", width: "60%" }}>
            <Text style={{ fontSize: 16 }}>Profile Detail</Text>
          </View>
          <Container
            onPress={() => {
              navigation.navigate("Profile Detail");
            }}
          >
            <Image
              source={icons.expandright}
              style={{ width: 33, height: 35 }}
            />
          </Container>
        </SafeAreaView>
        <SafeAreaView style={styles.setting}>
          <Image source={icons.lock} style={{ width: 28, height: 32 }} />
          <View style={{ alignItems: "flex-start", width: "60%" }}>
            <Text style={{ fontSize: 16 }}>Change Password</Text>
          </View>
          <Container
            onPress={() => {
              onPress();
            }}
          >
            <Image
              source={icons.expandright}
              style={{ width: 33, height: 35 }}
            />
          </Container>
        </SafeAreaView>
        <SafeAreaView style={styles.setting}>
          <Image source={icons.dietian} style={{ width: 32, height: 32 }} />
          <View style={{ alignItems: "flex-start", width: "60%" }}>
            <Text style={{ fontSize: 16 }}>My Personal Dietian</Text>
          </View>
          <Container
            onPress={() => {
              onPress();
            }}
          >
            <Image
              source={icons.expandright}
              style={{ width: 33, height: 35 }}
            />
          </Container>
        </SafeAreaView>
        <SafeAreaView style={styles.setting}></SafeAreaView>
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
    backgroundColor: Colors.whiteColor,
    flex: 3,
  },
  setting: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 15,
    flex: 1,
  },
  setting2: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 15,
    flex: 2,
  },
});
export default Profile;
