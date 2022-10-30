import React from "react";
import { TouchableOpacity, Text,StyleSheet } from "react-native";

const OrangeButton = ({onPress,text}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles= StyleSheet.create({
    button:{
        backgroundColor:'#FF7B1C',
        paddingTop:18,
        paddingBottom:18,
        paddingLeft:67,
        paddingRight:67,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:12,
    },
    buttonText:{
        color:'white',
        fontSize:16,
        fontWeight:'600'
     }
 })
export default OrangeButton;
