import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import image from "../../assets/images/image.png";
import { Video } from "expo-av";
import CustomIcon from "react-native-vector-icons/FontAwesome";
import NewCustomIcon from "react-native-vector-icons/MaterialCommunityIcons";
const Card = ({item,selectedId, onPress }) => {
  
  const date = new Date(item.creationTime);
  const creationDate = date.toLocaleDateString('sv');
  const creationTime = date.toLocaleTimeString("sv")
  const video = React.useRef(null);
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <TouchableOpacity onPress={onPress}>
          <Video
            useNativeControls
            isLooping
            style={{
              flex: 1,
              width: 235,
              height: 154,
            }}
            source={{
              uri: item.uri,
            }}
          />
        </TouchableOpacity>

        {item.id ==selectedId ? (
          <TouchableOpacity
           
            style={{ position: "absolute", marginTop: 4, right: 4 }}
          >
            <CustomIcon name="circle" color="#E9EAEF" size={23} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ position: "absolute", marginTop: 4, right: 4 }}
          >
            <NewCustomIcon
              name="checkbox-marked-circle"
              color="#FF7B1C"
              size={23}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.date}>{creationDate}</Text>
      <View style={styles.textview}>
        <Text style={styles.text}>Updated on 23</Text>
        <Text style={styles.time}>{creationTime}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9EAEF",
    borderRadius: 10,
    padding: 6,
    margin: 6,
  },
  video: {
    height: 200,
    width: 200,
  },
  date: {
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 18,
    marginLeft: 3,
  },
  textview: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text: {
    color: "#95969B",
    fontSize: 12,
    lineHeight: 18,
  },
  time: {
    fontSize: 12,
    color: "black",
  },
});

export default Card;
