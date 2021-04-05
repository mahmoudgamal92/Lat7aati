import React, { Component, useState, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons,AntDesign,MaterialIcons,Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import Profile from "./Profile";
import Add from "./Add";
import Cats from './Cats';
import MyAdds from "./MyAdds";
import COLORS from './../Components/colors';
import LottieView from 'lottie-react-native';
import Constants from 'expo-constants';

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  StyleSheet,
  FlatList,
  TextInput
} from "react-native";
import {LocalizationContext} from './../../App';
import { SliderBox } from "react-native-image-slider-box";

const { width } = Dimensions.get("window");
const height = width * 0.5;

function HomePage({ route, navigation }) {
  const { t, locale, setLocale } = React.useContext(LocalizationContext);
  const [catergoryIndex, setCategoryIndex] = React.useState(0);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [recommended, setRecommended] = useState([]);
  const [special, setSpecial] = useState([]);
  const [latest, setLatest] = useState([]);
  const [slider, setSlider] = useState([]);
  const [sliderBox, setSliderBox] = useState([]);
  const [cats, setCatigories] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [search_val, setSearch_val] = useState("");

  
  useEffect(() => {
    setRefreshing(true);
    fetch("https://lat7aati.com/api/all_items")
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .then(
        fetch("https://lat7aati.com/api/get_slider")
          .then((response) => response.json())
          .then((json) => json.data.map(function(item) {
            setSliderBox(sliderBox => [...sliderBox, item.image]);
          })
          //setSlider(json.data))
      ))
      .then(
        fetch("https://lat7aati.com/api/get_category",{
          headers: {
            "lang":locale
          }})
          .then((response) => response.json())
          .then((json) => setCatigories(json.data))) 
          .then(
        fetch("https://lat7aati.com/api/home_page",{
          headers: {
            "lang":locale
          }})
          .then((response) => response.json())
          .then((json) => setSpecial(json.data.special))) 
         .then(
          fetch("https://lat7aati.com/api/home_page",{
          headers: {
            "lang":locale
          }})
          .then((response) => response.json())
          .then((json) => setRecommended(json.data.recommended))) 
          .then(
          fetch("https://lat7aati.com/api/home_page",{
          headers: {
            "lang":locale
          }})
          .then((response) => response.json())
          .then((json) => setLatest(json.data.latest)))
          .then(() => {
            setRefreshing(false);
          })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
        }, []);

        let [fontsLoaded] = useFonts({
          cairo: require("./../../assets/fonts/Cairo-Bold.ttf"),
        });


       const Search = () => { navigation.navigate("Search", {s_val: search_val})}

  const CategoryList = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
      style={styles.categoryContainer}>
        {cats.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("Cat_items", {
                cat_id: item.id,
                cat_title: item.title,
              })}
          >
            <Text
              style={styles.categoryText}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View>

{isLoading == true ?
      (
        <View style={{flex: 1,
        justifyContent:"center",
        alignItems:"center",
         marginTop:"60%"
         }}>
        		<View style={{ alignSelf: 'center' }}>
              <LottieView
             autoPlay
                style={{
                  width: 150,
                  height: 150,
                }}
                source={require('./../../assets/lottie/lathati_loader.json')}
                />
              </View>
        </View>
      ) : (
    <View style={{ justifyContent: "center",paddingBottom:120,marginTop:Constants.statusBarHeight }}>
      <StatusBar backgroundColor="#1A1D3D" barStyle="light-content" />
      <View style={{
        marginHorizontal:10,
        marginTop:10,
        marginBottom:10,
        flexDirection:"row",
        }}>
<View style={{width:"10%"}}>
 <Image 
  source={require('./../../assets/kuwait.png')}
  style={{height:40,width:40,}}
  /></View>
<View style={{width:"80%",justifyContent: "center"}}>
  <Text style={{textAlign:"center",fontFamily:"cairo",fontSize:30}}>
  {t('title')}
     </Text>
</View>
<View style={{width:"10%",alignItems:"flex-end"}}>
  <Image 
  source={require('./../../assets/icon.png')}
  style={{height:50,width:50,}}
  />
  </View>
</View>
        <View style={styles.SearchboxContainer}>
          <TextInput
            placeholder={t('search')}
            returnKeyType='search'
            placeholderTextColor="#666"
            style={styles.Searchbox}
            onChangeText={search_val =>setSearch_val(search_val)}
            onSubmitEditing={Search}
          />
          <TouchableOpacity
            style={styles.SearchboxIcon}
            onPress={() =>
              navigation.navigate("Search", {
                s_val: search_val
              })}
          >
            <Feather name="search" size={22} color="#666" />
          </TouchableOpacity>
        </View>

        <CategoryList/>
      <ScrollView> 
      <SliderBox 
      resizeMethod={'resize'}
      resizeMode={'stretch'}
      sliderBoxHeight={150}
      images={sliderBox} 
      autoplay
      circleLoop/>
         <View style={{
           marginTop:20,
          }}>
               <View style={{
                   flexDirection:"row",
                   justifyContent:"space-between",
                   paddingHorizontal:20,
                   width:"100%",
                   alignItems:"center"
                    }}>
                   <View>
                   <Text style={{
                            fontSize:20,
                            color:"#1A1D3D",
                            fontFamily:"cairo",
                        }}>
                        {t('recommended')}
                      </Text>
                   </View>
                   <View>
                        <TouchableOpacity
                        onPress={ () => navigation.navigate("Recommended")}
                         style={{
                            backgroundColor:"#1A1D3D",
                            paddingHorizontal:20,
                            paddingVertical:5,
                            borderRadius:15
                        }}>
                            <Text style={{
                                fontSize:13,
                                color:"#FFF",
                                fontFamily:"cairo",
                            }}>
                              {t('more')}
                              </Text>
                        </TouchableOpacity>
                   </View>
               </View>
               <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{height:400}}
                 >
                      {recommended.map((item, recommended) => (
                    <TouchableOpacity 
                    key={recommended}
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
                            width:200,

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
                            paddingTop:10,
                            paddingHorizontal:10
                        }}>
                            <Text style={{
                               fontFamily:"cairo",
                                color:"#1A1D3D"
                            }}>
                                {item.title}
                                </Text>
                        </View>
                        <Text style={{
                            paddingHorizontal:10,
                            fontFamily:"cairo",
                            color:"#637AA5",
                            marginBottom:5
                        }}>
                           { item.item_price} {t('kwd')}
                        </Text>
                    </TouchableOpacity>
                    ))}
                </ScrollView>
                </View>  

                <View>
                <View style={{
                   flexDirection:"row",
                   justifyContent:"space-between",
                   paddingHorizontal:20,
                   width:"100%",
                   alignItems:"center"
                    }}>
                   <View>
                   <Text style={{
                            fontSize:20,
                            color:"#1A1D3D",
                            fontFamily:"cairo",
                        }}>
                        {t('special')}
                      </Text>
                   </View>
                   <View>
                        <TouchableOpacity
                        onPress={ () => navigation.navigate("Special")}
                         style={{
                            backgroundColor:"#1A1D3D",
                            paddingHorizontal:20,
                            paddingVertical:5,
                            borderRadius:15
                        }}>
                            <Text style={{
                                fontSize:13,
                                color:"#FFF",
                                fontFamily:"cairo",
                            }}>
                              {t('more')}
                              </Text>
                        </TouchableOpacity>
                   </View>
               </View>
               <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{height:400}}
                 >
                      {special.map((item, special) => (
                    <TouchableOpacity 
                    key={special}
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
                            width:200,
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
                            paddingTop:10,
                            paddingHorizontal:10
                        }}>
                            <Text style={{
                             fontFamily:"cairo",
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
                           { item.item_price} {t('kwd')}
                        </Text>
                    </TouchableOpacity>
                    ))}
                </ScrollView>
                </View>  
                
                <View>
                <View style={{
                   flexDirection:"row",
                   justifyContent:"space-between",
                   paddingHorizontal:20,
                   width:"100%",
                   alignItems:"center"
                    }}>
                   <View>
                   <Text style={{
                            fontSize:20,
                            color:"#1A1D3D",
                            fontFamily:"cairo",
                        }}>
                        {t('latest')}
                      </Text>
                   </View>
                   <View>
                        <TouchableOpacity
                        onPress={ () => navigation.navigate("Latest")}
                         style={{
                            backgroundColor:"#1A1D3D",
                            paddingHorizontal:20,
                            paddingVertical:5,
                            borderRadius:15
                        }}>
                            <Text style={{
                                fontSize:13,
                                color:"#FFF",
                                fontFamily:"cairo",
                            }}>
                              {t('more')}
                              </Text>
                        </TouchableOpacity>
                   </View>
               </View>
               <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{height:400}}
                 >
                      {latest.map((item, latest) => (
                    <TouchableOpacity 
                    key={latest}
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
                            width:200,

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
                    ))}
                </ScrollView>
                </View>  
        </ScrollView>
       </View> 
       )}
       </View>
    
           );
}
const Tab = createBottomTabNavigator();
export default function App() {
  const {t} = React.useContext(LocalizationContext);
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: '#FFF',marginTop:5}}
    >
      <Tab.Screen name="Home" component={HomePage}
        options={{
          tabBarLabel:() => (
            <Text style={{fontFamily:"cairo"}}> 
              {t('home')}     
            </Text>
            ),
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color= "#1A1D3D" size={26} />
          ),
        }} />
      <Tab.Screen name="Categories" component={Cats}
        options={{
          tabBarLabel:() => (
            <Text style={{fontFamily:"cairo"}}> 
              {t('catigories')}     
            </Text>
            ),
          tabBarIcon: () => (
            <AntDesign name="appstore1" size={26} color="#1A1D3D" />
          ),
        }}
      />
      <Tab.Screen name="Add" component={Add}
        options={{
          tabBarLabel:() => (
            <Text style={{fontFamily:"cairo"}}> 
              {t('new_add')}     
            </Text>
            ),
          tabBarIcon: () => (
            <View
            style={{ 
              height: 55,
              width: 55,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderColor: '#1A1D3D',
              borderWidth: 2,
              borderRadius: 30,
              top: -18,
              elevation: 5,
            }}>
              <MaterialIcons name="add" size={35} color="black" />
          </View>
          ),
        }} />
      <Tab.Screen name="MyAdds" component={MyAdds}
        options={{
          tabBarLabel:() => (
          <Text style={{fontFamily:"cairo"}}> 
            {t('my_adds')}     
          </Text>
          ),
          tabBarIcon: () => (
            <MaterialCommunityIcons name="animation-outline" color= "#1A1D3D" size={26} />
          ),
        }}
      />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          tabBarLabel:() => (
            <Text style={{fontFamily:"cairo"}}> 
              {t('profile')}     
            </Text>
            ),
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account-circle" color= "#1A1D3D" size={26} />
          ),
        }} />
    </Tab.Navigator>
  );
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
    backgroundColor: "#555555",
    borderRadius: 20,
    height: 30,
    padding:10,
   borderColor: "black",
    borderWidth: 1,
    margin: 10,
  },
  cats_slider: {
    backgroundColor: "#DDDDDD",
    borderColor: "#555555",
    borderWidth: 1,
   
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },


  categoryText: {
    fontSize: 16, 
    color: "#1A1D3D",
    borderBottomWidth: 10,
    borderColor:"#1A1D3D",
    marginRight:15,
    paddingBottom:5,
    marginHorizontal:10,
    fontFamily:"cairo",
  },

  card: {
    height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SearchboxContainer: {
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#fff",
    elevation: 10,
    borderRadius: 4,
    marginBottom:10,
  },
  Searchbox: {
    padding: 12,
    fontSize: 16,
    fontFamily:"cairo",
    paddingHorizontal:60
    },
  SearchboxIcon: {
    position: "absolute",
    right: 20,
    top: 14
  }
});
