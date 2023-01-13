import Image from "next/image";
import Link from "next/link";
import React, { Component } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsArrowRight, BsStarHalf } from "react-icons/bs";
import { IoReaderOutline } from "react-icons/io5";
import {
  FC_GetBestSellerBooks,
  FC_GetNewBooksByLimit,
  GetBookInterface,
  ImageFolder,
} from "../../actions/books.action";
import { API_URL } from "../../utils/api";
import { commaFy } from "../../utils/functions";
import Container from "../Container/Container";
import Loading from "../Loading/Loading";

export const LoadingBooks = (props: { cols: number }) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      {[1, 2, 3, 4, 5, 6].map((count, i) => (
        <div
          key={i + 1}
          className={`col-span-6 md:col-span-3 lg:col-span-${
            props.cols
          } h-64 rounded-md bg-white animate__animated animate__fadeIn animate__infinite ${
            i % 2 !== 0 ? "animate__slower" : "animate__slow"
          }`}
        >
          <div className="bg-gray-100 rounded-lg h-44 mb-4"></div>
          <div className="bg-gray-100 rounded-lg h-4 mb-3"></div>
          <div className="bg-gray-100 rounded-lg h-2 mb-3 w-3/4"></div>
        </div>
      ))}
    </div>
  );
};

interface NewBooksProps {}
interface NewBooksState {
  loading: boolean;
  error: string;
  books: GetBookInterface[] | null;
}

class NewBooks extends Component<NewBooksProps, NewBooksState> {
  constructor(props: NewBooksProps) {
    super(props);

    this.state = {
      loading: false,
      error: "",
      books: null,
    };
  }
  GetBooksListByLanguage = () => {
    this.state.loading === false && this.setState({ loading: true });
    FC_GetBestSellerBooks(
      1,
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
    this.state.books === null && this.GetBooksListByLanguage();
  };
  render() {
    return (
      <div className="">
        {this.state.loading === true || this.state.books === null ? (
          <Loading className="bg-white" />
        ) : (
          <div className="">
            {this.state.books
              .filter(
                (itm) =>
                  this.state.books !== null &&
                  this.state.books.length > 0 &&
                  itm.book_id === this.state.books[0].book_id
              )
              .map((book, i) => (
                <div key={i + 1} className="group">
                  <div className="grid grid-cols-12 gap-6 mb-12 md:mb-12 lg:mb-0">
                    <div className="col-span-12">
                      <div className="">
                        <div className="flex flex-row items-center gap-2">
                          <div className="bg-green-600 text-white p-1 rounded-full w-max flex flex-row items-center">
                            <div>
                              <AiFillStar className=" text-white text-2xl animate__animated animate__rotateIn animate__slower shadow-lg" />
                            </div>
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-">
                              Best seller Book
                            </div>
                            <div className="text-sm text-gray-600">
                              The top book which frequently sold in the stock
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-span-12 md:col-span-4 relative"
                      // style={{ width: "150px" }}
                    >
                      <div className="w-full rounded-xl object-cover bg-gray-100 animate__animated animate__fadeIn">
                        <Image
                          src={`${API_URL}/${ImageFolder.cover}/${book.book_cover}`}
                          alt={book.title}
                          height={300}
                          width={300}
                          className="rounded-xl group-hover:shadow object-cover min-w-full min-h-full h-auto w-auto transform hover:-translate-y-1 delay-75 hover:delay-150 duration-200 hover:scale-110"
                        />
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                      <div className="text-xl font-bold text-black">
                        {book.title}
                      </div>
                      <div className="flex flex-col mt-3">
                        <div className="text-sm text-gray-500 truncate">
                          Description
                        </div>
                        <div className="text-sm font-semibold truncate">
                          {book.short_description}
                        </div>
                      </div>
                      <div className="flex flex-col mt-3">
                        <span className="text-sm text-gray-500">
                          Publication year
                        </span>
                        <div className="text-sm font-semibold">
                          {book.publication_date}
                        </div>
                      </div>
                      <div className="flex flex-col mt-3">
                        <span className="text-sm text-gray-500">
                          Page numbers
                        </span>
                        <div className="text-sm font-semibold">
                          {commaFy(book.num_pages)}
                        </div>
                      </div>
                      <div className="flex flex-col mt-6">
                        <Link
                          href={`/book_details?book=${book.book_id}&product_title=${book.title}&product_image=${book.book_cover}`}
                        >
                          <div className="bg-green-600 text-white flex flex-row items-center justify-center gap-2 w-max p-2 pr-3 rounded-md">
                            <div>
                              <IoReaderOutline className="text-2xl" />
                            </div>
                            <span>More details</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
        {/* </Container> */}
      </div>
    );
  }
}

export default NewBooks;
