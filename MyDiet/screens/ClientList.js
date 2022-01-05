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
import { Colors, icons,images } from "../constants";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { searchFood } from "../server";
const { width, height } = Dimensions.get("window");
const Container = styled.TouchableWithoutFeedback``;
const B = (props) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);
var data=[
  {
    Name:"Linh Nguyễn",
    Email:"nhl@apcs.vn",
    PhoneNumber:"0987654321",
    id:1,
  },
  {
    Name:"Phát Phan",
    Email:"pvp@apcs.vn",
    PhoneNumber:"12234254534",
    id:2
  }
]
const ClientList = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:Colors.primary}}>
       <View
        style={styles.top}
        >
            <Container onPress={()=>{navigation.navigate("Tabs");}}> 
                <Image source={icons.backbutton}/>
            </Container>
            <Text style={{fontSize:18,fontWeight:'bold'}}>My Client list</Text>
            <Container> 
                <Image />
            </Container>
        </View>
      <View style={styles.safeview}>
        <TextInput
          placeholder="Search here.."
          style={styles.textStyle}
          onChangeText={()=>{}}
        />
        <TouchableOpacity
          onPress={() => {
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
                 <View style={{justifyContent:'center',flexDirection:'column'}}>
                       <Image source={images.imageprofile} 
                            style={{width:80,
                            height:80,borderRadius:100,
                            marginHorizontal:10,
                            borderColor:Colors.grayColor,
                            borderWidth:2}}/>
                </View>
              </View>

              <View style={{justifyContent:'center', marginHorizontal:10,alignItems:'flex-start',width:'70%'}}>
              <Text style={{fontSize:18,marginHorizontal:10,marginBottom:10}}><B>Name</B>: {item.Name}   </Text>   
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{justifyContent:'center', marginHorizontal:10,alignItems:'flex-start',flexDirection:'column'}}>          
              <Text><B>Email</B>: {item.Email}   </Text>            
              <Text style={{marginTop:5}}><B>Phone Number</B>: {item.PhoneNumber}    </Text>  
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
  top:{
    alignItems:'flex-end',
    justifyContent:'space-between',
    flexDirection:'row',
    marginHorizontal:22,
    flex:1,
    marginTop:20,    
},
});
export default ClientList;
