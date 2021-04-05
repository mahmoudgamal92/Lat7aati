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
  Picker,
  StyleSheet,
  AsyncStorage,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {LocalizationContext} from './../../App';

export default class Add extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props)
    this._retrieveData();
    this.state = {
      welcome_text:"",
      context_data: {},
      isLoading: false,
      user_token:"",
      //Add Information
      category_id: "0",
      sub_category_id: "0",
      special: "0",
      product_title: "",
      product_price: "",
      product_desc: "",
      package_id:"",

      // Main Image Data
      image_title: "upload product Image",
      image_uri: null,
      image_type: null,

      // Sub Image Data
      subimage_title:"Upload Product Sub image 1",
      subimage_uri: null,
      subimage_type: null,

      //Catigories
      category_list:[],
      sub_cat_list:[],
      //packages
      packages:[],
    }
  }


  componentDidMount() {
    const context = this.context;
    //It will get the data from context, and put it into the state.
    this.setState({ context_data: context });

    this.getPermissionAsync();
    fetch("https://lat7aati.com/api/get_category",
    {
      headers: {
        "lang":context.locale
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success == true) {
          this.setState({
            category_list: responseJson.data,
          });
        } else {
          alert(responseJson.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadTrans = (param) =>
  {
    return this.context.t(param);
  }

  _retrieveData = async () => {
    try {
      const usr_tkn = await AsyncStorage.getItem('lat7ati_user_token');
      this.setState({ user_token: usr_tkn });
      fetch("https://lat7aati.com/api/package",
      {
        headers: {
          Accept: "Application/json",
          "Content-type": "Application/json",
          "Authorization": usr_tkn,
          "lang":this.state.context_data.locale
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.success == true) {
            this.setState({
              packages:responseJson.data.subscripe_package.packages,
            });
          } else {
           // alert(responseJson.message);
          }
        }
    )
    } 
    catch (error) {
      // Error retrieving data
    }
  };

  getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
      });
      if (!result.cancelled) {
        this.setState({ image_uri: result.uri });
        // From here Preparing to Upload
        let localUri = result.uri;
        let filename = localUri.split("/").pop();
        this.setState({ image_title: filename });
        // Infer the type of the image

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        this.setState({ image_type: type });
        console.log(filename);
        console.log(type);

      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };





  _pickSubImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
      });
      if (!result.cancelled) {
        this.setState({ subimage_uri: result.uri });
        // From here Preparing to Upload
        let localUri = result.uri;
        let filename = localUri.split("/").pop();
        this.setState({ subimage_title: filename });
        // Infer the type of the image

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        this.setState({ subimage_type: type });
        console.log(filename);
        console.log(type);

      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  LoadSubCat = (select_val) => {
    this.setState({ category_id: select_val });
    fetch("https://lat7aati.com/api/get_category_by_id?category_id="+select_val,
    {
      headers: {
        "lang":this.state.context_data.locale
      }
    }
    )
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success == true) {
        this.setState({
          sub_cat_list: responseJson.data.chieldren,
        });
      } else {
        alert(responseJson.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  }

  Save_item = () => {
    let formData = new FormData();

      formData.append("title", this.state.product_title);
      formData.append("addtional[item_price]", this.state.product_price);
      formData.append("post_image",
        { 
          uri: this.state.image_uri,
          name: this.state.image_title, 
          type: this.state.image_type 
        });
      formData.append("codes[Item Special]", this.state.special);
      formData.append("addtional[content]", this.state.product_desc);
      formData.append("categories[]", this.state.category_id);
      formData.append("categories[]", this.state.sub_category_id);
      formData.append("codes[Item Status]", 1);
      formData.append("codes[Stop From Owner]", 2);
      formData.append("codes[Stop From Owner]", 2);
      formData.append("package_id", this.state.package_id);
      formData.append("addtional[images][0]",
        { uri: this.state.subimage_uri, 
          name: this.state.subimage_title, 
          type: this.state.subimage_type 
        });
     this.setState({ isLoading: true });
    fetch('https://lat7aati.com/api/save_item', {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
        "Authorization": this.state.user_token,
      },
      body: formData,
    })
      .then((response) =>  response.json())
      .then((responseJson) => {
        if (responseJson.success == true) {
          this.setState({ isLoading: false })
          alert("Your request has been Successfully registerd , We will contact you later");
        }
        else {
          this.setState({ isLoading: false })
          alert(responseJson.message);
        }
      })
  }
  render() {
    
    const {user_token}  = this.state;
    if (user_token == null) {
      return (
        <ScrollView>
       <StatusBar backgroundColor="#1A1D3D" barStyle="light-content" />
      <View style={{ backgroundColor: "#1A1D3D",}}>
           <Text
             style={{

               textAlign: "center",
               padding: 5,
               color: "white",
               fontFamily: "cairo",
               fontSize: 20,
               width:"100%"
             }}
           >
         Insert your Add
       </Text>
        </View>
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
        </ScrollView>
      )
    }
    else {
    return (
      <View style={{flex: 1, justifyContent: "center", }}>
      <StatusBar backgroundColor="#1A1D3D" barStyle="light-content" />
      <View style={{ backgroundColor: "#1A1D3D",}}>
           <Text
             style={{

               textAlign: "center",
               padding: 5,
               color: "white",
               fontFamily: "cairo",
               fontSize: 20,
               width:"100%"
             }}
           >
             {this.loadTrans('insert_new_add')}
       </Text>
        </View>
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            padding: 20,
            marginBottom:50
          }}>
          <TextInput
            onChangeText={(product_title) => this.setState({ product_title })}
            placeholder= {this.loadTrans('enter_title')}
            style={{
              height: 40,
              marginBottom: 20,
              borderWidth: 1.5,
              paddingHorizontal: 10,
              borderColor: "#1A1D3D",
              borderRadius: 5,
              width: "100%",
              fontFamily: "cairo",
              textAlign: "center",
              fontSize: 20
            }}
          />
          <TextInput
            onChangeText={(product_price) => this.setState({ product_price })}
            placeholder= {this.loadTrans('enter_price')}
            keyboardType='numeric'
            style={{
              height: 40,
              marginBottom: 20,
              borderWidth: 1.5,
              paddingHorizontal: 10,
              borderColor: "#1A1D3D",
              borderRadius: 5,
              width: "100%",
              fontFamily: "cairo",
              textAlign: "center",
              fontSize: 20
            }}
          />
          <TextInput
            onChangeText={(product_desc) => this.setState({ product_desc })}
            placeholder= {this.loadTrans('enter_desc')}
            style={{
              height: 80,
              width: "100%",
              marginBottom: 20,
              borderWidth: 1.5,
              paddingHorizontal: 10,
              borderColor: "#1A1D3D",
              borderRadius: 5,
              fontFamily: "cairo",
              textAlign: "center",
              fontSize: 20
            }}
          />
        
          <View style={{
            width: "100%", borderRadius: 5, borderWidth: 1.5,
            borderColor: "#1A1D3D", marginBottom: 10, fontSize: 20, fontFamily: "cairo",
          }}>
            <Picker
              style={styles.twoPickers}
              selectedValue={this.state.category_id}
              onValueChange={(itemValue) => this.LoadSubCat(itemValue)}
            >
              { this.state.category_list.map((item, key)=>(
            <Picker.Item label={item.title} value={item.id} key={key} />)
            )}
            </Picker>
          </View>
          <View style={{
            width: "100%", borderRadius: 5, borderWidth: 1.5,
            borderColor: "#1A1D3D", marginBottom: 10, fontSize: 20, fontFamily: "cairo",
          }}>
            <Picker
              style={styles.twoPickers}
              selectedValue={this.state.sub_category_id}
              onValueChange={(itemValue) => this.setState({ sub_category_id: itemValue })}
            >
            { this.state.sub_cat_list.map((item, key)=>(
            <Picker.Item label={item.title} value={item.id} key={key} />)
            )}
            </Picker>
          </View>
          <View style={{
            width: "100%", borderRadius: 5, borderWidth: 1.5,
            borderColor: "#1A1D3D", marginBottom: 10,
          }}>
            <Picker
              style={styles.twoPickers}
              selectedValue={this.state.special}
              onValueChange={(itemValue) => this.setState({ special: itemValue })}
            >
              <Picker.Item label={this.loadTrans('is_special')} value="0" />
              <Picker.Item label="YES" value="1" />
              <Picker.Item label="NO" value="2" />
            </Picker>
          </View>
          <View style={{
            width: "100%", borderRadius: 5, borderWidth: 1.5,
            borderColor: "#1A1D3D", marginBottom: 10,
          }}>
          <Picker
              style={styles.twoPickers}
              selectedValue={this.state.package_id}
              onValueChange={(itemValue) => this.setState({ package_id: itemValue })}
            >
            <Picker.Item label={this.loadTrans('choose_package')} value="0" />

              { this.state.packages.map((item, key)=>(
            <Picker.Item label={item.package_title} value={item.package_id} key={key} />)
            )}
            </Picker>
            </View>
          <TouchableOpacity
            onPress={this._pickImage}
            style={{
              borderColor: "#1A1D3D",
              borderWidth: 1.5,
              width: "100%",
              alignItems: "center",
              marginBottom: 20,
              borderRadius: 5
            }}>
            <Text
              style={{
                padding: 5,
                fontFamily: "cairo",
                color: "#1A1D3D",
                fontSize: 20,
              }}
            >
              {this.state.image_title}
            </Text>       
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._pickSubImage}
            style={{
              borderColor: "#1A1D3D",
              borderWidth: 1.5,
              width: "100%",
              alignItems: "center",
              marginBottom: 20,
              borderRadius: 5
            }}>
            <Text
              style={{
                padding: 5,
                fontFamily: "cairo",
                color: "#1A1D3D",
                fontSize: 20,
              }}
            >
              {this.state.subimage_title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.Save_item}
            style={{
              backgroundColor: "#1A1D3D",
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
            {this.loadTrans('insert_now')}
          </Text>
          {this.state.isLoading && <ActivityIndicator  size="large"  color={"#FFF"} />}
          </TouchableOpacity>
        </View>
      </ScrollView>
      </View>
    );
  }
  }
}
const styles = StyleSheet.create({
  twoPickers: {
    width: "100%",
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    color: "#1A1D3D",
    fontFamily: "cairo"
  },
});
