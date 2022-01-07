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
const getImage = () => {
  var img = images.imageprofile;
  return img;
};
const getUsername = () => {
  return "Hoang Linh";
};
var user = {
  Title: "User Account",
  Link: "My personal dietian",
  Icon: images.client,
};
var dietian = {
  Title: "Dietian Account",
  Link: "My clients",
  Icon: images.dietian,
};
const onPress = () => {};
const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};
const Profile = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth.accountInformation);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const onExit = () => {
    dispatch(setAccountInformation(undefined));
    navigation.replace("Login");
  };
  const getuser=()=>{
    if (state?.user?.userType == 0) {
       return user
    } 
    else 
    {
       return dietian
    }
  }
  const AlreadyHaveDietian = () => {
    if (state.user.userType == 0) {
      //User and check if dietitant
      getPT(state.token, (response) => {
        if (response.status == 1) {
          navigation.navigate("Dietian Profile", { info: response.data });
        } else setVisible(true);
      });
    } else {
      navigation.navigate("Clien List");
    }
  };
  console.log({ uri: state?.user?.avatar + "?" + Math.random()})
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.whitesnake}>
        <SafeAreaView style={styles.top}>
          <Container onPress={onExit}>
            <Image source={icons.ExitSign} />
          </Container>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{getuser().Title}</Text>
          <Container>
            <Image source={getuser().Icon} style={{ width: 27, height: 30 }} />
          </Container>
        </SafeAreaView>
        <SafeAreaView style={styles.mid}>
          <Image
            source={{ uri: state?.user?.avatar}}
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
              navigation.navigate("Change Password");
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
            <Text style={{ fontSize: 16 }}>{getuser().Link}</Text>
          </View>
          <Container
            onPress={() => {
              AlreadyHaveDietian();
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
      <ModalPoup visible={visible}>
        <View
          style={{
            alignItems: "center",
            height: 50,
            width: "100%",
            justifyContent: "flex-start",
            marginBottom: 20,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: Colors.iconColor,
              marginHorizontal: 10,
            }}
          >
            You haven't been assigned to a personal dietitian. Want to find one?
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            backgroundColor: Colors.iconColor,
            height: 50,
            width: "100%",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <TouchableOpacity
            style={{ width: "100%", alignItems: "center" }}
            onPress={() => {
              setVisible(false);
              navigation.navigate("Dietian List");
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: Colors.whiteColor,
              }}
            >
              Sure
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            height: 30,
            width: "100%",
            justifyContent: "center",
            marginTop: 20,
            borderRadius: 10,
          }}
        >
          <TouchableOpacity
            style={{ width: "100%", alignItems: "center" }}
            onPress={() => {
              setVisible(false);
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: Colors.iconColor,
              }}
            >
              Not yet
            </Text>
          </TouchableOpacity>
        </View>
      </ModalPoup>
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
export default Profile;
