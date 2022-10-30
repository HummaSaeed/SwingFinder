import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  ScrollView
} from "react-native";
import paint from "../../assets/images/paintwhite.png";
import back from "../../assets/images/undooutline.png";
import forward from "../../assets/images/forward.png";
import save from "../../assets/images/save.png";

import IconFile from "./IconFile";

const dataSource = [
  {
    id: 0,
    backgroundColor: "red",
  },
  {
    id: 1,
    backgroundColor: "yellow",
  },
  {
    id: 2,
    backgroundColor: "#00FF19",
  },
  {
    id: 3,
    backgroundColor: "black",
  },
  {
    id: 4,
    backgroundColor: "#FFD600",
  },
  {
    id: 0,
    backgroundColor: "red",
  },
  {
    id: 1,
    backgroundColor: "#00FFD1",
  },
  {
    id: 2,
    backgroundColor: "#00FF19",
  },
  {
    id: 3,
    backgroundColor: "black",
  },
  {
    id: 4,
    backgroundColor: "#FFD600",
  },
  {
    id: 0,
    backgroundColor: "red",
  },
  {
    id: 1,
    backgroundColor: "yellow",
  },
  {
    id: 2,
    backgroundColor: "#00FF19",
  },
  {
    id: 3,
    backgroundColor: "#00FFD1",
  },
  {
    id: 4,
    backgroundColor: "#FFD600",
  },
  {
    id: 4,
    backgroundColor: "#FFD600",
  },
];
const Item = ({ backgroundColor, borderColor }) => (
  <View
    style={{
      backgroundColor: backgroundColor,
      borderRadius: 50,
      borderWidth: 5,
      width: 40,
      height: 40,
      borderColor: borderColor,
      marginLeft: 25,
      marginRight: 25,
      marginTop: 15,
      marginBottom: 15,
    }}
  />
);
const Editors = () => {
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({ item }) => {
    const borderColor = item.id === selectedId ? "##FF7B1C" : "transparent";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={item.backgroundColor}
        borderColor={borderColor}
      />
    );
  };
  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          height: 60,
          width: "100%",
          backgroundColor: "white",
          position: "absolute",
          top: 20,
          flexDirection: "row",
          alignItems: "center",
          // paddingLeft: 30,
          // paddingRight: 30,
          justifyContent: "space-between",
          borderBottomColor:'grey',
          borderBottomWidth:1
        }}
      >
        <View style={{margin:0,backgroundColor:'#FF7B1C',paddingTop:20,paddingBottom:20,paddingLeft:40,paddingRight:40}}>
        <Image source={paint}  />
        </View>
        <Image source={back} />
        <Image source={forward} />
        <Image source={save} />
      </View>
      <View
        style={{
          marginTop: 80,
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          backgroundColor:'white'
        }}
      >
        <IconFile />
      </View>
      <View
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          backgroundColor:'white'
        }}
      >
        <Text style={styles.head}>Colors</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataSource}
          renderItem={renderItem}
          numColumns={4}
          keyExtractor={(item, index) => index}
          contentContainerStyle={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          backgroundColor:'white',
          height:150
        }}
      >
        <Text style={styles.head}>Size</Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  head: {
    color: "#FF7B1C",
    fontSize: 17,
    lineHeight: 25,
    fontWeight: "700",
    marginLeft: 17,
  },
});
export default Editors;
