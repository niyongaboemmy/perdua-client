import {
  CleanUserDetails,
  LoginSuccessDetails,
  LogoutUser,
} from "./auth.action";
import { GetBasicSystemInfoAction } from "./system.action";

export enum ActionTypes {
  LOGIN_DETAILS = "LOGIN_DETAILS",
  USER_LOGIN_SUCCESS_DATA = "USER_LOGIN_SUCCESS_DATA",
  CLEAN_USER_DETAILS = "CLEAN_USER_DETAILS",
  LOGOUT = "LOGOUT",
  GET_SYSTEM_BASIC_INFO = "GET_SYSTEM_BASIC_INFO",
}

export type Action =
  | CleanUserDetails
  | LoginSuccessDetails
  | LogoutUser
  | GetBasicSystemInfoAction;
