import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db } from "../Firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import Loading from "../components/Loading";
import RadioGroup from "react-native-radio-buttons-group";

export default function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [ara, setAra] = useState("");
  const [fdata, setFdata] = useState([]);
  const [ffdata, setFfdata] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [numColumns, setNumColumns] = useState(1);
  const text = "Arayınız...";
  const radioButtons = useMemo(
    () => [
      {
        id: "1", // acts as primary key, should be unique and non-empty string
        label: "Hisse senedi",
        value: "Hisse",
      },
      {
        id: "2",
        label: "Döviz",
        value: "Döviz",
      },
    ],
    []
  );
  const getData = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "Hisse"));
      if (querySnapshot && typeof querySnapshot.forEach === "function") {
        const newData = [];
        querySnapshot.forEach((doc) => {
          newData.push(doc.data());
        });

        // newData[0].responseData'nın varlığını ve doğru bir dizi olduğunu kontrol edin
        if (newData.length > 0 && Array.isArray(newData[0].responseData)) {
          setFdata(newData[0].responseData);
          setIsLoading(false);
        } else {
          console.error("responseData geçersiz veya mevcut değil");
        }
      } else {
        console.error("querySnapshot yineleyici ya da tanımsız");
      }
    } catch (error) {
      console.error("Veri alma hatası:", error);
    }
  };
  const getFinanceData = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "Data"));
      if (querySnapshot && typeof querySnapshot.forEach === "function") {
        const newData = [];
        querySnapshot.forEach((doc) => {
          newData.push(doc.data());
        });

        // newData[0].responseData'nın varlığını ve doğru bir dizi olduğunu kontrol edin
        if (newData.length > 0 && newData[0].response) {
          setFfdata(newData[0].response);
          //console.log(newData[0].response);
          setIsLoading(false);
        } else {
          console.error("response geçersiz veya mevcut değil");
        }
      } else {
        console.error("querySnapshot yineleyici ya da tanımsız");
      }
    } catch (error) {
      console.error("Veri alma hatası:", error);
    }
  };
  useEffect(() => {
    getData();
    getFinanceData();
  }, []);
  const target = fdata.filter(
    (item) => ara.includes(item.code) || ara.includes(item.text)
  );

  //const target2 = ffdataArray.filter((item) => ara.includes(item));
  let filteredData = [];
  if (ffdata) {
    filteredData = Object.entries(ffdata).filter(([key, value]) => {
      return key === ara;
    });
  }
  const target2 = filteredData;
  //console.log(target2[0]);
  //console.log(selectedId);
  //todo arama kısmını ve görünümü düzelt
  const HisseEkle = async (target) => {
    setIsLoading(true);

    // Belge referansını tanımlayın
    const docRef = doc(db, "Portfolio", "p2EkbErmx4HtU922yB2b");

    try {
      // Mevcut belge verilerini alın
      const docSnapshot = await getDoc(docRef);
      let existingData = {};

      if (docSnapshot.exists()) {
        existingData = docSnapshot.data();
      }

      // Mevcut döviz verilerini alın
      let existingDoviz = existingData.Döviz || [];
      // Gelen target bilgisinin mevcut döviz verileri ile eşleşmesini kontrol edin
      console.log(existingDoviz);
      const targetCode = target[0].code;
      console.log(targetCode);
      const isExisting = existingDoviz.some((doviz) => doviz === targetCode);

      if (!isExisting) {
        // Eğer target kodu mevcut döviz verileri arasında yoksa, ekleyin
        const updatedDoviz = [...existingDoviz, targetCode];

        // Güncellenmiş döviz verilerini belgeye güncelleyin
        await updateDoc(docRef, { Döviz: updatedDoviz });

        console.log("Başarılı hisse güncelleme.");
      } else {
        alert("Bu kod zaten mevcut hisse verileri arasında.");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Belgeyi güncellerken hata oluştu:", error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "rgb(11,20,27)",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextInput
            onChangeText={(text) => {
              setAra(text.toUpperCase());
            }}
            style={{
              width: "60%",
              height: 50,
              margin: 10,
              paddingLeft: 10,
              borderRadius: 10,
              backgroundColor: "rgb(27,38,44)",
              color: "white",
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "rgb(14,239,158)",
              width: 75,
              height: 50,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              getData();
              getFinanceData();
            }}
          >
            <Text>Yenile</Text>
          </TouchableOpacity>
        </View>
        <View>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={setSelectedId}
            selectedId={selectedId}
            labelStyle={{ color: "white" }}
            layout="row"
          />
        </View>
      </View>
      {!isLoading && ara.length > 0 ? (
        selectedId == 1 ? (
          <FlatList
            style={{}}
            data={target}
            keyExtractor={(item, index) => index.toString()} // keyExtractor düzeltildi
            numColumns={numColumns}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onLongPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "rgb(27,38,44)",
                      borderRadius: 25,
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                      marginVertical: 10,
                      marginHorizontal: 20,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <View style={{ width: "50%" }}>
                      <Text
                        style={{
                          color: "rgb(239, 108, 0)",
                          fontSize: 24,
                          fontWeight: 700,
                          marginBottom: 5,
                        }}
                      >
                        {item.code}
                      </Text>
                      <Text
                        style={{
                          color: "rgb(144, 164, 174)",
                          fontSize: 16,
                          fontWeight: 700,
                        }}
                      >
                        {item.text}
                      </Text>
                      <Text
                        style={{
                          color: "rgb(255, 64, 129)",
                          fontSize: 16,
                          fontWeight: 300,
                        }}
                      >
                        Fiyat: {item.lastpricestr}
                      </Text>
                      <Text
                        style={{
                          color: "rgb(0, 150, 150)",
                          fontSize: 12,
                          fontWeight: 400,
                        }}
                      >
                        Hacim: {item.hacimstr}
                      </Text>
                      <Text
                        style={{
                          color: "rgb(33, 150, 243)",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        Güncellenme zamanı: {item.time}
                      </Text>
                    </View>
                    <View style={{ width: "30%" }}>
                      <Text
                        style={{
                          textAlign: "center",
                          color:
                            item.rate > 0 ? "rgb(0, 255, 0)" : "rgb(255, 0, 0)",
                          fontSize: 36,
                          fontWeight: 300,
                        }}
                      >
                        {"%" + item.rate}
                      </Text>
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            color: "rgb(144, 164, 174)",
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          Min: {item.minstr}
                        </Text>
                        <Text
                          style={{
                            color: "rgb(144, 164, 174)",
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          Max: {item.maxstr}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <FlatList
            style={{}}
            data={target2}
            keyExtractor={(item, index) => index.toString()} // keyExtractor düzeltildi
            numColumns={numColumns}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onLongPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "rgb(28,37,44)",
                      borderRadius: 15,
                      paddingHorizontal: 0,
                      paddingVertical: 10,
                      width: 170,
                      height: 170,
                      marginVertical: 10,
                      marginHorizontal: "27%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flex: 1, justifyContent: "space-around" }}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: item[1].Tür == "Altın" ? 18 : 28,
                          fontWeight: 900,
                          marginBottom: 5,
                          textAlign: "center",
                        }}
                      >
                        {item[0]}
                      </Text>
                      <View
                        style={{
                          width: 100,
                          borderWidth: 2,
                          borderColor: "rgb(39, 57, 79)",
                        }}
                      />
                      <Text
                        style={{
                          color: "green",
                          fontSize: 18,
                          fontWeight: 400,
                        }}
                      >
                        Alış: {item[1].Alış}
                      </Text>
                      <Text
                        style={{ color: "red", fontSize: 18, fontWeight: 400 }}
                      >
                        Satış: {item[1].Satış}
                      </Text>
                      <View
                        style={{
                          width: 100,
                          borderWidth: 2,
                          borderColor: "rgb(39, 57, 79)",
                        }}
                      />
                      <Text
                        style={{
                          color:
                            item[1].Değişim > 0
                              ? "rgb(0, 255, 0)"
                              : item.rate == 0
                              ? "rgb(125, 125, 125)"
                              : "rgb(255, 0, 0)",
                          fontSize: 16,
                          fontWeight: 300,
                        }}
                      >
                        Değişim: {item[1].Değişim}
                      </Text>
                      <View
                        style={{
                          width: 100,
                          borderWidth: 2,
                          borderColor: "rgb(39, 57, 79)",
                        }}
                      />
                      <Text
                        style={{
                          color: "orange",
                          fontSize: 12,
                          fontWeight: 700,
                          textAlign: "center",
                        }}
                      >
                        Tür: {item[1].Tür}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )
      ) : (
        <Loading text={text} />
      )}
      {/* //todo expo ile de dene */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(11,20,27,0.3)",
          }}
          onPress={() => setModalVisible(!modalVisible)}
        ></Pressable>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            top: 400,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: "rgba(27,38,44,0.8)",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "rgba(27,38,44,1)",
              borderRadius: 20,
              padding: 35,
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
            <Pressable
              style={{
                borderRadius: 20,
                padding: 10,
                elevation: 2,
                backgroundColor: "#2196F3",
              }}
              onPress={() => HisseEkle(target)}
            >
              <Text style={styles.textStyle}>
                {target.length > 0 ? target[0].code : "yok"}
              </Text>
            </Pressable>
          </View>
          <View></View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
//todo bottom sheet modal
//? buradan bir watch list oluştur ve firebase gönder oradanda useffeck ile çek
//! güncel olması için birşeyler bull

const styles = StyleSheet.create({});
