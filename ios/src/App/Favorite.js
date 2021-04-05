import React, { Component, useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StatusBar,
  AsyncStorage,
  RefreshControl,
  ScrollView
} from "react-native";
import Constants from 'expo-constants';
const { width } = Dimensions.get("window");
const height = width * 0.6;
export default class Favorite extends Component {
  constructor(props) {
    super(props);
    this._retrieveData();
    this.state = {
      user_token: "",
      refreshing: false,
      data: []
    };
  }
  _retrieveData = async () => {
    try {
      this.setState({ refreshing: true });
      const usr_tkn = await AsyncStorage.getItem('lat7ati_user_token');
      this.setState({ user_token: usr_tkn });
      fetch("https://lat7aati.com/api/favourite", {
        method: "GET",
        headers: {
          Accept: "Application/json",
          "Content-type": "Application/json",
          "Authorization": usr_tkn,
        }
      })
        .then((response) => response.json())
        .then((json) => this.setState({ data: json.data }))
        .then(() => {
          this.setState({ refreshing: false });
        })
        .catch((error) => console.error(error))
    } catch (error) {
      // Error retrieving data
    }
  };

  render() {
    const {user_token}  = this.state;


     
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
      <View style={{flex: 1, justifyContent: "center"}}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._retrieveData.bind(this)}
            />
          }
          data={this.state.data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity 
            onPress={() =>
               this.props.navigation.navigate("ProductDetails", {
                 id: item.id,
                 name: item.title,
                 image: item.image,
                 desc: item.content,
                 price: item.item_price,
                 special: item.Item_Special,
                 phone: item.user_phone
               })
             }
             style={{
                 height:280,
                 elevation:2,
                 backgroundColor:"#FFF",
                 marginLeft:20,
                 marginTop:20,
                 borderRadius:15,
                 marginBottom:10,
                 width:"90%",

             }}
         >
             <Image
                source={{
                 uri:
                   item.image,
               }}
                 style={{width:"100%",height:"80%",
                 borderTopLeftRadius:15,
                 borderTopRightRadius:15,
             }}
             />
             <View style={{
                 flexDirection:"row",
                 paddingTop:10,
                 paddingHorizontal:10
             }}>
                 <Text style={{
                     fontWeight:"bold",
                     color:"#1A1D3D"
                 }}>
                     {item.title}
                     </Text>
             </View>
             <Text style={{
                 paddingHorizontal:10,
                 fontWeight:"bold",
                 color:"#637AA5",
                 paddingTop:3
             }}>
                { item.item_price} KWD
             </Text>
         </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}}