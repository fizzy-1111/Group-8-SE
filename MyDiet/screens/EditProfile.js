import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Colors, icons } from "../constants";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { uploadAvatar, editProfile } from "../server";
import { setAccountInformation } from "../redux/actions";
const Container = styled.TouchableWithoutFeedback``;

const onPress = () => {};
const onPressBack = ({ navigation }) => {
  navigation.navigate("Profile Detail");
};
const EditProfile = ({ navigation }) => {
  const state = useSelector((state) => state.auth.accountInformation);
  const [name, setName] = useState(state.user.fullname);
  const [email, setEmail] = useState(state.user.email);
  const [phone, setPhone] = useState(state.user.phoneNumber);
  const [about, setAbout] = useState(state.user.about);
  const dispatch = useDispatch();
  const onChangeAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    uploadAvatar(result.uri, state.token, (response) => {
      Alert.alert(response.message);
      if (response.status != 1) return;
      state.user.avatar = response.data;
      dispatch(setAccountInformation({ ...state, random: Math.random() }));
    });
  };
  const onChange = () => {
    editProfile(name, email, phone, about, state.token, (response) => {
      Alert.alert(response.message);
      if (response.status != 1) return;
      dispatch(
        setAccountInformation({
          token: state.token,
          user: response.data,
        })
      );
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Container
          onPress={() => {
            onPressBack({ navigation });
          }}
        >
          <Image source={icons.backbutton} />
        </Container>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Edit Profile</Text>
        <Container
          onPress={() => {
            onPress();
          }}
        >
          <Image />
        </Container>
      </View>
      <View style={styles.mid}>
        <Image
          source={{ uri: state.user.avatar }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.button} onPress={onChangeAvatar}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Upload</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bot}>
        <View style={styles.setting}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Name</Text>
          <View
            style={{
              alignItems: "flex-start",
              width: "70%",
              backgroundColor: Colors.whiteColor,
              marginTop: 5,
              borderRadius: 8,
            }}
          >
            <TextInput
              style={{ fontSize: 16, padding: 10 }}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>
        <View style={styles.setting}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Email</Text>
          <View
            style={{
              alignItems: "flex-start",
              width: "70%",
              backgroundColor: Colors.whiteColor,
              marginTop: 5,
              borderRadius: 10,
            }}
          >
            <TextInput
              style={{ fontSize: 16, padding: 10 }}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>
        <View style={styles.setting}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Phone number</Text>
          <View
            style={{
              alignItems: "flex-start",
              width: "70%",
              backgroundColor: Colors.whiteColor,
              marginTop: 5,
              borderRadius: 10,
            }}
          >
            <TextInput
              style={{ fontSize: 16, padding: 10 }}
              placeholder="Phone number"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>
        <View style={styles.setting}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>About</Text>
          <View
            style={{
              alignItems: "flex-start",
              width: "70%",
              backgroundColor: Colors.whiteColor,
              marginTop: 5,
              borderRadius: 10,
            }}
          >
            <TextInput
              style={{ fontSize: 16, padding: 10 }}
              placeholder="About"
              value={about}
              onChangeText={setAbout}
            />
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity style={styles.button} onPress={onChange}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Save
            </Text>
          </TouchableOpacity>
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
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
    flex: 2,
    marginTop: 15,
    width: "100%",
  },
  bot: {
    justifyContent: "center",
    flexDirection: "column",
    marginHorizontal: 20,
    flex: 5,
    marginTop:20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden",
    marginHorizontal: 20,
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
export default EditProfile;
