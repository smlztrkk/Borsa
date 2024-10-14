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
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../Firebase";
import Loading from "../components/Loading";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);

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
          height: 40,
          width: "100%",
          backgroundColor: "rgb(100, 255, 100)",
          padding: 10,
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
  const googlSingUp = () => {
    Toast.show({
      type: "error",
      text1: "Yakında eklenecek",
      props: { uuid: "bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70" },
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  //!giriş yapılmış kullanıcıyı kontrol etme ve otomatik giriş

  const fetchUserData = async () => {
    setIsLoading1(true);
    try {
      const docRef = doc(db, "users", "ZsoGUB26cuqmbKfym02t"); // Belge referansı
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        // Eğer email varsa ve boş değilse giriş yap
        if (userData.email && userData.password) {
          const auth = getAuth(); // Firebase Auth nesnesini al
          await signInWithEmailAndPassword(
            auth,
            userData.email,
            userData.password
          );

          navigation.push("MainScreen");
        } else {
          console.log("Giriş yapacak kullanıcı bilgisi yok.");
        }
      } else {
        console.log("Belge bulunamadı.");
      }
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    } finally {
      setIsLoading1(false); // Yüklenme durumunu sonlandır
    }
  };

  //!giriş yapma işlemi

  const signIn = async () => {
    setIsLoading(true);

    try {
      // Firebase Auth ile giriş yapılıyor
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Firestore'a kullanıcı bilgilerini kaydetme
      try {
        const userDocRef = doc(db, "users", userCredentials.user.uid); // UID ile belge oluşturma
        await setDoc(userDocRef, {
          password: password,
          email: email,
          // Şifreyi burada saklamayın, güvenlik riski oluşturabilir
        });
        console.log("Kullanıcı bilgileri Firestore'a eklendi.");
      } catch (firestoreError) {
        console.error("Firestore'a veri yazma hatası:", firestoreError);
      }

      // Giriş başarılı olursa yönlendirme
      navigation.push("MainScreen");
    } catch (error) {
      console.error("Giriş hatası:", error.message);
      alert(error.message);
    } finally {
      setIsLoading(false); // Yüklenme durumu sona erer
    }
  };

  return isLoading1 ? (
    <Loading text={"Bekleyiniz..."} />
  ) : (
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
              onPress={() => signIn()}
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
                    color={"white"}
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "70%",
              marginVertical: 10,
              gap: 10,
            }}
          >
            <View
              style={{
                width: "35%",
                height: 0,
                borderWidth: 1,
                borderColor: "rgb(39, 57, 79)",
              }}
            />
            <Text style={{ color: "rgba(148,147,152,1)", margin: 15 }}>
              VEYA
            </Text>
            <View
              style={{
                width: "35%",
                height: 0,
                borderWidth: 1,
                borderColor: "rgb(39, 57, 79)",
              }}
            />
          </View>
          <View style={{ width: "70%", maxWidth: 550 }}>
            <TouchableOpacity
              onPress={() => googlSingUp()}
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
      <Toast visibilityTime={3000} config={toastConfig} />
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
