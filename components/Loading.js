import { StyleSheet, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";
export default function Loading({ text }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(11,20,27)",
      }}
    >
      <ActivityIndicator
        animating={true}
        color={"rgba(31,67,200,1)"}
        size={50}
      />
      <Text style={{ color: "rgba(255,255,255,1)", marginVertical: 20 }}>
        {text}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
