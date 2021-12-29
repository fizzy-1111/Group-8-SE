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
                <View style={styles.topview} >
                  <Text style={styles.textStyle}>MyDiet</Text>

                </View>
                  <Image source={images.intro1} style={styles.imageStyle} />
                <View style={styles.introview1} >
                    <Text style={styles.textStyle1}>      Connect to your dietitian</Text>
                </View>
                <View style={styles.introview2} >
                    <Text style={styles.textStyle2}>      Learn from professional</Text>
                </View>
                <View style={styles.buttonView1}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onPress}
                    >
                        <Text style={styles.textStyle3}>Let's Start</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonView2}>
                <TouchableOpacity
                    style={styles.button2}
                    onPress={onPress}
                >
                    <Text style={styles.textStyle4}>Already have an account? <B>Login</B></Text>
                </TouchableOpacity> 

                </View>
         </View>
    )
}
const styles = StyleSheet.create({
    container:{
        height: windowHeight,
        width: windowWidth,
        flex:1,
        flexDirection:'column',
        backgroundColor:Colors.primary,
        alignItems:'center',
        justifyContent:'center',
    },
    // top:{
    //     flex:2,
        
    //     alignItems:'center',
    //     justifyContent:'center'
    
    // },
    // mid:{
    //     flex:1,
       
    //     alignItems:'center',
    //     justifyContent:'center'
    
    // },
    // bot:{
    //     flex:1,
       
    //     alignItems:'center',
    //     justifyContent:'center'
    
    // }
    topview:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
      
    },
    introview1:{
        
        justifyContent:'center',
        alignItems:'flex-start',
        alignSelf:'flex-start',
        flex:0.5,
      
    },
    introview2:{
        
        justifyContent:'center',
        alignItems:'flex-start',
        alignSelf:'flex-start',
        flex:0.5,
        
    },
    textStyle:{
        fontSize:40,
    
      
        // fontFamily:'workSans',
    },
    textStyle1:{
        fontSize:30,
        // fontFamily:'workSans',
    },
    textStyle2:{
        fontSize:18,
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
    imageStyle:{
        flex:4,
        width:'100%',
        height:'100%',
    },
    button:{
        alignItems: "center",
        justifyContent:'center',
        backgroundColor:Colors.iconColor,
        borderRadius: 8,
        height:'50%',
        width:'100%'
        //justifyContent: 'flex-end',

    },
    button2:{
        alignItems: "center",
        justifyContent:'center',
        backgroundColor:Colors.whiteColor,
        borderRadius: 8,
        marginTop:10,
        backgroundColor:Colors.whiteColor,
        height:'40%',
        width:'100%'
        //position: 'absolute',
    },
    buttonView1:{
        flex:1,
        alignItems: "center",
        justifyContent:'flex-end',
    },
    buttonView2:{
        flex:1,
        alignItems: "center",
        justifyContent:'flex-start',
    }
})
export default Intro1;