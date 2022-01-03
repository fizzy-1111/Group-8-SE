import React, { useState, useEffect } from "react";
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
} from "react-native";
import { useSelector } from "react-redux";
import { Colors, icons } from "../constants";
import { searchFood } from "../server";
const { width, height } = Dimensions.get("window");
const FA = () => {
  const state = useSelector((state) => state.auth.accountInformation);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    //Search on start
    searchFood(search, state.token, (response) => {
      if (response.status == 1) {
        setData(response.data);
      }
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <View style={styles.safeview}>
        <TextInput
          placeholder="Search here.."
          style={styles.textStyle}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          onPress={() => {
            searchFood(search, state.token, (response) => {
              if (response.status == 1) {
                setData(response.data);
              }
            });
          }}
        >
          <Image source={icons.search} style={styles.search} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        style={{
          width: "100%",
          height: "70%",
          marginVertical: 20,
        }}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                backgroundColor: "white",
                width: width * 0.8,
                height: height * 0.3,
                alignSelf: "center",
                marginBottom: 20,
              }}
            >
              <Text>
                Name: {item.name}
                {"\n"}Fat: {item.fat}
                {"\n"}Protein: {item.protein}
                {"\n"}Carbs: {item.carbs}
              </Text>
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
    marginTop: 30,
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
});
export default FA;
