import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
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
import { RadioGroup } from "react-native-radio-buttons-group";
export default function WatchList() {
  const [watch, setWatch] = useState([]);
  const [watch2, setWatch2] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fdata, setFdata] = useState([]);
  const [ffdata, setFfdata] = useState([]);
  const [selectedId, setSelectedId] = useState(1);
  const [numColumns, setNumColumns] = useState(1);

  //? --------------- firebase ye kod kadet portfolioya ve bunu ana firesoterdan kodlar  ile çek search ekranında ana firestore verilerini fdata ile çekip filtreleme işlemi var
  //?---------------- sadece modal ile code gönder ve bunu burada portfoliodan çek filtrele
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
  const [target2, setTarget2] = useState([]);

  const [target, setTarget] = useState([]);
  const getData = async () => {
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "WatchList"));
      if (querySnapshot && typeof querySnapshot.forEach === "function") {
        const newData = [];
        querySnapshot.forEach((doc) => {
          newData.push(doc.data());
        });
        // newData[0].responseData'nın varlığını ve doğru bir dizi olduğunu kontrol edin
        console.log(newData[0].Doviz);
        if (selectedId == 1) {
          if (newData.length > 0 && Array.isArray(newData[0].Hisse)) {
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

            setWatch(newData[0].Hisse);
            // watch ve fdata'dan verileri karşılaştırıp target dizisine ekleme
            //?--------------------------------
            // watch içerisindeki öğelerin verilerini daha hızlı aramak için bir set kullanıyoruz
            setTarget([]);
            const watchSet = new Set(watch.map((item) => item));
            console.log(watchSet);
            // fdata'dan geçip sadece watchSet içinde bulunan kodları filtreleme
            const newItems = fdata.filter((item) => watchSet.has(item.code));
            console.log(newItems);
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
            console.error("Data geçersiz veya mevcut değil");
            setIsLoading(false);
          }
        } else {
          if (newData.length > 0 && Array.isArray(newData[0].Doviz)) {
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

            setWatch2(newData[0].Doviz);
            // watch ve fdata'dan verileri karşılaştırıp target dizisine ekleme
            //?--------------------------------
            // watch içerisindeki öğelerin verilerini daha hızlı aramak için bir set kullanıyoruz
            setTarget2([]);
            const watchSet = watch2.map((item) => item);
            console.log(watchSet); //["USD", "EUR"]
            // fdata'dan geçip sadece watchSet içinde bulunan kodları filtreleme
            //todo burada filtrelenen değerlerin şiti tatnsn
            console.log(Object.keys(ffdata)); //?--["UAH", "ISK", "MAD", "Update_Date", "CZK", "hamit-altin", "yarim-altin", "RON", "MXN", "AED", "UYU", "JPY", "ALL", "BRL", "PLN", "SGD", "CAD", "TWD", "SAR", "KZT", "HUF", "tam-altin", "EUR", "gram-has-altin", "PEN", "MDL", "SEK", "ceyrek-altin", "IQD", "ikibucuk-altin", "ARS", "PHP", "JOD", "BAM", "IRR", "DZD", "HRK", "KRW", "NOK", "AUD", "LYD", "TND", "USD", "ZAR", "MKD", "OMR", "LKR", "LBP", "THB", "ILS", "AZN", "besli-altin", "INR", "GEL", "IDR", "14-ayar-altin", "GBP", "CNY", "EGP", "RUB", "resat-altin", "MYR", "RSD", "ata-altin", "ons", "KWD", "cumhuriyet-altini", "CHF", "NZD", "HKD", "CRC", "18-ayar-altin", "DKK", "PKR", "QAR", "COP", "gremse-altin", "22-ayar-bilezik", "BGN", "BHD", "SYP", "gumus", "CLP", "gram-altin"]
            const newItems = Object.keys(ffdata).filter((item) =>
              watchSet.has(item)
            );
            console.log(newItems); //["USD", "EUR"]
            // setTarget fonksiyonunu kullanarak hedef listesini güncelleme
            setTarget2((prevTarget) => {
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
            console.error("Data geçersiz veya mevcut değil");
            setIsLoading(false);
          }
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
    const docRef = doc(db, "WatchList", "MJ7hC1bZmcLuIuZjmYKZ");
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
  useEffect(() => {
    // Bir saniyede bir fonksiyonları çağıracak setInterval fonksiyonu oluşturun
    const intervalId = setInterval(async () => {
      await getData();
      if (selectedId === 1) {
        getHisse();
      } else {
        getDoviz();
      }
    }, 100000); // 1000 milisaniye = 1 saniye

    // Bileşen temizlenirken interval fonksiyonunu temizleyin
    return () => {
      clearInterval(intervalId);
    };
  }, [selectedId]); // `button` değişkenine bağlı olarak `useEffect` çalıştırılacak

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
      <View>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
          labelStyle={{ color: "white" }}
          layout="row"
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
        <Loading text={"yükleniyor..."} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
