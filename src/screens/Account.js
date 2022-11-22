import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View,ToastAndroid,YellowBox } from "react-native";
import AccountView from "../components/AccountView";
import User from "../../assets/images/user.png";
import password from "../../assets/images/password.png";
import headphones from "../../assets/images/headphones.png";
import carbonpolicy from "../../assets/images/carbon_policy.png";
import {auth} from '../config';
import { useNavigation } from "@react-navigation/core";

const Account = () => {
  const navigation = useNavigation();
  const [user, setuser] = useState(false);
  YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setuser(false)
      }
    })
    return unsubscribe;
  }, [])
  const signout = () => {
    
    auth.signOut().then(userCredentials=>{
      const user = userCredentials.user;
      ToastAndroid.show('You have successfully Register!', ToastAndroid.SHORT);
      console.log(user.email);
      console.log(user.password);
    });
    ToastAndroid.show("Logout!", ToastAndroid.SHORT);
  };
  const editprofile =()=>{
    console.log("edit profile")
    navigation.navigate('EditProfile');
  }
  return (
    <View style={{ padding: 17 }}>
      <Text style={styles.header}>Account</Text>
      <View style={styles.container}>
        <AccountView src={User} text={"Profile"} onPress={editprofile}/>
        <AccountView src={password} text={"Password"} />
        <AccountView src={headphones} text={"Help"} />
        <AccountView src={carbonpolicy} text={"Privacy Policy"} />
        <AccountView src={carbonpolicy} text={"Logout"} onPress={signout} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    marginTop: 35,
    fontSize: 31,
    lineHeight: 46.5,
    fontWeight: "500",
    color: "#191A1F",
  },
  container: {
    marginTop: 40,
    shadowColor: "rgba(25, 26, 31, 0.14)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    borderWidth: 0.05,
    //   borderColor:'rgba(25, 26, 31, 0.14)',
    borderRadius: 1,
    height: 270,
  },
});
export default Account;
