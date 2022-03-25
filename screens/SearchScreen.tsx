import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import TwitchHome from "../components/TwitchHome";
import TwitchOauth from "../components/TwitchOAuth";
import TwitchSearch from "../components/TwitchSearch";
import { RootStackScreenProps, RootTabScreenProps } from "../types";

export default function SearchScreen({
  navigation,
}: RootStackScreenProps<"Search">) {
  return (
    <View style={styles.container}>
      <TwitchSearch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
