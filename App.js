import "react-native-gesture-handler";
import { StyleSheet, View, Text } from "react-native";
import { useState, useEffect } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Trade from "./screens/Trade";
import Portfolio from "./screens/Portfolio";
import Settings from "./screens/Settings";
import Search from "./screens/Search";
import Explore from "./screens/Explore";
import { Provider as PaperProvider } from "react-native-paper";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { RootSiblingParent } from "react-native-root-siblings";
import ForgotPassword from "./screens/ForgotPassword";
import { auth } from "./Firebase";
import { Feather } from "@expo/vector-icons";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green", backgroundColor: "transparent" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        color: "white",
        fontWeight: "400",
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),

  tomatoToast: ({ text1, props }) => (
    <View
      style={{
        height: 40,
        width: "100%",
        backgroundColor: "rgb(100, 255, 100)",
        padding: 10,
      }}
    >
      <Text
        style={{
          color: "black",
          fontSize: 15,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {text1}
      </Text>
      {/* <Text>{props.uuid}</Text> */}
    </View>
  ),
};
function MainScreen({ route }) {
  const { userId, userEmail } = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgb(11,20,27)",
          position: "absolute",
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "rgb(27,38,44)",
          height: 60,
          elevation: 5,
          left: 20,
          right: 20,
          bottom: 20,
        },
      }}
    >
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
              }}
            >
              <AntDesign
                name="home"
                size={focused ? 32 : 24}
                color={focused ? "aqua" : "rgb(29, 87, 159)"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        initialParams={{ userId: userId }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
              }}
            >
              <AntDesign
                name="search1"
                size={focused ? 32 : 24}
                color={focused ? "aqua" : "rgb(29, 87, 159)"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Trade"
        component={Trade}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
              }}
            >
              <MaterialIcons
                name="compare-arrows"
                size={focused ? 42 : 36}
                color={focused ? "aqua" : "rgb(29, 87, 159)"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        initialParams={{ userId: userId }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
              }}
            >
              <Feather
                name="bookmark"
                size={focused ? 32 : 24}
                color={focused ? "aqua" : "rgb(29, 87, 159)"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        initialParams={{ userId: userId, userEmail: userEmail }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
              }}
            >
              <AntDesign
                name="setting"
                size={focused ? 32 : 24}
                color={focused ? "aqua" : "rgb(29, 87, 159)"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = useState("Login");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(); // Firebase Auth nesnesini al
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setInitialRoute("MainScreen");
      } else {
        setInitialRoute("Login");
      }
    });

    // Bileşen kaldırıldığında dinleyiciyi temizle
    return () => unsubscribe();
  }, []);

  return (
    <PaperProvider>
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          >
            {user && (
              <Stack.Screen
                name="MainScreen"
                component={MainScreen}
                initialParams={{
                  userId: user.uid,
                  userEmail: user.email,
                }}
              />
            )}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </Stack.Navigator>
          <Toast visibilityTime={3000} config={toastConfig} />
        </NavigationContainer>
      </RootSiblingParent>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
