import React, { Component, useState, useEffect } from "react";

import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import { Text, View, Image, TouchableOpacity, Dimensions, FlatList, StatusBar,ScrollView } from "react-native";
import { AntDesign,FontAwesome,EvilIcons,MaterialIcons } from '@expo/vector-icons'; 

const { width } = Dimensions.get("window");
const height = width * 0.6;

export default function Special({ navigation }) {
    const [data, setData] = useState([]);
    const [Extaradata, setExtraData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    //const [scrolled , setScroll] = useState(false);


    useEffect(() => {
        fetch("https://lat7aati.com/api/home_page")
            .then((response) => response.json())
            .then((json) => setData(json.data.special))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    let [fontsLoaded] = useFonts({
        cairo: require("./../../assets/fonts/Cairo-Bold.ttf"),
    });
    
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
         <StatusBar backgroundColor="#1A1D3D" barStyle="light-content" />
         <View>
         <View style={{ backgroundColor: "#1A1D3D",flexDirection:'row',}}>
        <View style={{width:"10%",justifyContent:"center"}}>
         <TouchableOpacity onPress={() => navigation.goBack()} 
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
             Special Products
        </Text>
          </View>
          </View> 
          </View>
          <ScrollView>
                <FlatList
                    data={data}
                    extraData={Extaradata}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                        onPress={() =>
                          navigation.navigate("ProductDetails", {
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
                <TouchableOpacity 
                onPress={() => handleLoadMore}
                style={{
                    marginTop:20, 
                    justifyContent:"center",
                    alignItems:"center",
                    marginBottom:20
                    }}>
                    <Text style={{  
                    borderWidth:2,
                    borderColor:"black",
                    borderRadius:10,
                    padding:10,
                    paddingHorizontal:20,
                    fontFamily:"cairo"
                    }}>
                        Load More ..
                    </Text>
                </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}
