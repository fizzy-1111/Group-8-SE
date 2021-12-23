import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image
} from "react-native";
import { Colors,icons } from "../constants";
//import { useFonts } from 'expo-font';
const Intro1 =() => {
    // const [loaded] = useFonts({
    //   workSans: require('./assets/fonts/workSans.ttf'),
    //   });
    return(
        <View style={styles.container}>
            <Text style={styles.textStyle} />
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
        // fontFamily:'workSans',
    }
})
export default Intro1;