import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function HisseSenedi({ item }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgb(29,47,69)",
        borderRadius: 25,
        width: "90%",
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
          style={{ color: "rgb(255, 64, 129)", fontSize: 16, fontWeight: 300 }}
        >
          Fiyat: {item.lastpricestr}
        </Text>

        <Text
          style={{ color: "rgb(0, 150, 150)", fontSize: 12, fontWeight: 400 }}
        >
          Hacim: {item.hacimstr}
        </Text>
        <Text
          style={{ color: "rgb(33, 150, 243)", fontSize: 12, fontWeight: 700 }}
        >
          Güncellenme zamanı: {item.time}
        </Text>
      </View>
      <View style={{ width: "30%" }}>
        <Text
          style={{
            color: item.rate > 0 ? "rgb(0, 255, 0)" : "rgb(255, 0, 0)",
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

const styles = StyleSheet.create({});
