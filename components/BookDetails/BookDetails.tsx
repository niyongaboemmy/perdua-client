import Image from "next/image";
import React, { Component } from "react";
import {
  BsArrowLeft,
  BsArrowRight,
  BsCheckCircle,
  BsImage,
  BsStarHalf,
} from "react-icons/bs";
import { commaFy } from "../../utils/functions";
import Container from "../Container/Container";
import ADS_IMAGE from "../../assets/catalogue_photo.jpeg";
import {
  AiFillStar,
  AiOutlineRead,
  AiOutlineShoppingCart,
} from "react-icons/ai";
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
import { API_URL } from "../../utils/api";
import { MdLanguage } from "react-icons/md";
import { RiBook3Line } from "react-icons/ri";
import { IoCallOutline, IoPricetagsOutline } from "react-icons/io5";
import { LoadingBooks } from "../HomepageComponents/NewBooks";
import { HiDatabase, HiOutlinePhotograph } from "react-icons/hi";
import { BiLoaderCircle } from "react-icons/bi";
import SocialMediaShare from "../SocialMediaShare/SocialMediaShare";

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
  loading_main_image: boolean;
  loading_author_image: boolean;
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
      loading_main_image: true,
      loading_author_image: true,
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
    return (
      <Container lgPadding={this.props.type === "preview" ? "0" : undefined}>
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
                  {this.state.loading_main_image === true ? (
                    <div
                      className="bg-gray-100 rounded-xl animate__animated animate__fadeIn animate__fast h-full w-full flex flex-col items-center justify-center"
                      style={{ height: "360px" }}
                    >
                      <BsImage className="text-8xl mb-3 text-gray-300" />
                      <div className="flex flex-row items-center gap-2 text-gray-400">
                        <BiLoaderCircle className="text-2xl animate-spin" />
                        <span className="text-gray-600 animate__animated animate__fadeIn animate__slower animate__infinite">
                          Loading image...
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <Image
                    src={`${API_URL}/${ImageFolder.cover}/${this.state.book_details.book_cover}`}
                    alt={this.state.book_details.title}
                    height={2000}
                    width={1500}
                    className={`${
                      this.state.loading_main_image === true
                        ? "h-0"
                        : "w-full h-auto animate__animated animate__fadeIn animate__slow"
                    } rounded-md`}
                    onLoadingComplete={(img: HTMLImageElement) => {
                      img.className =
                        "w-full h-auto animate__animated animate__fadeIn animate__slow";
                      this.setState({ loading_main_image: false });
                    }}
                    priority={true}
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
                  {[1, 2, 3, 4, 5, 6].map((l) => (
                    <LoadingBillItem key={l + 1} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="col-span-12 md:col-span-7 lg:col-span-8 p-3 md:p-6 bg-white animate__animated animate__fadeIn">
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
                  <div className="text-2xl font-bold flex flex-row items-center gap-2">
                    <span>{this.state.book_details.title}</span>
                    {this.state.book_details.best_sell === 1 && (
                      <div className="px-1 pr-3 py-1 rounded-full bg-green-600 text-white font-bold w-max text-sm flex flex-row items-center gap-1">
                        <div>
                          <AiFillStar className="text-white text-xl animate__animated animate__rotateIn animate__slow animate__infinite" />
                        </div>
                        <span className="truncate">Best seller</span>
                      </div>
                    )}
                  </div>
                </div>
                {this.state.book_details.book_theme.length > 0 && (
                  <div className="my-2 text-gray-500 mt-5 mb-2">
                    <div className="font-bold text-black">Book themes</div>
                    <div className="grid grid-cols-12 gap-1 mt-2">
                      {this.state.book_details.book_theme.map((theme, t) => (
                        <div
                          key={t + 1}
                          className="col-span-12 lg:col-span-6 flex flex-row items-center gap-2 text-sm"
                        >
                          <div>
                            <BsCheckCircle className="text-2xl text-green-600" />
                          </div>
                          <span>{theme.theme}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
                        <AiOutlineRead className="text-4xl text-gray-400" />
                      </div>
                    </div>
                    <div className="flex flex-col w-full">
                      <span className="text-sm">Number of pages</span>
                      <div className="font-bold">
                        {commaFy(this.state.book_details.num_pages)}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-6 flex flex-row items-center gap-2 w-full">
                    <div>
                      <div className="bg-gray-100 rounded-md h-12 w-12 flex items-center justify-center">
                        <HiDatabase className="text-4xl text-gray-400" />
                      </div>
                    </div>
                    <div className="flex flex-col w-full">
                      <span className="text-sm">Total available</span>
                      <div className="font-bold">
                        {commaFy(this.state.book_details.quantity)}
                      </div>
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
                        {this.state.book_details.quantity === 0
                          ? "Out of stock"
                          : this.state.book_details.availability ===
                            BookAvailability.IN_STOCK
                          ? "In stock"
                          : this.state.book_details.availability ===
                            BookAvailability.OUT_STOCK
                          ? "Out of stock"
                          : "Coming Soon"}
                      </div>
                    </div>
                  </div>
                  {(this.state.book_details.quantity === 0 ||
                    this.state.book_details.availability ===
                      BookAvailability.OUT_STOCK) && (
                    <div className="col-span-12">
                      <div
                        onClick={() => this.props.openContactUs(true)}
                        className="flex flex-row items-center justify-between gap-2 bg-yellow-50 w-full p-3 pr-4 text-yellow-700 rounded-lg text-lg cursor-pointer hover:bg-yellow-100 font-normal"
                      >
                        <div className="flex flex-row items-center gap-3">
                          <div>
                            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-yellow-600 text-white">
                              <IoCallOutline className="text-2xl" />
                            </div>
                          </div>
                          <div className="">Contact support for pre-order</div>
                        </div>
                        <div>
                          <BsArrowRight className="text-3xl" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="col-span-12">
                    {this.state.book_details.book_theme.length > 0 && (
                      <div className="my-2 text-gray-500 -mt-2 mb-2">
                        <div className="font-bold text-black">Book levels</div>
                        <div className="grid grid-cols-12 gap-1 mt-2">
                          {this.state.book_details.book_level.map(
                            (level, l) => (
                              <div
                                key={l + 1}
                                className="col-span-12 lg:col-span-6 flex flex-row items-center gap-2 text-sm"
                              >
                                <div>
                                  <BsCheckCircle className="text-2xl text-green-600" />
                                </div>
                                <span>{level.level}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-span-12 lg:col-span-12 flex flex-row gap-2 w-full">
                    <div className="flex flex-col w-full">
                      <span className="text-base font-bold ">Book authors</span>
                      <div className="grid grid-cols-12 gap-2">
                        {this.state.book_details.book_authors.map(
                          (author, a) => (
                            <Link
                              href={`/authors?author_id=${author.author_id}`}
                              title="Click to view list of books"
                              key={a + 1}
                              className="col-span-12 lg:col-span-6"
                            >
                              <div className="flex items-center gap-4 hover:bg-green-50 cursor-pointer p-2 rounded-xl mt-2 group">
                                <div>
                                  <div
                                    className={`${
                                      this.state.loading_author_image ===
                                        true && author.author_pic !== null
                                        ? "h-0 w-0"
                                        : "h-20 w-20"
                                    } rounded-full overflow-hidden bg-gray-100 group-hover:bg-white`}
                                  >
                                    {author.author_pic === null ? (
                                      <div className="flex items-center justify-center h-full w-full">
                                        <BsImage className="text-3xl text-gray-300 group-hover:text-green-700" />
                                      </div>
                                    ) : (
                                      <Image
                                        src={`${API_URL}/${ImageFolder.author}/${author.author_pic}`}
                                        alt=""
                                        height={60}
                                        width={60}
                                        className={`w-auto h-auto min-h-full min-w-full object-cover`}
                                        priority={true}
                                        onLoadStart={(
                                          event: React.SyntheticEvent<
                                            HTMLImageElement,
                                            Event
                                          >
                                        ) => {
                                          this.setState({
                                            loading_author_image: true,
                                          });
                                        }}
                                        onLoadingComplete={(
                                          img: HTMLImageElement
                                        ) => {
                                          this.setState({
                                            loading_author_image: false,
                                          });
                                        }}
                                      />
                                    )}
                                  </div>
                                  {this.state.loading_author_image === true &&
                                    author.author_pic !== null && (
                                      <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gray-100">
                                        <HiOutlinePhotograph className="text-5xl text-gray-300 group-hover:text-green-700 animate__animated animate__fadeIn animate__infinite" />
                                      </div>
                                    )}
                                </div>
                                <div>
                                  <div className="font-bold text-lg group-hover:text-green-600">
                                    {author.author_name}
                                  </div>
                                  <div className="text-sm">
                                    Contact: {author.phone}
                                  </div>
                                  <div className="text-sm">
                                    Email: {author.email}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12">
                    {/* Share on social media */}
                    {window.location.host !== undefined && (
                      <SocialMediaShare
                        title="Share book on social media"
                        share_title={this.state.book_details.title}
                        link={`${window.location.host}/book_details?book=${this.state.book_details.book_id}&product_title=${this.state.book_details.title}&product_image=${this.state.book_details.book_cover}`}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          {this.state.book_details !== null && (
            <div className="p-4 mt-4 rounded-lg bg-white">
              <div className="text-lg font-bold">Book short description</div>
              <div>{this.state.book_details.short_description}</div>
            </div>
          )}
          <div>
            {this.props.type !== "preview" &&
              this.state.book_details !== null && (
                <>
                  {this.state.book_review === false ? (
                    <div className="bg-white rounded-lg p-3 mt-4">
                      <div className="flex flex-row items-center gap-2 w-full">
                        <div className="font-bold text-lg">Book Reviews</div>
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
                        <div
                          className="bg-green-600 text-white rounded-md px-3 py-2 w-max font-normal cursor-pointer hover:bg-green-700 hover:text-white border border-gray-100 hover:border-green-700"
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
                    <div className="mt-4 bg-white rounded-lg p-4">
                      <BookReview
                        book_details={this.state.book_details}
                        onClose={() => this.setState({ book_review: false })}
                      />
                    </div>
                  )}
                </>
              )}
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
                                      loading_main_image: true,
                                      loading_author_image: true,
                                    });
                                    this.GetBookDetailsById(item.book_id);
                                    this.props.pushPath(
                                      `/book_details?book=${item.book_id}&product_title=${item.title}&product_image=${item.book_cover}`
                                    );
                                  }}
                                  hide_price={true}
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
                      <Link
                        href={"/catalogue"}
                        title="Perdua publishers catalogue"
                      >
                        <Image
                          src={ADS_IMAGE}
                          alt=""
                          height={1000}
                          width={400}
                          className="w-full max-h-96 rounded-md bg-gray-100 animate__animated animate__fadeIn animate__infinite"
                          onLoadingComplete={(img: HTMLImageElement) => {
                            img.className = "w-full rounded-md";
                          }}
                        />
                      </Link>
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
