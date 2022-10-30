import React from "react";
import { View, Text, TouchableOpacity, StyleSheet,Image } from "react-native";

import cheronRight from '../../assets/images/cheronRight.png'

const AccountView = ({text,src}) => {
  return (
    <View>
      <TouchableOpacity style={styles.view}>
        <Image source={src} />
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: 25,
            flexDirection:'row',
            width:'90%',
            alignItems:'center'
          }}
        >
          <Text style={styles.text}>{text}</Text>
          <Image source={cheronRight}/>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 25,
    paddingRight:27,
    display:"flex",
    flexDirection:'row',
    alignItems:'center',
    borderBottomWidth:0.25,
    borderBottomColor:'rgba(25, 26, 31, 0.14)',
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 27,
  },
});

export default AccountView;
