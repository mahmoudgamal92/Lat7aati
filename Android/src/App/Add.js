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
import {LocalizationContext} from './../../App';
import { ScrollView } from "react-native-gesture-handler";

export default function Add ({ route, navigation }) {
const { t, locale, setLocale } = React.useContext(LocalizationContext);
const [welcome_text, Setwelcome_text] = useState("");
const [isLoading, SetLoading] = useState(false);
const [user_token, Setuser_token] = useState("");

  //Add Information
  const [category_id, Setcategory_id] = useState("0");
  const [sub_category_id, Setsub_category_id] = useState("0");
  const [special, Setspecial] = useState("0");

  const [product_title, Setproduct_title] = useState("");
  const [product_price, Setproduct_price] = useState("");
  const [product_desc, Setproduct_desc] = useState("");
  const [package_id, Setpackage_id] = useState("");

 // Main Image Data
 const [image_title, Setimage_title] = useState("upload product Image");
 const [image_uri, Setimage_uri] = useState(null);
 const [image_type, Setimage_type] = useState(null);


// Sub Image Data
const [subimage_title, Setsubimage_title] = useState("Upload Product Sub image 1");
const [subimage_uri, Setsubimage_uri] = useState(null);
const [subimage_type, Setsubimage_type] = useState(null);

//Catigories
const [category_list, Setcategory_list] = useState([]);
const [sub_cat_list, Setsub_cat_list] = useState([]);


 //packages
 const [packages, Setpackages] = useState([]);


 useEffect(() => {
  _retrieveData();
  getPermissionAsync();
  fetch("https://lat7aati.com/api/get_category",
  {
    headers: {
      "lang":locale
    }
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success == true) {
        Setcategory_list(responseJson.data);
      } else {
        alert(responseJson.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  
          }, []);

 
   const _retrieveData = async () => {
    try {
      const usr_tkn = await AsyncStorage.getItem('lat7ati_user_token');
      Setuser_token(usr_tkn);
      fetch("https://lat7aati.com/api/package",
      {
        headers: {
          Accept: "Application/json",
          "Content-type": "Application/json",
          "Authorization": usr_tkn,
          "lang":locale
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.success == true) {
            Setpackages(responseJson.data.subscripe_package.packages);
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

  const getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };


  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
      });
      if (!result.cancelled) {
        Setimage_uri(result.uri);
        // From here Preparing to Upload
        let localUri = result.uri;
        let filename = localUri.split("/").pop();
        Setimage_title(filename);
        // Infer the type of the image

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        Setimage_type(type)
        console.log(filename);
        console.log(type);

      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  const _pickSubImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
      });
      if (!result.cancelled) {
        Setsubimage_uri(result.uri);
        // From here Preparing to Upload
        let localUri = result.uri;
        let filename = localUri.split("/").pop();
        Setsubimage_title(filename);
        // Infer the type of the image

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        Setsubimage_type(type);
        console.log(filename);
        console.log(type);
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  const LoadSubCat = (select_val) => {
    Setcategory_id(select_val);
    fetch("https://lat7aati.com/api/get_category_by_id?category_id="+select_val,
    {
      headers: {
        "lang":locale
      }
    }
    )
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success == true) {
        Setsub_cat_list(responseJson.data.chieldren)
      } else {
        alert(responseJson.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  }

  const Save_item = () => {
    let formData = new FormData();

      formData.append("title",product_title);
      formData.append("addtional[item_price]", product_price);
      formData.append("post_image",
        { 
          uri: image_uri,
          name: image_title, 
          type: image_type 
        });
      formData.append("codes[Item Special]", special);
      formData.append("addtional[content]", product_desc);
      formData.append("categories[]", category_id);
      formData.append("categories[]", sub_category_id);
      formData.append("codes[Item Status]", 1);
      formData.append("codes[Stop From Owner]", 2);
      formData.append("codes[Stop From Owner]", 2);
      formData.append("package_id", package_id);
      formData.append("addtional[images][0]",
        { uri: subimage_uri, 
          name: subimage_title, 
          type: subimage_type 
        });
        SetLoading(true);
    fetch('https://lat7aati.com/api/save_item', {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
        "Authorization": user_token,
      },
      body: formData,
    })
      .then((response) =>  response.json())
      .then((responseJson) => {
        if (responseJson.success == true) {
          SetLoading(false);
          alert("Your request has been Successfully registerd , We will contact you later");
        }
        else {
          SetLoading(false);
          alert(responseJson.message);
        }
      })
  }
    
    if (user_token == null) {
      return (
        <ScrollView>
       <StatusBar backgroundColor="#1A1D3D" barStyle="light-content" />
      <View style={{ backgroundColor: "#1A1D3D",paddingTop:Constants.statusBarHeight}}>
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
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
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
      <View style={{ backgroundColor: "#1A1D3D",paddingTop:Constants.statusBarHeight}}>
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
             {t('insert_new_add')}
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
            onChangeText={(product_title) => Setproduct_title(product_title)}
            placeholder= {t('enter_title')}
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
            onChangeText={(product_price) => Setproduct_price( product_price)}
            placeholder= {t('enter_price')}
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
            onChangeText={(product_desc) => Setproduct_desc(product_desc)}
            placeholder= {t('enter_desc')}
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
              itemStyle={{fontFamily:"cairo"}}
  
              selectedValue={category_id}
              onValueChange={(itemValue) => LoadSubCat(itemValue)}
            >
              {category_list.map((item, key)=>(
            <Picker.Item 
            label={item.title} value={item.id} key={key} />)
            )}
            </Picker>
          </View>
          <View style={{
            width: "100%", borderRadius: 5, borderWidth: 1.5,
            borderColor: "#1A1D3D", marginBottom: 10, fontSize: 20, fontFamily: "cairo",
          }}>
            <Picker
              style={styles.twoPickers}
              itemStyle={{fontFamily:"cairo"}}
              selectedValue={sub_category_id}
              onValueChange={(itemValue) => Setsub_category_id(itemValue)}
            >
            { sub_cat_list.map((item, key)=>(
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
              selectedValue={special}
              onValueChange={(itemValue) => Setspecial(itemValue)}
            >
              <Picker.Item label={t('is_special')} value="0" />
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
              selectedValue={package_id}
              onValueChange={(itemValue) => Setpackage_id(itemValue)}
            >
            <Picker.Item label={t('choose_package')} value="0" />

              { packages.map((item, key)=>(
            <Picker.Item label={item.package_title} value={item.package_id} key={key} />)
            )}
            </Picker>
            </View>
          <TouchableOpacity
            onPress={_pickImage}
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
              {image_title}
            </Text>       
          </TouchableOpacity>
          <TouchableOpacity
            onPress={_pickSubImage}
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
              {subimage_title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={Save_item}
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
            {t('insert_now')}
          </Text>
          {isLoading && <ActivityIndicator  size="large"  color={"#FFF"} />}
          </TouchableOpacity>
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
    color: "#1A1D3D",
    fontFamily: "cairo"
  },
});
