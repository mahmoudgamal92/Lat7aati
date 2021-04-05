import React from 'react'
import {View,Text,Image,TouchableOpacity,StyleSheet, ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SwiperComponent from '../Components/Swipercomponent'
import { ScrollView } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';

export default class ProductDetail2 extends React.Component {
    render(){
          const { id, name, desc, price, special, image, phone } = this.props.route.params;
        return(
            <View style={{
                flex:1,
                backgroundColor:"#FFF",
                paddingHorizontal:20
            }}>
                <View style={{
                    flexDirection:"row",
                    width:"100%",
                    marginTop:40
                }}>
                    <TouchableOpacity
                     onPress={()=>this.props.navigation.goBack()}
                     style={{
                         width:"50%"
                     }}
                    >
                        <Image
                            source={require('../images/back.png')}
                            style={{
                                width:15,
                                height:15
                            }}
                        />
                    </TouchableOpacity>
                    <View style={{
                        width:"50%",
                       alignItems:"flex-end"
                    }}>
                        <Image
                         source={require('../images/bag-2.png')}
                         style={{width:16,height:20}}
                        />
                    </View>
                </View>


                    <View style={{
                        flexDirection:"row",
                        height:340,
                        width:"100%"
                    }}>
                       
                        <Swiper
            style={styles.wrapper}
            dotStyle={{
                backgroundColor:"#000",
                borderColor:"#000",
                borderWidth:1,
                width:10,
                height:10,
                borderRadius:10
            }}
            activeDotColor="#FFF"
            activeDotStyle={{
                borderColor:"#000",
                borderWidth:1,
                width:10,
                height:10,
                borderRadius:10
            }}
           >

               <View style={styles.slide}>
                   <Image
                     source={{uri: image}}
                     style={{height:300,width:"100%",borderRadius:20}}
                    />
               </View>
            </Swiper>
                    </View>           
                    <View style={{
                        flexDirection:"row",
                        alignItems:"center",
                        width:15,marginTop:20,
                        width:"100%"
                    }}>
                        <View style={{
                            width:"65%"
                        }}>
                            <Text style={{
                                fontFamily:"Bold",
                                fontSize:18,
                                color:"#4f4a4a",
                                textAlign:"auto"                               
                              }}>
                                {name}
                            </Text>
                        </View>
                     
                    </View>
                    <Text style={{
                        fontFamily:"Bold",
                        fontSize:16,
                        color:"#b3aeae"
                    }}>{price} KWD</Text>
                    <Text style={{
                        fontFamily:"Medium",
                        fontSize:14,
                        lineHeight:20,
                        color:"#b3aeae",
                        marginTop:20
                    }}>
                {desc} 
                </Text>
                    <ScrollView 
                    style={{marginTop:40}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    
                    >
                        <View style={{
                            alignItems:"center",
                            justifyContent:"center",
                            backgroundColor:"#f5f6fb",
                            height:80,
                            width:80,
                            borderRadius:25,
                            marginRight:20
                        }}>
                            <Image
                                source={require('../images/12.png')}
                                style={{height:80,width:80}}
                            />
                        </View>

                        <View style={{
                            alignItems:"center",
                            justifyContent:"center",
                            backgroundColor:"#f5f6fb",
                            height:80,
                            width:80,
                            borderRadius:25,
                            marginRight:20
                        }}>
                            <Image
                                source={require('../images/13.png')}
                                style={{height:80,width:80}}
                            />
                        </View>
                        <View style={{
                            alignItems:"center",
                            justifyContent:"center",
                            backgroundColor:"#f5f6fb",
                            height:80,
                            width:80,
                            borderRadius:25,
                            marginRight:20
                        }}>
                            <Image
                                source={require('../images/14.png')}
                                style={{height:80,width:80}}
                            />
                        </View>
                        <View style={{
                            alignItems:"center",
                            justifyContent:"center",
                            backgroundColor:"#f5f6fb",
                            height:80,
                            width:80,
                            borderRadius:25,
                            marginRight:20
                        }}>
                            <Image
                                source={require('../images/15.png')}
                                style={{height:80,width:80}}
                            />
                        </View>
                    </ScrollView>
                        


                        <View style={{
                            backgroundColor:"#000",
                            flexDirection:"row",
                            alignItems:"center",
                            justifyContent:"center",
                            borderRadius:10,
                            padding:12,
                             marginBottom:15 
                            
                            }}>
                                <Image
                                    source={require('../images/bag.png')}
                                    style={{height:20,width:16}}
                                />
                                <Text style={{
                                    fontSize:20,
                                    color:"#FFF",
                                    fontFamily:"Bold",
                                    marginHorizontal:15
                                }}>
                               Contact With Seller
                                </Text>

                        </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper:{},
    slide:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#FFF"
    },
})