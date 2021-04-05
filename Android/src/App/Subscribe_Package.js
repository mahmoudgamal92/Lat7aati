import { NavigationContainer } from "@react-navigation/native";
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
  StatusBar,
  Alert,
  AsyncStorage,
  FlatList,
  RefreshControl,
} from "react-native";
import { AntDesign} from '@expo/vector-icons'; 

export default class Packages extends Component {
  constructor(props) {
    super(props);
    this._retrieveData();
    this.state = {
      user_token: "",
      refreshing: true,
      control_packages: [],
    };
  }
  _retrieveData = async () => {
    try {
      //await AsyncStorage.setItem('lat7ati_user_token', 'test_token');
      //await AsyncStorage.removeItem('lat7ati_user_token');
      this.setState({ refreshing: true });
      const user_id = await AsyncStorage.getItem("lat7ati_user_token");
      this.setState({ user_token: user_id });
      fetch("https://lat7aati.com/api/package", {
        method: "GET",
        headers: {
          Accept: "Application/json",
          "Content-type": "Application/json",
          "Authorization": user_id
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.success == true) {
            this.setState({ control_packages: responseJson.data.all_package });
            // alert(responseJson.success);
          }
          else {
            // alert(responseJson.message);
          }
        }).then(() => {
          this.setState({ refreshing: false });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  check_login = (pkg_id, pkg_name, pkg_price,days_count,adds_count) => {
    if (this.state.user_token == null) {
      Alert.alert(
        "Login required",
        "You have to Login to Enroll Packeges",
        [
          {
            text: "Later",
            onPress: () => console.log("Ask me later pressed"),
          },
          {
            text: "Login Now",
            onPress: () => this.props.navigation.navigate("SignIn"),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
    else {
      this.props.navigation.navigate("Payment", {
        id: pkg_id,
        price: pkg_price,
        name: pkg_name,
        days: days_count,
        adds: adds_count
      });
    }
  }
  render() {
    const { control_packages } = this.state;
    return (
      <View>
        <StatusBar backgroundColor="#1A1D3D" barStyle="light-content" />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._retrieveData.bind(this)}
            />
          }
        >

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
              Our Supscription Packages
        </Text>
          </View>
          </View> 
          </View>


          <FlatList
             style={{ marginBottom: 10,padding:10 }}
            data={control_packages}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={{ alignItems: "center",
              marginBottom: 20,
              borderColor:"#1A1D3D",
              borderWidth:1.5,
              paddingBottom:10,
              borderRadius:20
               }}>
                <Text style={{ fontSize: 24, fontFamily: "cairo", color: "#1A1D3D" }}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 20, fontFamily: "cairo" }}>
                  {item.additionals.package_price} KWD
            </Text>

                <TouchableOpacity
                  onPress={() => this.check_login(item.id, item.title, item.package_price,item.count_of_days,item.count_of_ads)}
                  style={{
                    backgroundColor: "#1A1D3D",
                    padding: 10,
                    borderRadius: 10,
                    marginTop: 20,
                    width: "80%",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontFamily: "cairo",
                    }}
                  >
                    Buy This package
            </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </ScrollView>
      </View>
    );
  }
}