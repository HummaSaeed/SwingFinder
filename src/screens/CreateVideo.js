import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import { Video } from "expo-av";
import flip from "../../assets/images/flip.png";
import pause from "../../assets/images/pause.png";
import chevronleft from "../../assets/images/chevronleft.png";
import chevronbottom from "../../assets/images/chevronbottom.png";
import upload from "../../assets/images/upload.png";
import paint from "../../assets/images/paint.png";
import back from "../../assets/images/undooutline.png";
import forward from "../../assets/images/forward.png";
import save from "../../assets/images/save.png";

export const CreateVideo = ({ navigation }) => {
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const video = React.useRef(null);
  const [record, setRecord] = useState(null);
  const [status, setStatus] = React.useState({});
  const [startrecording, setstartrecording] = useState(false);
  const [showPreview, setshowPreview] = useState(false);
  const [url, seturl] = useState(null);
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === "granted");
    })();
  }, []);
  const takeVideo = async () => {
    setstartrecording(true);
    if (camera) {
      const data = await camera.recordAsync();
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      setRecord(data.uri);
      const asset = await MediaLibrary.createAssetAsync(data.uri);
      if (status) {
        MediaLibrary.createAlbumAsync("Expo", asset)
          .then(() => {
            console.log("Album created!");
          })
          .catch((error) => {
            console.log("err", error);
          });
      }

      let url;
      if (status) {
        const getphotos = await MediaLibrary.getAlbumAsync("Expo");
        var abc = await MediaLibrary.getAssetsAsync({
          album: getphotos,
          mediaType: [MediaLibrary.MediaType.video],
        });
        seturl(abc.assets);
        console.log(url);
      }
    }
  };

  const stopVideo = async () => {
    camera.stopRecording();
    setstartrecording(false);
    setshowPreview(true);
  };
  if (hasCameraPermission === null || hasAudioPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasAudioPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      {!showPreview ? (
        <>
          <View style={styles.cameraContainer}>
            <Camera
              ref={(ref) => setCamera(ref)}
              style={styles.fixedRatio}
              type={type}
            />
          </View>
          <View style={styles.topbar}>
            <TouchableOpacity
              style={{
                backgroundColor: "#FF7B1C",
                height: 38,
                width: 38,
                borderRadius: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image source={chevronleft} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#FF7B1C",
                height: 38,
                width: 100,
                borderRadius: 60,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  lineHeight: 18,
                  marginRight: 4,
                }}
              >
                Original
              </Text>
              <Image source={chevronbottom} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#FF7B1C",
                height: 38,
                width: 38,
                borderRadius: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image source={upload} />
            </TouchableOpacity>
          </View>
          <View style={styles.bottombar}>
            <TouchableOpacity
              style={{ marginLeft: 31 }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Image source={flip} />
            </TouchableOpacity>
            {!startrecording ? (
              <TouchableOpacity onPress={() => takeVideo()}>
                <View style={styles.recoder} />
              </TouchableOpacity>
            ) : (
              <>
                <View style={{ display: "flex", alignItems: "center" }}>
                  <TouchableOpacity onPress={() => stopVideo()}>
                    <View style={styles.resumecontainer}>
                      <View style={styles.resume} />
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.pause}>
                  <Image source={pause} />
                </TouchableOpacity>
              </>
            )}
          </View>
        </>
      ) : (
        <>
          {url != undefined && url != null ? (
            <SafeAreaView >
              <View
                style={{
                  display: "flex",
                  height: 70,
                  width: "100%",
                  backgroundColor: "white",
                  position: "absolute",
                  top: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop:40,
                  paddingLeft: 30,
                  paddingRight: 30,
                  justifyContent: "space-between",
                  zIndex:1
                }}
              >
                <TouchableOpacity
                style={{width:50,height:50}}
                 onPress={()=>{navigation.navigate('Editors')}}
                >
                  <Image source={paint} />
                </TouchableOpacity>
                <TouchableOpacity
                style={{width:50,height:50}}
                >
                  <Image source={back} />
                </TouchableOpacity>
                <TouchableOpacity
                style={{width:50,height:50}}
                >
                <Image source={forward} />
                </TouchableOpacity>
                <TouchableOpacity
                style={{width:50,height:50}}
                >
                <Image source={save} />
                </TouchableOpacity>
              </View>
              <Video
                useNativeControls
                resizeMode="contain"
                isLooping
                style={styles.videosave}
                ref={video}
                source={{
                  uri: record,
                }}
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            </SafeAreaView>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  topbar: {
    height: 80,
    position: "absolute",
    top: 60,
    marginLeft: 17,
    display: "flex",
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 0.3,
  },
  bottombar: {
    position: "absolute",
    display: "flex",
    bottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  recoder: {
    backgroundColor: "#FF7B1C",
    borderRadius: 70,
    width: 50,
    height: 50,
    borderWidth: 7,
    borderColor: "white",
    marginLeft: 95,
  },
  resumecontainer: {
    width: 50,
    height: 50,
    backgroundColor: "transparent",
    borderRadius: 60,
    borderWidth: 7,
    borderColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 90,
  },
  resume: {
    backgroundColor: "#FF7B1C",
    height: 20,
    width: 20,
    borderRadius: 6,
  },
  pause: {
    backgroundColor: "white",
    width: 34,
    height: 34,
    borderRadius: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    marginLeft: 300,
    marginBottom: 10,
  },
  videosave: {
    marginTop: 30,
    height: "100%",
    width: 400,
  },
});
