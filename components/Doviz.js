import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

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
          paddingTop: 70,
        }}
        data={Object.keys(financeData)}
        keyExtractor={(item, index) => index.toString()} // keyExtractor düzeltildi
        numColumns={numColumns}
        renderItem={({ item, index }) => {
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
          if (index !== 0 || financeData[item]["Tür"] == "Altın") {
            return (
              <TouchableOpacity
                onLongPress={() => {
                  alert(item);
                }}
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
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flex: 1, justifyContent: "space-around" }}>
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
                        width: 100,
                        borderWidth: 2,
                        borderColor: "rgb(39, 57, 79)",
                      }}
                    />
                    <Text
                      style={{ color: "green", fontSize: 18, fontWeight: 400 }}
                    >
                      Alış: {financeData[item]["Alış"]}
                    </Text>
                    <Text
                      style={{ color: "red", fontSize: 18, fontWeight: 400 }}
                    >
                      Satış: {financeData[item]["Satış"]}
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
                      Tür: {financeData[item]["Tür"]}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
