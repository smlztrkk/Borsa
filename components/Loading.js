import { StyleSheet, Text } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <Progress.Circle size={50} indeterminate={true} />

      <Text style={{ color: "rgba(255,255,255,1)", marginVertical: 20 }}>
        {text}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
