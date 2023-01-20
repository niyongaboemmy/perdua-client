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
  side: "LEFT" | "RIGHT";
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
      3,
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

  DescriptionComponent = (props: {}) => {
    return (
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-10">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* <div>
            <AiOutlineRead className="text-gray-300 text-4xl" />
          </div> */}
          <div>
            <div className="text-3xl font-bold">
              {this.props.language.language_name} books
            </div>
            <div className="text-gray-500 text-sm mb-5 mt-4">
              {this.props.language.description}
            </div>
            <Link
              href={`/store?language_id=${this.props.language.language_id}&language_name=${this.props.language.language_name}`}
              className="flex flex-row items-center justify-center gap-2 border border-gray-400 hover:border-green-600 hover:bg-white hover:text-green-700 p-2 pl-4 rounded-md text-base font-semibold cursor-pointer w-max"
            >
              <span>View all books</span>
              <div>
                <div className="bg-green-600 text-white flex items-center justify-center h-6 w-6 rounded-full animate__animated animate__zoomIn">
                  <BsArrowRight className="text-lg" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
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
      <Container className="bg-white py-6 md:py-14 lg:py-20 my-3">
        <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-12">
          {this.props.side === "LEFT" && (
            <div className="col-span-12 md:col-span-12 lg:col-span-5">
              <this.DescriptionComponent />
            </div>
          )}
          <div className="col-span-12 md:col-span-12 lg:col-span-7">
            <div className="grid grid-cols-12 gap-2 md:gap-6 lg:gap-12">
              {this.state.books.map((book, i) => (
                <Link
                  href={`/book_details?book=${book.book_id}&product_title=${book.title}&product_image=${book.book_cover}`}
                  key={i + 1}
                  className={`col-span-6 md:col-span-4 lg:col-span-4 group cursor-pointer relative`}
                >
                  <BookItem
                    item={book}
                    onClick={() => {}}
                    hide_price={true}
                    height_pixels={"280px"}
                    className={"border-2 hover:shadow-xl"}
                  />
                </Link>
              ))}
            </div>
          </div>
          {this.props.side === "RIGHT" && (
            <div className="col-span-12 md:col-span-12 lg:col-span-5">
              <this.DescriptionComponent />
            </div>
          )}
        </div>
      </Container>
    );
  }
}

export default BooksByLanguageContainer;
