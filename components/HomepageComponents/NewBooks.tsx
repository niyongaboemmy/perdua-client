import Image from "next/image";
import Link from "next/link";
import React, { Component } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsArrowRight, BsStarHalf } from "react-icons/bs";
import {
  FC_GetBestSellerBooks,
  FC_GetNewBooksByLimit,
  GetBookInterface,
  ImageFolder,
} from "../../actions/books.action";
import { API_URL } from "../../utils/api";
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
      <div className="hidden md:block">
        {/* <Container> */}
        {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-10">
            <div>
              <div className="text-3xl font-bold">Best seller Books</div>
              <div className="text-gray-500 text-sm">
                List of items that sold more often than anything else in a store
                catalog
              </div>
            </div>
            <div>
              <Link
                href={"/store"}
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
          </div> */}
        {/* <button className="transition delay-75 ease-in-out hover:bg-green-600 transform hover:-translate-y-1 hover:scale-110 bg-blue-600 text-white px-3 py-2 rounded-md mb-3">
            Button A
          </button> */}
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
                <Link
                  href={`/book_details?book=${book.book_id}&product_title=${book.title}&product_image=${book.book_cover}`}
                  key={i + 1}
                  className="group cursor-pointer"
                >
                  <div className="relative" style={{ width: "150px" }}>
                    <div
                      className="w-full rounded-xl object-cover bg-gray-100 animate__animated animate__fadeIn"
                      style={{
                        height: "300px",
                        width: "250px",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={`${API_URL}/${ImageFolder.cover}/${book.book_cover}`}
                        alt={book.title}
                        height={300}
                        width={300}
                        className="rounded-xl group-hover:shadow object-cover min-w-full min-h-full h-auto w-auto transform hover:-translate-y-1 delay-75 hover:delay-150 duration-200 hover:scale-110"
                      />
                    </div>
                    <div className="bg-green-600 text-white px-3 pl-1 rounded-full mt-2 py-1 w-max flex flex-row items-center gap-2">
                      <div>
                        <AiFillStar className=" text-white text-2xl animate__animated animate__rotateIn animate__slower shadow-lg" />
                      </div>
                      <span>Best seller</span>
                    </div>
                    {/* <div className="mt-2 truncate group-hover:text-green-600">
                    {book.title}
                  </div>
                  <div className="flex flex-row items-center gap-0">
                    {[1, 2, 3, 4, 5].map((rating, r) => (
                      <div key={r + 1}>
                        {book.rating !== 0 && book.rating !== 5 ? (
                          <AiFillStar
                            className={`text-lg text-${
                              rating <= book.rating ? "yellow-400" : "gray-300"
                            }`}
                          />
                        ) : (
                          <BsStarHalf className={`text-lg text-yellow-400`} />
                        )}
                      </div>
                    ))}
                  </div> */}
                    {/* <div className="absolute top-1 right-1 flex items-center justify-center p-0 bg-green-600 rounded-full border-2 border-white shadow-md animate-pulse">
                      <AiFillStar className=" text-white text-3xl animate__animated animate__rotateIn animate__slower shadow-lg" />
                    </div> */}
                  </div>
                </Link>
              ))}
          </div>
        )}
        {/* </Container> */}
      </div>
    );
  }
}

export default NewBooks;
