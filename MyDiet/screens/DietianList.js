import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import React, { useState, useEffect, version } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { Colors, icons, images } from "../constants";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { findDietitian, getDietiant, registerDietitian } from "../server";
const { width, height } = Dimensions.get("window");
const Container = styled.TouchableWithoutFeedback``;
const B = (props) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);
const DietianList = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const state = useSelector((state) => state.auth.accountInformation);
  useEffect(() => {
    getDietiant(state.token, (response) => {
      if (response.status == 1) {
        setData(response.data);
      }
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <View style={styles.top}>
        <Container
          onPress={() => {
            navigation.navigate("Tabs");
          }}
        >
          <Image source={icons.backbutton} />
        </Container>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Find a Dietitian</Text>
        <Container>
          <Image />
        </Container>
      </View>
      <View style={styles.safeview}>
        <TextInput
          placeholder="Search here.."
          style={styles.textStyle}
          onChangeText={setSearch}
          value={search}
        />
        <TouchableOpacity
          onPress={() => {
            findDietitian(search, state.token, (response) => {
              if (response.status != 1) return;
              setData(response.data);
            });
          }}
        >
          <Image source={icons.search} style={styles.search} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        style={{
          width: width,
          height: "70%",
          marginVertical: 20,
        }}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                backgroundColor: "white",
                width: width * 0.9,
                height: height * 0.2,
                alignSelf: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                marginBottom: 20,
                borderRadius: 10,
                padding: 10,
              }}
            >
              <View style={{ justifyContent: "center" }}>
                <View
                  style={{ justifyContent: "center", flexDirection: "column" }}
                >
                  <Image
                    source={images.imageprofile}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 100,
                      marginHorizontal: 10,
                      borderColor: Colors.grayColor,
                      borderWidth: 2,
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      height: 40,
                      width: 100,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: Colors.grayColor,
                      borderRadius: 10,
                      marginTop: 10,
                    }}
                    onPress={() => {
                      registerDietitian(item._id, state.token, (response) => {
                        Alert.alert(response.message);
                      });
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: Colors.iconColor,
                      }}
                    >
                      Register
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  justifyContent: "center",
                  marginHorizontal: 10,
                  alignItems: "flex-start",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    marginHorizontal: 10,
                    marginBottom: 10,
                  }}
                >
                  <B>Name</B>: {item.fullname}{" "}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      marginHorizontal: 10,
                      alignItems: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <Text>
                      <B>Email</B>: {item.email}{" "}
                    </Text>
                    <Text style={{ marginTop: 5 }}>
                      <B>Phone Number</B>: {item.phoneNumber}{" "}
                    </Text>
                    <Text style={{ marginTop: 5 }}>
                      <B>Rating</B>: {item.rating ? item.rating : 0}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeview: {
    marginTop: 50,
    marginHorizontal: 18,
    height: 40,
    backgroundColor: Colors.whiteColor,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  search: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
  },
  textStyle: {
    marginHorizontal: 5,
    flex: 1,
  },
  top: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 22,
    flex: 1,
    marginTop: 20,
  },
});
export default DietianList;
