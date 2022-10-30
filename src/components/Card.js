import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import image from "../../assets/images/image.png";

const Card = () => {
  return (
    <View style={styles.container}>
      <Image source={image} width="235" height="154"/>
      <Text style={styles.date}>May 23, 2022</Text>
      <View style={styles.textview}>
          <Text style={styles.text}>Updated on 23</Text>
          <Text style={styles.time}>3:45</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9EAEF",
    borderRadius: 10,
    padding: 6,
    margin:6
  },
  video: {
    height: 200,
    width: 200,
  },
  date:{
    fontWeight:'700',
    fontSize:12,
    lineHeight:18,
    marginLeft:3
  },
  textview:{
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row'
  },
  text:{
      color:'#95969B',
      fontSize:12,
      lineHeight:18
  },
  time:{
    fontSize:12,
    color:'black'
  }
});

export default Card;
