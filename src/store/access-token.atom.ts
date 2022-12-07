import { atom, useAtom } from "jotai";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { waitForWindow } from "../utilities/ssr.helper";

function initToken() {
  const token = waitForWindow(() => localStorage.getItem("accessToken"));
  if (axios && token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return token;
}

const accessTokenAtom = atom<string | null>(initToken());

/**
 * Custom Hook managing Token
 */
const useAccessToken = () => {
  const [token, _setToken] = useAtom(accessTokenAtom);

  function setToken<T>(t: string): T | null {
    try {
      const decoded = jwt_decode<T>(t);
      if (axios) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${t}`;
      }
      waitForWindow(() => localStorage.setItem("accessToken", t));
      _setToken(t);
      return decoded;
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  function resetToken() {
    _setToken(null);
    if (axios) {
      delete axios.defaults.headers.common["Authorization"];
    }

    waitForWindow(() => localStorage.removeItem("accessToken"));
  }

  return {
    accessToken: token,
    // save the token to memory and localStorage. Returns the decoded context.
    setToken,
    // remove the token from memory and localStorage.
    resetToken,
  };
};

export default useAccessToken;
