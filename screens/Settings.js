import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../Firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import WatchList from "../components/WatchList";
import Loading from "../components/Loading";

export default function Settings({ navigation, route }) {
  const { user } = route.params;

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
        <Loading text={"Çıkış Yapılıyor..."} />
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
        <Text style={{ color: "white" }}>USER : {user.email}</Text>
        <Text style={{ color: "white" }}>USER ID: {user.uid}</Text>
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
