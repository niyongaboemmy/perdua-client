import Image from "next/image";
import Link from "next/link";
import React, { Component } from "react";
import { AiFillStar, AiOutlineShoppingCart } from "react-icons/ai";
import { BsArrowLeft, BsArrowRight, BsStarHalf } from "react-icons/bs";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdLanguage } from "react-icons/md";
import { RiBook3Line, RiTimerFlashFill } from "react-icons/ri";
import {
  GetBookCategoryById,
  GetBookLanguageById,
  SystemBasicInfo,
} from "../../actions";
import {
  BookAvailability,
  FC_GetBooksByAvailability,
  GetBookInterface,
  ImageFolder,
} from "../../actions/books.action";
import { API_URL } from "../../utils/api";
import Container from "../Container/Container";
import { LoadingBooks } from "./NewBooks";

interface BooksByAvailabilityProps {
  systemBasicInfo: SystemBasicInfo;
}
interface BooksByAvailabilityState {
  loading: boolean;
  error: string;
  books: GetBookInterface[] | null;
}

class BooksByAvailability extends Component<
  BooksByAvailabilityProps,
  BooksByAvailabilityState
> {
  constructor(props: BooksByAvailabilityProps) {
    super(props);

    this.state = {
      loading: false,
      error: "",
      books: null,
    };
  }
  GetBooksListByAvailability = () => {
    this.state.loading === false && this.setState({ loading: true });
    FC_GetBooksByAvailability(
      BookAvailability.COMING_SOON,
      (
        loading: boolean,
        res: {
          type: "success" | "error";
          msg: string;
          data: GetBookInterface[];
        } | null
      ) => {
        this.setState({ loading: loading });
        if (res !== null && res.type === "error") {
          this.setState({ error: res.msg, books: res.data, loading: false });
        }
        if (res !== null && res.type === "success") {
          this.setState({ error: "", books: res.data, loading: false });
        }
      }
    );
  };
  componentDidMount = () => {
    this.state.books === null && this.GetBooksListByAvailability();
  };
  render() {
    if (
      this.state.books !== null &&
      this.state.loading === false &&
      this.state.books.length === 0
    ) {
      return <div></div>;
    }
    return (
      <div className="py-20 bg-white mt-12 md:mt-0">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-10">
            <div>
              <div className="text-3xl font-bold">Coming soon Books</div>
              <div className="text-gray-500 text-sm">
                These books are not available right now, but soon
              </div>
            </div>
            <div>
              <Link
                href={"/store"}
                className="flex flex-row items-center justify-center gap-2 bg-gray-50 hover:bg-green-100 hover:text-green-700 p-2 pl-4 rounded-md text-base font-semibold cursor-pointer w-max"
              >
                <span>Visit store</span>
                <div>
                  <div className="bg-green-600 text-white flex items-center justify-center h-8 w-8 rounded-full animate__animated animate__zoomIn">
                    <BsArrowRight className="text-xl" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {this.state.loading === true || this.state.books === null ? (
            <LoadingBooks cols={2} />
          ) : (
            <div className="grid grid-cols-12 gap-5">
              {this.state.books.map((book, i) => (
                <Link
                  href={`/book_details?book=${book.book_id}&product_title=${book.title}&product_image=${book.book_cover}`}
                  key={i + 1}
                  className="col-span-12 md:col-span-12 lg:col-span-6 group cursor-pointer relative bg-gray-10 rounded-xl bg-gray-100 hover:bg-green-50"
                  title={book.title}
                >
                  <div className="grid grid-cols-12 gap-2">
                    <div
                      className="col-span-12 md:col-span-4 w-full rounded-l-xl bg-gray-100 animate__animated animate__fadeIn"
                      style={{ height: "170px", overflow: "hidden" }}
                    >
                      <Image
                        src={`${API_URL}/${ImageFolder.cover}/${book.book_cover}`}
                        alt={book.title}
                        height={300}
                        width={300}
                        className="rounded-l-xl rounded-r-xl md:rounded-r-none group-hover:shadow object-cover min-w-full min-h-full h-auto w-auto transform group-hover:-translate-y-1 delay-75 group-hover:delay-150 duration-200 group-hover:scale-110"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-8 p-2 md:p-3 text-sm">
                      <div className="flex flex-row items-center gap-2">
                        <div className="text-xl font-bold truncate group-hover:text-green-600">
                          {book.title}
                        </div>
                      </div>
                      <div className="my-1 text-gray-500 truncate">
                        {book.short_description}
                      </div>
                      <div className="mt-0  truncate">
                        Language:{" "}
                        <span className="font-semibold">
                          {
                            GetBookLanguageById(
                              book.language_id,
                              this.props.systemBasicInfo
                            )?.language_name
                          }
                        </span>
                      </div>
                      <div className="mt-0  truncate">
                        Category:{" "}
                        <span className="font-semibold">
                          {
                            GetBookCategoryById(
                              book.category_id,
                              this.props.systemBasicInfo
                            )?.category_name
                          }
                        </span>
                      </div>
                      <div className="flex flex-row items-center gap-1 bg-white p-0 mt-2 w-max rounded-full pr-3">
                        <RiTimerFlashFill className="text-green-600 text-2xl" />
                        <div className="font-bold  text-sm text-green-600">
                          Coming soon
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default BooksByAvailability;
