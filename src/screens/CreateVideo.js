import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
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
import CustomIcon from "react-native-vector-icons/FontAwesome";
import EditVideo from "./EditVideo";

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
  const [Paused, setPaused] = useState(false);
  const handlePaused = () => {
    setPaused(!Paused);
  };
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
    console.log("taking Video");
    if (camera) {
      const data = await camera.recordAsync();
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      setRecord(data.uri);

      const asset = await MediaLibrary.createAssetAsync(data.uri);
      if (status) {
        MediaLibrary.createAlbumAsync("DCIM", asset)
          .then(() => {
            console.log("Album created!");
          })
          .catch((error) => {
            console.log("err", error);
          });
      }
      let url;
      if (status) {
        const getphotos = await MediaLibrary.getAlbumAsync("DCIM");
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
          {record !== null || record !== undefined ? (
            <>
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
                  paddingTop: 40,
                  paddingLeft: 30,
                  paddingRight: 30,
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{ width: 50, height: 50 }}
                >
                  <Image source={paint} />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: 50, height: 50 }}>
                  <Image source={back} />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: 50, height: 50 }} >
                  <Image source={forward} />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: 50, height: 50 }}>
                  <Image source={save} />
                </TouchableOpacity>
              </View>
              
              {record !== null && record !== undefined ? (
                  <Video
                  ref={video}
                  style={styles.videosave}
                  source={{
                    uri:'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                  }}
                  resizeMode="contain"
                  isLooping
                  onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
              ) : (
                <Text>No Video Found</Text>
              )}
              <View
                style={{
                  display: "flex",
                  height: 150,
                  width: "100%",
                  backgroundColor: "white",
                  position: "absolute",
                  bottom: 0,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 40,
                  paddingLeft: 30,
                  paddingRight: 30,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setshowPreview(false);
                    }}
                  >
                    <Text style={{ color: "#FF7B1C" }}>Cancel</Text>
                  </TouchableOpacity>
                  {!Paused ? (
                    <TouchableOpacity onPress={handlePaused}>
                      <CustomIcon name="play" color="#FF7B1C" size={21} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={handlePaused}>
                      <CustomIcon name="pause" color="#FF7B1C" size={21} />
                    </TouchableOpacity>
                  )}
                  
                  <TouchableOpacity onPress={()=>{navigation.navigate('EditVideos',{record:record})}}>
                    <Text style={{ color: "#FF7B1C" }}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
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
    left: 0,
    marginTop: "23%",
    height: "80%",
    width: 400,
  },
});
