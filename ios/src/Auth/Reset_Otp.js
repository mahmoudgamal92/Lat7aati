import {Animated, Image, SafeAreaView, Text, View,StyleSheet,TouchableOpacity,Alert} from 'react-native';
import React, {useState} from 'react';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const {Value, Text: AnimatedText} = Animated;
const CELL_COUNT = 6;
const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};


const AnimatedExample = ({ route, navigation }) => {
  const [value, setValue] = useState('');
  const { phone,code } = route.params;

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = 
  useClearByFocusCell({value,setValue});

  const Check_Code = () => {
        if(code == value)
        {
            alert("Phone Verified Successfully");
            navigation.navigate("ResetPassword",{
            phone:phone,  
            });
        }
        else
        {
            alert("Worng Verification Code");
        }
    }

  const renderCell = ({index, symbol, isFocused}) => {

    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [ '#3557b7', '#f7fafe'],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: ['#fff', '#f7fafe'],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [55, 8 ],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Verification</Text>
      <Image style={styles.icon} 
      source={require("../../assets/message.png")} />
      <Text style={styles.subTitle}>
        Please enter the verification code{'\n'}
        we send to this mobile phone
      </Text>
      <Text>
        {phone}
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
      <TouchableOpacity style={styles.nextButton}
      onPress={Check_Code}
      >
        <Text style={styles.nextButtonText}>Verify</Text>
      </TouchableOpacity>
      <Text style={styles.resend_code}>
     Resend Verification Code ?
      </Text>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  codeFiledRoot: {
    height: 55,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  resend_code : {
    fontWeight:"700",
    color:"#1A1D3D"
  },
  cell: {
    marginHorizontal: 8,
    height: 40,
    width: 40,
    lineHeight:  40,
    fontSize: 30,
    textAlign: 'center',
    borderRadius: 8,
    color: '#3759b8',
    backgroundColor: '#fff',

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },

  // =======================

  root: {
    padding: 20,
    flex:1,
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center"
  },
  title: {
    paddingTop: 50,
    color: '#000',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 40,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  subTitle: {
    paddingTop: 30,
    color: '#000',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 60,
    backgroundColor: '#1A1D3D',
    justifyContent: 'center',
    minWidth: 300,
    marginBottom: 100,
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
});

export default AnimatedExample;