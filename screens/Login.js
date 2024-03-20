import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Hr from "react-native-hr-plus";
export default function Login() {
  return (
    <SafeAreaView style={styles.mainview}>
      <ScrollView>
        <View
          style={{
            flex: 7,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../img/Borsa.png")}
            style={{ width: 300, height: 300 }}
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
            GİRİŞ YAP
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
            placeholderTextColor={"rgba(148,147,152,1)"}
            style={{
              width: "70%",
              padding: 20,
              margin: 10,
              borderRadius: 20,
              color: "white",
              backgroundColor: "rgba(9,28,51,1)",
            }}
          />
          <TextInput
            placeholder="Şifre"
            placeholderTextColor={"rgba(148,147,152,1)"}
            style={{
              width: "70%",
              margin: 10,
              padding: 20,
              borderRadius: 20,
              color: "white",
              backgroundColor: "rgba(9,28,51,1)",
            }}
          />
          <View
            style={{
              width: "70%",
            }}
          >
            <Pressable
              onPress={() => {
                navigate;
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  color: "blue",
                }}
              >
                zaten bir heabınız varmı ?
              </Text>
            </Pressable>
          </View>
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
            <Pressable
              style={{
                width: "100%",
                height: 50,
                borderRadius: 20,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(31,67,255,1)",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 500, color: "white" }}>
                Giriş
              </Text>
            </Pressable>
          </View>
          <View style={{ width: "70%" }}>
            <Hr color="white" width={1}>
              <Text style={{ color: "rgba(148,147,152,1)", margin: 15 }}>
                VEYA
              </Text>
            </Hr>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable
              style={{
                width: "34%",
                height: 50,
                borderRadius: 20,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(9,28,51,1)",
              }}
            >
              <Image
                source={require("../img/Google.png")}
                style={{ width: 25, height: 25 }}
              />
            </Pressable>
            <Pressable
              style={{
                padding: 10,
                borderRadius: 20,
                width: "34%",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(9,28,51,1)",
              }}
            >
              <Image
                source={require("../img/Facebook.png")}
                style={{ width: 35, height: 35 }}
              />
            </Pressable>
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
    backgroundColor: "rgba(12,37,65,1)",
  },
});
