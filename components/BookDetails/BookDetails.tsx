import Image from "next/image";
import React, { Component } from "react";
import { BsArrowLeft, BsArrowRight, BsStarHalf } from "react-icons/bs";
import { commaFy } from "../../utils/functions";
import Container from "../Container/Container";
import ADS_IMAGE from "../../assets/catalogue.jpeg";
import {
  AiFillStar,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { BookReview } from "./BookReview";
import Link from "next/link";
import { BookItem } from "../BookItem/BookItem";
import {
  BookAvailability,
  FC_GetBookDetailsById,
  GetBookDetailsInterface,
  GetBookInterface,
  ImageFolder,
} from "../../actions/books.action";
import Loading from "../Loading/Loading";
import { API_URL } from "../../utils/api";
import { MdLanguage } from "react-icons/md";
import { RiBook3Line } from "react-icons/ri";
import { IoPricetagsOutline } from "react-icons/io5";

interface BookDetailsProps {
  book_id: string;
}

interface BookDetailsState {
  book_review: boolean;
  loading: boolean;
  error: string;
  book_details: GetBookDetailsInterface | null;
}

export class BookDetails extends Component<BookDetailsProps, BookDetailsState> {
  constructor(props: BookDetailsProps) {
    super(props);

    this.state = {
      book_review: false,
      loading: false,
      error: "",
      book_details: null,
    };
  }
  GetBookDetailsById = () => {
    this.state.loading === false && this.setState({ loading: true });
    FC_GetBookDetailsById(
      this.props.book_id,
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
        }
      }
    );
  };
  componentDidMount = () => {
    this.GetBookDetailsById();
  };
  render() {
    if (this.state.book_details === null || this.state.loading === true) {
      return (
        <div className="pt-24">
          <Loading className="bg-white" />
        </div>
      );
    }
    return (
      <Container>
        <div className="mb-8">
          <div className="grid grid-cols-12 gap-0 bg-white rounded-lg overflow-hidden">
            <div className="col-span-12 md:col-span-5 lg:col-span-4 p-2 md:p-3">
              <div className="bg-gray-100">
                <Image
                  src={`${API_URL}/${ImageFolder.cover}/${this.state.book_details.book_cover}`}
                  alt={this.state.book_details.title}
                  height={100}
                  width={100}
                  className="w-full h-auto rounded-md hover:shadow-xl"
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 lg:col-span-8 p-3 md:p-6 bg-white">
              <div className="flex flex-row items-center gap-2">
                <div>
                  <Link
                    href={`/store?language_id=${this.state.book_details.language_id}`}
                    className="bg-gray-100 hover:bg-green-700 hover:text-white rounded-full flex items-center justify-center h-10 w-10 cursor-pointer"
                  >
                    <BsArrowLeft className="text-2xl" />
                  </Link>
                </div>
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
                        {this.state.book_details.book_prices.map((price, p) => (
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
                        ))}
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

              <div className="border-b py-5"></div>
              {this.state.book_review === false ? (
                <div>
                  <div className="flex flex-row items-center gap-2 w-full mt-3">
                    <div className="font-bold">Book Reviews</div>
                    <div>
                      <div className="flex flex-row items-center gap-0">
                        <div>
                          <AiFillStar className="text-lg text-yellow-400" />
                        </div>
                        <div>
                          <AiFillStar className="text-lg text-yellow-400" />
                        </div>
                        <div>
                          <BsStarHalf className="text-lg text-yellow-400" />
                        </div>
                        <div>
                          <AiOutlineStar className="text-lg text-gray-400" />
                        </div>
                        <div>
                          <AiOutlineStar className="text-lg text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2 mt-3">
                    <Link
                      href={"/contact"}
                      className="bg-gray-100 rounded-md px-3 py-2 w-max font-normal cursor-pointer hover:bg-green-700 hover:text-white border border-gray-100 hover:border-green-700"
                    >
                      Contact Us
                    </Link>
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
            </div>
            {/* <div className="col-span-2 px-3">
              <div className="bg-white h-full">
                <Image src={ADS_IMAGE} alt="" />
              </div>
            </div> */}
          </div>
          {/* Related products */}
          <div className="grid grid-cols-12 gap-4 mt-4">
            <div className="col-span-9">
              <div className="bg-white rounded-md p-2">
                <div className="flex flex-row items-center justify-between gap-2">
                  <div className="text-xl font-bold ml-3">
                    Related books for reading
                  </div>
                  <div>
                    <Link
                      href={"/store"}
                      className="flex flex-row items-center justify-end gap-3 bg-gray-100 rounded-md w-max px-3 py-2 cursor-pointer hover:bg-green-600 hover:text-white"
                    >
                      <div>Visit the store</div>
                      <div>
                        <BsArrowRight className="text-xl" />
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="grid grid-cols-12 gap-3">
                    {([] as GetBookInterface[]).map((item, i) => (
                      <Link
                        key={i + 1}
                        href={`/book_details?book=${item.book_id}&product_title=${item.title}&product_image=${item.book_cover}`}
                        className={`col-span-2`}
                      >
                        <BookItem
                          item={item}
                          onClick={() => {}}
                          hide_price={true}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3 overflow-hidden">
              <div className="bg-white rounded-md p-2 h-full">
                <div>
                  <Image src={ADS_IMAGE} alt="" className="w-full rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
