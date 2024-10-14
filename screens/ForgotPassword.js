import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../Firebase";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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
        style={{
          height: 50,
          backgroundColor: "rgba(255, 50, 50,0.5)",
          padding: 10,
          borderLeftColor: "red",
        }}
        {...props}
        text1Style={{
          color: "white",
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
          height: 50,
          width: "100%",
          backgroundColor: "rgb(100, 255, 100)",
          padding: 5,
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
  //!şifre sıfırlama işlemi

  const ResetPassword = async () => {
    setIsLoading(true);
    try {
      await auth.sendPasswordResetEmail(email).then(() => {
        setIsLoading(false);
        Toast.show({
          type: "tomatoToast",
          text1: email + " Eposta adresine sıfırlama bağlantısı gönderildi",
          props: { uuid: "bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70" },
        });
      });
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
  };
  return (
    <SafeAreaView style={styles.mainview}>
      <ScrollView>
        <View
          style={{
            width: "10%",
            height: "7%",
            marginTop: 5,
            marginLeft: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
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
            marginTop: 50,
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
            marginTop: 50,
            marginBottom: 20,
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
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholderTextColor={"rgba(148,147,152,1)"}
            style={[
              {
                width: "70%",
                maxWidth: 550,
                paddingHorizontal: 20,
                paddingVertical: 10,
                margin: 10,
                borderRadius: 15,
                borderRightWidth: 1,
                borderLeftWidth: 1,
                borderTopWidth: 1,
                borderBottomWidth: 7,
                borderColor: "rgba(27,38,44,1)",
                color: "white",
                backgroundColor: "rgba(27,38,44,1)",
              },
              isFocused && {
                borderBottomWidth: 7,
                borderColor: "rgba(31,67,200,0.7)",
              },
            ]}
          />
        </View>

        <View
          style={{
            flex: 10,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: "70%" }}>
            <TouchableOpacity
              onPress={ResetPassword}
              style={{
                height: 50,
                borderRadius: 20,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(31,67,200,0.7)",
              }}
            >
              {isLoading ? (
                <View style={{}}>
                  <ActivityIndicator
                    animating={true}
                    color={"white"}
                    size={30}
                  />
                </View>
              ) : (
                <Text style={{ fontSize: 20, fontWeight: 500, color: "white" }}>
                  Gönder
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Toast visibilityTime={5000} config={toastConfig} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "rgba(11,20,27,1)",
  },
});
