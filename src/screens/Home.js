import React from "react";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import colon from "../../assets/images/colon.png";
import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import VerticalContainer from "../components/VerticalContainer";
import { auth } from "../config";

const Home = ({navigation}) => {
  return (
    <ScrollView>
    <SafeAreaView forceInset={{ top: "always" }}>
      <View style={{ display: "flex", marginTop: 2 }}>
        <View style={styles.header}>
          <Avatar
            rounded
            size="medium"
            source={{
              uri: "../../assets/images/avatarimage.png",
            }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "85%",
              justifyContent: "space-between",
            }}
          >
            <Text style={[styles.headname]}>{auth.currentUser.email}</Text>
            <Image source={colon} />
          </View>
        </View>
        <Text style={styles.videos}>Videos</Text>
        <View style={styles.container}>
          <PrimaryButton />
          <SecondaryButton text={"All"} />
          <SecondaryButton text={"Deleted"} />
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.card}>
            <Card />
            <Card />
            <Card />
          </View>
        </ScrollView>
      </View>
      <ScrollView>
        <VerticalContainer />
        <VerticalContainer />
        <VerticalContainer />
      </ScrollView>
      <TouchableOpacity style={styles.add} onPress={()=>{navigation.navigate('CreateVideo')}}>
       <Text style={styles.addicon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    marginTop: 32,
    padding: 17,
    alignItems: "center",
  },
  headname: {
    color: "#191A1F",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  videos: {
    fontWeight: "700",
    fontSize: 28,
    lineHeight: 42,
    marginLeft: 17,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 17,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 17,
  },
  add:{
    backgroundColor:'#FF7B1C',
    color:'white',
    borderRadius:70,
    paddingTop:2,
    paddingBottom:2,
    paddingLeft:15,
    paddingRight:15,
    position:'absolute',
    bottom:0,
    right:0,
    marginBottom:10,
    marginRight:10
  },
  addicon:{
    color:'white',
    fontSize:38
  }
});
export default Home;
