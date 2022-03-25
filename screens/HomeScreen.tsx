import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import TwitchHome from "../components/TwitchHome";
import TwitchOauth, {
  getUserInformation,
  sendRequest,
} from "../components/TwitchOAuth";
import { StoreContext } from "../constants/Store";
import { RootStackScreenProps, RootTabScreenProps } from "../types";

export default function HomeScreen({
  navigation,
}: RootStackScreenProps<"Home">) {
  const { isLog, token, setProfil } = React.useContext(StoreContext);

  // React.useEffect(() => {
  //   if (isLog == false) {
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: "LogIn" }],
  //     });
  //   }
  // }, [isLog]);

  React.useEffect(() => {
    if (token) {
      getUserInformation(token.accessToken).then((response) => {
        if (response && setProfil) {
          setProfil(response.data[0]);
        }
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <TwitchHome />
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
