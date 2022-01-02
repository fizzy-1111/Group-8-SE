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
const Container =styled.TouchableWithoutFeedback``;
const getImage=()=>{
  var img=images.imageprofile
  return img
}
const getUsername=()=>{
    return 'Hoang Linh'
}
const onPress = ()=>{
};
const onPressBack = ({navigation})=>{
    navigation.navigate("Profile Detail")
 };
const EditProfile=({navigation}) => {
   return(
    <SafeAreaView style={styles.container}>

        <View
        style={styles.top}
        >
            <Container onPress={()=> {onPressBack({navigation})}}> 
                <Image source={icons.backbutton}/>
            </Container>
            <Text style={{fontSize:18}}>Edit Profile</Text>
            <Container onPress={()=> {onPress()}}> 
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
           <TouchableOpacity
                        style={styles.button}
                        onPress={onPress}
            >
                <Text style={{fontSize:16,fontWeight:'bold'}}>Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity
                        style={styles.button}
                        onPress={onPress}
            >
                <Text style={{fontSize:16,fontWeight:'bold'}}>Delete</Text>
            </TouchableOpacity>
         </View>

        </View>
        <View  style={styles.bot}> 
            <View style={styles.setting}>
                <Text style={{fontSize:18,fontWeight:'bold'}}>Name</Text>
                <View style={{alignItems:'flex-start',
                                  width:'70%',
                                  backgroundColor:Colors.whiteColor,
                                  marginTop:5,
                                  borderRadius:8}}>
                    <TextInput style={{fontSize:16,marginHorizontal:5}}>Tuyen</TextInput>
                </View>
            </View>
            <View style={styles.setting}>
                <Text style={{fontSize:18,fontWeight:'bold'}}>Email</Text>
                <View style={{alignItems:'flex-start',
                                  width:'70%',
                                  backgroundColor:Colors.whiteColor,
                                  marginTop:5,
                                  borderRadius:10}}>
                <TextInput style={{fontSize:16,marginHorizontal:5}}></TextInput>
                </View>
                
            </View>
            <View style={styles.setting}>
                <Text style={{fontSize:18,fontWeight:'bold'}}>Phone number</Text>
                    <View style={{alignItems:'flex-start',
                                  width:'70%',
                                  backgroundColor:Colors.whiteColor,
                                  marginTop:5,
                                  borderRadius:10}}>
                    <TextInput style={{fontSize:16,marginHorizontal:5}}></TextInput>
                    </View>
            </View>
            <View style={styles.setting}>
                <Text style={{fontSize:18,fontWeight:'bold'}}>About</Text>
                <View style={{alignItems:'flex-start',
                                  width:'70%',
                                  backgroundColor:Colors.whiteColor,
                                  marginTop:5,
                                  borderRadius:10}}>
                    <TextInput style={{fontSize:16,marginHorizontal:5}}></TextInput>
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
export default EditProfile;