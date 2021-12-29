import React,{useState} from 'react'
import{
    View,
    Image,
    ImageBackground,
    backgroundColor,
    ImageBackgroundBase,
    SafeAreaView,
    TouchableOpacity,
    Text,
    Dimensions,
    StyleSheet,
    FlatList
} from "react-native";
import { Colors,icons,images } from "../constants";
const listTab=[
    {
        status: 'Private feed'
    },
    {
        status: 'Public feed'
    }
]
const Privatedata=[
    {
        name:'private',
        key:'green',
    }
    
]
const Publicdata=[
    {
        name:'public',
        key:'red',
    }
]
const renderItem=({item,index})=>{
    return(
        <View>
            <Text>
                this is {item.name}
            </Text>
        </View>
    )
}
const getStatus=(status)=>{
    console.log(status)
   if(status=='Public feed')
   return Publicdata
   else if(status=='Private feed')
   return Privatedata
}

const Feed=() => {
    const [status,setStatus]=useState('Private feed')
    const setStatusFilter=status => {
        setStatus(status)
    }
    return(
        <SafeAreaView style={styles.container}>
         <View style={styles.listTab} >
             {
                listTab.map(e=>(
                    <TouchableOpacity 
                        style={[styles.btnTab,status===e.status&& styles.btnTabActive]}
                        onPress={()=>setStatusFilter(e.status)}
                    >
                        <Text style={styles.textTab}> 
                          {e.status }
                        </Text>
                    </TouchableOpacity>
                ))
             }
         </View>
         <FlatList
          
          data={getStatus(status)}
          renderItem={renderItem}
         />

        </SafeAreaView>
    )
}
const styles =StyleSheet.create({
    container:{
     flex:1,
     paddingHorizontal:10,
     justifyContent:'center',
     alignItems:'center'
    },
    listTab:{
      backgroundColor:'#fff',
      padding:15,
      flexDirection:'row',
      marginTop:50
    },
    btnTab:{
       width: Dimensions.get('window').width/3.5,
       flexDirection:'row',
       borderWidth:0.5,
       borderColor: '#EBEBEB',
       padding:10,
       justifyContent:'center'
    },
    textTab:{
       fontSize:16
    },
    btnTabActive:{
       backgroundColor: Colors.secondary,
       borderRadius: 8,
    }
})
export default Feed;