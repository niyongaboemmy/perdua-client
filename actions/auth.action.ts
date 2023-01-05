import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import { API_URL } from "../utils/api";
import { APP_TOKEN_NAME, setAxiosToken } from "../utils/AxiosToken";
import { errorToText } from "../utils/functions";

/**
 * * ****************************** INTERFACES *****************************
 */

export interface DistrictLocationItem {
  district_code: string;
  district_name: string;
  province_id: string;
  province_code: string;
  _id: string;
}
export interface ProvinceLocationItem {
  province_code: string;
  province_name: string;
  _id: string;
}
export interface SectorLocationItem {
  district_id: string;
  sector_code: string;
  sector_name: string;
  district_code: string;
  _id: string;
}
export interface LocationAPI {
  districts: DistrictLocationItem[];
  provinces: ProvinceLocationItem[];
  sectors: SectorLocationItem[];
}

var token: any = null;
if (typeof window !== "undefined") {
  token = localStorage.getItem(APP_TOKEN_NAME);
}

export interface Access_Interface {
  access_name: string;
  key: string;
  permission: {
    create: boolean;
    update: boolean;
    delete: boolean;
    view: boolean;
    export: boolean;
  };
}

export interface branchInterface {
  bank_branch_id: string;
  branch_name: string;
  district_code: string;
  district_name: string;
  bank_id: string;
}

export interface UserBank_Interface {
  user_bank_id?: string;
  user_id: string;
  bank_id: string;
  archive?: any;
}

export interface UserBankGet {
  bank_id: string;
  user_bank_id: string;
  bank_name: string;
  bank_logo: string;
}

export interface UserData_Interface {
  user_id: string;
  fname: string;
  lname: string;
  gender: string;
  nid: string;
  email: string;
  phone: string;
  location: any;
  profile_pic: string;
  role_id: number;
  username: string;
  password: string;
  company_name?: string;
  company_logo?: string;
  archive?: any;
  status?: any;
  role_name?: string;
  access?: string;
  user_custom_access?: Access_Interface[];
  user_bank?: UserBank_Interface[];
  user_branches?: branchInterface[];
  wallet_balance: number;
}

export interface API_GetUsersDetails {
  user_id: string;
  user_names: string;
  phone: string;
  email: string;
}

export interface UserLoginResponse {
  user_id: string;
  user_names: string;
  phone: string;
  email: string;
  jwt: string;
}

export interface BankValuerInterface {
  user_id: string;
  fname: string;
  lname: string;
  gender: string;
  nid: string;
  location: string;
  profile_pic: string | null;
  role_id: string;
  email: string;
  phone: string;
  company_name: string | null;
  company_logo: string | null;
  role_name: string;
  assign_status: boolean;
}

export interface Auth {
  loading: boolean;
  isAuthenticated: boolean;
  token: string;
  user: API_GetUsersDetails | null;
}

//* ********************** ACTION TYPE INTERCACES ********************** */
export interface FerchLoginDetails {
  type: ActionTypes.LOGIN_DETAILS;
  payload: Auth;
}

export interface LoginSuccessDetails {
  type: ActionTypes.USER_LOGIN_SUCCESS_DATA;
  payload: {
    data: API_GetUsersDetails;
    token: string;
  };
}

export interface CleanUserDetails {
  type: ActionTypes.CLEAN_USER_DETAILS;
}

export interface LogoutUser {
  type: ActionTypes.LOGOUT;
}

export interface FerchLoginDetails {
  type: ActionTypes.LOGIN_DETAILS;
  payload: Auth;
}

/**
 * * ****************************** ACTIONS *****************************
 */

export const FC_CleanUserDetails = () => {
  return (dispatch: Dispatch) => {
    dispatch<CleanUserDetails>({
      type: ActionTypes.CLEAN_USER_DETAILS,
    });
  };
};

/**
 * @description Register the account to the api
 * @param account
 * @param MsgHandler return the error from the API
 * @returns
 */
export const FC_Login = (
  data: {
    username: string;
    password: string;
  },
  CallbackFunc: Function
) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.post<UserLoginResponse>(
        `${API_URL}/user/login`,
        data
      );

      console.log({ data_after_login: res.data });

      localStorage.setItem(APP_TOKEN_NAME, res.data.jwt);
      dispatch<LoginSuccessDetails>({
        type: ActionTypes.USER_LOGIN_SUCCESS_DATA,
        payload: {
          data: res.data,
          token: res.data.jwt,
        },
      });
      CallbackFunc(true, "");
    } catch (error: any) {
      console.log("Login err: ", { ...error });
      console.log("Login err: ", error);
      // CallbackFunc(false, errorToText(error));
      CallbackFunc(false, errorToText(error));
    }
  };
};

/**
 * @description Check if the user is logged in based on the logged in account
 * @param account
 * @param MsgHandler return the error from the API
 * @returns
 */

