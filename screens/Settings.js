import {
  Pressable,
  StyleSheet,
  Text, //ToastAndroid,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../Firebase";

export default function Settings({ navigation }) {
  // const showtoast = () => {
  //   ToastAndroid.show("başarılı", ToastAndroid.LONG);
  // };
  const SingOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.push("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView>
      <View style={{ width: "70%" }}>
        <Pressable
          onPress={SingOut}
          style={{
            width: "100%",
            height: 50,
            borderRadius: 20,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(31,67,200,1)",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 500, color: "white" }}>
            Çıkış Yap
          </Text>
        </Pressable>
        <Pressable
          //onPress={showtoast}
          style={{
            width: "100%",
            height: 50,
            borderRadius: 20,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(31,67,200,1)",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 500, color: "white" }}>
            Çıkış Yap
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
