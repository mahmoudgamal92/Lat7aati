import React,{useState} from 'react';
import {
    StyleSheet, 
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    AsyncStorage
} from 'react-native';
import {LocalizationContext} from './../../App';
import { AntDesign } from '@expo/vector-icons';

export default function Settings({route,navigation}) {
 const { t, locale, setLocale } = React.useContext(LocalizationContext);

    // LogOut Function
    const _removeSession = async () => {
        try {
          await AsyncStorage.removeItem("lat7ati_user_token");
          this.props.navigation.navigate("Splash");
        }
        catch (error) {
          console.log(error);
          alert("Erorr : " + error)
        }
      }


      //Change Languge Function
      const setlang = async (code) => {
        try {
          await AsyncStorage.setItem('lathati_lang_code', code);
          setLocale(code);
          setTimeout(()=>{navigation.navigate("Splash")}, 1000);
        } catch (error) {
          console.log(error);
        }
      }

        return (

         <ScrollView>
                <View>
        {/* <Text>
          Current locale: {locale}
        </Text>
        <Text>{t('welcome')}</Text> */}


        
                <View style={styles.listItem}>
                    <Image source={{ uri: "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX18621392.jpg" }}
                        style={{ width: 60, height: 60, borderRadius: 30 }} />
                    <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>About Us</Text>
                    </View>
                    <TouchableOpacity style={{ height: 50, width: 50, justifyContent: "center", alignItems: "center" }}
                        onPress={() => this.props.navigation.navigate("about")}
                    >
                        <AntDesign name="arrowright" size={24} color="black" />
                    </TouchableOpacity>
                </View>

        {locale === 'en' ? (
          <TouchableOpacity 
          style={{
            marginTop:20,
            borderRadius:10,
            borderWidth:2, 
            borderColor:"#1A1D3D",
            margin:10,
            padding:10,
            flexDirection:'row',
            justifyContent:"center",
            alignItems:"center"
            }}

          onPress={() => setlang('ar')}>
               <Image source={require('./../../assets/kw.png')} 
           style={{width:50,height:50,marginRight:10}}         
         />
            <Text style={{
              color:"#1A1D3D",
              textAlign:"center",
              fontSize:20,
              fontFamily:"cairo"
              }}>
            تغيير الي اللغة العربية
            </Text>
      
            </TouchableOpacity>
        ) : (
          <TouchableOpacity 
          style={{
            marginTop:20,
            backgroundColor:"#1A1D3D",
            borderRadius:10,
            margin:10,
            padding:10,
            flexDirection:'row',
            justifyContent:"center",
            alignItems:"center"
            }}
          onPress={() => setlang('en')}>
             <Text style={{color:"#FFF",textAlign:"center",fontSize:20}}>
            Switch to English
            </Text>
            <Image source={require('./../../assets/eng.png')} 
           style={{width:50,height:50,marginLeft:10}}         
         />
            </TouchableOpacity>
        )}
      </View>    
     </ScrollView>
        );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    listItem: {
        margin: 10,
        padding: 10,
        backgroundColor: "#FFF",
        width: "95%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5,
        justifyContent: "center"
    }
});