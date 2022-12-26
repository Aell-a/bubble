import { createContext, useContext, useEffect, useState } from "react";
import {
  challenge,
  apolloClient,
  authenticate,
  getDefaultProfile,
  getProfile,
} from "../constants/lensConstants";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";

export const LensContext = createContext();

export const useLensContext = () => {
  return useContext(LensContext);
};

export function LensProvider({ children }) {
  const [profileId, setProfileId] = useState();
  const [token, setToken] = useState();
  const { account } = useMoralis();
  const [profile, setProfile] = useState();

  const signIn = async () => {
    try {
      const challengeInfo = await apolloClient.query({
        query: challenge,
        variables: { address: account },
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(
        challengeInfo.data.challenge.text
      );
      const authData = await apolloClient.mutate({
        mutation: authenticate,
        variables: {
          address: account,
          signature,
        },
      });
      const {
        data: {
          authenticate: { accessToken },
        },
      } = authData;

      setToken(accessToken);
    } catch (err) {
      console.log("Error signing in: ", err);
    }
  };

  const getProfile = async function () {
    const defaultProfile = await apolloClient.query({
      query: getDefaultProfile,
      variables: {
        request: {
          ethereumAddress: account,
        },
      },
    });
    if (defaultProfile.data.defaultProfile) {
      console.log(defaultProfile.data.defaultProfile);
      return defaultProfile.data.defaultProfile;
    } else {
      return null;
    }
  };

  useEffect(() => {
    const readToken = window.localStorage.getItem("lensToken");
    if (readToken) {
      setToken(readToken);
    }
    if (account && !token && !readToken) {
      signIn();
    }
    if (!account) {
      window.localStorage.removeItem("lensToken");
    }
    if (account) {
      getProfile().then((profile) => setProfile(profile));
    }
  }, [account]);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("lensToken", token);
    }
  }, [token]);

  return (
    <LensContext.Provider value={{ token, profile }}>
      {children}
    </LensContext.Provider>
  );
}
