import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Colors, { twitchColor } from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import Layout from "../constants/Layout";
import { getSearchChannel } from "./TwitchOAuth";
import { StoreContext } from "../constants/Store";
import { FontAwesome } from "@expo/vector-icons";

type SearchChannelType = {
  broadcaster_language?: string;
  broadcaster_login?: string;
  display_name?: string;
  game_id?: string;
  game_name?: string;
  id?: string;
  is_live?: boolean;
  tags_ids?: [];
  thumbnail_url?: string;
  title?: string;
  started_at?: string;
};

const array: any[] = [];

export default function TwitchSearch() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResult, setSearchResult] = React.useState(array);
  const [loading, setLoading] = React.useState(false);
  const [after, setAfter] = React.useState("");

  const { token } = React.useContext(StoreContext);

  const getSearchQuery = (text: string) => {
    if (!token) {
      return;
    }
    getSearchChannel(token.accessToken, text).then((response) => {
      setSearchResult(response.data);
      setAfter(response?.pagination?.cursor ? response.pagination.cursor : "");
    });
  };

  const getAfterSearch = () => {
    if (after.length == 0 || !token) {
      return;
    }
    getSearchChannel(token.accessToken, searchQuery, after).then((response) => {
      setSearchResult([...searchResult, ...response.data]);
      setAfter(response?.pagination?.cursor ? response.pagination.cursor : "");
    });
  };

  function renderSearchResult({ item }: { item: SearchChannelType }) {
    if (searchQuery.length == 0) {
      return <></>;
    }
    return (
      <Pressable
        style={({ pressed }) => [
          {
            flex: 1,
            backgroundColor: pressed ? "#606060" : "#303030",
            marginVertical: 3,
            borderRadius: 20 / 2,
            width: Layout.window.width * 0.95,
            flexDirection: "row",
          },
        ]}
      >
        <Image
          style={{
            width: Layout.window.width * 0.2,
            margin: 15,
            borderRadius: 100 / 2,
            aspectRatio: 1,
          }}
          source={{ uri: item?.thumbnail_url }}
        />
        <View style={{ backgroundColor: "#303030", flex: 1 }}>
          <View style={{ flexDirection: "row", backgroundColor: "#303030" }}>
            <Text
              style={{
                fontSize: 17,
                color: "white",
                marginTop: 10,
                fontWeight: "bold",
              }}
            >
              {item?.display_name}
            </Text>
            {item?.is_live ? (
              <View
                style={{
                  marginTop: 10,
                  marginLeft: 3,
                  backgroundColor: "red",
                  borderWidth: 2,
                  borderRadius: 20 / 2,
                  flexDirection: "row",
                  height: 25,
                }}
              >
                <Text style={{ marginHorizontal: 5 }}>Live</Text>
                <FontAwesome
                  name="circle-o"
                  size={20}
                  style={{ marginRight: 3 }}
                />
              </View>
            ) : (
              <></>
            )}
          </View>
          {item?.is_live ? (
            <Text
              style={{
                fontSize: 12,
                color: "white",
                marginTop: 10,
                flex: 1,
              }}
            >
              {item?.title}
            </Text>
          ) : (
            <></>
          )}
        </View>
      </Pressable>
    );
  }

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <TextInput
          style={{
            height: 40,
            width: Layout.window.width * 0.95,
            marginTop: 10,
            borderColor: twitchColor,
            padding: 10,
            borderWidth: 2,
            color: "white",
            borderRadius: 10 / 2,
          }}
          placeholder="Search"
          placeholderTextColor={"gray"}
          onChangeText={(text) => {
            setSearchQuery(text);
            if (text.length != 0) {
              getSearchQuery(text);
            } else {
              setSearchResult([]);
            }
          }}
          value={searchQuery}
        />
        <FlatList
          data={searchResult}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderSearchResult}
          refreshing={loading}
          onEndReached={getAfterSearch}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
    flex: 1,
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
