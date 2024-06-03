import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { db } from "../Firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Hr from "react-native-hr-plus";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../Firebase";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "users", "ZsoGUB26cuqmbKfym02t"); // Belge referansı
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      if (userData.email !== "") {
        await auth
          .signInWithEmailAndPassword(userData.email, userData.password)
          .then((userCredentials) => {
            navigation.push("MainScreen");
            setIsLoading(false);
          });
      } else {
        console.log("giriş yapan kullanıcı yok");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Veri çekme hatası:", error);
      setIsLoading(false);
    }
  };

  const SingIn = async () => {
    setIsLoading(true);
    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          try {
            const userDocRef = doc(db, "users", "ZsoGUB26cuqmbKfym02t");
            setDoc(userDocRef, {
              uid: user.uid,
              password: password,
              email: email,
            });
            console.log("Kullanıcı bilgileri Firestore'a eklendi.");
          } catch (firestoreError) {
            console.error("Firestore'a veri yazma hatası:", firestoreError);
          }
          navigation.push("MainScreen");

          setIsLoading(false);
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
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor={"rgba(148,147,152,1)"}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
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
          <TextInput
            placeholder="Şifre"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry
            placeholderTextColor={"rgba(148,147,152,1)"}
            onFocus={() => setIsFocused1(true)}
            onBlur={() => setIsFocused1(false)}
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
              isFocused1 && {
                borderBottomWidth: 7,
                borderColor: "rgba(31,67,200,0.7)",
              },
            ]}
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
                borderRadius: 15,
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
                    color={"rgba(31,200,200,1)"}
                    size={30}
                  />
                </View>
              ) : (
                <Text style={{ fontSize: 20, fontWeight: 500, color: "white" }}>
                  Giriş
                </Text>
              )}
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
                borderRadius: 15,
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
