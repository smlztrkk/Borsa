import "react-native-gesture-handler";
import { StyleSheet, View, Text } from "react-native";
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
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { RootSiblingParent } from "react-native-root-siblings";
import ForgotPassword from "./screens/ForgotPassword";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgb(10, 35, 75)",
          position: "absolute",
          borderRadius: 20,
          borderColor: "rgb(10, 35, 75)",
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
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={
                  (focused ? {} : {},
                  {
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                  })
                }
              >
                <AntDesign
                  name="home"
                  size={focused ? 32 : 24}
                  color={focused ? "aqua" : "rgb(29, 87, 159)"}
                />
                {/* <Text
                  style={{
                    color: focused ? "aqua" : "gray",
                    fontSize: focused ? 16 : 10,
                  }}
                >
                  ana
                </Text> */}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
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
            );
          },
        }}
      />
      <Tab.Screen
        name="Trade"
        component={Trade}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                }}
              >
                <FontAwesome5
                  name="exchange-alt"
                  size={focused ? 32 : 24}
                  color={focused ? "aqua" : "rgb(29, 87, 159)"}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                }}
              >
                <AntDesign
                  name="wallet"
                  size={focused ? 32 : 24}
                  color={focused ? "aqua" : "rgb(29, 87, 159)"}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
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
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({});
