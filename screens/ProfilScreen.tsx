import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import TwitchHome from "../components/TwitchHome";
import TwitchOauth from "../components/TwitchOAuth";
import TwitchProfil from "../components/TwitchProfil";
import TwitchSearch from "../components/TwitchSearch";
import { StoreContext } from "../constants/Store";
import { RootStackScreenProps, RootTabScreenProps } from "../types";

export default function ProfilScreen({
  navigation,
}: RootStackScreenProps<"Profil">) {
  const { profil } = React.useContext(StoreContext);
  return (
    <View style={styles.container}>
        <TwitchProfil profil={profil ? profil : {}} />
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
