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
          backgroundColor: "rgba(15,10,40,1)",
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgb(12, 37, 65)" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
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
              backgroundColor: "rgba(31,67,200,1)",
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
              backgroundColor: "rgba(31,67,200,1)",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 500, color: "white" }}>
              Şifre değiştir
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
