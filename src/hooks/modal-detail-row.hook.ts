import { useState } from "react";
import { DialogTypeMode } from "../interfaces/dialog-detail-props.interface";

export type DialogDetailHookTypes<T> = {
  openModal: (m: "create" | "view", d?: T) => void;
  resetModal: () => void;
  modal: null | DialogTypeMode<T>;
};

export const useDialogDetailRow = <T>() => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [mode, setMode] = useState<"create" | "view" | undefined>(undefined);

  function openModal(_mode: "create" | "view", _data?: T) {
    setData(_data);
    setMode(_mode);
  }

  function resetModal() {
    setData(undefined);
    setMode(undefined);
  }

  return {
    modal: mode ? { data, mode } : null,
    openModal,
    resetModal,
  } as DialogDetailHookTypes<T>;
};
