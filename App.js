import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./screens/Register";
import { AntDesign } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Login />
    </View>
  );

  /*<NavigationContainer>
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
          name="Login"
          component={Login}
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
                  <Text style={{ color: "black" }}>HOME</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Register"
          component={Register}
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
                  <Text style={{ color: "black" }}>HOME</Text>
                </View>
              );
            },
          }}
        />
         <Tab.Screen
          name="Register"
          component={Register}
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
                  <Text style={{ color: "black" }}>HOME</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Register"
          component={Register}
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
                  <Text style={{ color: "black" }}>HOME</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Register"
          component={Register}
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
                  <Text style={{ color: "black" }}>HOME</Text>
                </View>
              );
            },
          }}
        /> 
      </Tab.Navigator>
    </NavigationContainer>*/
}

const styles = StyleSheet.create({});
