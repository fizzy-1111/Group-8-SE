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
import styled from "styled-components/native";
import BottomSheet from "reanimated-bottom-sheet";

import Animated from 'react-native-reanimated'
import { ScrollView } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Container =styled.TouchableWithoutFeedback``;
const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>;
var commentData=[];
const onPress = (item,sheetref)=>{
    if (typeof(item) != "undefined"){
        commentData=item.comment
        sheetref.current.snapTo(0);
        console.log(1)
    }
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
        comment:[
           {
               username:'Phat',
               imagesource:images.avatar,
               data:'08:00 pm, 20/11/2021',
               cm:'Goodjob',
               id:'1'
           },
           {
            username:'Tuong',
            imagesource:images.avatar1,
            data:'08:00 pm, 20/11/2022',
            cm:'Thank you',
            id:'2'
        }
        ],
        
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
const renderContent = () => (
    <View
      style={{
        backgroundColor: Colors.primary,
        height: windowHeight,
        width:windowWidth,
        paddingHorizontal:10,
        
      }}
    >
     <SafeAreaView
      style={{
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center',
        marginTop:40,
      }}
     >
      

     </SafeAreaView>
     <SafeAreaView
     style={{
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:Colors.whiteColor,
        height:windowHeight-170,
        marginTop:20,
        
      }}
      >
        <Text>{console.log(2)}</Text>
        <FlatList
            
            data={commentData}
            renderItem={renderCommentItem}
            style={styles.flatlist}
        />
     </SafeAreaView>
    </View>
  );
const renderCommentItem=({item,id})=>{
    console.log("Hello  ")
    return(
    
    <SafeAreaView style={styles.headBar}>
    <Image source={item.imagesource}/> 
    <View style={styles.infoview}>
        <Text style={styles.textTab}> 
               <B>{item.username }</B> 
        </Text>
        <Text style={styles.textTab}> 
                {item.data }
        </Text>
    </View>
    
  </SafeAreaView>
   )
}
const renderItem=({item,id},sheetref)=>{
    fall=new Animated.Value(1);

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
            <Container onPress={()=> {onPress(item,sheetref)}}    > 
                  <Image source={icons.comment} style={styles.imageCheck}/>
             </Container>
        </View>
      </SafeAreaView> 
    )
}                
const getStatus=(status)=>{

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
    const sheetRef = React.createRef();
    fall=new Animated.Value(1);
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
                    <Container onPress={onPress()}> 
                        <Image source={icons.addButton} style={styles.iconStyle}/>
                    </Container>
                <View  style={styles.borderView}>
                <TextInput placeholder="Search here.." style={styles.textStyle}/>
                <Image source={icons.search} style={styles.iconStyle}/>
                </View>

         
                    
            </SafeAreaView>
         <FlatList
          
          data={getStatus(status)}
          renderItem={(item)=>renderItem(item,sheetRef)}
          style={styles.flatlist}
         >
          {renderContent}
         </FlatList>
         <BottomSheet
            ref={sheetRef}
            snapPoints={[windowHeight, 0, 0]}
            
            initialSnap={1}
            renderContent={renderContent}
            borderRadius={10}/>
        </SafeAreaView>
       
    )
}
const styles =StyleSheet.create({
    container:{
     flex:1,
     
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:Colors.primary,
    },
    headBar:{
        
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
        marginBottom:10
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
        paddingBottom:5
    },
    listTab:{
      padding:15,
      flexDirection:'row',
      marginTop:20,
      
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