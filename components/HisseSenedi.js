import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
export default function HisseSenedi({ fdata }) {
  const [numColumns, setNumColumns] = useState(1);
  return (
    <View>
      <FlatList
        style={{ paddingBottom: 0, paddingTop: 70 }}
        data={fdata}
        keyExtractor={(item, index) => index.toString()} // keyExtractor düzeltildi
        numColumns={numColumns}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: "rgb(28,37,44)",
                borderRadius: 15,
                paddingVertical: 20,
                marginVertical: 10,
                marginHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View style={{ width: "40%" }}>
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
                    color: "rgb(255, 1004, 129)",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  Fiyat: {item.lastpricestr}
                </Text>

                <Text
                  style={{
                    color: "rgb(33, 150, 243)",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  Güncellenme: {item.time}
                </Text>
              </View>
              <View
                style={{
                  width: "40%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 5,
                    borderRadius: 10,
                    backgroundColor:
                      item.rate > 0
                        ? "rgba(0, 255, 0,0.1)"
                        : item.rate == 0
                        ? "rgba(125, 125, 125,0.1)"
                        : "rgba(255, 0, 0,0.1)",
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
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      //color: "rgb(0, 150, 150)",
                      color: "rgb(33, 150, 243)",
                      fontSize: 12,
                      fontWeight: 400,
                    }}
                  >
                    Hacim: {item.hacimstr}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 15,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: "rgb(144, 164, 174)",
                        fontSize: 12,
                        fontWeight: 600,
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
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
