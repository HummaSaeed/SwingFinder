import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import image from "../../assets/images/verticalimage.png";

const VerticalContainer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textview}>
        <Text style={styles.date}>May 23, 2022</Text>
        <Text style={styles.text}>Updated on 23</Text>
      </View>
      <Image source={image} width="121" height="80" style={styles.image} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9EAEF",
    borderRadius: 10,
    padding: 6,
    marginLeft:17,
    marginRight:17,
    marginTop:3,
    marginBottom:3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textview: {
    display: "flex",
    justifyContent: "space-between",
  },
  text: {
    color: "#95969B",
    fontSize: 12,
    lineHeight: 18,
  },
  date: {
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 18,
    marginLeft: 3,
  },
  image: {
    marginLeft: 5,
  },
});

export default VerticalContainer;
