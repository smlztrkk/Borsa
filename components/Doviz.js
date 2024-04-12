import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-web";

export default function Doviz({ item, financeData }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgb(29,47,69)",
        borderRadius: 35,
        padding: 10,
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: "white",
            fontSize: 36,
            fontWeight: 900,
            marginBottom: 10,
          }}
        >
          {item}
        </Text>
        <Text style={{ color: "green", fontSize: 18, fontWeight: 400 }}>
          Alış: {financeData[item]["Alış"]}
        </Text>
        <Text style={{ color: "red", fontSize: 18, fontWeight: 400 }}>
          Satış: {financeData[item]["Satış"]}
        </Text>
        <Text style={{ color: "white", fontSize: 16, fontWeight: 300 }}>
          Değişim: {financeData[item]["Değişim"]}
        </Text>
        <Text style={{ color: "orange", fontSize: 12, fontWeight: 700 }}>
          Tür: {financeData[item]["Tür"]}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
