import {
  StyleSheet,
  Text, //ToastAndroid,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../Firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import WatchList from "../components/WatchList";

export default function Settings({ navigation }) {
  // const showtoast = () => {
  //   ToastAndroid.show("başarılı", ToastAndroid.LONG);
  // };
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(11,20,27)",
        }}
      >
        <ActivityIndicator size={"large"} color={"rgba(255,255,255,0.8)"} />
        <Text style={{ color: "rgba(255,255,255,0.5)" }}>
          Çıkış Yapılıyor...
        </Text>
      </SafeAreaView>
    );
  }
  const SingOut = async () => {
    setIsLoading(true);
    try {
      await auth.signOut().then(() => {
        setIsLoading(false);
        navigation.push("Login");
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgb(11,20,27)" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <View style={{ width: "70%" }}>
          <TouchableOpacity
            onPress={SingOut}
            style={{
              width: "100%",
              height: 50,
              borderRadius: 20,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(31,67,200,0.7)",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 500, color: "white" }}>
              Çıkış Yap
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "70%" }}>
          <TouchableOpacity
            onPress={() => navigation.push("ForgotPassword")}
            style={{
              width: "100%",
              height: 50,
              borderRadius: 20,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(31,67,200,0.7)",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 500, color: "white" }}>
              Şifre değiştir
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: 400,
            height: 500,
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 20,
          }}
        >
          <WatchList />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
