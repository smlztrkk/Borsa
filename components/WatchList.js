import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import {
  doc,
  getDocs,
  updateDoc,
  collection,
  getDoc,
} from "firebase/firestore";

import { db } from "../Firebase";
import { MaterialIcons } from "@expo/vector-icons";
import Loading from "../components/Loading";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function WatchList() {
  const [watch, setWatch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fdata, setFdata] = useState([]);
  const [ffdata, setFfdata] = useState([]);
  useEffect(() => {
    getData();
    getHisse();
    getDoviz();
  }, []); // `button` değişkenine bağlı olarak `useEffect` çalıştırılacak
  //? --------------- firebase ye kod kadet portfolioya ve bunu ana firesoterdan kodlar  ile çek search ekranında ana firestore verilerini fdata ile çekip filtreleme işlemi var
  //?---------------- sadece modal ile code gönder ve bunu burada portfoliodan çek filtrele
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
          console.error("responseData geçersiz veya mevcut değil");
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
      console.error("Veri alma hatası 2:", error);
    }
  };

  //const target2 = ffdataArray.filter((item) => ara.includes(item));
  let filteredData = [];
  if (ffdata) {
    filteredData = Object.entries(ffdata).filter(([key, value]) => {
      return key === watch;
    });
  }
  const target2 = filteredData;
  const [target, setTarget] = useState([]);
  const getData = async () => {
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "Portfolio"));
      if (querySnapshot && typeof querySnapshot.forEach === "function") {
        const newData = [];
        querySnapshot.forEach((doc) => {
          newData.push(doc.data());
        });
        // newData[0].responseData'nın varlığını ve doğru bir dizi olduğunu kontrol edin
        //console.log(newData[0].Döviz);
        if (newData.length > 0 && Array.isArray(newData[0].Döviz)) {
          //console.log(newData[0].Döviz);

          {
            /*const docRef = doc(db, "Portfolio", "p2EkbErmx4HtU922yB2b");
          const docSnapshot = await getDoc(docRef);
          let existingData = {};

          if (docSnapshot.exists()) {
            existingData = docSnapshot.data();
          }

          // Mevcut döviz verilerini alın
          let existingDoviz = existingData.Döviz[0].code || [];
          // Gelen target bilgisinin mevcut döviz verileri ile eşleşmesini kontrol edin
          const targetCode = newData[0].Döviz[0].code;
          const isExisting = existingDoviz.some(
            (doviz) => doviz === targetCode
          );

          if (!isExisting) {
            // Eğer target kodu mevcut döviz verileri arasında yoksa, ekleyin
            const updatedDoviz = [...existingDoviz, targetCode];

            // Güncellenmiş döviz verilerini belgeye güncelleyin
            await updateDoc(docRef, { Döviz: updatedDoviz });
          }*/
          }
          //console.log(newData[0].Döviz);

          setWatch(newData[0].Döviz);
          // watch ve fdata'dan verileri karşılaştırıp target dizisine ekleme
          //?--------------------------------
          // watch içerisindeki öğelerin verilerini daha hızlı aramak için bir set kullanıyoruz
          setTarget([]);
          const watchSet = new Set(watch.map((item) => item));

          // fdata'dan geçip sadece watchSet içinde bulunan kodları filtreleme
          const newItems = fdata.filter((item) => watchSet.has(item.code));

          // setTarget fonksiyonunu kullanarak hedef listesini güncelleme
          setTarget((prevTarget) => {
            // prevTarget listesi içindeki mevcut kodları bir set olarak saklama
            const prevCodesSet = new Set(prevTarget.map((item) => item.code));

            // prevTarget'ta mevcut olmayan yeni öğeleri filtreleme
            const itemsToAdd = newItems.filter(
              (item) => !prevCodesSet.has(item.code)
            );

            // prevTarget'a yeni öğeleri ekleyip sonucu döndürme
            return [...prevTarget, ...itemsToAdd];
          });

          setIsLoading(false);
        } else {
          console.error("responseData geçersiz veya mevcut değil");
          setIsLoading(false);
        }
      } else {
        console.error("querySnapshot yineleyici ya da tanımsız");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Veri alma hatası 3:", error);
      setIsLoading(false);
    }
  };

  //todo------------------

  const HisseSil = async (target) => {
    setIsLoading(true);

    // Belge referansını tanımlayın
    const docRef = doc(db, "Portfolio", "p2EkbErmx4HtU922yB2b");
    //console.log(target);

    try {
      // Mevcut belge verilerini alın
      const docSnapshot = await getDoc(docRef);
      let existingData = {};

      if (docSnapshot.exists()) {
        existingData = docSnapshot.data();
      }

      // Mevcut döviz verilerini alın
      let existingDoviz = existingData.Döviz || [];
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
        await updateDoc(docRef, { Döviz: existingDoviz });

        console.log("Hedef kodu mevcut döviz verilerinden başarıyla silindi.");

        getData();
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
            getData();
            getHisse();
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "green",
            borderRadius: 20,
            width: 150,
            height: 30,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 15,
              fontWeight: 300,
              textAlign: "center",
            }}
          >
            İzleme Listesi
          </Text>
        </TouchableOpacity>
      </View>

      {!isLoading ? (
        //??? bunu tutmamın sebebi button ile ilme işlemini yapmak için ayrı bir flatlist olsun
        <FlatList
          style={{}}
          data={target}
          keyExtractor={(item, index) => index.toString()} // keyExtractor düzeltildi
          numColumns={1}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onLongPress={() => HisseSil(item)}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgb(28,37,44)",
                    borderRadius: 15,
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
                  <View
                    style={{
                      width: "30%",
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
                          fontSize: 36,
                          fontWeight: 300,
                        }}
                      >
                        {"%" + Math.abs(item.rate)}
                      </Text>
                      <Text>
                        {item.rate > 0 ? (
                          <MaterialIcons
                            name="arrow-drop-up"
                            size={32}
                            color="rgb(0, 255, 0)"
                          />
                        ) : item.rate == 0 ? (
                          <MaterialIcons
                            name="arrow-left"
                            size={32}
                            color="rgb(125, 125, 125)"
                          />
                        ) : (
                          <MaterialIcons
                            name="arrow-drop-down"
                            size={32}
                            color="rgb(255, 0, 0)"
                          />
                        )}
                      </Text>
                    </View>
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
        <Loading text={"yükleniyor..."} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
