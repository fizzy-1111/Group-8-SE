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
} from "react-native";
import { useSelector } from "react-redux";
import { Colors, icons } from "../constants";
import { searchFood } from "../server";
const { width, height } = Dimensions.get("window");
const B = (props) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);
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
    <SafeAreaView style={{ flex: 1, alignItems: "center",backgroundColor:Colors.primary}}>
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
          width:width,
          height: "70%",
          marginVertical: 20,
        }}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                backgroundColor: "white",
                width: width*0.9 ,
                height: height * 0.2,
                alignSelf: "center",
                justifyContent:'space-between',
                flexDirection:'row',
                marginBottom:20,
                borderRadius:10,
          
              }}
            >
              <View style={{justifyContent:'center', marginHorizontal:10}}>
              <Image source={{uri:item.image}} style={{width:100,height:100,borderRadius:10,borderColor:Colors.grayColor,borderWidth:2}}/>
              </View>

              <View style={{justifyContent:'center', marginHorizontal:10,alignItems:'flex-start',width:'70%'}}>
              <Text style={{fontSize:18,marginHorizontal:10,marginBottom:10}}><B>Name</B>: {item.name}   </Text>   
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{justifyContent:'center', marginHorizontal:10,alignItems:'flex-start',flexDirection:'column'}}>          
              <Text><B>Unit</B>: {item.unit}   </Text>            
              <Text><B>Calories</B>: {item.calories}    </Text>  
              <Text><B>Fat</B>: {item.fat}</Text>
              </View>
              <View style={{justifyContent:'center', marginHorizontal:10,alignItems:'flex-start',flexDirection:'column'}}>
              <Text> <B>   Carbs</B>: {item.carbs}</Text>
              <Text> <B>   Protein</B>: {item.protein} </Text>
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
});
export default FA;
