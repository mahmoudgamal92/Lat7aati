import React, { useState, useEffect, Component } from "react";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  StatusBar,
  AsyncStorage,
  Alert,
  RefreshControl,
  FlatList
} from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AntDesign} from '@expo/vector-icons'; 

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this._retrieveData();
    this.state = {
      refreshing: true,
      user_token: "",
      user_name: "",
      frist_name: "",
      last_name: "",
      email: "",
      user_phone: "",
      old_password: "",
      new_password: ""
    };
  }
  componentDidMount() {
    this.setState({ refreshing: true });
  }
  // Fired When logout
  _removeSession = async () => {
    try {
      await AsyncStorage.removeItem("lat7ati_user_token");
      this.props.navigation.navigate("Splash");
    }
    catch (error) {
      console.log(error);
      alert("Erorr : " + error)
    }
  }

  _retrieveData = async () => {
    try {
      this.setState({ refreshing: true });
      const user_id = await AsyncStorage.getItem("lat7ati_user_token");
      this.setState({ user_token: user_id });
      fetch("https://lat7aati.com/api/get_profile", {
        method: "GET",
        headers: {
          Accept: "Application/json",
          "Content-type": "Application/json",
          "Authorization": user_id,
        }
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.success == true) {
            this.setState({ frist_name: responseJson.data.firstname });
            this.setState({ last_name: responseJson.data.lastname });
            this.setState({ user_name: responseJson.data.username });
            this.setState({ user_phone: responseJson.data.phone.toString() });
            this.setState({ email: responseJson.data.email });

            // setProfile(responseJson.data);
            //  alert(responseJson.data.firstname);
          }
          // else {
          //   Alert.alert(
          //     "Login required",
          //     "You have to Login to Enroll Packeges",
          //     [
          //       {
          //         text: "Later",
          //         onPress: () => console.log("Ask me later pressed"),
          //       },
          //       {
          //         text: "Login Now",
          //         onPress: () => this.props.navigation.navigate("SignIn"),
          //         style: "cancel",
          //       },
          //     ],
          //     { cancelable: false }
          //   );
          // }
        }).then(() => {
          this.setState({ refreshing: false });
        })
        .catch((error) => {
          console.log(error);
        })

    }
    catch (error) {
      console.log(error);
    }
  }
  ProfileEdit = () => {
    const { user_token, user_name, frist_name, last_name, email, user_phone, old_password, new_password }
      = this.state;
    fetch("https://lat7aati.com/api/edit_profile", {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-type": "Application/json",
        "Authorization": this.state.user_token
      },
      body: JSON.stringify({
        username: user_name,
        firstname: frist_name,
        lastname: last_name,
        email:email,
        phone:user_phone,
        old_password: old_password,
        password: new_password,
        password_confirmation: new_password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success == true) {
          alert("Your Data Have been Changed sucessfully");
        } else {
          alert(responseJson.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { user_token, frist_name, last_name, user_name, user_phone, email } = this.state;
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._retrieveData.bind(this)}
            />
          }
        >
  <StatusBar backgroundColor="#1A1D3D" barStyle="light-content" />
            <View>
         <View style={{ backgroundColor: "#1A1D3D",flexDirection:'row',}}>
        <View style={{width:"10%",justifyContent:"center"}}>
         <TouchableOpacity onPress={() => this.props.navigation.goBack()} 
         style={{justifyContent:"center"}}>
          <AntDesign name="arrowleft" size={25} color="white" style={{marginLeft:10}}/>
          </TouchableOpacity>
          </View>
          <View style={{alignItems:"center",width:"90%"}}>
          <Text
              style={{
                textAlign: "right",
                padding: 5,
                marginRight:"5%",
                color: "white",
                fontFamily: "cairo",
                fontSize: 20,
              }}
            >
        Edit Profile Iformation
        </Text>
          </View>
          </View> 
          </View>          
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#1A1D3D",
              borderBottomLeftRadius:30,
              borderBottomRightRadius:30,
              marginBottom:40
            }}
          >
            <Image
              style={{
                width: "100%",
                height: 200,
                resizeMode: "contain",
                marginEnd: 3,
                borderRadius: 20,
                marginTop: 10,
              }}
              source={require("../../assets/avatar.png")}
            />
            <Text style={{ color: "#FFF", fontFamily: "cairo", fontSize: 24 }}>
              User Profile
          </Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 20, marginBottom: 100 }}>
            <TextInput
              value={user_name}
              onChangeText={(user_name) => this.setState({ user_name })}
              style={{
                height: 40,
                marginBottom: 10,
                borderWidth: 1.5,
                paddingHorizontal: 10,
                borderColor: "#1A1D3D",
                borderRadius: 10,
                width: "90%",
                fontFamily: "cairo",
                textAlign: "center",
                color: "grey",
                fontSize: 20,
              }}
            />

            <TextInput
              value={frist_name}
              onChangeText={(frist_name) => this.setState({ frist_name })}
              style={{
                height: 40,
                marginBottom: 10,
                borderWidth: 1.5,
                paddingHorizontal: 10,
                borderColor: "#1A1D3D",
                borderRadius: 10,
                width: "90%",
                fontFamily: "cairo",
                textAlign: "center",
                color: "grey",
                fontSize: 20,
              }}
            />
            <TextInput
              value={last_name}
              onChangeText={(last_name) => this.setState({ last_name })}
              style={{
                height: 40,
                marginBottom: 10,
                borderWidth: 1.5,
                paddingHorizontal: 10,
                borderColor: "#1A1D3D",
                borderRadius: 10,
                width: "90%",
                fontFamily: "cairo",
                textAlign: "center",
                color: "grey",
                fontSize: 20,
              }}
            />

            <TextInput
              value={email}
              onChangeText={(email) => this.setState({ email })}

              style={{
                height: 40,
                marginBottom: 10,
                borderWidth: 1.5,
                paddingHorizontal: 10,
                borderColor: "#1A1D3D",
                borderRadius: 10,
                width: "90%",
                fontFamily: "cairo",
                textAlign: "center",
                color: "grey",
                fontSize: 20,
              }}
            />
            <TextInput
              keyboardType='numeric'
              value={user_phone.toString()}
              onChangeText={(phone) => this.setState({ phone })}
              style={{
                height: 40,
                marginBottom: 10,
                borderWidth: 1.5,
                paddingHorizontal: 10,
                borderColor: "#1A1D3D",
                borderRadius: 10,
                width: "90%",
                fontFamily: "cairo",
                textAlign: "center",
                color: "grey",
                fontSize: 20,
              }}
            />
            <TextInput
              placeholder="Enter your Old Password"
              onChangeText={(old_password) => this.setState({ old_password })}
              style={{
                height: 40,
                marginBottom: 10,
                borderWidth: 1.5,
                paddingHorizontal: 10,
                borderColor: "#1A1D3D",
                borderRadius: 10,
                width: "90%",
                fontFamily: "cairo",
                textAlign: "center",
                color: "grey",
                fontSize: 20,
              }}
            />

            <TextInput
              placeholder="Enter your new Password"
              onChangeText={(new_password) => this.setState({ new_password })}
              style={{
                height: 40,
                marginBottom: 10,
                borderWidth: 1.5,
                paddingHorizontal: 10,
                borderColor: "#1A1D3D",
                borderRadius: 10,
                width: "90%",
                fontFamily: "cairo",
                textAlign: "center",
                color: "grey",
                fontSize: 20,
              }}
            />
            <TouchableOpacity
              onPress={this.ProfileEdit}
              style={{
                backgroundColor: "#1A1D3D",
                paddingVertical: 10,
                borderRadius: 10,
                width: "90%",
                marginBottom: 10,
                marginTop:20
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "cairo",
                }}
              >
                Save
            </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
  }