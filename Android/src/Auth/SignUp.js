import React, { Component, useState, useEffect } from "react";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import PhoneInput from 'react-native-phone-input';
// Number Check
//545652485 ==> 966 ==> Ksa
//55518944 => 965 ==> KW
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
  ScrollView,
  StyleSheet
} from "react-native";
export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      U_username: "",
      U_fristname: "",
      U_lastname: "",
      U_phone: "",
      U_email: "",
      U_password: "",
      Mobile_valid: "",
    };
    this.updateInfo = this.updateInfo.bind(this);
  }
  
  updateInfo() {
    this.setState({
      Mobile_valid: this.phone.isValidNumber(),
      U_phone: this.phone.getValue().replace('+', '')
    });
  }

  RegisterUser = () => {
    const { U_username, U_fristname, U_lastname, U_phone, U_email, U_password } = this.state;
    fetch("https://lat7aati.com/api/sign_up", {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        username: U_username,
        firstname: U_fristname,
        lastname: U_lastname,
        phone: U_phone,
        email: U_email,
        password: U_password
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success == true) {
          alert("Your Account Has been created successfully,Verfiy Your Mobile");
        this.props.navigation.navigate("Register_Otp",{

          Phone:this.state.U_phone,
        })
        } else {
          alert(responseJson.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
              borderColor: "#010001",
              marginBottom: 50

            }}
            source={require("../../assets/logo.png")}
          />
          <TextInput
            onChangeText={(U_username) => this.setState({ U_username })}
            placeholder="Enter UserName"
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
            onChangeText={(U_fristname) => this.setState({ U_fristname })}
            placeholder="Enter Your Frist name"
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
            onChangeText={(U_lastname) => this.setState({ U_lastname })}
            placeholder="Enter Your last name"
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


           <PhoneInput
                ref={ref => {
                  this.phone = ref;
                }}
                textProps={{placeholder: 'Enter Your Telephone number'}}
                onChangePhoneNumber={this.updateInfo}
                textStyle={{fontFamily: "cairo",}}
                initialCountry="kw"
                style={{
                  height: 40,
                  marginBottom: 20,
                  borderWidth: 1.5,
                  paddingHorizontal: 10,
                  borderColor: "#1A1D3D",
                  borderRadius: 10,
                  width: "100%",
                 
                }}
            />
          <TextInput
            onChangeText={(U_email) => this.setState({ U_email })}
            placeholder="Enter Your Email Address"
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
            onChangeText={(U_password) => this.setState({ U_password })}
            placeholder="Enter Your Password"
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
            onPress={this.RegisterUser}
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
            fontFamily: "cairo",
              }}
            >
              Create Account
          </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate("SignIn")}           
            style={{
              paddingVertical: 10,
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontWeight: "700",
                fontFamily: "cairo",
              }}
            >
              Do You have Account? Sign In
          </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
            
    );
  }

}