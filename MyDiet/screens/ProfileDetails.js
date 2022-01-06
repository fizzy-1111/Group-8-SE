import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";

import { Colors, icons, images } from "../constants";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const Container = styled.TouchableWithoutFeedback``;

const ProfileDetails = () => {
  const state = useSelector((state) => state.auth.accountInformation);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Container
          onPress={() => {
            navigation.navigate("Tabs");
          }}
        >
          <Image source={icons.backbutton} />
        </Container>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Profile Detail</Text>
        <Container
          onPress={() => {
            navigation.navigate("Edit Profile");
          }}
        >
          <Image source={icons.edit} />
        </Container>
      </View>
      <View style={styles.mid}>
        <Image
          source={{ uri: state?.user?.avatar + "?" + Math.random() }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.bot}>
        <View style={styles.setting}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Name</Text>
          <View style={{ alignItems: "flex-start", width: "60%" }}>
            <Text style={{ fontSize: 16 }}>{state?.user?.fullname}</Text>
          </View>
        </View>
        <View style={styles.setting}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Email</Text>
          <View style={{ alignItems: "flex-start", width: "60%" }}>
            <Text style={{ fontSize: 16 }}>{state?.user?.email}</Text>
          </View>
        </View>
        <View style={styles.setting}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Phone number</Text>
          <View style={{ alignItems: "flex-start", width: "60%" }}>
            <Text style={{ fontSize: 16 }}>{state?.user?.phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.setting}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>About</Text>
          <View style={{ alignItems: "flex-start", width: "60%" }}>
            <Text style={{ fontSize: 16 }}>{state?.user?.about}</Text>
          </View>
        </View>
        <View style={styles.setting}></View>
      </View>
    </SafeAreaView>
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
    marginHorizontal: 22,
    flex: 1,
  },
  mid: {
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    marginHorizontal: 20,
    flex: 2,
    marginTop: 15,
  },
  bot: {
    justifyContent: "center",
    flexDirection: "column",
    marginHorizontal: 20,
    flex: 4,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden",
  },
  setting: {
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
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
export default ProfileDetails;
