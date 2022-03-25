import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import TwitchHome from "../components/TwitchHome";
import TwitchOauth from "../components/TwitchOAuth";
import { StoreContext } from "../constants/Store";
import { RootStackScreenProps, RootTabScreenProps } from "../types";

export default function LogInScreen({
  navigation,
}: RootStackScreenProps<"LogIn">) {
  const { isLog } = React.useContext(StoreContext);

  React.useEffect(() => {
    if (isLog == true) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  }, [isLog]);

  return (
    <View style={styles.container}>
      <TwitchOauth />
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
