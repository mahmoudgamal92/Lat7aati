import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

const AuthComponent = ({route,navigation}) => {
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
  <TouchableOpacity onPress={() => this.props.navigation.navigate("SignUp")}>
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
)}
export default AuthComponent;