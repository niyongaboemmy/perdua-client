import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { Component } from "react";
import { BsArrowLeft, BsArrowRight, BsStarHalf } from "react-icons/bs";
import { HiBellAlert, HiOutlineBellAlert } from "react-icons/hi2";
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
import { BookItem } from "../BookItem/BookItem";
import Container from "../Container/Container";
import Button from "../FormItems/Button";
import { LoadingBooks } from "./NewBooks";

const NewBooksContent = dynamic(() => import("./NewBooks"));

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
          {this.state.loading === true || this.state.books === null ? (
            <LoadingBooks cols={2} />
          ) : (
            <div className="grid grid-cols-12 gap-5">
              {this.state.loading === false && (
                <div className="col-span-12 lg:col-span-6">
                  <NewBooksContent />
                </div>
              )}
              <div className="col-span-12 lg:col-span-6">
                <div className="col-span-11">
                  <div className="mb-6">
                    <div className="text-3xl font-bold">Coming soon Books</div>
                    <div className="text-gray-500 text-sm">
                      These books are not available right now, but soon
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-2 md:gap-16 lg:gap-14">
                  {this.state.books.map((book, i) => (
                    <>
                      <Link
                        href={`/book_details?book=${book.book_id}&product_title=${book.title}&product_image=${book.book_cover}`}
                        key={i + 1}
                        className="col-span-6 md:col-span-4 lg:col-span-4 group cursor-pointer relative bg-gray-10 rounded-xl border border-white hover:border-gray-300"
                        title={book.title}
                        data-aos="zoom-in-up"
                      >
                        <BookItem
                          item={book}
                          onClick={() => {}}
                          hide_price={true}
                        />
                      </Link>
                    </>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default BooksByAvailability;
