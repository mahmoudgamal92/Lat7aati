import React, { Component, useState } from "react";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Dimensions,
  StyleSheet,
  Alert,
  Linking,
  Modal,
  TouchableHighlight,
  AsyncStorage,
  StatusBar
} from "react-native";
import * as Animatable from "react-native-animatable";
import { AntDesign,FontAwesome,EvilIcons,MaterialIcons } from '@expo/vector-icons'; 
const { width } = Dimensions.get("window");
const height = width;

export default function ProductDetails({ route, navigation }) {
  const { id, name, desc, price, special, image, phone } = route.params;
  const regex = /(<([^>]+)>)/ig;
  const finali_desc = desc.replace(regex, '');
  const [modalVisible, setModalVisible] = useState(false);

  const AddFavorite = async () => {
    const user_token = await AsyncStorage.getItem("lat7ati_user_token");
if(user_token != null)
{
    try {
      fetch("https://lat7aati.com/api/save_favourite", {
        method: "POST",
        headers: {
          Accept: "Application/json",
          "Content-type": "Application/json",
          "Authorization": user_token
        },
        body: JSON.stringify({
          post_id: id,

        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.success == true) {
            setModalVisible(!modalVisible);
            alert(name + " : Added to favorite sucessfully");
          } else {
            alert(responseJson.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });

    }
    catch (error) {
      console.log(error);
    }
  }
  else
  {
    alert("Please Login Frist")
  }
  }

  const createThreeButtonAlert = () =>
    Alert.alert(
      "Contact With The Seller",
      "Pick A Way to Contact With Te Seller",
      [
        {
          text: "Later",
          onPress: () => console.log("Ask me later pressed"),
        },
        {
          text: "Send message",
          onPress: () => Linking.openURL("https://wa.me/" +"+"+phone),
          style: "cancel",
        },
        { text: "Make Call", onPress: () => Linking.openURL("tel:" + phone) },
      ],
      { cancelable: false }
    );

  let [fontsLoaded] = useFonts({
    cairo: require("./../../assets/fonts/Cairo-Bold.ttf"),
  });
   {
    return (
      <ScrollView style={{backgroundColor:"#FFF"}}> 
        <StatusBar translucent backgroundColor='transparent' />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
           <View style={{ borderRadius:30,
              backgroundColor:"#FFF",
             borderWidth:2,
             borderColor:"black",
             marginTop:-60,
             padding:5
             }}>
            <Image source={require("./../../assets/logo.png")}
            style={{
              width:50,
              height:50,
            }}
            />
            </View>
              <Text style={styles.modalText}>Are you sure?</Text>

              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: "#1A1D3D",
                  marginTop: 5,
                }}
                onPress={AddFavorite}
              >
                <Text style={styles.textStyle}> Add to My Favorite</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: "red",
                  marginTop: 5,
                  paddingHorizontal: 20,
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>


        <View
          style={{
            alignItems: "center",
            borderRadius: 20,
            justifyContent: "center",
          }}
        >
            <Animatable.View
               animation="bounceIn"
            >
          <ImageBackground
            imageStyle={{ 
              borderBottomLeftRadius:10,
              borderBottomRightRadius:10,
            }}
            style={{
              width,
              height,
              resizeMode: "cover",
            }}
            source={{
              uri: image,
            }}
          >
          <TouchableOpacity
          onPress={() => navigation.goBack()}
          >
          <AntDesign name="arrowleft" size={30} color="#1A1D3D" style={{marginTop:30,marginLeft:20}} />
          </TouchableOpacity>   
          {/* <MaterialIcons name="favorite" size={30} color="black" />          */}
     </ImageBackground>

          </Animatable.View>

          <Animatable.View style={{   
              borderTopLeftRadius:40,
              borderTopRightRadius:40,
              backgroundColor:"#FFF",
              width:"100%",
              marginTop:-40
              }}
              animation="fadeInUpBig"
              >
              
            <Text
              style={{
                fontSize: 20,
                fontFamily: "cairo",
                color: "#404040",
                marginTop: 20,
                textAlign:"center",
              }}
            >
            {name}
          </Text>

          <Text
            style={{
              fontSize: 20,
              fontFamily: "cairo",
              color: "#404040",
              marginTop: 5,
              textAlign:"center"
            }}
          >
            Price : {price} KWD
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "cairo",
              color: "#1C86C8",
              textAlign: "right",
              marginTop: 10,
              textAlign:"center"
            }}
          >
            Product Description
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "cairo",
              color: "#404040",
              textAlign:"center"
            }}
          >
            {finali_desc}
          </Text>
          <View  style={{
                  justifyContent:"center",
                  alignItems:"center",
                  paddingVertical:10
                  }}>
          <TouchableOpacity
            onPress={createThreeButtonAlert}
            style={{
              backgroundColor: "#FFF",
              padding: 10,
              borderRadius: 10,
              marginTop: 50,
              borderWidth:2,
              borderColor:"#1A1D3D"

            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "cairo",
                color:"#1A1D3D"
              
              }}
            >          
      Contact with the Seller
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={createThreeButtonAlert}
            onPress={() => {
              setModalVisible(true);
            }}
            style={{
              backgroundColor: "#1A1D3D",
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "cairo",
              }}
            >
              Add to Favorite
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Complaint", {
                p_id: id,
                p_name: name,
                p_image: image,
              })
            }
            style={{
              backgroundColor: "#C80C3E",
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "cairo",
              }}
            >
              Report a Problem
            </Text>
          </TouchableOpacity>
          </View>
          </Animatable.View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingHorizontal: 80,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily:"cairo"
  },
});
