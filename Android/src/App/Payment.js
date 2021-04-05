import React, { Component, useState, useEffect } from "react";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
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
    StyleSheet,
    ScrollView,
    AsyncStorage,
    StatusBar
} from "react-native";
import { AntDesign} from '@expo/vector-icons'; 
export default class Payment extends Component {
    constructor(props) {
        super(props);
        this._retrieveData();
        this.state = {
            user_token: "",
            frist_name: "",
            last_name: "",
            email: "",
            pkg_id: this.props.route.params.id,
            pkg_name: this.props.route.params.name,
            pkg_price: this.props.route.params.price,
            day_count: this.props.route.params.days,
            adds_count: this.props.route.params.adds,
        };
    }
    _retrieveData = async () => {
        try {
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
                    this.setState({ email: responseJson.data.email });
                  }
                }).then(() => {
                  this.setState({ refreshing: false });
                })
                .catch((error) => {
                  console.log(error);
                })
           
        } catch (error) {
            console.log(error);
        }
    };

    Proceed_to_payment = () => {
        const {
            user_token,
            frist_name,
            last_name,
            email,
            pkg_id,
            pkg_name,
            pkg_price,
         } = this.state;
        this.props.navigation.navigate("payment_webview",
            {
                token: user_token,
                fname: frist_name,
                lname: last_name,
                user_email: email,
                p_id: pkg_id,
                p_name: pkg_name,
                pkg_price: pkg_price
            }
        )
    };
    render() {
        const { id, price, name,days,adds } = this.props.route.params;
        const {frist_name,last_name,email} = this.state;
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
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
          Confirm Order
        </Text>
          </View>
          </View> 
          </View>
            <ScrollView>
            <View style={{ alignItems: "center",
              borderColor:"#1A1D3D",
              borderWidth:1.5,
              paddingBottom:10,
              borderRadius:20,
              marginHorizontal:10,
              marginTop:50
               }}>
                <Text style={{ fontSize: 24, fontFamily: "cairo", color: "#1A1D3D" }}>
                {name}
                </Text>
                <Text style={{ fontSize: 20, fontFamily: "cairo" }}>
                {price} KWD 
                <Image style={{width:30,height:30,paddingLeft:5}}
                    source={require("../../assets/kw.png")}/>
            </Text>
            <Text style={{ fontSize: 20, fontFamily: "cairo" }}>
            {days} days
            </Text>
            <Text style={{ fontSize: 20, fontFamily: "cairo" }}>
            {adds} Adds
            </Text>
              </View>
              <View style={{marginTop:50,marginBottom:50,marginHorizontal:10}}>
                  <Text style={{fontFamily:"cairo",fontSize:30 ,color:"#1A1D3D"}}>
                      Total Price: {price} KWD  
                      <Image style={{width:30,height:30,}}
                    source={require("../../assets/kw.png")}/>
                       
                      </Text>
              </View>
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        flexGrow: 1,
                        padding: 20,
                    }}>
                    <TouchableOpacity
                        onPress={this.Proceed_to_payment}
                        style={{
                            backgroundColor:"#1A1D3D" ,
                            paddingVertical: 10,
                            borderRadius: 5,
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
                            Proceed to Payment
                       </Text>
                    </TouchableOpacity>
                    <View style={{marginTop:100}}>
                        <Text style={{textAlign:"center",fontFamily:"cairo",color:"grey"}}>Our Payment Methods</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                  
                     <Image style={{width:100,height:100,borderRadius:10,marginEnd:5}}
                    source={require("../../assets/visa.png")}/>
                     <Image style={{width:100,height:100,borderRadius:10,marginEnd:5}}
                    source={require("../../assets/knet.png")}/>
                      <Image style={{width:100,height:100,borderRadius:10,marginEnd:5}}
                    source={require("../../assets/mastercard.png")}/>
                     
                  </View>
                </View>
            </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    twoPickers: {
        width: "100%",
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        color: "#1C86C8",
        fontFamily: "cairo"
    },
});
