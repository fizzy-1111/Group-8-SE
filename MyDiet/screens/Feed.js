import React, { useEffect, useState } from "react";
import {
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
  FlatList,
  KeyboardAvoidingView,
  View as Container
} from "react-native";
import { Colors, icons, images } from "../constants";
import styled from "styled-components/native";
import BottomSheet from "reanimated-bottom-sheet";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Animated, { set } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const { wheight } = Dimensions.get('window')
const Contain = styled.TouchableWithoutFeedback``;
const B = (props) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);
var commentData = [];

var listTab = [
  {
    status: "Private feed",
  },
  {
    status: "Public feed",
  },
];
var Privatedata = [
  {
    name: "HL",
    date: "08:00 pm, 20/11/2021",
    imagesource: images.avatar1,
    status: "Two bananas after 4.0 km running. Feeling happy! ^^",
    imagepost: images.foodImage,
    likenum: 7,
    key: 1,
    comment: [
      {
        username: "Phat",
        imagesource: images.avatar,
        data: "08:00 pm, 20/11/2021",
        cm: "Goodjob",
        id: "1",
      },
      // {
      //   username: "Tuong",
      //   imagesource: images.avatar1,
      //   data: "08:00 pm, 20/11/2022",
      //   cm: "Thank you",
      //   id: "2",
      // },
    ],
  },
  {
    name: "HL2",
    date: "09:01 pm, 20/11/2021",
    imagesource: images.avatar,
    status: "Food for a better heart.",
    imagepost: images.foodImage1,
    likenum: 8,
    key: 2,
    comment: [
        {
          username: "Linh",
          imagesource: images.imageprofile,
          data: "08:00 pm, 20/11/2021",
          cm: "Cai Lin",
          id: "1",
        },
        {
          username: "Tuyen",
          imagesource: images.avatar1,
          data: "08:00 pm, 20/11/2022",
          cm: "T met",
          id: "2",
        },
      ],
  },
  {
    name: "Tuyen",
    date: "01:01 pm, 2/11/2022",
    imagesource: images.imageprofile,
    status: "Food for a better heart.",
    imagepost: images.healthy,
    likenum: 12,
    key: 3,
    comment:[]
  },
];
var Publicdata = [
  {
    name: "HL2",
    date: "09:01 pm, 20/11/2021",
    imagesource: images.avatar,
    status: "Food for a better heart.",
    imagepost: images.foodImage1,
    likenum: 8,
    key: 1,
  },
];
const renderContent = (onSend,text,setText,Data) => {
    return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.primary,
        height: windowHeight,
        width: windowWidth,
        paddingHorizontal: 10,
      }}zz
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: Colors.whiteColor,
          height: windowHeight - 170,
          marginTop: 50,
        }}
      >
        <FlatList
          data={Data}
          renderItem={renderCommentItem}
          style={styles.flatlist}
        />
         <View style={{
                justifyContent: 'space-between',
                flexDirection:'row',
                alignItems:'center',
                height:50,
                borderRadius:10,
                borderWidth:2,
                width:'100%'
            }}>
              <KeyboardAvoidingView
                  behavior={'height'}
                >
                <TextInput 
                  onChangeText={text=>setText(text)}
                  placeholder="Comment" 
                  value={text}
                  multiline={true} 
                  style={styles.textStyle} />
               </KeyboardAvoidingView>
            <Contain
                onPress={() => {
                  onSend(text);setText('')
                }}
            >
              <Image source={icons.send}  />
             </Contain>
        </View>
        
        </View>
    </SafeAreaView>

  );
};
const renderCommentItem = ({ item, id }) => {
  return (
    <SafeAreaView style={styles.headBar}>
    <Image source={item.imagesource} style={{width:50,height:50,borderRadius:100}}/>
      <View style={styles.infoview}>
        <Text style={styles.textTab}>
          <B>{item.username}</B>    {item.cm}
        </Text>
        <Text style={styles.textTab}>{item.data}</Text>
      </View>
    </SafeAreaView>
  );
};
const renderItem = ({ item, id }, sheetref, onPress,setPosFilter) => {
  fall = new Animated.Value(1);
  image = Image.resolveAssetSource(item.imagepost)
  
  return (
    <SafeAreaView style={styles.post}>
      <SafeAreaView style={styles.headBar}>
      <Image source={item.imagesource} style={{width:50,height:50,borderRadius:100}}/>
        <View style={styles.infoview}>
          <Text style={styles.textTab}>
            <B>{item.name}</B>
          </Text>
          <Text style={styles.textTab}>{item.date}</Text>
        </View>
      </SafeAreaView>
      <View style={styles.midpost}>
        <Text style={styles.textTab}>{item.status}</Text>
        <Image source={item.imagepost} 
        style={{
          marginTop: 10,
          borderRadius:10,
          width: '100%',
          height: undefined,
          aspectRatio: image.width/image.height,
        }} />
      </View>
      <View style={styles.botpost}>
        <Image source={icons.favorite} style={{marginTop:5}}  />
        <Text style={styles.likeTab}>
          <B>Like {item.likenum}</B>
        </Text>
        <Contain
          onPress={() => {
            onPress(item, sheetref);setPosFilter(item.key);
          }}
        >
          <Image source={icons.comment}  style={{marginTop:5}} />
        </Contain>
      </View>
    </SafeAreaView>
  );
};
const getStatus = (status) => {
  if (status == "Public feed") return Publicdata;
  else if (status == "Private feed") return Privatedata;
};

