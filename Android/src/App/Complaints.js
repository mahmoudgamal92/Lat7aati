import React, { Component, useState } from "react";
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
  image,
  StatusBar,
  AsyncStorage
} from "react-native";
import * as Animatable from "react-native-animatable";
import { AntDesign,FontAwesome,EvilIcons,MaterialIcons } from '@expo/vector-icons'; 
const { width } = Dimensions.get("window");
const height = width;

export default class Complaints extends Component{

  constructor(props) {
    super(props);
    this.state = {
      c_title: "",
      c_complain: "",
      };
  }

     ReportComplain = async () => {
      const usr_tkn = await AsyncStorage.getItem('lat7ati_user_token');
      const { c_title, c_complain } = this.state;
      fetch("https://lat7aati.com/api/send_complain", {
        method: "POST",
        headers: {
          Accept: "Application/json",
          "Content-type": "Application/json",
          "Authorization":usr_tkn,
        },
        body: JSON.stringify({
          item_id: this.props.route.params.p_id,
          title: c_title,
          complain: c_complain,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.success == true) {
            alert("Your Complain Have been Registerd and We will Review This Product");
            this.textInput.clear();
          } else {
            alert(responseJson.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    render(){
      const {p_image,p_name,p_id} = this.props.route.params;
    return (
      <ScrollView style={{backgroundColor:"#FFF"}}> 
        <StatusBar translucent backgroundColor='transparent' />
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
              uri: p_image,
            }}
          >
               <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          >
          <AntDesign name="arrowleft" size={30} color="#1A1D3D" style={{marginTop:30,marginLeft:20}} />
          </TouchableOpacity>   
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
          <View  
             style={{
                  justifyContent:"center",
                  alignItems:"center",
                  paddingVertical:10,
                  marginTop:20
                  }}>

            <Text
              style={{
                fontSize: 20,
                fontFamily: "cairo",
                color: "#404040",
                marginTop: 20,
                textAlign:"center",
                marginBottom:20
              }}>
            {p_name}
          </Text>

           <TextInput
           ref={input => { this.textInput = input }}
             onChangeText={(c_title) => this.setState({ c_title })}
            placeholder="Enter Complain title"
            style={{
              height: 40,
              marginBottom: 20,
              borderWidth: 1.5,
              paddingHorizontal: 20,
              borderColor: "#1A1D3D",
              borderRadius: 10,
             width: "90%",
            fontFamily: "cairo",
            }}
          />
        <TextInput
          ref={input => { this.textInput = input }}
            onChangeText={(c_complain) => this.setState({ c_complain })}
            placeholder="Enter Complain Description"
            style={{
              height: 100,
              marginBottom: 20,
              borderWidth: 1.5,
              paddingHorizontal: 20,
              borderColor: "#1A1D3D",
              borderRadius: 10,
              width: "90%",
            fontFamily: "cairo",
            }}
          />


          <TouchableOpacity
            onPress={this.ReportComplain}
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
