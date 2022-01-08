import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Colors, icons, images } from "../constants";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { removePT } from "../server";
const Container = styled.TouchableWithoutFeedback``;

const DietianProfile = () => {
  const state = useSelector((state) => state.auth.accountInformation);
  const route = useRoute();
  const user = route.params.info;
  const navigation = useNavigation();
  console.log({ uri: state?.user?.avatar + "?" + Math.random()})
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
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Personal Dietitan
        </Text>
        <Container>
          <Image />
        </Container>
      </View>
      <View style={styles.mid}>
        <Image source={{ uri: user?.avatar + "?" + Math.random() }} style={styles.profileImage} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            removePT(state.token, (response) => {
              Alert.alert(response.message);
              if (response.status == 1) navigation.goBack();
            });
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Unsubscribe</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bot}>
        <View style={styles.setting}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Name</Text>
          <View style={{ alignItems: "flex-start", width: "60%" }}>
            <Text style={{ fontSize: 16 }}>{user?.fullname}</Text>
          </View>
        </View>
        <View style={styles.setting}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Email</Text>
          <View style={{ alignItems: "flex-start", width: "60%" }}>
            <Text style={{ fontSize: 16 }}>{user?.email}</Text>
          </View>
        </View>
        <View style={styles.setting}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Phone number</Text>
          <View style={{ alignItems: "flex-start", width: "60%" }}>
            <Text style={{ fontSize: 16 }}>{user?.phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.setting}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>About</Text>
          <View style={{ alignItems: "flex-start", width: "60%" }}>
            <Text style={{ fontSize: 16 }}>{user?.about}</Text>
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
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 22,
    flex: 1,
  },
  mid: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

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
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.grayColor,
    borderRadius: 8,
    height: 50,
    width: "30%",
    marginTop: 20,
    //justifyContent: 'flex-end',
  },
});
export default DietianProfile;
