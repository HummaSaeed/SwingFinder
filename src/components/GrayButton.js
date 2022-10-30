import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const GrayButton = ({source}) => {
  return (
    <TouchableOpacity style={styles.button}>
        <Image source={source}/>
    </TouchableOpacity>
  )
}
const styles= StyleSheet.create({
   button:{
       backgroundColor:'#DADADA',
       paddingTop:18,
       paddingBottom:18,
       paddingLeft:67,
       paddingRight:67,
       display:'flex',
       justifyContent:'center',
       alignItems:'center',
       borderRadius:12,
       marginRight:10

   }
})
export default GrayButton