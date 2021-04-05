import React, { Component, useState, useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { View } from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";

const about = ({ navigation }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("https://lat7aati.com/api/about_us")
            .then((response) => response.json())
            .then((json) => setData(json.data))
            .catch((error) => console.error(error));
    }, []);
    return (
        <View>
            <View style={{ backgroundColor: "#1C86C8", borderRadius: 10, margin: 10 }}>
                <Text
                    style={{

                        textAlign: "center",
                        padding: 10,
                        color: "white",
                        fontFamily: "cairo",
                        fontSize: 18,
                        //  color: "#1C86C8"
                    }}
                >
                    About Us
        </Text>
            </View>
            <ScrollView>
                <Text style={{
                    fontSize: 15, paddingHorizontal: 10, fontFamily: "cairo", color: "grey"
                }}>
                    {data}
                </Text>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Cochin",
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default about;
