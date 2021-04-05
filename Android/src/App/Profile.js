import React, { useState, useEffect, Component } from "react";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { useIsFocused } from '@react-navigation/native'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  StatusBar,
  AsyncStorage,
  Alert,
  RefreshControl,
  FlatList,
  StyleSheet
} from "react-native";
import { MaterialCommunityIcons, FontAwesome5,Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Favorite from "./Favorite";
import Packages from "./Control_Package";
import Settings from "./Settings";
import {LocalizationContext} from './../../App';

class profile extends Component {
  constructor(props) {
    super(props);
    this._retrieveData();
    this.state = {
      refreshing: true,
      user_token: "",
      user_name: "",
      frist_name: "",
      last_name: "",
      email: "",
      user_phone: "",
      old_password: "",
      new_password: "",
    };
  }

  componentDidMount() {
    this.setState({ refreshing: true });
  }
  // Fired When logout
  _removeSession = async () => {
    try {
      await AsyncStorage.removeItem("lat7ati_user_token");
      this.props.navigation.navigate("Splash");
    }
    catch (error) {
      console.log(error);
      alert("Erorr : " + error)
    }
  }

  _retrieveData = async () => {
    try {
      this.setState({ refreshing: true });
      const user_id = await AsyncStorage.getItem("lat7ati_user_token");
      this.setState({ user_token: user_id });
      fetch("https://lat7aati.com/api/get_profile", {
        method: "GET",
        headers: {
          Accept: "Application/json",
          "Content-type": "Application/json",
          "Authorization": user_id,
        }
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.success == true) {
            this.setState({ frist_name: responseJson.data.firstname });
            this.setState({ last_name: responseJson.data.lastname });
            this.setState({ user_name: responseJson.data.username });
            this.setState({ user_phone: responseJson.data.phone });
            this.setState({ email: responseJson.data.email });
          }
        }).then(() => {
          this.setState({ refreshing: false });
        })
        .catch((error) => {
          console.log(error);
        })

    }
    catch (error) {
      console.log(error);
    }
  }
  ProfileEdit = () => {
    const { 
      user_token, 
      user_name, 
      frist_name,                       
      last_name, 
      email, 
      user_phone, 
      old_password, 
      new_password }
      = this.state;
    fetch("https://lat7aati.com/api/edit_profile", {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-type": "Application/json",
        "Authorization": this.state.user_token
      },
      body: JSON.stringify({
        username: user_name,
        firstname: frist_name,
        lastname: last_name,
        old_password: old_password,
        password: new_password,
        password_confirmation: new_password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success == true) {
          alert("Your Data Have been Changed sucessfully");
        } else {
          alert(responseJson.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { 
      user_token, 
      frist_name, 
      last_name, 
      user_name, 
      user_phone, 
      email 
    } = this.state;
  
  const AuthComponent = () => {
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
      <TouchableOpacity onPress={() => this.props.navigation.navigate("SignIn")}>
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
    )
  }
    if (user_token == null) {
      return (
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._retrieveData.bind(this)}
          />
        }
        style={{marginTop:50}}
        >
       <AuthComponent/>
        </ScrollView>
      )
    }
    else {
      return (
        <ScrollView
        style={{}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._retrieveData.bind(this)}
              style={{ backgroundColor: "#7f7f7f",}}
            />
          }
        >
            <StatusBar backgroundColor="#1A1D3D" barStyle="light-content" />
        	<View style={{ alignSelf: 'center', }}>
						<View style={styles.profileImage}>
							<Image
								source={require('./../../assets/avatar.png')}
								style={styles.image}
								resizeMode="center"
							/>
						</View>
						<View style={styles.active} />
            <TouchableOpacity 
               onPress={() =>
                this.props.navigation.navigate("EditProfile")}
            style={styles.add}>
              <MaterialCommunityIcons name="account-edit" size={40} 
              color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}/>
						</TouchableOpacity>
					</View>
          <View style={{ 
           alignItems: "center", 
           marginTop: 50, 
           backgroundColor:"#1A1D3D",
           borderTopLeftRadius:30,
           borderTopRightRadius:30,
           borderBottomLeftRadius:20,
           borderBottomRightRadius:20,
           paddingBottom:50,
           paddingTop:50,
           marginHorizontal:2,
         }}>
            <Text
             style={{
              height: 40,
              marginBottom: 10,
              paddingHorizontal: 10,
              width: "90%",
              fontFamily: "cairo",
              textAlign: "center",
              color: "grey",
              fontSize: 20,
            }}
            >
              User Name : {user_name}
            </Text>


            <Text
             style={{
              height: 40,
              marginBottom: 10,
              paddingHorizontal: 10,
              width: "90%",
              fontFamily: "cairo",
              textAlign: "center",
              color: "grey",
              fontSize: 20,
            }}
            >
              Frist Name : {frist_name}
            </Text>
           
           

            <Text
             style={{
              height: 40,
              marginBottom: 10,
              paddingHorizontal: 10,
              width: "90%",
              fontFamily: "cairo",
              textAlign: "center",
              color: "grey",
              fontSize: 20,
            }}
            >
              Last Name : {last_name}
            </Text>
            <Text
             style={{
              height: 40,
              marginBottom: 10,
              paddingHorizontal: 10,
              width: "90%",
              fontFamily: "cairo",
              textAlign: "center",
              color: "grey",
              fontSize: 18,
            }}
            >
               Email : {email}
            </Text>
            <Text
             style={{
              height: 40,
              marginBottom: 10,
              paddingHorizontal: 10,
              width: "90%",
              fontFamily: "cairo",
              textAlign: "center",
              color: "grey",
              fontSize: 20,
            }}
            >
              Phone : +{user_phone}
            </Text>
         
            <TouchableOpacity
              onPress={this._removeSession}
              style={{
                backgroundColor: "#FF6961",
                paddingVertical: 10,
                borderRadius: 10,
                width: "80%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "cairo",
                }}
              >
                SignOut
            </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
  }
}
const Tab = createMaterialTopTabNavigator();
export default function App() {
  const { t, locale, setLocale } = React.useContext(LocalizationContext);
  return (
    <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#FFF',
      labelStyle: { fontSize: 13,color:"#FFF" },
      tabStyle: { width: 100,color:"#FFF" },
      style: { backgroundColor: '#1A1D3D', },
      // scrollEnabled:true,
    }}
    screenOptions={{unmountOnBlur: true}}
    >
      <Tab.Screen 
      name="Profile" 
      component={profile}
      options={{
        tabBarLabel:() => (
          <Text style={{fontFamily:"cairo", color: "#FFF"}}> 
            {t('profile')}     
          </Text>
          ),
        
       }}
      />
      <Tab.Screen 
      name="Favorite" 
      component={Favorite} 
      options={{ 

        tabBarLabel:() => (
          <Text style={{fontFamily:"cairo", color: "#FFF"}}> 
            {t('favorite')}     
          </Text>
          ),
       }}
      />
      <Tab.Screen 
      name="Packages" 
      component={Packages} 
      options={{ 

        tabBarLabel:() => (
          <Text style={{fontFamily:"cairo", color: "#FFF"}}> 
            {t('packages')}     
          </Text>
          ),
      }}
      />
      <Tab.Screen 
      name="Settings" 
      component={Settings} 
      options={{

        tabBarLabel:() => (
          <Text style={{fontFamily:"cairo", color: "#FFF"}}> 
            {t('settings')}     
          </Text>
          ),
       }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#212021'
	},
	text: {
		fontFamily: 'cairo',
		color: '#52575D'
	},
	image: {
		flex: 1,
		height: undefined,
		width: undefined
	},
	titleBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 50,
		marginHorizontal: 16
	},
	subText: {
		fontSize: 12,
		color: '#AEB5BC',
		textTransform: 'uppercase',
		fontWeight: '500'
	},
	profileImage: {
		width: 200,
		height: 200,
		borderRadius: 100,
    overflow: 'hidden',
    marginTop:30
	},
	dm: {
		backgroundColor: '#41444B',
		position: 'absolute',
		top: 20,
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	active: {
		backgroundColor: '#34FFB9',
		position: 'absolute',
		bottom: 28,
		left: 15,
		padding: 4,
		height: 20,
		width: 20,
		borderRadius: 10
	},
	add: {
		backgroundColor: '#41444B',
		position: 'absolute',
		bottom: 0,
		right: 0,
		width: 60,
		height: 60,
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center'
	},
	infoContainer: {
		alignSelf: 'center',
		alignItems: 'center',
		marginTop: 16
	},
	statsContainer: {
		flexDirection: 'row',
		alignSelf: 'center',
		marginTop: 32
	},
	statsBox: {
		alignItems: 'center',
		flex: 1
	},
	mediaImageContainer: {
		width: 180,
		height: 200,
		borderRadius: 12,
		overflow: 'hidden',
		marginHorizontal: 10
	},
	mediaCount: {
		backgroundColor: '#41444B',
		position: 'absolute',
		top: '50%',
		marginTop: -50,
		marginLeft: 30,
		width: 100,
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 12,
		shadowColor: 'rgba(0, 0, 0, 0.38)',
		shadowOffset: { width: 0, height: 10 },
		shadowRadius: 20,
		shadowOpacity: 1
	},
	recent: {
		marginLeft: 78,
		marginTop: 32,
		marginBottom: 6,
		fontSize: 10
	},
	recentItem: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: 16
	},
	activityIndicator: {
		backgroundColor: '#CABFAB',
		padding: 4,
		height: 12,
		width: 12,
		borderRadius: 6,
		marginTop: 3,
		marginRight: 20
	}
});
