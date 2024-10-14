import { StyleSheet, Text, View, Pressable } from "react-native";
import Modal from "react-native-modal";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { SegmentedButtons } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db } from "../Firebase";
import {
  collection,
  getDocs,
  updateDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import Loading from "../components/Loading";
import { Searchbar } from "react-native-paper";

export default function Search({ route }) {
  const { userId } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [ara, setAra] = useState("");
  const [fdata, setFdata] = useState([]);
  const [ffdata, setFfdata] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [selectedId, setSelectedId] = useState(1);
  const [numColumns, setNumColumns] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const text = "Arayınız...";

  //! hisse senedi veri alma işlemi

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

  //!döviz veri alma işlemi

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
        if (newData.length > 0 && newData[0].financeArray) {
          setFfdata(newData[0].financeArray);
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

  //? aranan verileri filtreleme işlemi  ----------------------------

  const target = fdata.filter(
    (item) => ara.includes(item.code) || ara.includes(item.text)
  );

  let filteredData = [];
  if (ffdata) {
    filteredData = ffdata.filter((item) => {
      return item.Code === ara;
    });
  }

  //?------------------------------------------------------

  const target2 = filteredData;

  //! izleme listesine hisse ekleme

  const HisseEkle = async (target) => {
    setIsLoading(true);

    // Belge referansını tanımlayın
    const docRef = doc(db, "WatchList", userId);

    try {
      // Mevcut belge verilerini alın
      const docSnapshot = await getDoc(docRef);
      let existingData = {};

      if (docSnapshot.exists()) {
        existingData = docSnapshot.data();
      } else {
        // Belge mevcut değilse, yeni bir belge oluşturun
        await setDoc(docRef, { Hisse: [], Doviz: [] });
        existingData = { Hisse: [], Doviz: [] };
      }

      // Mevcut döviz verilerini alın
      let existingDoviz = existingData.Hisse || [];
      // Gelen target bilgisinin mevcut döviz verileri ile eşleşmesini kontrol edin
      console.log(existingDoviz);
      const targetCode = target[0].code;
      console.log(targetCode);
      const isExisting = existingDoviz.some((doviz) => doviz === targetCode);

      if (!isExisting) {
        // Eğer target kodu mevcut döviz verileri arasında yoksa, ekleyin
        const updatedDoviz = [...existingDoviz, targetCode];

        // Güncellenmiş döviz verilerini belgeye güncelleyin
        await updateDoc(docRef, { Hisse: updatedDoviz });

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

  //!izleme listesine döviz ekleme

  const DovizEkle = async (target) => {
    setIsLoading(true);

    // Belge referansını tanımlayın
    const docRef = doc(db, "WatchList", userId);

    try {
      // Mevcut belge verilerini alın
      const docSnapshot = await getDoc(docRef);
      let existingData = {};

      if (docSnapshot.exists()) {
        existingData = docSnapshot.data();
      } else {
        // Belge mevcut değilse, yeni bir belge oluşturun
        await setDoc(docRef, { Hisse: [], Doviz: [] });
        existingData = { Hisse: [], Doviz: [] };
      }

      // Mevcut döviz verilerini alın
      let existingDoviz = existingData.Doviz || [];
      // Gelen target bilgisinin mevcut döviz verileri ile eşleşmesini kontrol edin
      const targetCode = target;
      const isExisting = existingDoviz.some((doviz) => doviz === targetCode);

      if (!isExisting) {
        // Eğer target kodu mevcut döviz verileri arasında yoksa, ekleyin
        const updatedDoviz = [...existingDoviz, targetCode];

        // Güncellenmiş döviz verilerini belgeye güncelleyin
        await updateDoc(docRef, { Doviz: updatedDoviz });

        console.log("Başarılı döviz güncelleme.");
      } else {
        alert("Bu kod zaten mevcut döviz verileri arasında.");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Döviz güncellerken hata oluştu:", error);
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
          <Searchbar
            placeholder="Arayınız..."
            placeholderTextColor={"gray"}
            loading={false}
            style={{
              backgroundColor: "rgb(27,38,44)",
              width: "65%",
              margin: 10,
              height: 55,
              borderRightWidth: 1,
              borderLeftWidth: 1,
              borderTopWidth: 0,
              borderBottomWidth: 5,
              borderColor: "rgba(31,67,200,0.7)",
            }}
            color="white"
            elevation={5}
            rippleColor={"gray"}
            onChangeText={(text) => {
              setAra(text.toUpperCase());
            }}
            value={ara}
          />

          <TouchableOpacity
            style={{
              backgroundColor: "rgb(14,239,158)",
              width: 75,
              height: 50,
              borderRadius: 25,
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
          <SegmentedButtons
            value={selectedId}
            onValueChange={setSelectedId}
            buttons={[
              {
                value: "1",
                label: "Hisse senedi",
                labelStyle: {
                  color: selectedId === "1" ? "white" : "gray",
                },
                style: {
                  backgroundColor:
                    selectedId === "1" ? "gray" : "rgb(27,38,44)",
                },
              },
              {
                value: "2",
                label: "Döviz",
                labelStyle: {
                  color: selectedId === "2" ? "white" : "gray",
                },
                style: {
                  backgroundColor:
                    selectedId === "2" ? "gray" : "rgb(27,38,44)",
                },
              },
            ]}
            density="regular"
            style={{ width: 300, marginVertical: 15 }}
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
              const degisimStr = item.Değişim;
              const degisim = degisimStr
                ? parseFloat(degisimStr.replace(/,/g, ".").replace(/%/g, ""))
                : null;
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
                      borderWidth: 1,
                      borderColor: (() => {
                        if (degisim > 0) {
                          return "rgba(0, 255, 0,0.5)";
                        }
                        if (degisim === 0) {
                          return "rgba(125, 125, 125,0.5)";
                        }
                        return "rgba(255, 0, 0,0.5)";
                      })(),
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: item.Tür == "Altın" ? 18 : 28,
                          fontWeight: 900,
                          marginBottom: 5,
                          textAlign: "center",
                        }}
                      >
                        {item.Code}
                      </Text>
                      <View
                        style={{
                          width: 130,
                          borderWidth: 1,
                          borderColor: "rgb(39, 57, 79)",
                        }}
                      />
                      <Text
                        style={{
                          color: "rgb(255, 1004, 129)",
                          fontSize: 18,
                          fontWeight: 400,
                        }}
                      >
                        Alış: {item.Alış}
                      </Text>
                      <Text
                        style={{
                          color: "rgb(33, 150, 243)",
                          fontSize: 18,
                          fontWeight: 400,
                        }}
                      >
                        Satış: {item.Satış}
                      </Text>
                      <View
                        style={{
                          width: 130,
                          borderWidth: 1,
                          borderColor: "rgb(39, 57, 79)",
                        }}
                      />
                      <Text
                        style={{
                          color: (() => {
                            if (degisim > 0) {
                              return "rgb(0, 255, 0)";
                            }
                            if (degisim === 0) {
                              return "rgb(125, 125, 125)";
                            }
                            return "rgb(255, 0, 0)";
                          })(),
                          fontSize: 16,
                          fontWeight: "300", // Font weight should be a string
                        }}
                      >
                        Değişim: {item.Değişim.replace(/-|%/g, "")}
                      </Text>

                      <View
                        style={{
                          width: 130,
                          borderWidth: 1,
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
                        Tür: {item.Tür}
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
      {/* //!modalı özelleştir */}
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={toggleModal}
        onBackdropPress={toggleModal}
        swipeDirection="down"
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          margin: 0,
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(27,38,44,1)",
            borderRadius: 20,
            height: 400,
            width: "100%",
            padding: 35,
            justifyContent: "center",
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
          <View
            style={{
              backgroundColor: "gray",
              position: "absolute",
              top: 0,
              borderRadius: 20,
              margin: 10,
              height: 4,
              width: 40,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          ></View>
          <Text
            style={{
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {selectedId == 1 ? (
                target.length > 0 ? (
                  <Text>{target[0].code} Hissesini izleme listesine ekle</Text>
                ) : (
                  "yok"
                )
              ) : target2.length > 0 ? (
                <Text>{target2[0].Code} Dovizini izleme listesine ekle</Text>
              ) : (
                "yok"
              )}
            </Text>
          </Text>
          <Pressable
            style={{
              borderRadius: 20,
              padding: 10,
              elevation: 2,
              backgroundColor: "#2196F3",
            }}
            onPress={() =>
              selectedId == 1 ? HisseEkle(target) : DovizEkle(target2[0].Code)
            }
          >
            <Text style={styles.textStyle}>
              {selectedId == 1 ? (
                target.length > 0 ? (
                  <Text>{target[0].code}</Text>
                ) : (
                  "yok"
                )
              ) : target2.length > 0 ? (
                target2[0].Code
              ) : (
                "yok"
              )}
            </Text>
          </Pressable>

          <Pressable
            style={{
              backgroundColor: "#2196F3",
              padding: 10,
              borderRadius: 20,
              marginTop: 20,
            }}
            onPress={toggleModal}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Gizle
            </Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
//todo bottom sheet modal
//? buradan bir watch list oluştur ve firebase gönder oradanda useffeck ile çek
//! güncel olması için birşeyler bull

const styles = StyleSheet.create({});
