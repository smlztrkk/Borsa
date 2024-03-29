import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../Firebase";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
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
          Eposta Gönderiliyor...
        </Text>
      </SafeAreaView>
    );
  }
  const showtoast = () => {
    ToastAndroid.show(
      "Sıfırlama epostası başarılı bir şekilde gönderildi",
      ToastAndroid.LONG
    );
  };
  const ResetPassword = async () => {
    setIsLoading(true);
    try {
      await auth.sendPasswordResetEmail(email).then(() => {
        setIsLoading(false);
        navigation.push("Login");
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <SafeAreaView style={styles.mainview}>
      <ScrollView>
        <View style={{ width: "70%", marginTop: 20, marginLeft: "10%" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.push("Login");
            }}
          >
            <Ionicons
              name="arrow-back-circle-outline"
              size={32}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 7,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Image
            source={require("../img/Borsa3.png")}
            style={{ width: 250, height: 250 }}
          />
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
            margin: 20,
          }}
        >
          <Text style={{ fontSize: 32, fontWeight: 900, color: "white" }}>
            ŞİFRE SIFIRLA
          </Text>
        </View>
        <View
          style={{
            flex: 5,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            placeholderTextColor={"rgba(148,147,152,1)"}
            style={{
              width: "70%",
              padding: 15,
              margin: 10,
              borderRadius: 20,
              color: "white",
              backgroundColor: "rgba(15,10,70,1)",
            }}
          />
        </View>

        <View
          style={{
            flex: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View style={{ width: "70%" }}>
            <TouchableOpacity
              onPress={ResetPassword}
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
                Gönder
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "rgba(15,10,40,1)",
  },
});
