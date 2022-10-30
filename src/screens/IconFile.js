import React, { useState } from "react";
import { Image, View, Text, FlatList } from "react-native";

import pen from "../../assets/icons/pen.png";
import brush from "../../assets/icons/brush.png";
import bag from "../../assets/icons/bag.png";
import brushes from "../../assets/icons/brushes.png";
import drop from "../../assets/icons/drop.png";
import marker from "../../assets/icons/marker.png";
import eraser from "../../assets/icons/eraser.png";
import text from "../../assets/icons/text.png";
import line from "../../assets/icons/line.png";
import dashes from "../../assets/icons/dashes.png";
import rectangle from "../../assets/icons/rectange.png";
import square from "../../assets/icons/square.png";
import circle from "../../assets/icons/circle.png";
import back from "../../assets/icons/backarrow.png";
import forward from "../../assets/icons/forward.png";
import triangle from "../../assets/icons/triangle.png";
import star from "../../assets/icons/star.png";

const dataSource = [
  {
    id: 0,
    image: "../../assets/icons/pen.png",
  },
  {
    id: 1,
    image: "../../assets/icons/pen.png",
  },
  {
    id: 2,
    image: "../../assets/icons/pen.png",
  },
  {
    id: 3,
    image: "../../assets/icons/rectange.png",
  },
];
const Item = ({ item, image }) => <Image source={image} />;
const IconFile = () => {
  const renderItem = ({ item }) => {
    return <Item item={item} image={item.src} />;
  };
  return (
      <>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop:15,
        marginBottom:15,
       alignItems:'center'
      }}
    >
      <Image source={pen} />
      <Image source={brush} />
      <Image source={bag} />
      <Image source={brushes} />
    </View>
     <View
     style={{
       display: "flex",
       flexDirection: "row",
       justifyContent: "space-between",
       marginLeft: 20,
       marginRight: 20,
       marginTop:15,
       marginBottom:15,
       alignItems:'center'
     }}
   >
     <Image source={drop} />
     <Image source={marker} />
     <Image source={eraser} />
     <Image source={text} />
   </View>
   <View
     style={{
       display: "flex",
       flexDirection: "row",
       justifyContent: "space-between",
       alignItems:'center',
       marginLeft: 20,
       marginRight: 20,
       marginTop:15,
       marginBottom:15,
       alignItems:'center'
     }}
   >
     <Image source={line} />
     <Image source={dashes} />
     <Image source={rectangle} />
     <Image source={square} />
   </View>
   <View
     style={{
       display: "flex",
       flexDirection: "row",
       justifyContent: "space-between",
       alignItems:'center',
       marginLeft: 20,
       marginRight: 20,
       marginTop:15,
       marginBottom:15,
       alignItems:'center'
     }}
   >
     <Image source={circle} />
     <Image source={back} />
     <Image source={forward} />
     <Image source={triangle} />
   </View>
   <View
     style={{
       display: "flex",
       flexDirection: "row",
       justifyContent: "space-between",
       alignItems:'center',
       marginLeft: 20,
       marginRight: 20,
       marginTop:15,
       marginBottom:15,
       alignItems:'center'
     }}
   >
     <Image source={star} />
   </View>
   </>
    //   <FlatList
    //     showsVerticalScrollIndicator={false}
    //     data={dataSource}
    //     renderItem={renderItem}
    //     numColumns={4}
    //     keyExtractor={(item, index) => index}
    //     contentContainerStyle={{
    //       display: "flex",
    //       width: "100%",
    //       justifyContent: "space-between",
    //     }}
    //   />
  );
};

export default IconFile;
