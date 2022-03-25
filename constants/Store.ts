import React, { createContext, useState } from "react";

export type ProfilType = {
  broadcaster_type?: string;
  created_at?: string;
  description?: string;
  display_name?: string;
  email?: string;
  id?: string;
  login?: string;
  offline_image_url?: string;
  profile_image_url?: string;
  type?: string;
  view_count?: number;
};

export default function createStore() {
  const [isLog, setIsLog] = useState(false);
  const [token, setToken] = useState({
    accessToken: "",
    refreshToken: "",
  });
  const [profil, setProfil] = useState({});

  return {
    isLog,
    setIsLog,
    token,
    setToken,
    profil,
    setProfil,
  };
}

type StoreType = {
  isLog?: boolean;
  setIsLog?: React.Dispatch<React.SetStateAction<boolean>>;
  token?: {
    accessToken: string;
    refreshToken: string;
  };
  setToken?: React.Dispatch<
    React.SetStateAction<{
      accessToken: string;
      refreshToken: string;
    }>
  >;
  profil?: ProfilType;
  setProfil?: React.Dispatch<React.SetStateAction<ProfilType>>;
};

const Store: StoreType = {};

export const StoreContext = createContext(Store);
