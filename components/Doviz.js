import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";

export default function Doviz({ financeData }) {
  const [numColumns, setNumColumns] = useState(2);
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        style={{
          width: "95%",
          paddingTop: 70,
        }}
        data={Object.keys(financeData)}
        keyExtractor={(item, index) => index.toString()} // keyExtractor düzeltildi
        numColumns={numColumns}
        renderItem={({ item, index }) => {
          const degisimStr = financeData[item]["Değişim"];
          const degisim = degisimStr
            ? parseFloat(degisimStr.replace(/,/g, ".").replace(/%/g, ""))
            : null;
          if (index == 0) {
            return (
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
                  marginHorizontal: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "rgba(125, 125, 125,0.5)",
                }}
              >
                <View
                  style={{
                    width: 100,
                    borderWidth: 2,
                    marginVertical: 15,
                    backgroundColor: "rgb(28,37,44)",
                  }}
                />
                <View>
                  <Text style={{ color: "white" }}>Güncellenme Tarihi</Text>
                  <Text style={{ color: "white" }}>
                    {financeData.Update_Date}
                  </Text>
                </View>
                <View
                  style={{
                    width: 100,
                    borderWidth: 2,
                    marginVertical: 15,
                    backgroundColor: "rgb(28,37,44)",
                  }}
                />
              </View>
            );
          }
          if (index !== 0 && financeData[item]["Tür"] == "Döviz") {
            return (
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
                  marginHorizontal: 10,
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
                      fontSize: financeData[item]["Tür"] == "Altın" ? 18 : 28,
                      fontWeight: 900,
                      marginBottom: 5,
                      textAlign: "center",
                    }}
                  >
                    {item}
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
                    Alış: {financeData[item]["Alış"]}
                  </Text>
                  <Text
                    style={{
                      color: "rgb(33, 150, 243)",
                      fontSize: 18,
                      fontWeight: 400,
                    }}
                  >
                    Satış: {financeData[item]["Satış"]}
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
                    Değişim: {financeData[item]["Değişim"].replace(/-/g, "")}
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
                    Tür: {financeData[item]["Tür"]}
                  </Text>
                </View>
              </View>
            );
          }
          if (index !== 0 && financeData[item]["Tür"] == "Altın") {
            return (
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
                  marginHorizontal: 10,
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
                      fontSize: financeData[item]["Tür"] == "Altın" ? 18 : 28,
                      fontWeight: 900,
                      marginBottom: 5,
                      textAlign: "center",
                    }}
                  >
                    {item.replace(/-/g, " ").toUpperCase()}
                  </Text>
                  <View
                    style={{
                      width: 130,
                      borderWidth: 1,
                      borderColor: "rgb(39, 57, 79)",
                    }}
                  />
                  <Text
                    style={{ color: "green", fontSize: 18, fontWeight: 400 }}
                  >
                    Alış: {financeData[item]["Alış"]}
                  </Text>
                  <Text style={{ color: "red", fontSize: 18, fontWeight: 400 }}>
                    Satış: {financeData[item]["Satış"]}
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
                      color:
                        financeData[item]["Değişim"] > 0
                          ? "rgb(0, 255, 0)"
                          : item.rate == 0
                          ? "rgb(125, 125, 125)"
                          : "rgb(255, 0, 0)",
                      fontSize: 16,
                      fontWeight: 300,
                    }}
                  >
                    Değişim: {financeData[item]["Değişim"]}
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
                    Tür: {financeData[item]["Tür"]}
                  </Text>
                </View>
              </View>
            );
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
