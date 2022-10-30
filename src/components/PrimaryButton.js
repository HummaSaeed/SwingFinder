import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const PrimaryButton = () => {
  return (
    <TouchableOpacity style={styles.primarybutton}>
      <Text style={styles.buttonText}>Recent</Text>
    </TouchableOpacity>
  )
}
const styles=StyleSheet.create({
 primarybutton:{
     backgroundColor:'#FF7B1C',
     paddingTop:5,
     paddingBottom:5,
     paddingLeft:18,
     paddingRight:18,
     borderRadius:12,
     margin:2
 },
 buttonText:{
    color:'white',
    fontSize:12
 }
})

export default PrimaryButton