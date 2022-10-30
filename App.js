import { StyleSheet, Text, View } from "react-native";
import Home from "./src/screens/Home";
import VideoRecorder from "./src/screens/VideoRecorder";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { CreateVideo } from "./src/screens/CreateVideo";
import Editors from "./src/screens/Editors";
import Signup from "./src/screens/Signup";
import SignIn from "./src/screens/SignIn";
import BottomNavigation from "./src/screens/BottomNavigation";
import { auth } from "./src/config";
import { useState,useEffect } from "react";

const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setuser] = useState(false)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setuser(true)
      }
    })
    return unsubscribe;
  }, [])

  let [fontLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      {!user ? (<Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          </Stack.Navigator>
          ) :(
        <Stack.Navigator>
          <Stack.Screen name="BottomNavigator" component={BottomNavigation} options={{ headerShown: false }}  />
          <Stack.Screen name="CreateVideo" component={CreateVideo} options={{ headerShown: false }}/>
        </Stack.Navigator>
        )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
