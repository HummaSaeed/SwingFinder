import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const SecondaryButton = ({text}) => {
  return (
    <TouchableOpacity style={styles.primarybutton}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}
const styles=StyleSheet.create({
    primarybutton:{
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'#ACACAC',
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:18,
        paddingRight:18,
        borderRadius:12,
        margin:2
    },
    buttonText:{
       color:'#ACACAC',
       fontSize:12
    }
   })
export default SecondaryButton