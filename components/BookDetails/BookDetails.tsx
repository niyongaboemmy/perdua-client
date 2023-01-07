import Image from "next/image";
import React, { Component } from "react";
import { BsArrowLeft, BsArrowRight, BsStarHalf } from "react-icons/bs";
import { commaFy } from "../../utils/functions";
import Container from "../Container/Container";
import ADS_IMAGE from "../../assets/catalogue.jpeg";
import { AiFillStar, AiOutlineShoppingCart } from "react-icons/ai";
import { BookReview } from "./BookReview";
import Link from "next/link";
import { BookItem } from "../BookItem/BookItem";
import {
  BookAvailability,
  FC_GetBookDetailsById,
  FC_GetNewBooksByLanguageAndCategoryAndLimit,
  GetBookDetailsInterface,
  GetBookInterface,
  ImageFolder,
} from "../../actions/books.action";
import Loading from "../Loading/Loading";
import { API_URL } from "../../utils/api";
import { MdLanguage } from "react-icons/md";
import { RiBook3Line } from "react-icons/ri";
import { IoPricetagsOutline } from "react-icons/io5";
import { LoadingBooks } from "../HomepageComponents/NewBooks";

const LoadingBillItem = () => {
  return (
    <div className="col-span-12 lg:col-span-6 flex flex-row items-center gap-6 w-full">
      <div>
        <div className="bg-gray-100 rounded-xl h-12 w-12 flex items-center justify-center"></div>
      </div>
      <div className="flex flex-col w-full">
        <div className="text-sm h-3 bg-gray-100 mb-2 rounded-full"></div>
        <div className="font-bold hover:underline bg-gray-100 h-5 rounded-full"></div>
      </div>
    </div>
  );
};

interface BookDetailsProps {
  book_id: string;
  openContactUs: (status: boolean) => void;
  pushPath: (path: string) => void;
  type?: "details" | "preview";
}

interface BookDetailsState {
  book_review: boolean;
  loading: boolean;
  error: string;
  book_details: GetBookDetailsInterface | null;
  loading_related: boolean;
  related_books: GetBookInterface[] | null;
}

export class BookDetails extends Component<BookDetailsProps, BookDetailsState> {
  constructor(props: BookDetailsProps) {
    super(props);

    this.state = {
      book_review: false,
      loading: false,
      error: "",
      book_details: null,
      loading_related: false,
      related_books: null,
    };
  }
  GetBookDetailsById = (book_id: string) => {
    this.state.loading === false && this.setState({ loading: true });
    FC_GetBookDetailsById(
      book_id,
      (
        loading: boolean,
        res: {
          type: "success" | "error";
          msg: string;
          data: GetBookDetailsInterface | null;
        } | null
      ) => {
        this.setState({ loading: loading });
        if (res !== null && res.type === "error") {
          this.setState({
            error: res.msg,
            book_details: res.data,
            loading: false,
          });
        }
        if (res !== null && res.type === "success") {
          this.setState({ error: "", book_details: res.data, loading: false });
          res.data !== null &&
            this.props.type !== "preview" &&
            this.GetRelatedBooks(res.data);
        }
      }
    );
  };

