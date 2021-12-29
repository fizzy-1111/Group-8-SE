import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    SafeAreaView,
} from "react-native";
import { Colors,icons } from "../constants";
const FA =() => {
    return(
        <View style={styles.container}>
          <SafeAreaView style={styles.safeview}>
            <TextInput placeholder="Search here.." style={styles.textStyle} />
            <Image source={icons.search} style={styles.search}/>
          </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create({

   
    safeview:{
        marginTop: 30,
        marginHorizontal: 18,
        height: 30,
        backgroundColor:Colors.whiteColor,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'space-between',
        flexDirection:'row',
        alignItems:'center',
    },
    search:{
        width:25,
        height:25,
        marginHorizontal: 5,
    },
    textStyle:{
        marginHorizontal: 5,
    }
})
export default FA;