import * as React from 'react';
import { WebView } from 'react-native-webview';
import { 
    Text, 
    View, 
    Image, 
    TouchableOpacity, 
    Dimensions, 
    FlatList, 
    StatusBar,
    Alert
   } 
    from "react-native";
    import { AntDesign} from '@expo/vector-icons'; 
    import Constants from 'expo-constants';
    import {LocalizationContext} from './../../App';

    export default class App extends React.Component {
    render() {
      const createThreeButtonAlert = () =>
      Alert.alert(
        "Are You Sure?",
        "If You did not Complete Your Payment , Your Information Will be Lost",
        [
          {
            text: "No, Procced Payment",
            onPress: () => console.log("Ask me later pressed"),
          },
          {
            text: "Yse,Exit",
            onPress: () =>this.props.navigation.navigate("Refresh"),
            style: "cancel",
          }       
         ],
        { cancelable: false }
      );
        const { token, fname, lname, user_email, p_id, p_name, pkg_price }
            = this.props.route.params;
        const url = "https://lat7aati.com/api/tap_paument_web_view?user_firstname=" + fname + "&user_lastname=" + lname + "&user_email=" + user_email + "&package_id=" + p_id + "&package_name=" + p_name + "&package_price=" + pkg_price + "&Authorization=" + token;

        return (
            <View style={{flex:1,backgroundColor:"#cccacd"}}>
            <StatusBar backgroundColor="#1A1D3D" barStyle="light-content" />
            <View>
         <View style={{ backgroundColor: "#1A1D3D",flexDirection:'row',paddingTop:Constants.statusBarHeight}}>
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
                padding: 10,
                marginRight:"5%",
                color: "white",
                fontFamily: "cairo",
                fontSize: 20,
              }}
            >
           Lat7aati Payment
        </Text>
          </View>
          </View> 
          </View>
        <WebView source={{ uri: url }} />
        <View style={{
          justifyContent:"center",
          alignItems:"center",
          backgroundColor:"#1A1D3D",
          padding:10}}>

        <TouchableOpacity 
        onPress={createThreeButtonAlert}
        style={{backgroundColor:"#dc3545",width:"80%",borderRadius:10}}>
        <Text style={{textAlign:"center",padding:10,fontFamily:"cairo",color:"#FFF"}}>
         Exit Payment
        </Text>
        </TouchableOpacity>
       </View>
        </View>
        );
    }
}