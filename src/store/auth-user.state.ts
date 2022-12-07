/* eslint-disable no-var */
import { UserModel } from "../model/user.model";
import create from "zustand";
import jwt_decode from "jwt-decode";
import { waitForWindow } from "../utilities/ssr.helper";

/**
 * TODO: future implement for better security
 */
function initUser() {
  // get from the localStorage
  const storageData = waitForWindow(() => localStorage?.getItem("accessToken"));
  if (!storageData) {
    return null;
  }

  try {
    const decoded = jwt_decode(storageData);
    return decoded as UserModel;
  } catch (e) {
    console.error(e);
  }

  return null;
}

export interface AuthenticateUserStore {
  user: UserModel | null;
  loginAs: (user: UserModel) => void;
  logout: () => void;
  update: (user: Partial<UserModel>) => void;
}

// retrieve the stored authenticated user.
export const useAuthUser = create<AuthenticateUserStore>()((set) => ({
  user: initUser(),
  loginAs: (user) => set(() => ({ user })),
  logout: () => set(() => ({ user: null })),
  update: (newUserInfo) =>
    set((current) => ({
      user: { ...(current.user ?? {}), ...newUserInfo } as UserModel,
    })),
}));
