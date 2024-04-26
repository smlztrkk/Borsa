import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PieChart from "react-native-pie-chart";

export default function Portfolio() {
  const series = [123, 240, 321, 523, 789, 100, 537, 145];
  const sliceColor = [
    "#fbd203",
    "rgb(123,1233,132)",
    "#ffb300",
    "blue",
    "#ff6c00",
    "purple",
    "#ff3c00",
    "green",
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgb(11,20,27)" }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: 900,
          color: "white",
          textAlign: "center",
          marginVertical: 30,
        }}
      >
        Hesap
      </Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 30,
        }}
      >
        <PieChart
          widthAndHeight={200}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.6}
          //coverFill={"#FFF"}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
