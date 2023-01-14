import Image from "next/image";
import Link from "next/link";
import React, { Component } from "react";
import { AiFillStar, AiOutlineRead } from "react-icons/ai";
import { BsArrowRight, BsStarHalf } from "react-icons/bs";
import { BookLanguage } from "../../actions";
import {
  FC_GetBooksByLanguageLimit,
  GetBookInterface,
  ImageFolder,
} from "../../actions/books.action";
import { API_URL } from "../../utils/api";
import { BookItem } from "../BookItem/BookItem";
import Container from "../Container/Container";
import { LoadingBooks } from "./NewBooks";

interface BooksByLanguageContainerProps {
  language: BookLanguage;
}
interface BooksByLanguageContainerState {
  loading: boolean;
  error: string;
  books: GetBookInterface[] | null;
}

export class BooksByLanguageContainer extends Component<
  BooksByLanguageContainerProps,
  BooksByLanguageContainerState
> {
  constructor(props: BooksByLanguageContainerProps) {
    super(props);

    this.state = {
      loading: false,
      books: null,
      error: "",
    };
  }

  GetBooksListByLanguage = (language_id: string) => {
    this.setState({ loading: true });
    FC_GetBooksByLanguageLimit(
      language_id,
      5,
      (
        loading: boolean,
        res: {
          type: "success" | "error";
          msg: string;
          data: GetBookInterface[];
        } | null
      ) => {
        if (res !== null && res.type === "error") {
          this.setState({
            error: res.msg,
            books: res.data,
            loading: false,
          });
        }
        if (res !== null && res.type === "success") {
          this.setState({
            error: "",
            books: res.data,
            loading: false,
          });
        }
      }
    );
  };
  componentDidMount = () => {
    this.state.books === null &&
      this.GetBooksListByLanguage(this.props.language.language_id);
  };

  render() {
    if (this.state.loading === true || this.state.books === null) {
      return (
        <Container className="bg-white my-2 py-6">
          <LoadingBooks cols={2} />
        </Container>
      );
    }
    return (
      <Container className="bg-white py-6 md:py-14 my-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-10">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div>
              <AiOutlineRead className="text-gray-300 text-4xl" />
            </div>
            <div>
              <div className="text-3xl font-bold">
                {this.props.language.language_name} books
              </div>
              <div className="text-gray-500 text-sm">
                List of books that are found in{" "}
                {this.props.language.language_name} category
              </div>
            </div>
          </div>
          <div>
            <Link
              href={`/store?language_id=${this.props.language.language_id}&language_name=${this.props.language.language_name}`}
              className="flex flex-row items-center justify-center gap-2 bg-gray-50 hover:bg-green-100 hover:text-green-700 p-2 pl-4 rounded-md text-base font-semibold cursor-pointer w-max"
            >
              <span>View all books</span>
              <div>
                <div className="bg-green-600 text-white flex items-center justify-center h-8 w-8 rounded-full animate__animated animate__zoomIn">
                  <BsArrowRight className="text-xl" />
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-10 gap-2 md:gap-16">
          {this.state.books.map((book, i) => (
            <Link
              href={`/book_details?book=${book.book_id}&product_title=${book.title}&product_image=${book.book_cover}`}
              key={i + 1}
              className="col-span-5 md:col-span-3 lg:col-span-2 group cursor-pointer relative"
            >
              <BookItem item={book} onClick={() => {}} hide_price={true} />
            </Link>
          ))}
        </div>
      </Container>
    );
  }
}

export default BooksByLanguageContainer;
