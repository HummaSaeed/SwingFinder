import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity,ToastAndroid } from "react-native";
import GrayButton from "../components/GrayButton";
import google from "../../assets/images/google.png";
import Apple from "../../assets/images/apple.png";
import InputField from "../components/InputField";
import OrangeButton from "../components/OrangeButton";
import {auth} from '../config';

const ForgetPassword = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const forgetPassword=()=>{
        console.log("New forget Password")
        auth.sendPasswordResetEmail(email);
    } 
  return (
    <View style={{ padding: 17 }}>
    <Text style={styles.header}>Forget Password</Text>
    <Text style={styles.subtitle}>
      Sign up with one of the following options.
    </Text>

    <View style={{ paddingTop: 20 }}>
      <InputField
        value={email}
        onChangeText={(email) => setemail(email)}
        placeholder={"Alexandro@apple.com"}
        label={"Email"}
      />
      <View style={{ marginTop: 80 }}>
        <OrangeButton text={"Send Email"} onPress={forgetPassword} />
      </View>
    </View>
  </View>
  )
}

export default ForgetPassword

const styles = StyleSheet.create({
    header: {
      marginTop: 5,
      fontSize: 31,
      lineHeight: 46.5,
      fontWeight: "500",
      color: "#191A1F",
    },
    subtitle: {
      fontSize: 14,
      color: "#95969B",
      marginTop: 45,
      margin: 3,
    },
  });