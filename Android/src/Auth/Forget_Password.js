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

  VerifyUser = () => {
    const { U_phone} = this.state;
    fetch("https://lat7aati.com/api/forget_password", {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        phone: U_phone,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success == true) {
           alert(responseJson.data.message);
           this.props.navigation.navigate("Reset_Otp",
           {
             code : responseJson.data.code,
             phone : responseJson.data.phone,
           }
           );
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
              marginBottom: 100,
              marginTop:50
            }}
            source={require("../../assets/ResetLock.png")}
          />
          <Text style={{
              fontFamily:"cairo",
              marginBottom:50,
              textAlign:"center",
              fontSize:18
              
              }}>
              Please, Make Sure You type Your Number Correctly , We Will Send verificatiom Meassage 
              to Verifiy Your Number
          </Text>

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
          <TouchableOpacity
            onPress={this.VerifyUser}
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
          Send Message
          </Text>
          </TouchableOpacity>

      
        </View>
      </ScrollView>
    );
  }
}
