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
    ActivityIndicator,
    ImageBackground
} from "react-native";
import {LocalizationContext} from './../../App';
import Constants from 'expo-constants';

export default function Cats({ navigation }) {
    const { t, locale, setLocale } = React.useContext(LocalizationContext);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("https://lat7aati.com/api/get_category",
        {
            headers: {
              "lang":locale
                }
        }
        )
            .then((response) => response.json())
            .then((json) => setData(json.data))
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
            <View style={{ justifyContent: "center",backgroundColor:"#FFF"}}>
           <StatusBar backgroundColor="#1A1D3D" barStyle="light-content" />
          <View style={{ backgroundColor: "#1A1D3D",paddingTop:Constants.statusBarHeight}}>
            <Text
              style={{
                textAlign: "center",
                padding: 5,
                color: "white",
                fontFamily: "cairo",
                fontSize: 20
              }}
            >
        {t('catigories')}
        </Text>
          </View> 

                <FlatList
                    style={{
                        paddingBottom: 200,
                        backgroundColor:"#FFF",                       
                    }}
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                alignItems: "center",
                                alignItems: "center",
                                justifyContent:"center",
                                borderRadius: 20,
                                marginTop: 10,
                                marginHorizontal:20,
                                borderRadius:15,
                                backgroundColor:"#c4c3c1"
                            }}
                        >
                            <Image
                                style={{
                                    width: "100%",
                                    height: 280,
                                    resizeMode: "cover",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderTopLeftRadius:15,
                                    borderTopRightRadius:15
                                }}
                                source={{
                                    uri: "https://lat7aati.com/storage/app/uploads/" + item.image,
                                }}
                            />
                                <Text
                                    onPress={() =>
                                        navigation.navigate("Cat_items", {
                                            cat_id: item.id,
                                            cat_title: item.title,
                                        })}
                                    style={{ 
                                        fontSize: 20, 
                                        fontFamily: "cairo", 
                                        color: "#1A1D3D",
                                         textAlign: "center", 
                                         color: "black", 
                                         width: "50%",
                                         padding:10
                                        
                                        }}
                                >
                                    {item.title}
                                </Text>
                        </View>
                    )}
                />
            </View>
        );
    }
}
