import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import CustomIcon from "react-native-vector-icons/Feather";
import PrimaryButton from "../components/PrimaryButton";
import OrangeButton from "../components/OrangeButton";
import { auth } from "../config";

const EditProfile = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [phoneno, setphoneno] = useState("");
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };
  const user = auth.currentUser;

  const UpdatedProfile=  () => {
    
    user.updateProfile({
      displayName: firstName,
      photoURL:image,
      phoneNumber:phoneno
    })
      .then(() => {
        console.log(user);
        navigation.navigate('BottomNavigator')
      })
      .catch((error) => {
        console.log(error)
      });
  };
  return (
    <View style={{ padding: 17, heigh: "100%",paddingTop:20 }}>
      <View style={styles.headerView}>
        <CustomIcon name="arrow-left" size={20} />
        <Text style={styles.header}>Profile</Text>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop:53
        }}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: 115,
              height: 115,
              borderRadius: 65,
              alignSelf: "center",
            }}
          />
        ) : (
          <View
            style={{
              width: 115,
              height: 115,
              borderRadius: 65,
              alignSelf: "center",
              backgroundColor: "grey",
            }}
          />
        )}
        <TouchableOpacity
          style={{
            backgroundColor: "#FF7B1C",
            borderRadius: 50,
            width: 27,
            height: 27,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: -30,
            marginLeft: 67,
          }}
          onPress={pickImage}
        >
          <CustomIcon name="camera" color="white" size={21} />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: "#FF7B1C",
          fontSize: 18,
          fontWeight: "500",
          marginTop: 38,
        }}
      >
        User Information
      </Text>
      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <TextInput
          label="First Name"
          placeholder="asda@aas.com"
          style={{ marginRight: 10, width: 160 }}
          value={firstName}
          onChangeText={(text) => setfirstName(text)}
          theme={{
            colors: {
              placeholder: "grey",
              text: "#191A1F",
              primary: "#95969B",
              underlineColor: "transparent",
              background: "transparent",
            },
          }}
        />
        <TextInput
          label="Last Name"
          placeholder="asda@aas.com"
          style={{ width: 160 }}
          value={lastName}
          onChangeText={(text) => setlastName(text)}
          theme={{
            colors: {
              placeholder: "grey",
              text: "#191A1F",
              primary: "#95969B",
              underlineColor: "transparent",
              background: "transparent",
            },
          }}
        />
      </View>
      <TextInput
        label="Email"
        placeholder="asda@aas.com"
        style={{ marginTop: 10 }}
        value={auth.currentUser.email}
        theme={{
          colors: {
            placeholder: "grey",
            text: "#191A1F",
            primary: "#95969B",
            underlineColor: "transparent",
            background: "transparent",
          },
        }}
      />
      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <TextInput
          label="Gender"
          placeholder="asda@aas.com"
          style={{ marginRight: 10, width: 160 }}
          value={gender}
          onChangeText={(text) => setgender(text)}
          theme={{
            colors: {
              placeholder: "grey",
              text: "#191A1F",
              primary: "#95969B",
              underlineColor: "transparent",
              background: "transparent",
            },
          }}
        />
        <TextInput
          label="Phone"
          placeholder="asda@aas.com"
          style={{ width: 160, color: "grey" }}
          value={phoneno}
          onChangeText={(text) => setphoneno(text)}
          theme={{
            colors: {
              placeholder: "grey",
              text: "#191A1F",
              primary: "#95969B",
              underlineColor: "transparent",
              background: "transparent",
            },
          }}
        />
      </View>
      <View style={{ marginTop: 120 }}>
        <OrangeButton text={"Save"} onPress={UpdatedProfile} />
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  header: {
    fontSize: 31,
    lineHeight: 46.5,
    fontWeight: "500",
    color: "#191A1F",
    textAlign: "center",
    marginLeft: 100,
  },
  headerView: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    // justifyContent:'center'
  },
  subtitle: {
    fontSize: 14,
    color: "#95969B",
    marginTop: 45,
    margin: 3,
  },
});
