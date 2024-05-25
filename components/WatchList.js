import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import {
  doc,
  getDocs,
  updateDoc,
  collection,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { SegmentedButtons } from "react-native-paper";
import { db } from "../Firebase";
import { MaterialIcons } from "@expo/vector-icons";
import Loading from "../components/Loading";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function WatchList({ userId }) {
  const [watch, setWatch] = useState([]);
  const [watch2, setWatch2] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fdata, setFdata] = useState([]);
  const [selectedId, setSelectedId] = useState(1);
  const [numColumns, setNumColumns] = useState(1);

  const getHisse = async () => {
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
          console.error("hisse geçersiz veya mevcut değil");
        }
      } else {
        console.error("querySnapshot yineleyici ya da tanımsız");
      }
    } catch (error) {
      console.error("Veri alma hatası 1:", error);
    }
  };
  const getDoviz = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "Data"));
      const fetchedDataaa = [];
      querySnapshot.forEach((doc) => {
        fetchedDataaa.push(doc.data());
      });
      //console.log(fetchedDataaa[0].response);
      setData(fetchedDataaa[0]);
    } catch (error) {
      console.error("Veri alma hatası 2:", error);
    }
  };
  //const target2 = ffdataArray.filter((item) => ara.includes(item));
  const [target2, setTarget2] = useState([]);
  const [target, setTarget] = useState([]);

  //! çözüldü
  const getData = async (userId) => {
    if (!userId) {
      console.error("Geçersiz userId:", userId);
      return;
    }

    setIsLoading(true);
    try {
      const docRef = doc(db, "WatchList", userId);

      // Dökümanın verilerini almak
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Döküman verileri:", docSnap.data());
      } else {
        console.log("Döküman bulunamadı!");
      }

      console.log("querySnapshot:", docSnap); // querySnapshot'ı kontrol edin

      if (docSnap.empty) {
        console.error("Boş querySnapshot");
        setIsLoading(false);
        return;
      }

      const newData = docSnap.data();
      console.log("newData:", newData.Hisse);

      if (newData.length === 0) {
        console.error("Veri mevcut değil");
        setIsLoading(false);
        return;
      }
      if (selectedId == 1) {
        if (Array.isArray(newData.Hisse)) {
          setWatch(newData.Hisse);
          setTarget([]);
          const watchSet = new Set(newData.Hisse.map((item) => item));
          console.log("watchSet:", watchSet);

          const newItems = fdata.filter((item) => watchSet.has(item.code));
          console.log("newItems h:", newItems);

          setTarget((prevTarget) => {
            const prevCodesSet = new Set(prevTarget.map((item) => item.code));
            const itemsToAdd = newItems.filter(
              (item) => !prevCodesSet.has(item.code)
            );
            return [...prevTarget, ...itemsToAdd];
          });
        } else {
          console.error("Hisse verisi geçersiz veya mevcut değil");
        }
      } else {
        if (Array.isArray(newData.Doviz)) {
          setWatch2(newData.Doviz);
          setTarget2([]);
          const watchSet = newData.Doviz.map((item) => item);
          console.log("watchSet:", watchSet);

          const financeDataaa = data.financeArray;
          const newItems = financeDataaa.filter((item) =>
            watchSet.includes(item.Code)
          );
          console.log("newItems d:", newItems);

          setTarget2((prevTarget) => {
            const prevCodesSet = new Set(prevTarget.map((item) => item.code));
            const itemsToAdd = newItems.filter(
              (item) => !prevCodesSet.has(item.code)
            );
            return [...prevTarget, ...itemsToAdd];
          });
        } else {
          console.error("Doviz verisi geçersiz veya mevcut değil");
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.log("Veri alma hatası:", error);
      setIsLoading(false);
    }
  };

  //todo------------------

  const HisseSil = async (target, userId) => {
    setIsLoading(true);

    // Belge referansını tanımlayın
    const docRef = doc(db, "WatchList", userId);
    //console.log(target);

    try {
      // Mevcut belge verilerini alın
      const docSnapshot = await getDoc(docRef);
      let existingData = {};

      if (docSnapshot.exists()) {
        existingData = docSnapshot.data();
      }

      // Mevcut döviz verilerini alın
      let existingDoviz = existingData.Hisse || [];
      // Gelen target kodunun mevcut döviz verileri ile eşleşmesini kontrol edin
      const targetCode = target.code;
      const indexToRemove = existingDoviz.findIndex(
        (doviz) => doviz === targetCode
      );
      console.log(existingDoviz);

      if (indexToRemove !== -1) {
        // Mevcut döviz verilerinden hedef kodu çıkarın
        existingDoviz.splice(indexToRemove, 1);

        // Güncellenmiş döviz verilerini belgeye güncelleyin
        await updateDoc(docRef, { Hisse: existingDoviz });

        console.log("Hedef kodu mevcut döviz verilerinden başarıyla silindi.");

        getData(userId);
        getHisse();
      } else {
        console.log("Hedef kod mevcut döviz verileri arasında bulunamadı.");
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Belgeyi güncellerken hata oluştu:", error);
      setIsLoading(false);
    }
  };
  //!doviz sil
  const DovizSil = async (target, userId) => {
    setIsLoading(true);

    // Belge referansını tanımlayın
    const docRef = doc(db, "WatchList", userId);
    //console.log(target);

    try {
      // Mevcut belge verilerini alın
      const docSnapshot = await getDoc(docRef);
      let existingData = {};

      if (docSnapshot.exists()) {
        existingData = docSnapshot.data();
      }

      // Mevcut döviz verilerini alın
      let existingDoviz = existingData.Doviz || [];
      // Gelen target kodunun mevcut döviz verileri ile eşleşmesini kontrol edin
      const targetCode = target.Code;
      console.log(targetCode);

      const indexToRemove = existingDoviz.findIndex(
        (doviz) => doviz === targetCode
      );
      console.log(existingDoviz);

      if (indexToRemove !== -1) {
        // Mevcut döviz verilerinden hedef kodu çıkarın
        existingDoviz.splice(indexToRemove, 1);

        // Güncellenmiş döviz verilerini belgeye güncelleyin
        await updateDoc(docRef, { Doviz: existingDoviz });

        console.log("Hedef kodu mevcut döviz verilerinden başarıyla silindi.");

        getData(userId);
        getDoviz();
      } else {
        console.log("Hedef kod mevcut döviz verileri arasında bulunamadı.");
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Belgeyi güncellerken hata oluştu:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Bir saniyede bir fonksiyonları çağıracak setInterval fonksiyonu oluşturun

    getData(userId);
    if (selectedId === 1) {
      getHisse();
    } else {
      getDoviz();
    }
  }, [selectedId, userId]);

  //todo güncelleneblmesi için burada kod değerlerini tut ve bu kod değerleri ile eşleşenleri
  //todo ana firestore databaseinden çek ve güncelleme işlemini button ile sağla
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            getData(userId);
            getHisse();
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgb(14,239,158)",
            borderRadius: 20,
            width: 150,
            height: 30,
          }}
        >
          <Text
            style={{
              color: "rgb(28,37,44)",
              fontSize: 15,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            İzleme Listesi
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
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
                backgroundColor: selectedId === "1" ? "gray" : "rgb(27,38,44)",
              },
            },
            {
              value: "2",
              label: "Döviz",
              labelStyle: {
                color: selectedId === "2" ? "white" : "gray",
              },
              style: {
                backgroundColor: selectedId === "2" ? "gray" : "rgb(27,38,44)",
              },
            },
          ]}
          density="regular"
          style={{ width: 300, marginVertical: 15 }}
        />
      </View>

      {!isLoading ? (
        selectedId == 1 ? ( //??? bunu tutmamın sebebi button ile ilme işlemini yapmak için ayrı bir flatlist olsun
          <FlatList
            style={{}}
            data={target}
            keyExtractor={(item, index) => index.toString()} // keyExtractor düzeltildi
            numColumns={1}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onLongPress={() => HisseSil(item, userId)}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "rgb(28,37,44)",
                      borderRadius: 20,
                      paddingVertical: 20,
                      paddingLeft: 20,
                      paddingRight: 10,
                      marginVertical: 10,
                      marginHorizontal: 20,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <View style={{ width: "35%" }}>
                      <Text
                        style={{
                          color: "rgb(239, 108, 0)",
                          fontSize: 24,
                          fontWeight: 700,
                          marginBottom: 0,
                        }}
                      >
                        {item.code}
                      </Text>
                      <Text
                        style={{
                          color: "rgb(33, 150, 243)",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        {item.time}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "30%",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            color: "rgb(255, 1004, 129)",
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          Fiyat: {item.lastpricestr}
                        </Text>
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
                    <View
                      style={{
                        width: "35%",
                        paddingLeft: 10,
                        paddingVertical: 5,
                        borderRadius: 10,
                        backgroundColor:
                          item.rate > 0
                            ? "rgba(0, 255, 0,0.1)"
                            : item.rate == 0
                            ? "rgba(125, 125, 125,0.1)"
                            : "rgba(255, 0, 0,0.1)",
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
                        <Text
                          style={{
                            color:
                              item.rate > 0
                                ? "rgb(0, 255, 0)"
                                : item.rate == 0
                                ? "rgb(125, 125, 125)"
                                : "rgb(255, 0, 0)",
                            fontSize: 32,
                            fontWeight: 300,
                          }}
                        >
                          {"%" + Math.abs(item.rate)}
                        </Text>
                        <Text>
                          {item.rate > 0 ? (
                            <MaterialIcons
                              name="arrow-drop-up"
                              size={28}
                              color="rgb(0, 255, 0)"
                            />
                          ) : item.rate == 0 ? (
                            <MaterialIcons
                              name="arrow-left"
                              size={28}
                              color="rgb(125, 125, 125)"
                            />
                          ) : (
                            <MaterialIcons
                              name="arrow-drop-down"
                              size={28}
                              color="rgb(255, 0, 0)"
                            />
                          )}
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
                <TouchableOpacity onLongPress={() => DovizSil(item, userId)}>
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
                        if (degisim > 0) return "rgba(0, 255, 0,0.5)";
                        if (degisim === 0) return "rgba(125, 125, 125,0.5)";
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
                            if (degisim > 0) return "rgb(0, 255, 0)";
                            if (degisim === 0) return "rgb(125, 125, 125)";
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
        <Loading text={"yükleniyor..."} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
