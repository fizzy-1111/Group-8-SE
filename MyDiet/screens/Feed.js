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
  KeyboardAvoidingView,
  View as Container,
  Modal,
  Animated,
  Alert,
} from "react-native";
import { Colors, icons, images } from "../constants";
import styled from "styled-components/native";
import BottomSheet from "reanimated-bottom-sheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { set } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { uploadPostAsync, getPostList, commentPost } from "../server";
import { FlatList } from "react-native-gesture-handler";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const { wheight } = Dimensions.get("window");
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
var Privatedata = [];
var Publicdata = [];
const renderContent = (onSend, text, setText, Data) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.primary,
        height: windowHeight,
        width: windowWidth,
        paddingHorizontal: 10,
      }}
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
        <View style={{flex:1,height:500}}>
        <FlatList
          data={Data}
          renderItem={renderCommentItem}
          
          keyboardShouldPersistTaps='always'
          keyExtractor={(item) => item._id}
        />
        </View>
       
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            height: 50,
            borderRadius: 10,
            borderWidth: 2,
            width: "100%",
          }}
        >
          <KeyboardAvoidingView behavior={"height"}>
            <TextInput
              onChangeText={(text) => setText(text)}
              placeholder="Comment"
              value={text}
              style={styles.textStyle}
            />
          </KeyboardAvoidingView>
          <Contain
            onPress={() => {
              onSend(text);
              setText("");
            }}
          >
            <Image source={icons.send} />
          </Contain>
        </View>
      </View>
    </SafeAreaView>
  );
};
const renderCommentItem = ({ item, id }) => {
  return (
    <SafeAreaView style={styles.headBar}>
      <Image
        source={{ uri: item.avatar }}
        style={{ width: 50, height: 50, borderRadius: 100 }}
      />
      <View style={styles.infoview}>
        <Text style={styles.textTab}>
          <B>{item.name}</B> {item.dateTime}
        </Text>
        <Text style={styles.textTab}>{item.content}</Text>
      </View>
    </SafeAreaView>
  );
};
const renderItem = ({ item, index }, sheetref, onPress, setPosFilter) => {

  return (
    <SafeAreaView style={styles.post}>
      <SafeAreaView style={styles.headBar}>
        <Image
          source={{ uri: item?.owner?.avatar }}
          style={{ width: 50, height: 50, borderRadius: 100, margin: 10 }}
        />
        <View style={styles.infoview}>
          <Text style={styles.textTab}>
            <B>{item?.owner?.name}</B>
          </Text>
          <Text style={styles.textTab}>{item.dateTime}</Text>
        </View>
      </SafeAreaView>
      <View style={styles.midpost}>
        <Text style={styles.textTab}>{item.content}</Text>
        <Image
          source={{ uri: item.image }}
          style={{
            marginTop: 10,
            borderRadius: 10,
            width: "100%",
            height: 200,
          }}
        />
      </View>
      <View style={styles.botpost}>
        <Image source={icons.favorite} style={{ marginTop: 5 }} />
        <Text style={styles.likeTab}>
          <B>Like {item.numLike}</B>
        </Text>
        <Contain
          onPress={() => {
            onPress(item, sheetref);
            setPosFilter(index);
          }}
        >
          <Image source={icons.comment} style={{ marginTop: 5 }} />
        </Contain>
      </View>
    </SafeAreaView>
  );
};
const getStatus = (status) => {
  if (status == "Public feed") return Publicdata;
  else if (status == "Private feed") return Privatedata;
};
const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};
const Feed = () => {
  const state = useSelector((state) => state.auth.accountInformation);
  const [status, setStatus] = useState("Private feed");
  const [post, setpost] = useState(0);
  const [trash, setTrash] = useState(true);
  const [Data, setData] = useState([]);
  const [text, setText] = useState("");
  const [textPost, setTextPost] = useState("");
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [cursor, setCursor] = useState("");

  function fetchData() {
    const currentStatus = status;
    getPostList(cursor, status === "Private feed", state.token, (response) => {
      if (response.status != 1) return;
      if (currentStatus == "Public feed") Publicdata = response.data.postFeed;
      else if (currentStatus == "Private feed")
        Privatedata = response.data.postFeed;
      setCursor(response.data.cursor);
      setTrash(!trash);
    });
  }
  useEffect(() => {
    fetchData();
  }, [status]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const setStatusFilter = (status) => {
    setStatus(status);
    setData(commentData);
  };
  const setPosFilter = (post) => {
    setpost(post);
  };

  const onAddPost = (textPost) => {
    uploadPostAsync(
      image,
      textPost,
      status === "Private feed",
      state.token,
      (response) => {
        if (response.status == 1) {
          Alert.alert("Upload post successfully");
          getStatus(status).push(response.data);
          setStatus(status);
          setTrash(!trash)
        }
      }
    );
    setVisible(false);
  };

  const sheetRef = React.createRef();
  const onPress = (item, sheetref) => {
    setData(item?.comments);
    sheetref?.current?.snapTo(0);
  };
  const onSend = (text) => {
    if (text != "") {
      commentPost(
        getStatus(status)[post]._id,
        text,
        state.token,
        (response) => {
          if (response.status == 1) {
            getStatus(status)[post]?.comments?.push(response.data);
            setTrash(!trash);
          }
        }
      );
    }
  };
  const exitPost = () => {
    setImage(null);
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
        <Contain onPress={() => setVisible(true)}>
          <Image source={icons.addButton} style={styles.iconStyle} />
        </Contain>

        <View style={styles.borderView}>
          <KeyboardAvoidingView behavior={"padding"}>
            <TextInput placeholder="Search here.." style={styles.textStyle} />
          </KeyboardAvoidingView>
          <Image source={icons.search} style={styles.iconStyle} />
        </View>
      </SafeAreaView>
      <FlatList
        data={getStatus(status)}
        renderItem={(item) => renderItem(item, sheetRef, onPress, setPosFilter)}
        keyExtractor={(item) => item._id}
        style={styles.flatlist}
        onEndReached={fetchData}
      >
        {renderContent}
      </FlatList>
      {
        <BottomSheet
          ref={sheetRef}
          snapPoints={[windowHeight, 0, 0]}
          initialSnap={1}
          renderContent={() => renderContent(onSend, text, setText, Data)}
          borderRadius={10}
        />
      }
      <ModalPoup visible={visible}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              exitPost();
            }}
          >
            <Text>Exit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.setting}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Your Post</Text>
          <View
            style={{
              alignItems: "flex-start",
              width: "100%",
              height: "50%",
              backgroundColor: Colors.whiteColor,
              marginTop: 5,
              borderRadius: 8,
            }}
          >
            <TextInput
              onChangeText={(textPost) => setTextPost(textPost)}
              style={{
                fontSize: 16,
                marginHorizontal: 5,
                width: "100%",
                height: "100%",
              }}
            ></TextInput>
          </View>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity style={styles.touch} onPress={pickImage}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: Colors.whiteColor,
              }}
            >
              Post Image
            </Text>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ height: 100, width: "100%" }}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => onAddPost(textPost, image)}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: Colors.whiteColor,
              }}
            >
              Save changes
            </Text>
          </TouchableOpacity>
        </View>
      </ModalPoup>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: wheight,
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
    marginTop: 10,
    height:70
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
    borderRadius: 10,
    width: "100%",
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
    height: 45,
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
    justifyContent: "center",
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: Colors.grayColor,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  setting: {
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    marginHorizontal: 15,
  },
  touch: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.iconColor,
    borderRadius: 8,
    height: 50,
    width: "40%",
    marginTop: 30,
  },
});
export default Feed;
