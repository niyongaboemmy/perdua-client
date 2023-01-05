import { Action, ActionTypes, SystemBasicInfoData } from "../actions";
// default state
const defaultState: SystemBasicInfoData = {
  basic_info: null,
};

/**
 * this is the
 * @param state
 * @param action
 * @returns
 */
export const systemBasicInfoReducer = (
  state: SystemBasicInfoData = defaultState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.GET_SYSTEM_BASIC_INFO:
      return {
        ...state,
        basic_info: action.payload,
      };
    default:
      return state;
  }
};
