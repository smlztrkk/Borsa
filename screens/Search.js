import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
export default function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [financeData, setFinanceData] = useState({});
  const [numColumns, setNumColumns] = useState(1);
  const [ara, setAra] = useState("");
  const [fdata, setFdata] = useState([]);

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
  useEffect(() => {
    getData();
  }, []); // `button` değişkenine bağlı olarak `useEffect` çalıştırılacak
  //todo aramalardaki requesti azalt ve daha stabil olsun
  if (ara == "") {
    console.log("boş", ara);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "rgb(11,20,27)",
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
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "rgb(14,239,158)",
            width: 50,
            height: 50,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => getData()}
        >
          <Text>Ara</Text>
        </TouchableOpacity>
      </View>

      {!isLoading && ara != "" ? (
        <FlatList
          style={{}}
          data={fdata}
          keyExtractor={(item, index) => index.toString()} // keyExtractor düzeltildi
          numColumns={numColumns}
          renderItem={({ item, index }) => {
            if (item.code == ara) {
              return (
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
              );
            } else if (ara == "") {
              return (
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
              );
            }
          }}
        />
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
            gap: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(11,20,27)",
          }}
        >
          <ActivityIndicator size={"large"} color={"rgba(255,255,255,1)"} />
          <Text style={{ color: "rgba(255,255,255,1)" }}>Aranyor...</Text>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
