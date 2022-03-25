import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import {
  exchangeCodeAsync,
  makeRedirectUri,
  TokenResponse,
  useAuthRequest,
} from "expo-auth-session";
import { Button } from "react-native";
import { StoreContext } from "../constants/Store";
import { CLIENT_ID, CLIENT_SECRET } from "@env";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://id.twitch.tv/oauth2/authorize",
  tokenEndpoint: "https://id.twitch.tv/oauth2/token",
  revocationEndpoint: "https://id.twitch.tv/oauth2/revoke",
};

const twitchEndPoint = "https://api.twitch.tv/helix";

const useProxy = true;

export default function TwitchOauth() {
  const { setIsLog, setToken } = React.useContext(StoreContext);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: [
        "openid",
        "user_read",
        "analytics:read:games",
        "viewing_activity_read",
      ],
      redirectUri: makeRedirectUri({ useProxy }),
      extraParams: {
        // force_verify: "true",
      },
    },
    discovery
  );

  console.log(makeRedirectUri({ useProxy }));

  React.useEffect(() => {
    console.log(response);
    if (response?.type === "success") {
      const { code } = response.params;
      console.log(request);
      console.log(response);
      sendRequest(
        `${
          discovery.tokenEndpoint
        }?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=authorization_code&code=${code}&redirect_uri=${makeRedirectUri(
          { useProxy }
        )}`,
        {
          method: "POST",
        }
      )
        .then((tokenResponse) => {
          console.log(tokenResponse);
          if (setToken) {
            setToken({
              accessToken: tokenResponse.access_token,
              refreshToken: tokenResponse.refresh_token,
            });
          }
          if (setIsLog) {
            setIsLog(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //   exchangeCodeAsync(
      //     {
      //       clientId: clientId,
      //       clientSecret: clientSecret,
      //       extraParams: { grant_type: "authorization_code" },
      //       code: code,
      //       redirectUri: makeRedirectUri({ useProxy }),
      //     },
      //     discovery
      //   )
      //     .then((resToken) => {
      //       console.log("===============");
      //       console.log(resToken);
      //       console.log("===============");
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="LogIn With Twitch"
      onPress={() => {
        promptAsync({ useProxy });
      }}
    />
  );
}

export async function sendRequest(
  url: RequestInfo,
  requestParams: RequestInit
) {
  console.log(url);
  console.log(requestParams);
  let response = await fetch(url, requestParams);
  let result;

  try {
    result = await response.json();
  } catch (e) {
    result = { error: e };
  }
  console.log(result);
  return result;
}

// async function sendTwitchRequest(url: RequestInfo, requestParams: RequestInit) {
//   let response = await fetch(url, requestParams);
//   let result;

//   try {
//     result = await response.json();
//   } catch (e) {
//     result = { error: e };
//   }
//   // console.log(result)
//   return result;
// }

export async function getUserInformation(accessToken: string) {
  return sendRequest(`${twitchEndPoint}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": CLIENT_ID,
    },
  });
}

export async function getSearchChannel(
  accessToken: string,
  query: string,
  after: string = ""
) {
  return sendRequest(
    `${twitchEndPoint}/search/channels?query=${query}${
      after.length != 0 ? `&after=${after}` : ""
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": CLIENT_ID,
      },
    }
  );
}
