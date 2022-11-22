import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Share,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { SafeAreaView } from "react-native-safe-area-context";
import colon from "../../assets/images/colon.png";
import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import VerticalContainer from "../components/VerticalContainer";
import { auth } from "../config";
import image from "../../assets/images/avatarimage.png";
const Home = ({ navigation }) => {
  const [selector, setselector] = useState(false);

  const [url, seturl] = useState(null);
  const [status, setStatus] = React.useState({});
  const [data, setdata] = useState();
  const [selectedId, setSelectedId] = useState(null);
  const [selectedID, setselectedID] = useState(null);
  const [Image, setImage] = useState();

  const handleSelector = () => {
    setselector(!selector);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status) {
        const getphotos = await MediaLibrary.getAlbumAsync("DCIM");
        var abc = await MediaLibrary.getAssetsAsync({
          album: getphotos,
          mediaType: [MediaLibrary.MediaType.video],
        });
        seturl(abc.assets[0].uri);
        setdata(abc.assets);
      }
    })();
    const user = auth.currentUser;
  }, []);
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
  const onShare = async () => {
    console.log(Image);
    try {
      const result = await Share.share({
        message: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const handleItem = (item) => {
    setSelectedId(item.uri);
    setselector(true);
    setselectedID(item.id);
  };
  const renderItem = ({ item }) => {
    return (
      <Card
        item={item}
        onPress={() => {
          handleItem(item);
        }}
      />
    );
  };
  const renderVerticalItem = ({ item }) => {
    return (
      <VerticalContainer item={item} onPress={() => setSelectedId(item.uri)} />
    );
  };
  const deletefile = async () => {
    const getphotos = await MediaLibrary.getAlbumAsync("DCIM");
    await MediaLibrary.removeAssetsFromAlbumAsync(
      selectedID.toString(),
      getphotos
    );
    console.log("file has deleted");
  };
  return (
    <ScrollView>
      <SafeAreaView forceInset={{ top: "always" }}>
        <View style={{ display: "flex", marginTop: 2, minHeight: 400 }}>
          <View style={styles.header}>
            {auth.currentUser.photoURL ? (
              <Avatar
                rounded
                size="medium"
                source={{
                  uri: auth.currentUser.photoURL,
                }}
              />
            ) : (
              <Avatar
                rounded
                size="medium"
                source={{
                  uri: "../../assets/images/avatarimage.png",
                }}
              />
            )}

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "85%",
                justifyContent: "space-between",
              }}
            >
              <Text style={[styles.headname]}>
                {auth.currentUser.displayName}
              </Text>
              {/* <Image source={colon} /> */}
            </View>
          </View>
          <Text style={styles.videos}>Videos</Text>
          {selectedId === null ? (
            <View style={styles.container}>
              <PrimaryButton text={"Recent"} />
              <SecondaryButton text={"All"} />
              <SecondaryButton text={"Deleted"} />
            </View>
          ) : (
            <View style={styles.rightcontainer}>
              <PrimaryButton text={"Delete"} onPress={deletefile} />
              <SecondaryButton text={"Edit"} />
            </View>
          )}
          <ScrollView
            style={{ height: 250 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.card}>
              {url !== null && url !== undefined ? (
                <>
                  <FlatList
                    data={data}
                    contentContainerStyle={{
                      flexGrow: 1,
                      flexDirection: "row",
                    }}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                  />
                </>
              ) : (
                <View
                  style={{
                    height: "100%",
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#95969B",
                      fontSize: 34,
                      textAlign: "center",
                      marginLeft: 28,
                    }}
                  >
                    No Videos Found
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
        <ScrollView>
          {url !== null && url !== undefined ? (
            <>
              <FlatList
                data={data}
                renderItem={renderVerticalItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
              />
            </>
          ) : (
            <></>
          )}
        </ScrollView>
        {selectedId === null ? (
          <TouchableOpacity
            style={styles.add}
            onPress={() => {
              navigation.navigate("ImportVideo");
            }}
          >
            <Text style={styles.addicon}>+</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.share} onPress={onShare}>
            <Text style={styles.shareicon}>Share</Text>
          </TouchableOpacity>
        )}
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
  rightcontainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  card: {
    display: "flex",
    flexDirection: "row",

    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 17,
  },
  add: {
    backgroundColor: "#FF7B1C",
    color: "white",
    borderRadius: 70,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 15,
    paddingRight: 15,
    position: "absolute",
    bottom: 0,
    right: 0,
    marginBottom: 10,
    marginRight: 10,
  },
  share: {
    backgroundColor: "#FF7B1C",
    color: "white",
    borderRadius: 70,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 15,
    paddingRight: 15,
    position: "absolute",
    bottom: 0,
    left: 0,
    marginBottom: 10,
    marginLeft: 17,
  },
  shareicon: {
    color: "white",
    fontSize: 15,
  },
  addicon: {
    color: "white",
    fontSize: 38,
  },
});
export default Home;
