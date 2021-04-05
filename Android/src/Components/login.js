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
} from "react-native";
import Constants from 'expo-constants';
const { width } = Dimensions.get("window");
const height = width * 0.6;
export default function login() {
    return (
  <ScrollView
refreshControl={
  <RefreshControl
    refreshing={this.state.refreshing}
    onRefresh={this._retrieveData.bind(this)}
  />
}
>
<StatusBar backgroundColor="#343a40" barStyle="light-content" />
<View
  style={{
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#343a40",
    borderRadius: 15,
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
  <Text style={{ color: "#1C86C8", fontFamily: "cairo", fontSize: 24 }}>
    User Profile
</Text>
</View>
<View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>

  <Text style={{
    marginTop: 150, fontSize: 20, textAlign: "center",
    fontFamily: "cairo", color: "grey"
  }}>
    Please Login Frist to View Your Profile
  </Text>
  <TouchableOpacity onPress={() => this.props.navigation.navigate("SignUp")}>
    <Text
      style={{
        backgroundColor: "#1C86C8",
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
</ScrollView>
);
}