import axios from "axios";
import { AuthorSocialMedia } from "../components/RegisterAuthor/RegisterAuthor";
import { API_URL } from "../utils/api";
import { setAxiosToken } from "../utils/AxiosToken";
import { errorToText } from "../utils/functions";

export enum AuthorType {
  AUTHOR = "AUTHOR",
  ILLUSTRATOR = "ELLINSTRATOR",
}

export interface RegisterAuthorData {
  author_name: string;
  social_media: AuthorSocialMedia;
  author_pic: File;
  phone: string;
  email: string;
  bibliography: string;
  type: AuthorType;
}

export interface UpdateAuthorData {
  author_id: string;
  author_name: string;
  social_media: AuthorSocialMedia;
  author_pic: File | null;
  phone: string;
  email: string;
  bibliography: string;
  type: AuthorType;
}

export interface AuthorGetInterface {
  author_id: string;
  author_name: string;
  social_media: string;
  author_pic: string;
  phone: string;
  email: string;
  bibliography: string;
  type: AuthorType;
}

export const FC_RegisterAuthor = async (
  data: RegisterAuthorData,
  callback: (
    loading: boolean,
    res: { type: "success" | "error"; msg: string } | null
  ) => void
) => {
  const formData = new FormData();
  formData.append("author_name", data.author_name);
  formData.append("social_media", JSON.stringify(data.social_media));
  formData.append("author_pic", data.author_pic);
  formData.append("phone", data.phone);
  formData.append("email", data.email);
  formData.append("bibliography", data.bibliography);
  formData.append("type", data.type);
  callback(true, null);
  try {
    setAxiosToken();
    await axios.post(`${API_URL}/authors/register`, formData);
    callback(false, {
      type: "success",
      msg: "Author has registered successfully!",
    });
  } catch (error) {
    callback(false, {
      type: "error",
      msg: errorToText(error),
    });
  }
};

// Get authors
export const FC_GetAuthorsList = async (
  callBack: (
    loading: boolean,
    res: {
      type: "success" | "error";
      msg: string;
      data: AuthorGetInterface[];
    } | null
  ) => void
) => {
  callBack(true, null);
  setAxiosToken();
  try {
    const res = await axios.get<AuthorGetInterface[]>(`${API_URL}/authors`);
    console.log({ authors: res.data });
    callBack(false, {
      type: "success",
      msg: "Data loaded successfully!",
      data: res.data,
    });
  } catch (error: any) {
    console.log("err: ", { ...error });
    callBack(false, { type: "error", msg: errorToText(error), data: [] });
  }
};

export const FC_UpdateAuthorDetails = async (
  data: UpdateAuthorData,
  callback: (
    loading: boolean,
    res: { type: "success" | "error"; msg: string } | null
  ) => void
) => {
  const formData = new FormData();
  formData.append("author_id", data.author_id);
  formData.append("author_name", data.author_name);
  formData.append("social_media", JSON.stringify(data.social_media));
  formData.append(
    "author_pic",
    data.author_pic === null ? "" : data.author_pic
  );
  formData.append("phone", data.phone);
  formData.append("email", data.email);
  formData.append("bibliography", data.bibliography);
  formData.append("type", data.type);
  callback(true, null);
  try {
    setAxiosToken();
    await axios.patch(`${API_URL}/authors/data`, formData);
    callback(false, {
      type: "success",
      msg: "Author has updated successfully!",
    });
  } catch (error) {
    callback(false, {
      type: "error",
      msg: errorToText(error),
    });
  }
};
