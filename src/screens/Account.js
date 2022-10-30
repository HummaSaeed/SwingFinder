import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AccountView from "../components/AccountView";
import user from "../../assets/images/user.png";
import password from '../../assets/images/password.png';
import headphones from '../../assets/images/headphones.png';
import carbonpolicy from '../../assets/images/carbon_policy.png';

const Account = () => {
  return (
    <View style={{ padding: 17 }}>
      <Text style={styles.header}>Account</Text>
      <View style={styles.container}>
        <AccountView src={user} text={"Profile"}/>
        <AccountView src={password} text={"Password"}/>
        <AccountView src={headphones} text={"Help"}/>
        <AccountView src={carbonpolicy} text={"Privacy Policy"}/>
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
