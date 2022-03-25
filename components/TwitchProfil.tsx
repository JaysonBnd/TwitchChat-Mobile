import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import TwitchOauth from "./TwitchOAuth";
import { ProfilType } from "../constants/Store";

export default function TwitchProfil({ profil }: { profil: ProfilType }) {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Image
          style={{
            width: "60%",
            marginRight: 10,
            borderRadius: 100 / 2,
            aspectRatio: 1,
          }}
          resizeMode={"stretch"}
          source={{
            uri: profil?.profile_image_url
              ? profil.profile_image_url
              : "https://static-cdn.jtvnw.net/user-default-pictures-uv/cdd517fe-def4-11e9-948e-784f43822e80-profile_image-300x300.png",
          }}
        />
      </View>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
