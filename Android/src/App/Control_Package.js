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
            this.setState({ control_packages: responseJson.data.subscripe_package.packages });
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

  check_login = (pkg_id, pkg_name, pkg_price) => {
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
      });
    }
  }

  render() {
    const { control_packages,user_token } = this.state;
    

 
    const AuthComponent = () => {
      return (
     <View>
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        flex:1
      }}
    >
      <Image
        style={{
          width: "100%",
          height: 200,
          resizeMode: "contain",
          marginEnd: 3,
          borderRadius: 20,
          marginTop: 50,
        }}
        source={require("../../assets/lock.png")}
      />
    </View>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
    
      <Text style={{
        marginTop: 50, fontSize: 20, textAlign: "center",
        fontFamily: "cairo", color: "#1A1D3D"
      }}>
        Please Login Frist to View Your Profile
      </Text>
      <Text style={{
        marginTop: 10, fontSize: 15, textAlign: "center",
        fontFamily: "cairo", color: "grey"
      }}>
       Sorry , there are some features are 
       not avalible for every one ,
        you have to login to see it
      </Text>
      <TouchableOpacity onPress={() => this.props.navigation.navigate("SignIn")}>
        <Text
          style={{
            backgroundColor:"#1A1D3D",
            padding: 10,
            borderRadius: 10,
            marginTop: 15,
            marginBottom: 5,
            fontFamily: "cairo",
            color: "white"
          }}
        >
          Login Now
         </Text>
      </TouchableOpacity>
    </View>
    </View>
    )
  }

    if (user_token == null) {
      return (
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._retrieveData.bind(this)}
          />
        }
        >
      <AuthComponent/>
        </ScrollView>
      )
    }
    else {
    return (
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._retrieveData.bind(this)}
            />
          }
        >
          <View style={{ backgroundColor: "#404040", borderRadius: 10, margin: 10 }}>

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
                  {item.package_title}
                </Text>
                <Text style={{ fontSize: 20, fontFamily: "cairo" }}>
                Adds Left: {item.count_of_ads} 
            </Text>

            <Text style={{ fontSize: 20, fontFamily: "cairo" }}>
            Days : {item.count_of_days} 
            </Text>
            
                <TouchableOpacity
                  // onPress={() => this.check_login(item.id, item.title, item.package_price)}
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
                   View Information
            </Text>
                </TouchableOpacity>
              </View>
            )}
          />
            <View style={{
            alignItems: 'center',
            justifyContent:"center", 
            paddingBottom:20
            }}>
           <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Subscribe_Package")}
                 // onPress={() => this.check_login(item.id, item.title, item.package_price)}
                  style={{
                    backgroundColor: "#009973",
                    padding: 10,
                    borderRadius: 10,
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
                 Buy New Package
            </Text>
                </TouchableOpacity>
                </View>
        </ScrollView>
      </View>
    );
  }
}

}