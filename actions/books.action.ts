import axios from "axios";
import { API_URL } from "../utils/api";
import { setAxiosToken } from "../utils/AxiosToken";
import { errorToText } from "../utils/functions";

export interface BookInterface {}
export interface RegisterBookData {
  language_id: string;
  category_id: string;
  publisher_id: string;
  title: string;
  short_description: string;
  isbn: string;
  num_pages: string;
  book_cover: File | null;
  availability: BookAvailability;
  publication_date: string;
  authors: string[];
  price: number;
}

export interface GetBookInterface {
  availability: BookAvailability;
  book_authors: string[];
  book_cover: string;
  book_id: string;
  category_id: string;
  isbn: string;
  language_id: string;
  num_pages: number;
  price: number;
  publication_date: string;
  publisher_id: string;
  short_description: string;
  title: string;
  rating: number;
}

export interface BookAuthorDetails {
  author_id: string;
  author_name: string;
  author_pic: string;
  book_id: string;
  email: string;
  phone: string;
  social_media: string;
}

export interface BookPriceDetails {
  book_id: string;
  price: number;
  status: 1 | 0;
}

export interface GetBookDetailsInterface {
  availability: BookAvailability;
  book_authors: BookAuthorDetails[];
  book_cover: string;
  book_id: string;
  book_prices: BookPriceDetails[];
  category_id: string;
  category_name: string;
  isbn: string;
  language_code: string;
  language_id: string;
  language_name: string;
  num_pages: number;
  publication_date: string;
  publisher_id: string;
  publisher_name: string;
  short_description: string;
  title: string;
  rating: number;
}

export enum ImageFolder {
  cover = "cover",
  author = "author",
}
export enum BookAvailability {
  IN_STOCK = "IN_STOCK",
  OUT_STOCK = "OUT_STOCK",
}

export const FC_RegisterBook = async (
  data: RegisterBookData,
  callback: (
    loading: boolean,
    res: { type: "success" | "error"; msg: string } | null
  ) => void
) => {
  const formData = new FormData();
  formData.append("authors", JSON.stringify(data.authors));
  formData.append("language_id", data.language_id);
  formData.append("category_id", data.category_id);
  formData.append("publisher_id", data.publisher_id);
  formData.append("title", data.title);
  formData.append("short_description", data.short_description);
  formData.append("isbn", data.isbn);
  formData.append("num_pages", data.num_pages);
  formData.append(
    "book_cover",
    data.book_cover === null ? "" : data.book_cover
  );
  formData.append("availability", data.availability);
  formData.append("publication_date", data.publication_date);
  formData.append("price", data.price.toString());
  callback(true, null);
  try {
    setAxiosToken();
    await axios.post(`${API_URL}/books/register`, formData);
    callback(false, {
      type: "success",
      msg: "Book has registered successfully!",
    });
  } catch (error) {
    callback(false, {
      type: "error",
      msg: errorToText(error),
    });
  }
};

// Get books list by language
export const FC_GetBooksByLanguage = async (
  language_id: string,
  callBack: (
    loading: boolean,
    res: {
      type: "success" | "error";
      msg: string;
      data: GetBookInterface[];
    } | null
  ) => void
) => {
  callBack(true, null);
  setAxiosToken();
  try {
    const res = await axios.get<GetBookInterface[]>(
      `${API_URL}/books/language/${language_id}`
    );
    console.log({ books_by_language: res.data });
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

// Get book details by BOOK ID
export const FC_GetBookDetailsById = async (
  book_id: string,
  callBack: (
    loading: boolean,
    res: {
      type: "success" | "error";
      msg: string;
      data: GetBookDetailsInterface | null;
    } | null
  ) => void
) => {
  callBack(true, null);
  setAxiosToken();
  try {
    const res = await axios.get<GetBookDetailsInterface[]>(
      `${API_URL}/books/detail/${book_id}`
    );
    console.log({ book_details: res.data });
    callBack(false, {
      type: "success",
      msg: "Data loaded successfully!",
      data: res.data.length > 0 ? res.data[0] : null,
    });
  } catch (error: any) {
    console.log("err: ", { ...error });
    callBack(false, { type: "error", msg: errorToText(error), data: null });
  }
};

// Get upcoming books with limit
export const FC_GetNewBooksByLimit = async (
  limit: number,
  callBack: (
    loading: boolean,
    res: {
      type: "success" | "error";
      msg: string;
      data: GetBookInterface[];
    } | null
  ) => void
) => {
  callBack(true, null);
  setAxiosToken();
  try {
    const res = await axios.get<GetBookInterface[]>(
      `${API_URL}/books/limited/${limit}`
    );
    console.log({ books_by_limit: res.data });
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

// Get upcoming books with language, category, and limit
export const FC_GetNewBooksByLanguageAndCategoryAndLimit = async (
  data: {
    language_id: string;
    category_id: string;
    limit: number;
  },
  callBack: (
    loading: boolean,
    res: {
      type: "success" | "error";
      msg: string;
      data: GetBookInterface[];
    } | null
  ) => void
) => {
  callBack(true, null);
  setAxiosToken();
  try {
    const res = await axios.get<GetBookInterface[]>(
      `${API_URL}/books/langcat/${data.language_id}/${data.category_id}/${data.limit}`
    );
    console.log({ books_by_limit: res.data });
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
