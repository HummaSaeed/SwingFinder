import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View,TouchableOpacity,ToastAndroid } from "react-native";
import { Video } from "expo-av";
import CustomIcon from "react-native-vector-icons/FontAwesome";

const EditVideo = (record) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [Paused, setPaused] = useState(false);
  const handlePaused = () => {
    setPaused(!Paused);
  };
  return (
    <>
      
      {record !== null && record !== undefined ? (
        <Video
          resizeMode="contain"
          isLooping
          style={styles.videosave}
          ref={video}
          source={{
            uri: JSON.stringify(record.route.params.record),
          }}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      ) : (
        <></>
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
                  
                  <TouchableOpacity onPress={ ToastAndroid.show("Video has saved",ToastAndroid.SHORT)}>
                    <Text style={{ color: "#FF7B1C" }}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
    </>
  );
};

export default EditVideo;

const styles = StyleSheet.create({
  videosave: {
    left: 0,
    marginTop: "23%",
    height: "80%",
    width: 400,
  },
});
