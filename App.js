import "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
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
import { db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setInitialRoute("Login");
      } else {
        setInitialRoute("MainScreen");
      }
    });
  }, []);

  return (
    <PaperProvider>
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{ headerShown: false }}
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
        </NavigationContainer>
      </RootSiblingParent>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
