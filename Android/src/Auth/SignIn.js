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
export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      U_phone: "",
      U_password: "",
      // For Async Storage
      User_token: "",
      User_name: "",
      User_Phone: "",
      User_email: "",
    };
    this.updateInfo = this.updateInfo.bind(this);
  }
  updateInfo() {
    this.setState({
      U_phone: this.phone.getValue().replace('+', '')
    });
  }

  LoginUser = () => {
    const { U_phone, U_password } = this.state;
    fetch("https://lat7aati.com/api/sign_in", {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        phone: U_phone,
        password: U_password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success == true) {
          alert("Welcome " + responseJson.data.username);
          this.setState({
            User_token: responseJson.data.Token,
            User_name: responseJson.data.username,
            User_Phone: responseJson.data.phone,
            User_email: responseJson.data.email
          });
          this._storeData();
          this.props.navigation.navigate("Authenticated")
        } else {
          alert(responseJson.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  _storeData = async () => {
    const { User_token } = this.state;
    try {
      await AsyncStorage.setItem("lat7ati_user_token", User_token);
    } catch (error) {
      alert("there is an erorr signing")
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
            onPress={this.LoginUser}
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
              Sign In
          </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignUp")}
            style={{

              paddingVertical: 10,
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontFamily: "cairo",
              }}
            >
             Don'nt You have Account? Create One
          </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Forget_Password")}
            style={{

              paddingVertical: 10,
              width: "100%",
            }}
          >

            <Text
              style={{
                color: "#1A1D3D",
                textAlign: "center",
                fontFamily: "cairo",

              }}
            >
              Do You Forget Your Password ?
          </Text>
          
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
