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
  quantity: number;
  theme: string | null;
  level: string[];
}

export interface UpdateBookData {
  book_id: string;
  language_id: string;
  category_id: string;
  publisher_id: string;
  title: string;
  short_description: string;
  isbn: string;
  num_pages: string;
  book_cover: string;
  availability: BookAvailability;
  publication_date: string;
  authors: string[];
  price: number;
  quantity: number;
  theme: string | null;
  level: string[];
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
  best_sell: boolean;
  quantity: number;
  theme: string | null;
  level: string[];
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
  best_sell: boolean;
  quantity: number;
  theme: string | null;
  book_level: string[];
}

export enum ImageFolder {
  cover = "cover",
  author = "author",
}
export enum BookAvailability {
  IN_STOCK = "IN_STOCK",
  OUT_STOCK = "OUT_STOCK",
  COMING_SOON = "COMING_SOON",
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

// Get books by language and limit
export const FC_GetBooksByLanguageLimit = async (
  language_id: string,
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
      `${API_URL}/books/langlim/${language_id}/${limit}`
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

// Get upcoming books with language, category, and limit
export const FC_GetBooksByKeyword = async (
  search_data: string,
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
      `${API_URL}/books/search/title/${search_data}`
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

// Submit Book Review
export const FC_SubmitBookReview = async (
  data: {
    book_id: string;
    review: string;
    rating: number;
  },
  callBack: (
    loading: boolean,
    res: {
      type: "success" | "error";
      msg: string;
    } | null
  ) => void
) => {
  console.log("Submitted data: ", data);
  callBack(true, null);
  setAxiosToken();
  try {
    const res = await axios.post(`${API_URL}/books/review`, data);
    console.log({ submit_review: res.data });
    callBack(false, {
      type: "success",
      msg: "Review submitted successfully!",
    });
  } catch (error: any) {
    console.log("err: ", { ...error });
    callBack(false, { type: "error", msg: errorToText(error) });
  }
};

export const FC_UpdateBookDetails = async (
  data: UpdateBookData,
  callback: (
    loading: boolean,
    res: { type: "success" | "error"; msg: string } | null
  ) => void
) => {
  callback(true, null);
  try {
    setAxiosToken();
    await axios.patch(`${API_URL}/books/data`, data);
    callback(false, {
      type: "success",
      msg: "Book has updated successfully!",
    });
  } catch (error) {
    callback(false, {
      type: "error",
      msg: errorToText(error),
    });
  }
};

export const FC_UpdateBookPrice = async (
  data: {
    book_id: string;
    book_price: number;
  },
  callback: (
    loading: boolean,
    res: { type: "success" | "error"; msg: string } | null
  ) => void
) => {
  callback(true, null);
  try {
    setAxiosToken();
    await axios.patch(`${API_URL}/books/price`, {
      book_id: data.book_id,
      price: data.book_price,
    });
    callback(false, {
      type: "success",
      msg: "Book has updated successfully!",
    });
  } catch (error) {
    callback(false, {
      type: "error",
      msg: errorToText(error),
    });
  }
};

export const FC_RemoveBook = async (
  book_id: string,
  callback: (
    loading: boolean,
    res: { type: "success" | "error"; msg: string } | null
  ) => void
) => {
  callback(true, null);
  try {
    setAxiosToken();
    await axios.delete(`${API_URL}/books/${book_id}`);
    callback(false, {
      type: "success",
      msg: "Book has deleted successfully!",
    });
  } catch (error) {
    callback(false, {
      type: "error",
      msg: errorToText(error),
    });
  }
};

export const FC_AddBookAuthor = async (
  data: {
    book_id: string;
    author_id: number;
  },
  callback: (
    loading: boolean,
    res: { type: "success" | "error"; msg: string } | null
  ) => void
) => {
  callback(true, null);
  try {
    setAxiosToken();
    await axios.post(`${API_URL}/books/author`, {
      book_id: data.book_id,
      author_id: data.author_id,
    });
    callback(false, {
      type: "success",
      msg: "Book author has added successfully!",
    });
  } catch (error) {
    callback(false, {
      type: "error",
      msg: errorToText(error),
    });
  }
};

export const FC_UpdateBookCoverImage = async (
  data: {
    book_id: string;
    book_cover: File;
  },
  callback: (
    loading: boolean,
    res: { type: "success" | "error"; msg: string } | null
  ) => void
) => {
  callback(true, null);
  try {
    setAxiosToken();
    const formData = new FormData();
    formData.append("book_id", data.book_id);
    formData.append("book_cover", data.book_cover);
    await axios.patch(`${API_URL}/books/cover`, formData);
    callback(false, {
      type: "success",
      msg: "Book cover has updated successfully!",
    });
  } catch (error) {
    callback(false, {
      type: "error",
      msg: errorToText(error),
    });
  }
};

// Get upcoming books with language, category, and limit
export const FC_GetBooksByAvailability = async (
  availability: BookAvailability,
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
      `${API_URL}/books/availability/${availability}`
    );
    console.log({ books_by_availability: res.data });
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
