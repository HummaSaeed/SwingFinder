import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, StyleSheet,Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import { Camera, CameraType } from "expo-camera";
import { Video } from "expo-av";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";


const ImportVideo = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [status, setStatus] = React.useState({});
  const video = React.useRef(null);

  const pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
    if(status){
      const getphotos = await MediaLibrary.getAlbumAsync("DCIM");
      MediaLibrary.createAssetAsync(image.toString());
      console.log("video uploaded");
      navigation.navigate('BottomNavigator')
    }

  };
  const recordVideo=()=>{
  console.log("handle record");
    navigation.navigate('CreateVideo')
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{display:'flex',flexDirection:'row'}}>
        <PrimaryButton text={"Import Video"} onPress={pickImage}/>
        <SecondaryButton text={"Record Video"} onPress={recordVideo}/>
        </View>
      </View>
    </View>
  );
};

export default ImportVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  videosave: {
    left: 0,
    marginTop: "23%",
    height: "40%",
    width: 400,
  },
});
