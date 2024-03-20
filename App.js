import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Main from "./screens/Main";
import Search from "./screens/Search";
import Trade from "./screens/Trade";
import Portfolio from "./screens/Portfolio";
import Settings from "./screens/Settings";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            borderRadius: 20,
            height: 60,
            elevation: 10,
            left: 10,
            right: 10,
            bottom: 20,
          },
        }}
      >
        <Tab.Screen
          name="Main"
          component={Main}
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
                    name="home"
                    size={focused ? 32 : 24}
                    color={focused ? "red" : "blue"}
                  />
                  <Text style={{ color: "black" }}>Ana Menü</Text>
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
                    color={focused ? "red" : "blue"}
                  />
                  <Text style={{ color: "black" }}>Arama</Text>
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
                    color={focused ? "red" : "blue"}
                  />

                  <Text style={{ color: "black" }}>Al Sat</Text>
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
                    color={focused ? "red" : "blue"}
                  />
                  <Text style={{ color: "black" }}>Portfolio</Text>
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
                    color={focused ? "red" : "blue"}
                  />
                  <Text style={{ color: "black" }}>Ayarlar</Text>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
