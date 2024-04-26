import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ActivityIndicator,
  ScrollView, //ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Hr from "react-native-hr-plus";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../Firebase";
import Loading from "../components/Loading";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const text = "Giriş yapılıyor...";
  // const showtoast = () => {
  //   ToastAndroid.show("başarılı", ToastAndroid.LONG);
  // };
  if (isLoading) {
    return <Loading text={text} />;
  }
  const SingIn = async () => {
    setIsLoading(true);
    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          setIsLoading(false);
          navigation.push("MainScreen");
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
            flex: 7,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../img/Borsa3.png")}
            style={{
              width: 250,
              height: 250,
            }}
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
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            placeholderTextColor={"rgba(148,147,152,1)"}
            style={{
              width: "70%",
              maxWidth: 550,

              padding: 15,
              margin: 10,
              borderRadius: 15,
              color: "white",
              backgroundColor: "rgba(27,38,44,1)",
            }}
          />
          <TextInput
            placeholder="Şifre"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry
            placeholderTextColor={"rgba(148,147,152,1)"}
            style={{
              width: "70%",
              maxWidth: 550,
              margin: 10,
              padding: 15,
              borderRadius: 15,
              color: "white",
              backgroundColor: "rgba(27,38,44,1)",
            }}
          />
          <View
            style={{
              width: "70%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.push("ForgotPassword");
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  color: "rgba(50,100,200,0.7)",
                }}
              >
                Şifrenizi mi unuttunuz?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flex: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              width: "70%",
            }}
          >
            <TouchableOpacity
              onPress={SingIn}
              style={{
                width: "100%",
                maxWidth: 550,
                height: 50,
                borderRadius: 20,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(31,67,200,0.7)",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 500, color: "white" }}>
                Giriş
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "70%",
              maxWidth: 550,

              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.push("Register");
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  color: "rgba(50,100,200,0.7)",
                }}
              >
                Bir hesabınız yokmu ? Kayıt Ol
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "70%", maxWidth: 550, marginVertical: 10 }}>
            <Hr color="rgba(148,147,152,1)" width={2}>
              <Text style={{ color: "white", margin: 15 }}>VEYA</Text>
            </Hr>
          </View>
          <View style={{ width: "70%", maxWidth: 550 }}>
            <TouchableOpacity
              style={{
                height: 50,
                borderRadius: 20,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(27,38,44,1)",
              }}
            >
              <Image
                source={require("../img/Google.png")}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>

            {/* //todo:facebook bağlantısı eklenirse kullanılabilir
            <Pressable
              style={{
                padding: 10,
                borderRadius: 20,
                width: "34%",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(15,10,70,1)",
              }}
            >
              <Image
                source={require("../img/Facebook.png")}
                style={{ width: 35, height: 35 }}
              />
            </Pressable> */}
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
    backgroundColor: "rgba(11,20,27,1)",
  },
});
