import React,{useState} from 'react'
import{
    View,
    Image,
    ImageBackground,
    backgroundColor,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    Text,
    Dimensions,
    StyleSheet,
    FlatList
} from "react-native";
import { Colors,icons,images } from "../constants";
import styled from "styled-components/native"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Container =styled.TouchableWithoutFeedback``;
const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>;
const onPress = ()=>{
    console.log("Pressing")
};
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
        name:'HL',
        date:'08:00 pm, 20/11/2021',
        imagesource:images.avatar1,
        status:'Two bananas after 4.0 km running. Feeling happy! ^^',
        imagepost:images.foodImage,
        likenum:7,
        key:'1',
    },
    {
        name:'HL2',
        date:'09:01 pm, 20/11/2021',
        imagesource:images.avatar,
        status:'Food for a better heart.',
        imagepost:images.foodImage1,
        likenum:8,
        key:'2',
    }
]
const Publicdata=[
    {
        name:'HL2',
        date:'09:01 pm, 20/11/2021',
        imagesource:images.avatar,
        status:'Food for a better heart.',
        imagepost:images.foodImage1,
        likenum:8,
        key:'1',
    }
]
const renderItem=({item,id})=>{
    return(
      <SafeAreaView style={styles.post} >
        <SafeAreaView style={styles.headBar}>
                <Image source={item.imagesource}/> 
                <View style={styles.infoview}>
                    <Text style={styles.textTab}> 
                           <B>{item.name }</B> 
                    </Text>
                    <Text style={styles.textTab}> 
                            {item.date }
                    </Text>
                </View>
           
        </SafeAreaView>
        <View style={styles.midpost}>
            <Text style={styles.textTab}>{
              item.status
            }
            </Text>
            <Image source={item.imagepost} style={styles.imageCheck}/>
        </View>
        <View style={styles.botpost}>
           
            <Image source={icons.favorite} style={styles.imageCheck}/>
            <Text style={styles.likeTab}> 
                           <B>Like {item.likenum}</B> 
            </Text>
            <Image source={icons.comment} style={styles.imageCheck}/>
        </View>
      </SafeAreaView> 
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
           <SafeAreaView style={styles.listTab} >
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
            </SafeAreaView>
            <SafeAreaView style={styles.headBar}>
                    <Container onPress={onPress}> 
                        <Image source={icons.addButton} style={styles.iconStyle}/>
                    </Container>
                <View  style={styles.borderView}>
                <TextInput placeholder="Search here.." style={styles.textStyle}/>
                <Image source={icons.search} style={styles.iconStyle}/>
                </View>

         
                    
            </SafeAreaView>
         <FlatList
          
          data={getStatus(status)}
          renderItem={renderItem}
          style={styles.flatlist}
         />

        </SafeAreaView>
    )
}
const styles =StyleSheet.create({
    container:{
     flex:1,
     paddingHorizontal:10,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:Colors.primary,
    },
    headBar:{
        paddingTop:10,
        justifyContent: 'space-between',
        flexDirection:'row',
        alignItems:'center',
        width:windowWidth*9/10,
        paddingLeft:10
    },
    iconStyle:{
        height:35,
        width:35
    },
    textStyle:{
        fontSize:16,
        paddingLeft:10,
    },
    infoview:{
        fontSize:16,
        width:'85%',
        justifyContent: 'space-between',
        flexDirection:'column',
        alignItems:'flex-start',
        marginLeft:20,
    },
    borderView:{
        width:'85%',
        borderRadius: 8,
        borderWidth: 2,
        height:40,
        justifyContent: 'space-between',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:Colors.whiteColor,
    },
    flatlist:{
      flex:2,
      marginTop:15,
      marginBottom:100
    },
    post:{
        backgroundColor:Colors.whiteColor,
        borderRadius: 10,
    },
    imageCheck:{
        marginTop:10,
    },
    midpost:{
        justifyContent: 'center',
        flexDirection:'column',
        alignItems:'flex-start',
        width:windowWidth*9/10,
        paddingLeft:10,
        paddingRight:10,
       
    },
    botpost:{
        flexDirection:'row',
        alignItems:'center',
        width:windowWidth*9/10,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:15
    },
    listTab:{
      padding:15,
      flexDirection:'row',
      marginTop:50,
      
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
       fontSize:16,
       maxWidth:400,
    },
    likeTab:{
        fontSize:16,
        maxWidth:400,
        marginTop:5,
        marginLeft:5,
        marginRight:20
     },
    btnTabActive:{
       backgroundColor: Colors.secondary,
       borderRadius: 8,
    }
})
export default Feed;