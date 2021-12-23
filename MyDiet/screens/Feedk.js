import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import { Colors,icons } from "../constants";
import { useFonts } from 'expo-font';
const Feedk=() => {
    //   const [loaded] = useFonts({
    //   workSans: require('./assets/fonts/workSans.ttf'),
    //   });
    return(
        <View style={styles.container}>
            <Text style={styles.textStyle}>Hello World</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        marginTop: 30,
        marginHorizontal: 18,
        height: 30,
        backgroundColor:Colors.whiteColor,
        alignItems:'center',
    },
    textStyle:{
        marginHorizontal: 5,
        //fontFamily:'workSans',
    }
})
export default Feedk;