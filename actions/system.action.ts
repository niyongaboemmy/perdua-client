import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import { API_URL } from "../utils/api";
import { errorToText } from "../utils/functions";
import { setAxiosToken } from "../utils/AxiosToken";

export interface BookCategory {
  category_id: string;
  category_name: string;
}

export interface BookLanguage {
  language_id: string;
  language_code: string;
  language_name: string;
}

export interface BookPublishers {
  publisher_id: string;
  publisher_name: string;
}

export interface BookAuthor {
  author_id: string;
  author_name: string;
  author_pic: string;
  phone: string;
  email: string;
}

export interface BookLevel {
  level_id: string;
  level: string;
}

export interface BookTheme {
  theme_id: string;
  theme: string;
}

export interface SystemBasicInfo {
  categories: BookCategory[];
  languages: BookLanguage[];
  publishers: BookPublishers[];
  authors: BookAuthor[];
  level: BookLevel[];
}

export interface GetBasicSystemInfoAction {
  type: ActionTypes.GET_SYSTEM_BASIC_INFO;
  payload: SystemBasicInfo;
}

export interface SystemBasicInfoData {
  basic_info: SystemBasicInfo | null;
}

export const FC_GetBasicSystemInfo = (
  callBack: (
    loading: boolean,
    res: { type: "success" | "error"; msg: string } | null
  ) => void
) => {
  callBack(true, null);
  return async (dispatch: Dispatch) => {
    setAxiosToken();
    try {
      const res = await axios.get<SystemBasicInfo>(
        `${API_URL}/basics/book/data`
      );
      console.log({ basic_info: res.data });
      dispatch<GetBasicSystemInfoAction>({
        type: ActionTypes.GET_SYSTEM_BASIC_INFO,
        payload: res.data,
      });
      callBack(false, {
        type: "success",
        msg: "Data loaded successfully!",
      });
    } catch (error: any) {
      console.log("Login err: ", { ...error });
      console.log("Login err: ", error);
      // callBack(false, errorToText(error));
      callBack(false, { type: "error", msg: errorToText(error) });
    }
  };
};

export const GetBookCategoryById = (
  category_id: string,
  systemBasicInfo: SystemBasicInfo
): BookCategory | null => {
  const selectedBookCategory =
    systemBasicInfo.categories.length === 0
      ? undefined
      : systemBasicInfo.categories.find(
          (itm) => itm.category_id.toString() === category_id.toString()
        );
  return selectedBookCategory !== undefined ? selectedBookCategory : null;
};

export const GetBookLanguageById = (
  language_id: string,
  systemBasicInfo: SystemBasicInfo
): BookLanguage | null => {
  const selectedBookLanguage =
    systemBasicInfo.languages.length === 0
      ? undefined
      : systemBasicInfo.languages.find(
          (itm) => itm.language_id.toString() === language_id.toString()
        );
  return selectedBookLanguage !== undefined ? selectedBookLanguage : null;
};

export const GetBookPublisherById = (
  publisher_id: string,
  systemBasicInfo: SystemBasicInfo
): BookPublishers | null => {
  const selectedBookPublisher =
    systemBasicInfo.publishers.length === 0
      ? undefined
      : systemBasicInfo.publishers.find(
          (itm) => itm.publisher_id.toString() === publisher_id.toString()
        );
  return selectedBookPublisher !== undefined ? selectedBookPublisher : null;
};

export const GetBookAuthorsByIds = (
  author_ids: string[],
  systemBasicInfo: SystemBasicInfo
): BookAuthor[] => {
  const response: BookAuthor[] = [];
  if (systemBasicInfo.authors.length > 0) {
    for (const item of author_ids) {
      const author = systemBasicInfo.authors.find(
        (itm) => itm.author_id.toString() === item.toString()
      );
      if (author !== undefined) {
        response.push(author);
      }
    }
  }
  return response;
};

export const GetBookLevelsByIds = (
  level_ids: string[],
  systemBasicInfo: SystemBasicInfo
): BookLevel[] => {
  const response: BookLevel[] = [];
  if (systemBasicInfo.level.length > 0) {
    for (const item of level_ids) {
      const level = systemBasicInfo.level.find(
        (itm) => itm.level_id.toString() === item.toString()
      );
      if (level !== undefined) {
        response.push(level);
      }
    }
  }
  return response;
};

export const GetBookThemesByIds = (
  theme_ids: string[],
  themes: BookTheme[]
): BookTheme[] => {
  const response: BookTheme[] = [];
  if (themes.length > 0) {
    for (const item of theme_ids) {
      const level = themes.find(
        (itm) => itm.theme_id.toString() === item.toString()
      );
      if (level !== undefined) {
        response.push(level);
      }
    }
  }
  return response;
};
