import React,{useEffect} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  AsyncStorage,
  Image,
  Alert
} from "react-native";
import * as Animatable from "react-native-animatable";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import {LocalizationContext} from './../../App';
import { useFonts } from "expo-font";
import { ScrollView } from "react-native-gesture-handler";

const SplashScreen = ({ navigation }) => {
  const {t} = React.useContext(LocalizationContext);
  const { colors } = useTheme();

      let [fontsLoaded] = useFonts({
          cairo: require("./../../assets/fonts/Cairo-Bold.ttf"),
      })  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="2000"
          source={require("./../../assets/logo.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
        animation="fadeInUpBig"
      >
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}
        >
           {t('welcome')}
        </Text>
        <Text style={styles.text}>
        {t('welcome')}
        </Text>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Homepage")}
          >
            <Text style={styles.textSign}>
            {t('get_started')}
            </Text>
          </TouchableOpacity>
            <MaterialIcons
              name="navigate-next"
              color="#fff"
              size={20}
            />
        </View>
      </Animatable.View>
    </View>
  );
};
export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1D3D",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderColor: "white",
  },
  title: {
    fontFamily:"cairo",
    color: '#1A1D3D',
    fontSize: 20,
  },

  text: {
    fontFamily:"cairo",
    color: 'grey',
    marginTop: 5,
    fontSize: 15
  },
  button: {
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "#1A1D3D",
    borderRadius: 20,
    flexDirection:"row",
    alignSelf:"flex-end",
    paddingHorizontal:10

  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontFamily:"cairo",
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