  // Loading related books
  GetRelatedBooks = (data: GetBookDetailsInterface) => {
    this.state.loading_related === false &&
      this.setState({ loading_related: true });
    FC_GetNewBooksByLanguageAndCategoryAndLimit(
      {
        language_id: data.language_id,
        category_id: data.category_id,
        limit: 8,
      },
      (
        loading: boolean,
        res: {
          type: "success" | "error";
          msg: string;
          data: GetBookInterface[];
        } | null
      ) => {
        this.setState({ loading_related: loading });
        if (res !== null && res.type === "error") {
          this.setState({
            error: res.msg,
            related_books: res.data,
            loading_related: false,
          });
        }
        if (res !== null && res.type === "success") {
          this.setState({
            error: "",
            related_books: res.data,
            loading_related: false,
          });
        }
      }
    );
  };
  componentDidMount = () => {
    this.GetBookDetailsById(this.props.book_id);
  };
  render() {
    // if (this.state.book_details === null || this.state.loading === true) {
    //   return (
    //     <div className="pt-24">
    //       <Loading className="bg-white" />
    //     </div>
    //   );
    // }
    return (
      <Container>
        <div className="mb-8">
          <div className="grid grid-cols-12 gap-0 bg-white rounded-lg overflow-hidden">
            <div className="col-span-12 md:col-span-5 lg:col-span-4 p-2 md:p-3">
              {this.state.book_details === null ||
              this.state.loading === true ? (
                <div
                  className="bg-gray-100 rounded-xl animate__animated animate__fadeIn animate__fast animate__infinite"
                  style={{ height: "360px" }}
                ></div>
              ) : (
                <div className="bg-gray-100 rounded-xl">
                  <Image
                    src={`${API_URL}/${ImageFolder.cover}/${this.state.book_details.book_cover}`}
                    alt={this.state.book_details.title}
                    height={2000}
                    width={1500}
                    className="w-full h-auto rounded-md"
                  />
                </div>
              )}
            </div>
            {this.state.book_details === null || this.state.loading === true ? (
              <div className="col-span-12 md:col-span-7 lg:col-span-8 p-3 md:p-6 bg-white">
                <div className="bg-gray-100 rounded-full h-7 w-2/3  animate__animated animate__fadeIn animate__infinite"></div>
                <div className="bg-gray-100 rounded-xl h-4 w-full  animate__animated animate__fadeIn animate__infinite mt-6"></div>
                <div className="bg-gray-100 rounded-xl h-3 w-1/2  animate__animated animate__fadeIn animate__infinite mt-3"></div>
                <div className="grid grid-cols-12 items-center gap-5 w-full pt-5 mt-8">
                  {/*  */}
                  {[1, 2, 3, 4].map((load, l) => (
                    <LoadingBillItem key={l + 1} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="col-span-12 md:col-span-7 lg:col-span-8 p-3 md:p-6 bg-white">
                <div className="flex flex-row items-center gap-2">
                  {this.props.type !== "preview" && (
                    <div>
                      <Link
                        href={`/store?language_id=${this.state.book_details.language_id}`}
                        className="bg-gray-100 hover:bg-green-700 hover:text-white rounded-full flex items-center justify-center h-10 w-10 cursor-pointer"
                      >
                        <BsArrowLeft className="text-2xl" />
                      </Link>
                    </div>
                  )}
                  <div className="text-2xl font-bold">
                    {this.state.book_details.title}
                  </div>
                </div>
                <div className="my-2 text-gray-500 mt-4">
                  {this.state.book_details.short_description}
                </div>
                <div className="grid grid-cols-12 items-center gap-5 w-full pt-5">
                  <div className="col-span-12 lg:col-span-6 flex flex-row items-center gap-2 w-full">
                    <div>
                      <div className="bg-gray-100 rounded-md h-12 w-12 flex items-center justify-center">
                        <MdLanguage className="text-4xl text-gray-400" />
                      </div>
                    </div>
                    <div className="flex flex-col w-full">
                      <span className="text-sm">Book language</span>
                      <Link
                        className="font-bold hover:underline hover:text-green-700"
                        href={`/store?language_id=${this.state.book_details.language_id}`}
                      >
                        {this.state.book_details.language_name}
                      </Link>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-row items-center gap-2 w-full">
                    <div>
                      <div className="bg-gray-100 rounded-md h-12 w-12 flex items-center justify-center">
                        <RiBook3Line className="text-4xl text-gray-400" />
                      </div>
                    </div>
                    <div className="flex flex-col w-full">
                      <span className="text-sm">Book category</span>
                      <Link
                        className="font-bold hover:underline hover:text-green-700"
                        href={`/store?language_id=${this.state.book_details.language_id}&category_id=${this.state.book_details.category_id}`}
                      >
                        {this.state.book_details.category_name}
                      </Link>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-row items-center gap-2 w-full">
                    <div>
                      <div className="bg-gray-100 rounded-md h-12 w-12 flex items-center justify-center">
                        <IoPricetagsOutline className="text-4xl text-gray-400" />
                      </div>
                    </div>
                    <div className="flex flex-col w-full group">
                      <span className="text-sm">Book price</span>
                      <div className="font-bold">
                        <div className="flex flex-row items-center gap-4">
                          {this.state.book_details.book_prices.map(
                            (price, p) => (
                              <div
                                key={p + 1}
                                className={`flex flex-row items-center ${
                                  price.status === 1
                                    ? "text-green-600 group-hover:text-green-700 text-2xl"
                                    : "text-gray-400 line-through text-xl"
                                } gap-3`}
                              >
                                <div>RWF {commaFy(price.price)}</div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-row items-center gap-2 w-full">
                    <div>
                      <div className="bg-gray-100 rounded-md h-12 w-12 flex items-center justify-center">
                        <AiOutlineShoppingCart className="text-4xl text-gray-400" />
                      </div>
                    </div>
                    <div className="flex flex-col w-full">
                      <span className="text-sm">Book availability</span>
                      <div className="font-bold">
                        {this.state.book_details.availability ===
                        BookAvailability.IN_STOCK
                          ? "In stock"
                          : "Out of stock"}
                      </div>
                    </div>
                  </div>
                </div>
                {this.props.type !== "preview" && (
                  <>
                    <div className="border-b py-5"></div>
                    {this.state.book_review === false ? (
                      <div>
                        <div className="flex flex-row items-center gap-2 w-full mt-3">
                          <div className="font-bold">Book Reviews</div>
                          <div>
                            <div className="flex flex-row items-center gap-0">
                              {[1, 2, 3, 4, 5].map((rating, r) => (
                                <div key={r + 1}>
                                  {this.state.book_details !== null &&
                                  this.state.book_details.rating !== 0 &&
                                  this.state.book_details.rating !== 5 ? (
                                    <AiFillStar
                                      className={`text-lg text-${
                                        rating <= this.state.book_details.rating
                                          ? "yellow-400"
                                          : "gray-300"
                                      }`}
                                    />
                                  ) : (
                                    <BsStarHalf
                                      className={`text-lg text-yellow-400`}
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-2 mt-3">
                          {/* <Link
                        href={"/contact"}
                        className="bg-gray-100 rounded-md px-3 py-2 w-max font-normal cursor-pointer hover:bg-green-700 hover:text-white border border-gray-100 hover:border-green-700"
                      >
                        Contact Us
                      </Link> */}
                          <div
                            className="bg-gray-100 rounded-md px-3 py-2 w-max font-normal cursor-pointer hover:bg-green-700 hover:text-white border border-gray-100 hover:border-green-700"
                            onClick={() => this.props.openContactUs(true)}
                          >
                            Contact Us
                          </div>
                          <div
                            onClick={() => this.setState({ book_review: true })}
                            className="bg-white rounded-md px-3 py-2 w-max font-normal cursor-pointer hover:bg-green-700 hover:text-white border border-gray-300 hover:border-green-700"
                          >
                            Submit review
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <BookReview
                          book_details={this.state.book_details}
                          onClose={() => this.setState({ book_review: false })}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            {/* <div className="col-span-2 px-3">
              <div className="bg-white h-full">
                <Image src={ADS_IMAGE} alt="" />
              </div>
            </div> */}
          </div>
          {/* Related products */}
          {this.props.type !== "preview" && (
            <div className="grid grid-cols-12 gap-4 mt-4">
              <div className="col-span-12 md:col-span-9">
                <div className="bg-white rounded-md p-2">
                  <div className="flex flex-row items-center justify-between gap-2">
                    <div className="text-xl font-bold ml-1 md:ml-3">
                      Related books
                    </div>
                    <div>
                      <Link
                        href={"/store"}
                        className="flex flex-row items-center justify-end gap-3 bg-gray-100 rounded-md w-max px-3 py-2 cursor-pointer hover:bg-green-600 hover:text-white"
                      >
                        <div>Visit the store</div>
                        <div>
                          <div className="flex items-center justify-center h-7 w-7 rounded-md bg-green-600 text-white">
                            <BsArrowRight className="text-xl" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-6">
                    {this.state.loading_related === true ||
                    this.state.related_books === null ? (
                      <div>
                        <LoadingBooks cols={3} />
                      </div>
                    ) : (
                      <div className="grid grid-cols-8 md:grid-cols-12 lg:grid-cols-8 gap-3">
                        {this.state.related_books.filter(
                          (itm) =>
                            itm.book_id !== this.state.book_details?.book_id
                        ).length === 0 ? (
                          <div className="col-span-8 bg-gray-100 rounded p-4 text-xl font-light text-center mt-2">
                            No related books found
                          </div>
                        ) : (
                          this.state.related_books
                            .filter(
                              (itm) =>
                                itm.book_id !== this.state.book_details?.book_id
                            )
                            .map((item, i) => (
                              <div
                                key={i + 1}
                                className={`col-span-4 md:col-span-3 lg:col-span-2`}
                              >
                                <BookItem
                                  item={item}
                                  onClick={() => {
                                    this.setState({
                                      book_details: null,
                                      related_books: null,
                                      loading: true,
                                      loading_related: true,
                                    });
                                    this.GetBookDetailsById(item.book_id);
                                    this.props.pushPath(
                                      `/book_details?book=${item.book_id}&product_title=${item.title}&product_image=${item.book_cover}`
                                    );
                                  }}
                                />
                              </div>
                            ))
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 overflow-hidden">
                <div className="bg-white rounded-md p-2 h-full">
                  <div>
                    {this.state.loading === false && (
                      <Image
                        src={ADS_IMAGE}
                        alt=""
                        className="w-full rounded-md"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    );
  }
}
