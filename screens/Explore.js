import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import Doviz from "../components/Doviz";
import HisseSenedi from "../components/HisseSenedi";
export default function Explore() {
  const [button, setButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [financeData, setFinanceData] = useState({});

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://finans.truncgil.com/today.json"
        );
        setFinanceData(response.data);
        //console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        alert("Bir hata oluştu:", error);
      }
    };

    fetchData();
  }, []); // useEffect'in sadece bir kere çalışması için boş bir bağımlılık dizisi kullanılıyor

  const [responseData, setResponseData] = useState(null);
  const hissesenedi = "https://api.collectapi.com/economy/hisseSenedi";
  const döviz =
    "https://api.collectapi.com/economy/currencyToAll?int=1&base=TRY";

  const Api = "apikey 18bbvt4R0ZNSfXt6QNVbRt:6EL2kgzugiD4sy9XkE6rGc";
  //const Api1 = "apikey 1KvoXE5NLfHkuNKbgMXmLR:6m5jUXdBXRnqSwnXxi4ycO";
  const Api2 = "apikey 3QFnPhlvL0Bc7W7c8imeDa:4X52g11L50nHGDA4jX1TZM";
  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(hissesenedi, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${Api2}`,
          },
        });
        setResponseData(response.data.result);
        setIsLoading(false);

        //console.log(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const [numColumns, setNumColumns] = useState(1);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgb(12, 37, 65)" }}>
      <View
        style={{
          width: "100%",
          height: 50,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 300,
            height: 40,
            borderRadius: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgb(39, 57, 79)",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setButton(true);
            }}
            style={{
              width: 150,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              backgroundColor: button ? "rgb(14,239,158)" : "transparent",
            }}
          >
            <Text
              style={{
                color: button ? "rgb(39, 57, 79)" : "white",
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Döviz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setButton(false);
            }}
            style={{
              width: 150,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              height: 40,
              backgroundColor: button ? "transparent" : "rgb(14,239,158)",
            }}
          >
            <Text
              style={{
                color: button ? "white" : "rgb(39, 57, 79)",
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Hisse Senedi
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {!isLoading ? (
        //* financeData || responseData  ?  */
        button ? (
          <FlatList
            data={Object.keys(financeData)}
            keyExtractor={(item, index) => index.toString()} // keyExtractor düzeltildi
            numColumns={numColumns}
            renderItem={({ item, index }) => {
              // if (index == 0) {
              //   return (
              //     <View
              //       style={{
              //         flex: 1,
              //         justifyContent: "center",
              //         alignItems: "center",
              //         width: "100%",
              //         height: 100,
              //         marginVertical: 10,
              //       }}
              //     >
              //       <Text style={{ color: "white" }}>Güncellenme Tarihi</Text>
              //       <Text style={{ color: "white" }}>
              //         {financeData.Update_Date}
              //       </Text>
              //     </View>
              //   );
              // }
              if (index !== 0 || financeData[item]["Tür"] == "Altın") {
                return (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: 180,
                      marginVertical: 10,
                    }}
                  >
                    <Doviz item={item} financeData={financeData} />
                  </View>
                );
              }
            }}
          />
        ) : (
          <FlatList
            data={responseData}
            keyExtractor={(item, index) => index.toString()} // keyExtractor düzeltildi
            numColumns={numColumns}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: 180,
                    marginVertical: 10,
                  }}
                >
                  <HisseSenedi item={item} />
                </View>
              );
            }}
          />
        )
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
            gap: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(12, 37, 65)",
          }}
        >
          <ActivityIndicator size={"large"} color={"rgba(255,255,255,1)"} />
          <Text style={{ color: "rgba(255,255,255,1)" }}>
            Veriler Yükleniyor...
          </Text>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
{
  /*<View>
                    <Text>{item}</Text>
                    <Text>{financeData[item]["Alış"]}</Text>
                    <Text>{financeData[item]["Satış"]}</Text>
                    <Text>{financeData[item]["Tür"]}</Text>
                    <Text>{financeData[item]["Değişim"]}</Text>
                  </View>*/
}
