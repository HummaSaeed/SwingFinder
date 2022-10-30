import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { Video } from "expo-av";

const VideoRecorder = () => {
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [record, setRecord] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [assets, setassets] = useState();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
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
      if (status) {
        let url;
        const getphotos = await MediaLibrary.getAlbumAsync("Expo");
        var abc = await MediaLibrary.getAssetsAsync({
          album: getphotos,
          mediaType: [MediaLibrary.MediaType.video],
        });
        //  const data = abc.assets.map((title) => seturl(title));
        seturl(abc.assets);
      }
    }
  };

  const stopVideo = async () => {
    camera.stopRecording();
  };
  if (hasCameraPermission === null || hasAudioPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasAudioPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"4:3"}
        />
      </View>
      {console.log(url)}
      {url != undefined && url != null ? (
        <View style={{ display: "flex", flexDirection: "row" }}>
          <ScrollView horizontal={true}>
          <View style={{ margin: 10 }}>
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
            </View>
            <View style={{ margin: 10 }}>
              <Video
                useNativeControls
                resizeMode="contain"
                isLooping
                style={styles.videosave}
                ref={video}
                source={{
                  uri: "file:///storage/emulated/0/Pictures/Expo/37227988-9ccb-47a3-b94e-bf8eda68e4f0.mp4",
                }}
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            </View>

            <View style={{ margin: 10 }}>
              <Video
                useNativeControls
                resizeMode="contain"
                isLooping
                style={styles.videosave}
                ref={video}
                source={{
                  uri: "file:///storage/emulated/0/Pictures/Expo/37227988-9ccb-47a3-b94e-bf8eda68e4f0.mp4",
                }}
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Video
                useNativeControls
                resizeMode="contain"
                isLooping
                style={styles.videosave}
                ref={video}
                source={{
                  uri: "file:///storage/emulated/0/Pictures/Expo/bb8d3f59-f885-4b90-9806-4a3808f1554b.mp4",
                }}
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Video
                useNativeControls
                resizeMode="contain"
                isLooping
                style={styles.videosave}
                ref={video}
                source={{
                  uri: "file:///storage/emulated/0/Pictures/Expo/bb8d3f59-f885-4b90-9806-4a3808f1554b.mp4",
                }}
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Video
                useNativeControls
                resizeMode="contain"
                isLooping
                style={styles.videosave}
                ref={video}
                source={{
                  uri: "file:///storage/emulated/0/Pictures/Expo/0fa1bcf0-ed76-4329-a137-4bbb58e0b0d6.mp4",
                }}
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            </View>
          </ScrollView>
        </View>
      ) : (
        // url.map((item) => (
        //   <FlatList
        //     data={url}
        //     renderItem={({ item }) => (
        //       <Video
        //         useNativeControls
        //         resizeMode="contain"
        //         isLooping
        //         style={styles.videosave}
        //         ref={video}
        //         source={{ uri: url.uri }}
        //         onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        //       />
        //     )}
        //   />
        // <ScrollView horizontal={true} >
        //   <>
        //   <Video
        //   ref={video}
        //   style={styles.video}
        //   source={{
        //     uri: item.url,
        //   }}
        //   useNativeControls
        //   resizeMode="contain"
        //   isLooping
        //   onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        // />
        //   </></ScrollView>

        <Text>Loading..</Text>
      )}
      <Button
        title="Flip Video"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      ></Button>
      <Button title="Take video" onPress={() => takeVideo()} />
      <Button title="Stop Video" onPress={() => stopVideo()} />
    </View>
  );
};
const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  video: {
    alignSelf: "center",
    width: 350,
    height: 220,
  },
  videosave: {
    width: 200,
    height: 120,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default VideoRecorder;
