import { combineReducers } from "redux";
import { Auth, SystemBasicInfoData } from "../actions";
import { authReducer } from "./auth.reducer";
import { systemBasicInfoReducer } from "./system.reducer";

// define the entire state into the entire side
export interface StoreState {
  auth: Auth;
  systemBasicInfo: SystemBasicInfoData;
}

export const reducers = combineReducers<StoreState>({
  auth: authReducer,
  systemBasicInfo: systemBasicInfoReducer,
});