export const FC_CheckLoggedIn = (callBack: (status: boolean) => void) => {
  callBack(false);
  return async (dispatch: Dispatch) => {
    if (token === null) {
      dispatch<LogoutUser>({
        type: ActionTypes.LOGOUT,
      });
      callBack(true);
      return false;
    }
    try {
      setAxiosToken();
      const res = await axios.get<UserLoginResponse>(`${API_URL}/user/logged`);
      console.log({ logged_user_details: res.data });
      dispatch<LoginSuccessDetails>({
        type: ActionTypes.USER_LOGIN_SUCCESS_DATA,
        payload: {
          data: res.data,
          token: token!,
        },
      });
      callBack(true);
    } catch (error: any) {
      callBack(true);
      console.log("User not: ", { ...error });
      dispatch<LogoutUser>({
        type: ActionTypes.LOGOUT,
      });
    }
  };
};

export const FC_ReloadUserInfo = (callBack: (status: boolean) => void) => {
  callBack(false);
  return async (dispatch: Dispatch) => {
    try {
      setAxiosToken();
      const res = await axios.get<UserLoginResponse>(`${API_URL}/user/logged`);
      console.log({ logged_user_details: res.data });
      dispatch<LoginSuccessDetails>({
        type: ActionTypes.USER_LOGIN_SUCCESS_DATA,
        payload: {
          data: res.data,
          token: token!,
        },
      });
      callBack(true);
    } catch (error: any) {
      callBack(false);
      console.log("User not: ", { ...error });
      dispatch<LogoutUser>({
        type: ActionTypes.LOGOUT,
      });
    }
  };
};

/**
 * @description Logout the user into the system
 * @returns null
 */
export const FC_Logout = () => {
  return (dispatch: Dispatch) => {
    dispatch<LogoutUser>({
      type: ActionTypes.LOGOUT,
    });
  };
};

/**
 * @description Register the account to the api
 * @param account
 * @param MsgHandler return the error from the API
 * @returns
 */

export interface FC_ChangePassword_Interface {
  user_id: string;
  old_password: string;
  new_password: string;
}

export const FC_ChangePassword = (
  data: FC_ChangePassword_Interface,
  callback: Function
) => {
  return async (dispatch: Dispatch) => {
    try {
      setAxiosToken();

      await axios.patch(`${API_URL}/users/changepassword`, {
        user_id: data.user_id,
        old_password: data.old_password,
        new_password: data.new_password,
      });

      callback(true, "");
    } catch (error) {
      callback(false, "errorToText(error)");
    }
  };
};

/**
 * Edit users documents
 * @param data
 * @param user_id
 * @param callback
 * @returns
 */

export interface FC_ForgetPassword_Interface {
  address: string;
  verify_type: string;
}
/**
 * Send the reset password
 * @param data
 * @param callback
 * @returns
 */
export const FC_ForgetPassword = (
  data: FC_ForgetPassword_Interface,
  callback: Function
) => {
  return async (dispatch: Dispatch) => {
    try {
      setAxiosToken();

      const res = await axios.post<{
        message: string;
        code?: string;
      }>(`${API_URL}/users/password/address`, {
        address: data.address,
        verify_type: data.verify_type,
      });

      console.log({ CODE: res.data.code });

      callback(true, res.data.message);
    } catch (error) {
      callback(false, "errorToText(error)");
    }
  };
};

export interface FC_ForgetPassword_Check_Interface {
  address: string;
  verification_code: string;
  new_password: string;
}
/**
 * Send the new password and update that
 * @param data
 * @param callback
 * @returns
 */
export const FC_ForgetPassword_Check = (
  data: FC_ForgetPassword_Check_Interface,
  callback: Function
) => {
  return async (dispatch: Dispatch) => {
    try {
      setAxiosToken();

      const res = await axios.post<{
        message: string;
      }>(`${API_URL}/users/password/reset`, {
        address: data.address,
        verification_code: data.verification_code,
        new_password: data.new_password,
      });

      callback(true, res.data.message);
    } catch (error) {
      callback(false, "errorToText(error)");
    }
  };
};

export const FC_GetUserById = async (
  user_id: string,
  callBack: (
    loading: boolean,
    response: UserData_Interface | null | string,
    msg: string
  ) => void
) => {
  callBack(true, null, "");
  console.log("User id: ", user_id);
  try {
    const res = await axios.get<UserData_Interface | string>(
      `${API_URL}/user/${user_id}`
    );
    console.log(res);
    if (res.status === 200) {
      if (res.data === "") {
        callBack(false, res.data, "User not found in the database!");
      } else {
        callBack(false, res.data, "");
      }
    } else {
      callBack(false, null, "Error occurred, try again later!");
    }
  } catch (error: any) {
    console.log("Testing my err", error);
    console.log("Testing my err", { ...error });
    callBack(false, null, errorToText(error));
  }
};

export const FC_GetDistricts = async (
  callBack: (status: boolean, res: LocationAPI | null, msg: string) => void
) => {
  callBack(false, null, "");
  try {
    const res = await axios.get<LocationAPI>(`${""}`);
    callBack(true, res.data, "");
  } catch (error: any) {
    callBack(false, null, "Try again!");
  }
};
