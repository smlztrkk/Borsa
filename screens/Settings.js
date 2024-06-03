import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  Pressable,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../Firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db } from "../Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Settings({ navigation, route }) {
  const { userId } = route.params;
  const { userEmail } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [secilenFotoIndex, setSecilenFotoIndex] = useState("");

  const profilFotograflari = [
    require("../img/man.jpeg"),
    require("../img/man0.jpeg"),
    require("../img/man1.jpeg"),
    require("../img/man2.jpeg"),
    require("../img/woman.jpeg"),
    require("../img/woman0.jpeg"),
    require("../img/woman1.jpeg"),
    // Diğer resimleriniz...
  ];

  useEffect(() => {
    const fetchProfilFotoIndex = async () => {
      try {
        const docRef = doc(db, "Profil", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.profilFotoIndex !== undefined) {
            setSecilenFotoIndex(data.profilFotoIndex);
          }
        } else {
          setSecilenFotoIndex(0);
        }
      } catch (error) {
        console.error("Profil fotoğrafı indexi çekilirken hata oluştu:", error);
      }
    };

    fetchProfilFotoIndex();
  }, [userId, secilenFotoIndex]);

  const SingOut = async () => {
    setIsLoading(true);
    try {
      await auth.signOut();
      try {
        const userDocRef = doc(db, "users", "ZsoGUB26cuqmbKfym02t");
        setDoc(userDocRef, {
          uid: "",
          password: "",
          email: "",
        });
        console.log("Kullanıcı bilgileri Firestore'a eklendi.");
      } catch (firestoreError) {
        console.error("Firestore'a veri yazma hatası:", firestoreError);
      }
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <Pressable
      onPress={() => {
        setModalVisible(!modalVisible);
        handleProfilFotografiSec(index); // Seçilen fotoğrafın indexini güncelle
      }}
    >
      <Image
        source={item}
        style={{
          width: 150,
          height: 150,
          borderRadius: 75,
          margin: 10, // Resimler arası boşluk ekledik
        }}
      />
    </Pressable>
  );

  const handleProfilFotografiSec = async (secilenFotoIndex) => {
    try {
      if (
        secilenFotoIndex >= 0 &&
        secilenFotoIndex < profilFotograflari.length
      ) {
        // Firestore'da "Profil" dokümanını bulun veya oluşturun
        const docRef = doc(db, "Profil", userId);

        // Profil fotoğrafı indexini Firestore'a kaydedin
        await setDoc(
          docRef,
          { profilFotoIndex: secilenFotoIndex },
          { merge: true }
        );

        console.log("Profil fotoğrafı indexi başarıyla kaydedildi.");

        // Seçilen fotoğrafı profil fotoğrafı olarak ayarla
        setSecilenFotoIndex(secilenFotoIndex);
      } else {
        console.warn("Geçersiz profil fotoğrafı indexi:", index);
      }
    } catch (error) {
      console.error(
        "Profil fotoğrafı indexi kaydedilirken hata oluştu:",
        error
      );
    }
  };

  const KullaniciSil = async () => {
    const user = auth.currentUser;
    try {
      user.delete();
      console.log("Hesap Silindi", "Hesabınız başarıyla silindi.");

      navigation.navigate("Login");
    } catch (error) {
      console.error("Hesap silme hatası:", error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgb(11,20,27)" }}>
      <View
        style={{
          flex: 1,
          paddingTop: 30,
          alignItems: "center",
          gap: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 50,
          }}
        >
          <TouchableOpacity
            onLongPress={() => {
              setModalVisible(true);
            }}
          >
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            >
              <Image
                source={profilFotograflari[secilenFotoIndex]}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
              />
            </View>
          </TouchableOpacity>

          <View style={{ gap: 10 }}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: 900 }}>
              {userEmail}
            </Text>
            <Text style={{ color: "gray", fontSize: 10 }}>
              USER ID: {userId}
            </Text>
          </View>
        </View>

        <View style={{ width: "70%" }}>
          <TouchableOpacity
            onPress={SingOut}
            style={{
              width: "100%",
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
                Çıkış Yap
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={{ width: "70%" }}>
          <TouchableOpacity
            onPress={() => navigation.push("ForgotPassword")}
            style={{
              width: "100%",
              height: 50,
              borderRadius: 15,
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
        <View style={{ width: "70%" }}>
          <TouchableOpacity
            onPress={() => KullaniciSil()}
            style={{
              width: "100%",
              height: 50,
              borderRadius: 15,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255,0,0,0.7)",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 500, color: "white" }}>
              Hesabı Sil
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(11,20,27,0.5)",
          }}
          onPress={() => setModalVisible(!modalVisible)}
        ></Pressable>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            top: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              margin: 10,
              backgroundColor: "rgba(27,38,44,1)",
              borderRadius: 20,
              padding: 25,
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <FlatList
              data={profilFotograflari}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2} // 2 sütunlu görünüm için
              horizontal={false} // Yatay kaydırmayı devre dışı bıraktık
              extraData={secilenFotoIndex}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
