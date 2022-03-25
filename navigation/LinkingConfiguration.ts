/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { getStateFromPath, LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Home: "home",
      LogIn: "login",
      Search: "search",
      Profil: "profil",
      NotFound: "*",
    },
  },
  getStateFromPath: (path: string, options) => {
    if (path.startsWith("expo-auth-session")) {
      return getStateFromPath(
        path.replace("expo-auth-session", "login"),
        options
      );
    }
    return getStateFromPath(path, options);
  },
};

export default linking;
