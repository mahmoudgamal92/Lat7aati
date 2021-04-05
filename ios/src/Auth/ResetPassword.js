import React, { Component, useState, useEffect } from "react";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import PhoneInput from 'react-native-phone-input';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Button,
  Platform,
  AsyncStorage
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      U_password: "",
      C_password: "",
    };
  }

  Updatepassword = () => {
     const {phone} = this.props.route.params;
    const { U_password,C_password } = this.state;
    if(U_password == C_password)
    {
    fetch("https://lat7aati.com/api/reset_password", {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        phone : phone.toString(),
        password : U_password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success == true) {

         alert(responseJson.data.message);
        this.props.navigation.navigate("SignIn")
        } 
        else {
          alert(responseJson.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  else
  {
      alert("Password do not match");
  }
};


  render() {
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            padding: 20,
          }}
        >
          <Image
            style={{
              height: 200,
              width: "100%",
              borderRadius: 50,
              resizeMode: "contain",
              marginBottom: 150
            }}
            source={require("../../assets/logo.png")}
          />
          <TextInput
            onChangeText={(U_password) => this.setState({ U_password })}
            placeholder="Enter Your New Password"
            secureTextEntry
            style={{
              height: 40,
              marginBottom: 20,
              borderWidth: 1.5,
              paddingHorizontal: 10,
              borderColor: "#1A1D3D",
              borderRadius: 10,
              width: "100%",
            fontFamily: "cairo",
            }}
          />   

        <TextInput
            onChangeText={(C_password) => this.setState({ C_password })}
            placeholder="Confirm Your Password"
            secureTextEntry
            style={{
              height: 40,
              marginBottom: 20,
              borderWidth: 1.5,
              paddingHorizontal: 10,
              borderColor: "#1A1D3D",
              borderRadius: 10,
              width: "100%",
            fontFamily: "cairo",
            }}
          />



          <TouchableOpacity
            onPress={this.Updatepassword}
            style={{
              backgroundColor: "#1A1D3D",
              paddingVertical: 10,
              borderRadius: 10,
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                // fontFamily: "cairo",
              }}
            >
            Edit Password
          </Text>
          </TouchableOpacity>

       

       
        </View>
      </ScrollView>
    );
  }
}
