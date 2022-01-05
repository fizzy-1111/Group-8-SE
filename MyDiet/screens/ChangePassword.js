import React,{useState} from 'react'
import {
    View,
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity
    
} from 'react-native'

import { Colors,icons,images } from "../constants";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
const Container =styled.TouchableWithoutFeedback``;
const getImage=()=>{
  var img=images.imageprofile
  return img
}

const onPress = ()=>{
};

const ChangePassword=() => {
    const navigation = useNavigation();
    return(
    <SafeAreaView style={styles.container}>

        <View
        style={styles.top}
        >
            <Container onPress={()=>{navigation.navigate("Tabs");}}> 
                <Image source={icons.backbutton}/>
            </Container>
            <Text style={{fontSize:18,fontWeight:'bold'}}>Change Password</Text>
            <Container> 
                <Image />
            </Container>
        </View>
        <View  style={styles.mid}>
         <Image source={getImage()} style={styles.profileImage}/>
         <View  style={{flexDirection:'column',
                        alignItems:'flex-start',
                        width:'100%',
                        marginHorizontal:50,
                        marginTop:-20,
                       }}>
         </View>

        </View>
        <View  style={styles.bot}> 
            <View style={styles.setting}>
                <View style={{alignItems:'center',
                                  width:'70%',
                                  justifyContent:'space-between',
                                  flexDirection:'row',
                                  backgroundColor:Colors.whiteColor,
                                  marginTop:5,
                                  height:50,
                                  borderRadius:8}}>
                    <Image source={icons.lock} style={{width:25,height:28,marginHorizontal:10}}/>
                    <TextInput placeholder='Old password' style={{fontSize:18,marginHorizontal:5,flex:1}}></TextInput>
                </View>
            </View>
            <View style={styles.setting}>
            <View style={{alignItems:'center',
                                  width:'70%',
                                  justifyContent:'space-between',
                                  flexDirection:'row',
                                  backgroundColor:Colors.whiteColor,
                                  marginTop:5,
                                  height:50,
                                  borderRadius:8}}>
                    <Image source={icons.lock} style={{width:25,height:28,marginHorizontal:10}}/>
                    <TextInput placeholder='New password' style={{fontSize:18,marginHorizontal:5,flex:1}}></TextInput>
                </View>
                
            </View>
            <View style={styles.setting}>
                <View style={{alignItems:'center',
                                  width:'70%',
                                  justifyContent:'space-between',
                                  flexDirection:'row',
                                  backgroundColor:Colors.whiteColor,
                                  marginTop:5,
                                  height:50,
                                  borderRadius:8}}>
                    <Image source={icons.lock} style={{width:25,height:28,marginHorizontal:10}}/>
                    <TextInput placeholder='Confirm password' style={{fontSize:18,marginHorizontal:5,flex:1}}></TextInput>
                </View>
            </View>
            <View style={{alignItems:'center',marginTop:20}}>
            <TouchableOpacity
                        style={styles.button}
                        onPress={onPress}
                    >
                        <Text style={{fontSize:16,fontWeight:'bold'}}>Save changes</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.setting}>
            </View>
        </View>
   </SafeAreaView>
   )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor:Colors.primary
    },
    top:{
        alignItems:'flex-end',
        justifyContent:'space-between',
        flexDirection:'row',
        marginHorizontal:22,
        flex:1,
        
    },
    mid:{
        justifyContent: 'space-between',
        flexDirection:'row',
        alignItems:'center',
        flex:2,
        marginTop:15,
        width:'100%',
    },
    bot:{
        justifyContent:'center',
        flexDirection:'column',
        marginHorizontal:20,
        flex:4
    },
    profileImage:{
      width:150,
      height:150,
      borderRadius:100,
      overflow:"hidden",
      marginHorizontal:20,
    },
    setting:{
        alignItems:'flex-start',
        justifyContent:'center',
        flexDirection:'column',
        marginHorizontal:15,
        flex:1,
    },
    setting2:{
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        marginHorizontal:15,
        flex:2,
    },
    button:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.grayColor,
        borderRadius: 8,
        height:50,
        width:'30%',
        marginTop:20,
        //justifyContent: 'flex-end',

    },
})
export default ChangePassword;