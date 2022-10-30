import React,{useState} from "react";
import { View, Text, StyleSheet,ToastAndroid, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GrayButton from "../components/GrayButton";
import google from "../../assets/images/google.png";
import Apple from "../../assets/images/apple.png";
import InputField from "../components/InputField";
import OrangeButton from "../components/OrangeButton";
import {auth} from '../config';
import { useNavigation } from "@react-navigation/native";

const Signup = ({navigation}) => {
 
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const SignUpUser =  () => {
    auth.createUserWithEmailAndPassword(email,password).then(
      userCredentials=>{
        const user = userCredentials.user;
        ToastAndroid.show('You have successfully Register!', ToastAndroid.SHORT);
        console.log(user.email);
        console.log(user.password);
      }
    ).catch(error=>alert(error.message))
  };
  
  return (
    <SafeAreaView style={{ padding: 17 }}>
      <Text style={styles.header}>Sign Up</Text>
      <Text style={styles.subtitle}>
        Sign up with one of the following options.
      </Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <GrayButton source={google} />
        <GrayButton source={Apple} />
      </View>
      <View style={{ paddingTop: 20 }}>
        <InputField value={username}  placeholder={"Alexandro"} label={"Name"} />
        <InputField
          value={email}
          onChangeText={(email)=>setemail(email)}
          placeholder={"Alexandro@apple.com"}
          label={"Email"}
        />
        <InputField
          value={password}
          onChangeText={(password)=>setpassword(password)}
          placeholder={"Pick a strong Password"}
          label={"Password"}
        />
        <View style={{ marginTop: 80 }}>
          <OrangeButton text={"Create Account"} onPress={SignUpUser} />
          <Text style={{ color: "#95969B", fontSize: 14, textAlign: "center" }}>
            Already have an account?
            <Text style={{ color: "#FF7B1C", fontSize: 14 }} onPress={()=>navigation.navigate('SignIn')}> Log in</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
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
    margin:3
  },
});

export default Signup;
