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
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
