import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import Doviz from "../components/Doviz";
import { SimpleLineIcons } from "@expo/vector-icons";
import HisseSenedi from "../components/HisseSenedi";
import {
  collection,
  getDocs,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import Loading from "../components/Loading";
export default function Explore() {
  const [button, setButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const text = "Veriler yükleniyor...";
  const [financeData, setFinanceData] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const fetcDhData = async () => {
    setIsLoading(true);
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
  useEffect(() => {
    fetcDhData();
  }, []);

  const hissesenedi = "https://api.collectapi.com/economy/hisseSenedi";
  const döviz =
    "https://api.collectapi.com/economy/currencyToAll?int=1&base=TRY";

  const Api = "apikey 18bbvt4R0ZNSfXt6QNVbRt:6EL2kgzugiD4sy9XkE6rGc";
  const smlztrkk2001 = "apikey 1KvoXE5NLfHkuNKbgMXmLR:6m5jUXdBXRnqSwnXxi4ycO";
  const Api2 = "apikey 3QFnPhlvL0Bc7W7c8imeDa:4X52g11L50nHGDA4jX1TZM";
  const Emrecan = "apikey 2A0tuHrD0rsii3GZ7zMFkw:3C6K8mpuHg64lzEGdevoGI";
  const enes = "apikey 1toPpXebPyR3DkcVUY9lr1:1WB9IbzzRXUabANgzycQs0";
  const fetchHData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(hissesenedi, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${smlztrkk2001}`,
        },
      });
      setResponseData(response.data.result);
      setIsLoading(false);

      console.log("hisse başarılı");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //todo burası firebase ile ilgili alan
  const firestoreData = doc(db, "Data", "HisseSenedi");
  const [gelen, setGelen] = useState({});
  useEffect(() => {
    onSnapshot(firestoreData, (doc) => {
      setGelen(doc.data());
    });
  }, []);
  {
    /*const DovizUp = async () => {
    setIsLoading(true);
    try {
      const docRef = await updateDoc(doc(db, "Data", "eWser7DqScJIIDd3PYVW"), {
        response: financeData,
      });
      console.log("başarılı döviz ");
      setIsLoading(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };*/
  }
  //console.log(responseData);
  let date = new Date();
  const HisseUp = async () => {
    try {
      if (responseData != null) {
        const docRef = await updateDoc(
          doc(db, "Hisse", "31MmtuoaW39Z364cWAcM"),
          {
            response: { date },
            responseData,
          }
        );
        console.log("başarılı hisse");
      } else {
        console.log("responseData null");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const DovizUp = async () => {
    let date = new Date();
    try {
      if (financeData != null) {
        const financeArray = Object.entries(financeData)
          .slice(1)
          .map(([key, value]) => ({
            Code: key,
            ...value,
          }));

        const docRef = await updateDoc(
          doc(db, "Data", "eWser7DqScJIIDd3PYVW"),
          {
            response: { date },
            financeArray,
          }
        );

        console.log("Başarılı döviz");
      } else {
        console.log("financeData null");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  //todo
  const [fdata, setFdata] = useState([]);

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Hisse"));
      if (querySnapshot && typeof querySnapshot.forEach === "function") {
        const newData = [];
        querySnapshot.forEach((doc) => {
          newData.push(doc.data());
        });

        if (newData.length > 0 && Array.isArray(newData[0].responseData)) {
          setFdata(newData[0].responseData);
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
    DovizUp();
    HisseUp();
    getData();
  }, [button]);
  //!!data firestordan çekilimi
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Data"));
        const fetchedDataaa = [];
        querySnapshot.forEach((doc) => {
          fetchedDataaa.push(doc.data());
        });
        //console.log(fetchedDataaa[0].response);
        setData(fetchedDataaa[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "rgb(11,20,27)",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 50,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          zIndex: 2,
          top: 40,
        }}
      >
        <View
          style={{
            width: 340,
            height: 40,
            borderRadius: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgb(28,37,44)",
            borderWidth: 1,
            borderColor: "rgb(38,47,54)",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setButton(true);
              fetcDhData();
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
                color: button ? "rgb(28,37,44)" : "white",
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Döviz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              fetchHData();
              fetcDhData();
              DovizUp();
              HisseUp();
            }}
            style={{
              width: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              height: 40,
            }}
          >
            <SimpleLineIcons name="refresh" size={24} color="aqua" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setButton(false);
              getData();
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
                color: button ? "white" : "rgb(28,37,44)",
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
          financeData != null ? (
            <View style={{ paddingBottom: 0 }}>
              <Doviz financeData={financeData} />
            </View>
          ) : (
            <Loading text={text} />
          )
        ) : fdata.length > 0 ? (
          <View>
            <HisseSenedi fdata={fdata} />
          </View>
        ) : (
          <Loading text={text} />
        )
      ) : (
        <Loading text={text} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