const Feed = () => {
  const [status, setStatus] = useState("Private feed");
  const [post, setpost]=useState(0)
  const [trash, setTrash] = useState(true);
  const [Data, setData] = useState([]);
  const [text,setText]=useState('');
  const setStatusFilter = (status) => {
    setStatus(status);
    setData(commentData)
  };
  const setPosFilter = (post) => {
    setpost(post);
  };
  const sheetRef = React.createRef();
  fall = new Animated.Value(1);
  const onPress = (item, sheetref) => {
    setData(item?.comment);
    
    sheetref?.current?.snapTo(0);
  };
  const onSend=(text)=>{
    console.log(text);
    setText(text);
    let comment = {username:"Tuyen Ganh Team",imagesource: images.imageprofile,
    data: "08:00 pm, 20/11/2021",
    cm: text,
    id: "4",};
    getStatus(status)[post-1]?.comment?.push(comment);
    setData(getStatus(status)[post-1].comment);
    
  };
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.listTab}>
        {listTab.map((e) => (
          <TouchableOpacity
            style={[styles.btnTab, status === e.status && styles.btnTabActive]}
            onPress={() => setStatusFilter(e.status)}
          >
            <Text style={styles.textTab}>{e.status}</Text>
          </TouchableOpacity>
        ))}
      </SafeAreaView>
      <SafeAreaView style={styles.headBar}>
        <Contain onPress={() => {}}>
          <Image source={icons.addButton} style={styles.iconStyle} />
        </Contain>
        
        <View style={styles.borderView}>
            <KeyboardAvoidingView
                  behavior={'padding'}
                >
          <TextInput placeholder="Search here.." style={styles.textStyle} />
           </KeyboardAvoidingView>
          <Image source={icons.search} style={styles.iconStyle} />
        </View>
      </SafeAreaView>
      <FlatList
        data={getStatus(status)}
        renderItem={(item) => renderItem(item, sheetRef, onPress,setPosFilter)}
        style={styles.flatlist}
      >
        {renderContent}
      </FlatList>{
            <BottomSheet
              ref={sheetRef}
              snapPoints={[windowHeight,0, 0]}
              initialSnap={1}
              renderContent={()=>renderContent(onSend,text,setText,Data)}
              borderRadius={10}
            />
      }
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:wheight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  headBar: {

    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: (windowWidth * 9) / 10,
    paddingLeft: 10,
    marginTop:10
  },
  iconStyle: {
    height: 35,
    width: 35,
  },
  textStyle: {
    fontSize: 16,
    paddingLeft: 10,
  },
  infoview: {
    fontSize: 16,
    width: "85%",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 20,
  },
  borderView: {
    width: "85%",
    borderRadius: 8,
    borderWidth: 2,
    height: 40,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
  },
  flatlist: {
    flex: 2,
    marginTop: 15,
    marginBottom: 100,
  },
  post: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageCheck: {
    marginTop: 10,
    borderRadius:10,
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  midpost: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "flex-start",
    width: (windowWidth * 9) / 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  botpost: {
    flexDirection: "row",
    alignItems: "center",
    width: (windowWidth * 9) / 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
  },
  listTab: {
    padding: 15,
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  btnTab: {
    width: Dimensions.get("window").width / 3.5,
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 10,
    justifyContent: "center",
    height:45
  },
  textTab: {
    fontSize: 16,
    maxWidth: 400,
  },
  likeTab: {
    fontSize: 16,
    maxWidth: 400,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 20,
  },
  btnTabActive: {
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    justifyContent:'center'
  },
});
export default Feed;
