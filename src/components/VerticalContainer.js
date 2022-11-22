import React,{useState} from "react";
import { Video } from "expo-av";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import image from "../../assets/images/verticalimage.png";

const VerticalContainer = ({item,selectedId, onPress }) => {
  
  const date = new Date(item.creationTime);
  const creationDate = date.toLocaleDateString('sv');
  const creationTime = date.toLocaleTimeString("sv")
  return (
    <View style={styles.container}>
      <View style={styles.textview}>
        <Text style={styles.date}>{creationDate}</Text>
        <Text style={styles.text}>Updated on 23</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
          <Video
            useNativeControls
            isLooping
            style={{
              width: 121,
              height: 80,
              marginLeft:5
            }}
            source={{
              uri: item.uri,
            }}
          />
        </TouchableOpacity>
      {/* <Image source={image} width="121" height="80" style={styles.image} /> */}
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
