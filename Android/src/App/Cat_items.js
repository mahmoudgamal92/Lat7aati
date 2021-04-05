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
    StyleSheet} from "react-native";
import { AntDesign} from '@expo/vector-icons'; 
import {LocalizationContext} from './../../App';



    const { width } = Dimensions.get("window");
    const height = width * 0.6;
 export default function Recently({ route, navigation }) {
    const { t, locale, setLocale } = React.useContext(LocalizationContext);

    const { cat_id, cat_title } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [sub_cats, setSub] = useState([]);
    useEffect(() => {
        fetch("https://lat7aati.com/api/all_items?category=" + cat_id)
            .then((response) => response.json())
            .then((json) => setData(json.data))
            .then(
                fetch("https://lat7aati.com/api/get_category_by_id?category_id=" + cat_id,
                {
                    headers: {
                      "lang":locale
                    }
                })
                
                    .then((response) => response.json())
                    .then((json) => setSub(json.data.chieldren))
            )
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
             {cat_title}
        </Text>
          </View>
          </View> 

                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        legacyImplementation={false}
                        style={{ width: width + 5 }}
                        data={sub_cats}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("SubCat", {
                                        cat_id: item.id,
                                        cat_title: item.title,
                                    })}
                                style={styles.cats}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                        fontFamily: "cairo",
                                    }}
                                >
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <FlatList
                style={{padding:15,alignContent:"center",}}
                    data={data}
                    keyExtractor={({ id }, index) => id}
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
                                marginTop:20,
                                borderRadius:15,
                                marginBottom:10,
                                width:"100%",
    
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
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#e5e5e5",
    },
    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold",
    },
    TouchableOpacityStyle: {
        position: "absolute",
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        right: 30,
        bottom: 30,
    },
    FloatingButtonStyle: {
        resizeMode: "contain",
        width: 60,
        height: 60,
    },
    cats: {
        justifyContent: "center",
        backgroundColor: "#1A1D3D",
        borderRadius: 20,
        height: 30,
        padding: 15,
        borderColor: "black",
        borderWidth: 1,
        margin: 10
    },
    cats_slider: {
        backgroundColor: "#DDDDDD",
        borderColor: "#555555",
        borderWidth: 1,
    },
});