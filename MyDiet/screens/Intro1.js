import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    SafeAreaView,
    TouchableOpacity
} from "react-native";
import { Colors,icons,images } from "../constants";
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>;
const onPress = ()=>{};
//import { useFonts } from 'expo-font';
const Intro1 =() => {
    // const [loaded] = useFonts({
    //   workSans: require('./assets/fonts/workSans.ttf'),
    //   });
    return(
           <View style={styles.container}>
           <SafeAreaView style={styles.safeview}>
             <Text style={styles.textStyle}>MyDiet</Text>
            <Image source={images.intro1} style={styles.imageStyle} />
            <Text style={styles.textStyle1}>Connect to your dietitian</Text>
            <Text style={styles.textStyle2}>Learn from professional</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={onPress}
            >
                 <Text style={styles.textStyle3}>Let's Start</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button2}
                onPress={onPress}
            >
                 <Text style={styles.textStyle4}>Already have an account? <B>Login</B></Text>
            </TouchableOpacity>
           </SafeAreaView>
         </View>
    )
}
const styles = StyleSheet.create({
    container:{
        height: windowHeight,
        width: windowWidth,
        backgroundColor:Colors.primary,
    },
    textStyle:{
        fontSize:40,
        paddingBottom:10,
        // fontFamily:'workSans',
    },
    textStyle1:{
        fontSize:30,
        paddingBottom:10,
        alignSelf:'flex-start',
        paddingStart:20,
        // fontFamily:'workSans',
    },
    textStyle2:{
        fontSize:18,
        paddingBottom:50,
        alignSelf:'flex-start',
        paddingStart:20,
        // fontFamily:'workSans',
    },
    textStyle3:{
        fontSize:22,
        color:Colors.whiteColor,
        paddingTop:6
        // fontFamily:'workSans',
    },
    textStyle4:{
        fontSize:16,
        color:Colors.iconColor,
        paddingTop:2
    },
    safeview:{
        alignItems:'center',
        flexDirection:'column',
        marginTop:30,
        marginBottom:30,
    },
    imageStyle:{
        height: windowHeight*5/10,
        width: windowWidth*9/10,
    },
    button:{
        width:windowWidth*9/10,
        height:50,
        alignItems: "center",
        backgroundColor:Colors.iconColor,
        borderRadius: 8,
        //justifyContent: 'flex-end',
        bottom:-20,
    },
    button2:{
        width:windowWidth*7/10,
        height:30,
        alignItems: "center",
        backgroundColor:Colors.whiteColor,
        borderRadius: 8,
        bottom:-25
    }
})
export default Intro1;