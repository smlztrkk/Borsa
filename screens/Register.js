import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
  //ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Hr from "react-native-hr-plus";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../Firebase";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const text = "Kayıt ediliyor...";
  // const showtoast = () => {
  //   ToastAndroid.show("başarılı", ToastAndroid.LONG);
  // };

  if (isLoading) {
    return <Loading text={text} />;
  }
  const SingUp = async () => {
    setIsLoading(true);
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          setIsLoading(false);
          navigation.push("Login");
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
            source={require("../img/Borsa1.png")}
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
            KAYIT OL
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
              backgroundColor: "rgba(27,38,44,1)",
            }}
          />
          <TextInput
            placeholder="Şifre"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            placeholderTextColor={"rgba(148,147,152,1)"}
            style={{
              width: "70%",
              margin: 10,
              padding: 15,
              borderRadius: 20,
              color: "white",
              backgroundColor: "rgba(27,38,44,1)",
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
              onPress={SingUp}
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
                Kayıt
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "70%",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.push("Login");
              }}
            >
              <Text
                style={{
                  color: "rgba(50,100,200,0.7)",
                }}
              >
                Bir heabınız varmı ? Giriş Yap
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "70%", marginVertical: 10 }}>
            <Hr color="white" width={1}>
              <Text style={{ color: "rgba(148,147,152,1)", margin: 15 }}>
                VEYA
              </Text>
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
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
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
