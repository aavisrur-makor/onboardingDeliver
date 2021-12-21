import { createContext } from "react";

export default createContext();
export const initialState = {
  uuid: "",
  progress: 0,
  isAgreeElectronic: false,
  AcceptAndSendAgree: false,
  AcceptAndSendFinish: false,
};
