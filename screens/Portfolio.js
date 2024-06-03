import { StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WatchList from "../components/WatchList";
export default function Portfolio({ route }) {
  const { userId } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgb(11,20,27)" }}>
      <View
        style={{
          flex: 1,
          paddingTop: 20,
        }}
      >
        <WatchList userId={userId} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
