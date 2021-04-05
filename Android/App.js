import "react-native-gesture-handler";
import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View,AsyncStorage } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import SplashScreen from "./src/Auth/Splash";

import SignIn from "./src/Auth/SignIn";
import SignUp from "./src/Auth/SignUp";
import Register_Otp from "./src/Auth/Register_Otp";
import Reset_Otp from "./src/Auth/Reset_Otp";
import Forget_Password from "./src/Auth/Forget_Password";
import ResetPassword from "./src/Auth/ResetPassword";

import HomePage from "./src/App/HomePage";
import Profile from "./src/App/Profile";
import Favorite from "./src/App/Favorite";
import MyAdds from "./src/App/MyAdds";
import Control_Package from "./src/App/Control_Package";
import Subscribe_Package from "./src/App/Subscribe_Package";
import ProductDetails from "./src/App/ProductDetails";
import ProductDetails2 from "./src/App/ProductDetails2";
import Special from "./src/App/Special";
import Recommended from "./src/App/Recommended";
import Recently from "./src/App/Recently";
import Add from "./src/App/Add";
import Complaint from "./src/App/Complaints";
import Search from "./src/App/Search";
import Cat_items from "./src/App/Cat_items";
import Cats from "./src/App/Cats";
import Payment from "./src/App/Payment";
import SubCat from "./src/App/SubCat";
import about from "./src/App/about";
import payment_webview from "./src/App/payment_webview";
import EditProfile from "./src/App/EditProfile";


import * as Localization from 'expo-localization'; 
import i18n from 'i18n-js';

import ar from "./src/lang/ar";
import en from "./src/lang/en";

i18n.fallbacks = true;
i18n.translations = { ar, en };

export const LocalizationContext = React.createContext();

export default function App() {
  const [locale, setLocale] = React.useState(null);

  useEffect( async() => {
      const SelectedLanguage = await AsyncStorage.getItem('lathati_lang_code');
      if (SelectedLanguage !== null) {
        setLocale(SelectedLanguage)
      } else {
        setLocale("en")   
         }
    }, []);

  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale]
  );

const HomeStack = createStackNavigator();
  return (
    <LocalizationContext.Provider value={localizationContext}>
    <NavigationContainer>
      <HomeStack.Navigator headerMode="none">
          <HomeStack.Screen name="Splash" component={SplashScreen}/>
          <HomeStack.Screen name="SignIn" component={SignIn}/>
          <HomeStack.Screen name="SignUp" component={SignUp}/>
          <HomeStack.Screen name="Register_Otp" component={Register_Otp}/>
          <HomeStack.Screen name="Reset_Otp" component={Reset_Otp}/>
          <HomeStack.Screen name="Forget_Password" component={Forget_Password}/>
          <HomeStack.Screen name="ResetPassword" component={ResetPassword}/>
          <HomeStack.Screen name="Homepage" component={HomePage} />
          <HomeStack.Screen name="Authenticated" component={HomePage} />
          <HomeStack.Screen name="ProductDetails" component={ProductDetails}/>
          <HomeStack.Screen name="ProductDetails2" component={ProductDetails2} />
          <HomeStack.Screen name="Add" component={Add} />
          <HomeStack.Screen name="Cats" component={Cats}/>
          <HomeStack.Screen name="Complaint" component={Complaint} />
          <HomeStack.Screen name="Cat_items" component={Cat_items} />
          <HomeStack.Screen name="Profile" component={Profile}/>
          <HomeStack.Screen name="EditProfile" component={EditProfile} />
          <HomeStack.Screen name="Special" component={Special} />
          <HomeStack.Screen name="Recommended" component={Recommended} />
          <HomeStack.Screen name="Latest" component={Recently} />
          <HomeStack.Screen name="Favorite" component={Favorite} />
          <HomeStack.Screen name="MyAdds" component={MyAdds} />
          <HomeStack.Screen name="Control Package" component={Control_Package} />
          <HomeStack.Screen name="Subscribe_Package" component={Subscribe_Package} />
          <HomeStack.Screen name="Search" component={Search} />
          <HomeStack.Screen name="LogOut" component={SplashScreen} />
          <HomeStack.Screen name="Payment" component={Payment} />
          <HomeStack.Screen name="SubCat" component={SubCat} />
          <HomeStack.Screen name="about" component={about} />
          <HomeStack.Screen name="payment_webview" component={payment_webview} 
         options={({ navigation }) => ({
          title: 'Payment widget',
        })}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
    </LocalizationContext.Provider>
  );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
