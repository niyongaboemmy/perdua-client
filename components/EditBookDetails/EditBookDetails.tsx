import Image from "next/image";
import Link from "next/link";
import React, { Component, Fragment } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsFillCheckCircleFill, BsImage } from "react-icons/bs";
import { MdClose, MdKeyboardArrowDown } from "react-icons/md";
import { connect } from "react-redux";
import {
  Auth,
  BookCategory,
  BookLanguage,
  BookPublishers,
  GetBookAuthorsByIds,
  GetBookCategoryById,
  GetBookLanguageById,
  GetBookPublisherById,
  SystemBasicInfoData,
} from "../../actions";
import {
  BookAvailability,
  FC_RegisterBook,
  FC_UpdateBookDetails,
  GetBookInterface,
  ImageFolder,
  UpdateBookData,
} from "../../actions/books.action";
import { StoreState } from "../../reducers";
import { API_URL } from "../../utils/api";
import { DATE_DATA } from "../../utils/functions";
import { Alert } from "../Alert/Alert";
import Button from "../FormItems/Button";
import Loading from "../Loading/Loading";
import Modal, { ModalSize, Themes } from "../Modal/Modal";
import SelectAuthors from "../RegisterBook/SelectAuthors";
import SelectCustom from "../SelectCustom/SelectCustom";

interface RegisterBookFormProps {
  auth: Auth;
  systemBasicInfo: SystemBasicInfoData;
  bookDetails: GetBookInterface;
  onGoBack: () => void;
  onSubmitted: (book_id: string) => void;
}
interface RegisterBookFormState {
  loading_form: boolean;
  language_id: string;
  category_id: string;
  publisher_id: string;
  title: string;
  short_description: string;
  isbn: string;
  num_pages: string;
  book_cover: string;
  availability: BookAvailability | null;
  publication_date: string;
  authors: string[];
  price: string;
  error: {
    target:
      | "language_id"
      | "category_id"
      | "publisher_id"
      | "title"
      | "short_description"
      | "isbn"
      | "num_pages"
      | "book_cover"
      | "availability"
      | "publication_date"
      | "author_id"
      | "price"
      | "main";
    msg: string;
  } | null;
  success: string;
  // ----------
  openSelectLanguage: boolean;
  openSelectCategory: boolean;
  openSelectPublisher: boolean;
  openSelectAuthors: boolean;
}

class _EditBookForm extends Component<
  RegisterBookFormProps,
  RegisterBookFormState
> {
  constructor(props: RegisterBookFormProps) {
    super(props);

    this.state = {
      loading_form: false,
      language_id: this.props.bookDetails.language_id,
      category_id: this.props.bookDetails.category_id,
      publisher_id: this.props.bookDetails.publisher_id,
      title: this.props.bookDetails.title,
      short_description: this.props.bookDetails.short_description,
      isbn: this.props.bookDetails.isbn,
      num_pages: this.props.bookDetails.num_pages.toString(),
      book_cover: this.props.bookDetails.book_cover,
      availability: this.props.bookDetails.availability,
      publication_date: this.props.bookDetails.publication_date,
      authors: this.props.bookDetails.book_authors,
      price: this.props.bookDetails.price.toString(),
      error: null,
      success: "",
      // ----------
      openSelectLanguage: false,
      openSelectCategory: false,
      openSelectPublisher: false,
      openSelectAuthors: false,
    };
  }
  FC_SubmitBook = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.language_id === "") {
      return this.setState({
        error: {
          target: "language_id",
          msg: "Please select book language",
        },
      });
    }
    if (this.state.category_id === "") {
      return this.setState({
        error: {
          target: "category_id",
          msg: "Please select book category",
        },
      });
    }
    if (this.state.title === "") {
      return this.setState({
        error: {
          target: "title",
          msg: "Please provide book title",
        },
      });
    }
    if (this.state.price === "") {
      return this.setState({
        error: {
          target: "price",
          msg: "Please book price is required",
        },
      });
    }
    if (this.state.isbn === "") {
      return this.setState({
        error: {
          target: "isbn",
          msg: "Please type ISBN",
        },
      });
    }
    if (this.state.num_pages === "") {
      return this.setState({
        error: {
          target: "num_pages",
          msg: "Please type book pages number",
        },
      });
    }
    if (this.state.short_description === "") {
      return this.setState({
        error: {
          target: "short_description",
          msg: "Please provide the summary for the book",
        },
      });
    }
    if (this.state.publisher_id === "") {
      return this.setState({
        error: {
          target: "publisher_id",
          msg: "Please select the publisher",
        },
      });
    }
    if (this.state.publication_date === "") {
      return this.setState({
        error: {
          target: "publication_date",
          msg: "Please select publication date",
        },
      });
    }
    if (this.state.availability === null) {
      return this.setState({
        error: {
          target: "availability",
          msg: "Please select the availability status",
        },
      });
    }
    if (this.state.book_cover === "") {
      return this.setState({
        error: {
          target: "book_cover",
          msg: "Please select book cover image",
        },
      });
    }
    if (this.state.authors.length === 0) {
      return this.setState({
        error: {
          target: "author_id",
          msg: "Please select the authors",
        },
      });
    }
    // Register book
    const data: UpdateBookData = {
      book_id: this.props.bookDetails.book_id,
      authors: this.state.authors,
      availability: this.state.availability,
      book_cover: this.state.book_cover,
      category_id: this.state.category_id,
      isbn: this.state.isbn,
      language_id: this.state.language_id,
      num_pages: this.state.num_pages,
      price: parseInt(this.state.price),
      publication_date: this.state.publication_date,
      publisher_id: this.state.publisher_id,
      short_description: this.state.short_description,
      title: this.state.title,
    };
    this.setState({ loading_form: true });
    FC_UpdateBookDetails(
      data,
      (
        loading: boolean,
        res: { type: "success" | "error"; msg: string } | null
      ) => {
        this.setState({ loading_form: loading });
        if (res?.type === "success") {
          this.setState({ success: res.msg, error: null });
          // Need to clear the form
        }
        if (res?.type === "error") {
          this.setState({
            error: {
              target: "main",
              msg: res.msg,
            },
            success: "",
          });
        }
      }
    );
  };
  authorDetails = (author_id: string): boolean => {
    if (this.state.authors !== null) {
      const author = this.state.authors.find(
        (itm) => itm.toString() === author_id.toString()
      );
      if (author !== undefined) {
        return true;
      }
    }
    return false;
  };
  selectAuthor = (author_id: string) => {
    var temp_data = this.state.authors;
    if (this.state.authors.find((itm) => itm === author_id) !== undefined) {
      this.setState({
        authors: temp_data.filter((itm) => itm !== author_id),
      });
    } else {
      this.setState({ authors: [...temp_data, author_id] });
    }
  };
  // Reset form

  render() {
    if (this.props.systemBasicInfo.basic_info === null) {
      return (
        <div className="pt-24">
          <Loading title="Loading, please wait.." className="bg-white" />
        </div>
      );
    }
    return (
      <Fragment>
        <div className="">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 md:col-span-8">
              <div className="bg-white rounded-md p-3">
                <form className="w-full" onSubmit={this.FC_SubmitBook}>
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-12 lg:col-span-6">
                      <div className="flex flex-col relative">
                        <span>Choose book language</span>
                        <div
                          onClick={() =>
                            this.setState({
                              openSelectLanguage: true,
                              error: null,
                            })
                          }
                          className={`${
                            this.state.error?.target === "language_id"
                              ? "border border-red-600 bg-white"
                              : "bg-gray-100"
                          } rounded-md pl-3 font-semibold w-full cursor-pointer h-10 flex flex-row items-center justify-between gap-2`}
                        >
                          <span>
                            {this.state.language_id !== "" &&
                            GetBookLanguageById(
                              this.state.language_id,
                              this.props.systemBasicInfo.basic_info
                            ) !== null
                              ? GetBookLanguageById(
                                  this.state.language_id,
                                  this.props.systemBasicInfo.basic_info
                                )?.language_name
                              : ""}
                          </span>
                          <div className="mr-2">
                            <MdKeyboardArrowDown className="text-2xl" />
                          </div>
                        </div>
                        {this.state.openSelectLanguage === true && (
                          <div className="absolute top-6 right-0 left-0 animate__animated animate__zoomIn animate__faster">
                            <SelectCustom
                              loading={this.state.loading_form}
                              id={"language_id"}
                              title={"language_name"}
                              close={() =>
                                this.setState({ openSelectLanguage: false })
                              }
                              data={
                                this.props.systemBasicInfo.basic_info.languages
                              }
                              click={(data: BookLanguage) => {
                                this.setState({
                                  language_id: data.language_id,
                                  openSelectLanguage: false,
                                });
                              }}
                            />
                          </div>
                        )}
                        {this.state.error?.target === "language_id" && (
                          <div className="mt-2">
                            <Alert
                              title="Invalid input"
                              description={this.state.error.msg}
                              type={"danger"}
                              onClose={() => this.setState({ error: null })}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* -------------------------------------- */}
                    <div className="col-span-12 lg:col-span-6">
                      <div className="flex flex-col relative">
                        <span>Choose book category</span>
                        <div
                          onClick={() =>
                            this.setState({
                              openSelectCategory: true,
                              error: null,
                            })
                          }
                          className={`${
                            this.state.error?.target === "category_id"
                              ? "border border-red-600 bg-white"
                              : "bg-gray-100"
                          } rounded-md pl-3 font-semibold w-full cursor-pointer h-10 flex flex-row items-center justify-between gap-2`}
                        >
                          <span>
                            {this.state.category_id !== "" &&
                            GetBookCategoryById(
                              this.state.category_id,
                              this.props.systemBasicInfo.basic_info
                            ) !== null
                              ? GetBookCategoryById(
                                  this.state.category_id,
                                  this.props.systemBasicInfo.basic_info
                                )?.category_name
                              : ""}
                          </span>
                          <div className="mr-2">
                            <MdKeyboardArrowDown className="text-2xl" />
                          </div>
                        </div>
                        {this.state.openSelectCategory === true && (
                          <div className="absolute top-6 right-0 left-0 animate__animated animate__zoomIn animate__faster">
                            <SelectCustom
                              loading={this.state.loading_form}
                              id={"category_id"}
                              title={"category_name"}
                              close={() =>
                                this.setState({ openSelectCategory: false })
                              }
                              data={
                                this.props.systemBasicInfo.basic_info.categories
                              }
                              click={(data: BookCategory) => {
                                this.setState({
                                  category_id: data.category_id,
                                  openSelectCategory: false,
                                });
                              }}
                            />
                          </div>
                        )}
                        {this.state.error?.target === "category_id" && (
                          <div className="mt-2">
                            <Alert
                              title="Invalid input"
                              description={this.state.error.msg}
                              type={"danger"}
                              onClose={() => this.setState({ error: null })}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* -------------------------------------- */}
                    <div className="col-span-12 lg:col-span-6">
                      <div className="flex flex-col">
                        <span>Book Title</span>
                        <input
                          type="text"
                          className={`${
                            this.state.error?.target === "title"
                              ? "border border-red-600"
                              : ""
                          } bg-gray-100 rounded-md px-3 py-2 w-full font-semibold`}
                          value={this.state.title}
                          disabled={this.state.loading_form}
                          onChange={(e) =>
                            this.setState({
                              title: e.target.value,
                              error: null,
                            })
                          }
                        />
                        {this.state.error?.target === "title" && (
                          <div className="mt-2">
                            <Alert
                              title="Invalid input"
                              description={this.state.error.msg}
                              type={"danger"}
                              onClose={() => this.setState({ error: null })}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* ---------------------------------------------- */}
                    <div className="col-span-12 lg:col-span-6">
                      <div className="flex flex-col">
                        <span>Book price</span>
                        <input
                          type="text"
                          disabled={this.state.loading_form}
                          className={`${
                            this.state.error?.target === "price"
                              ? "border border-red-600"
                              : ""
                          } bg-gray-100 rounded-md px-3 py-2 w-full font-semibold`}
                          value={this.state.price}
                          onChange={(e) =>
                            this.setState({
                              price: e.target.value,
                              error: null,
                            })
                          }
                        />
                        {this.state.error?.target === "price" && (
                          <div className="mt-2">
                            <Alert
                              title="Invalid input"
                              description={this.state.error.msg}
                              type={"danger"}
                              onClose={() => this.setState({ error: null })}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* ---------------------------------------------- */}
                    <div className="col-span-12 lg:col-span-6">
                      <div className="flex flex-col">
                        <span>Book ISBN</span>
                        <input
                          type="text"
                          disabled={this.state.loading_form}
                          className={`${
                            this.state.error?.target === "isbn"
                              ? "border border-red-600"
                              : ""
                          } bg-gray-100 rounded-md px-3 py-2 w-full font-semibold`}
                          value={this.state.isbn}
                          onChange={(e) =>
                            this.setState({ isbn: e.target.value, error: null })
                          }
                        />
                        {this.state.error?.target === "isbn" && (
                          <div className="mt-2">
                            <Alert
                              title="Invalid input"
                              description={this.state.error.msg}
                              type={"danger"}
                              onClose={() => this.setState({ error: null })}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* ---------------------------------------------- */}
                    <div className="col-span-12 lg:col-span-6">
                      <div className="flex flex-col">
                        <span>Book page numbers</span>
                        <input
                          type="text"
                          disabled={this.state.loading_form}
                          className={`${
                            this.state.error?.target === "num_pages"
                              ? "border border-red-600"
                              : ""
                          } bg-gray-100 rounded-md px-3 py-2 w-full font-semibold`}
                          value={this.state.num_pages}
                          onChange={(e) =>
                            this.setState({
                              num_pages: e.target.value,
                              error: null,
                            })
                          }
                        />
                        {this.state.error?.target === "num_pages" && (
                          <div className="mt-2">
                            <Alert
                              title="Invalid input"
                              description={this.state.error.msg}
                              type={"danger"}
                              onClose={() => this.setState({ error: null })}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* ---------------------------------------------- */}
                    <div className="col-span-12 lg:col-span-12">
                      <div className="flex flex-col">
                        <span>Book summary</span>
                        <textarea
                          disabled={this.state.loading_form}
                          className={`${
                            this.state.error?.target === "short_description"
                              ? "border border-red-600"
                              : ""
                          } bg-gray-100 rounded-md px-3 py-2 w-full font-semibold`}
                          style={{ minHeight: "140px" }}
                          value={this.state.short_description}
                          onChange={(e) =>
                            this.setState({
                              short_description: e.target.value,
                              error: null,
                            })
                          }
                        ></textarea>
                        {this.state.error?.target === "short_description" && (
                          <div className="mt-2">
                            <Alert
                              title="Invalid input"
                              description={this.state.error.msg}
                              type={"danger"}
                              onClose={() => this.setState({ error: null })}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* -------------------------------------- */}
                    <div className="col-span-12 lg:col-span-6">
                      <div className="flex flex-col relative">
                        <span>Choose book publisher</span>
                        <div
                          onClick={() =>
                            this.setState({
                              openSelectPublisher: true,
                              error: null,
                            })
                          }
                          className={`${
                            this.state.error?.target === "publisher_id"
                              ? "border border-red-600 bg-white"
                              : "bg-gray-100"
                          } rounded-md pl-3 font-semibold w-full cursor-pointer h-10 flex flex-row items-center justify-between gap-2`}
                        >
                          <span>
                            {this.state.publisher_id !== "" &&
                            GetBookPublisherById(
                              this.state.publisher_id,
                              this.props.systemBasicInfo.basic_info
                            ) !== null
                              ? GetBookPublisherById(
                                  this.state.publisher_id,
                                  this.props.systemBasicInfo.basic_info
                                )?.publisher_name
                              : ""}
                          </span>
                          <div className="mr-2">
                            <MdKeyboardArrowDown className="text-2xl" />
                          </div>
                        </div>
                        {this.state.openSelectPublisher === true && (
                          <div className="absolute top-6 right-0 left-0 animate__animated animate__zoomIn animate__faster">
                            <SelectCustom
                              loading={this.state.loading_form}
                              id={"publisher_id"}
                              title={"publisher_name"}
                              close={() =>
                                this.setState({ openSelectPublisher: false })
                              }
                              data={
                                this.props.systemBasicInfo.basic_info.publishers
                              }
                              click={(data: BookPublishers) => {
                                this.setState({
                                  publisher_id: data.publisher_id,
                                  openSelectPublisher: false,
                                });
                              }}
                            />
                          </div>
                        )}
                        {this.state.error?.target === "publisher_id" && (
                          <div className="mt-2">
                            <Alert
                              title="Invalid input"
                              description={this.state.error.msg}
                              type={"danger"}
                              onClose={() => this.setState({ error: null })}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ---------------------------------------------- */}
                    <div className="col-span-12 lg:col-span-6">
                      <div className="flex flex-col">
                        <span>Publication date</span>
                        <input
                          type="date"
                          disabled={this.state.loading_form}
                          className={`${
                            this.state.error?.target === "publication_date"
                              ? "border border-red-600"
                              : ""
                          } bg-gray-100 rounded-md px-3 py-2 w-full font-semibold`}
                          value={DATE_DATA(
                            this.state.publication_date,
                            "YYYY-MM-DD"
                          )}
                          onChange={(e) =>
                            this.setState({
                              publication_date: e.target.value,
                              error: null,
                            })
                          }
                        />
                        {this.state.error?.target === "publication_date" && (
                          <div className="mt-2">
                            <Alert
                              title="Invalid input"
                              description={this.state.error.msg}
                              type={"danger"}
                              onClose={() => this.setState({ error: null })}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* ---------------------------------------------- */}
                    <div className="col-span-12 lg:col-span-6">
                      <div className="flex flex-col">
                        <span>Book availability</span>
                        <select
                          disabled={this.state.loading_form}
                          className={`${
                            this.state.error?.target === "availability"
                              ? "border border-red-600"
                              : ""
                          } bg-gray-100 rounded-md px-3 py-3 w-full font-semibold`}
                          value={
                            this.state.availability === null
                              ? ""
                              : this.state.availability
                          }
                          onChange={(e) =>
                            this.setState({
                              availability:
                                e.target.value !== ""
                                  ? (e.target.value as BookAvailability)
                                  : null,
                              error: null,
                            })
                          }
                        >
                          <option value=""></option>
                          <option value="IN_STOCK">In stock</option>
                          <option value="OUT_STOCK">Out of stock</option>
                        </select>
                        {this.state.error?.target === "availability" && (
                          <div className="mt-2">
                            <Alert
                              title="Invalid input"
                              description={this.state.error.msg}
                              type={"danger"}
                              onClose={() => this.setState({ error: null })}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* ---------------------------------------------- */}
                    {/* <div className="col-span-12 lg:col-span-6">
                      <div className="flex flex-col">
                        <span>Book cover page photo</span>
                        <input
                          type="file"
                          disabled={this.state.loading_form}
                          className={`${
                            this.state.error?.target === "book_cover"
                              ? "border border-red-600"
                              : ""
                          } bg-gray-100 rounded-md px-3 py-1 w-full mt-1`}
                          onChange={(e) =>
                            this.setState({
                              book_cover:
                                e.target.files === null ||
                                e.target.files.length === 0
                                  ? null
                                  : e.target.files[0],
                              error: null,
                            })
                          }
                        />
                        {this.state.error?.target === "book_cover" && (
                          <div className="mt-2">
                            <Alert
                              title="Invalid input"
                              description={this.state.error.msg}
                              type={"danger"}
                              onClose={() => this.setState({ error: null })}
                            />
                          </div>
                        )}
                      </div>
                    </div> */}
                    <div className="col-span-12 lg:col-span-12">
                      <div className="flex flex-row items-center justify-between gap-3">
                        <div className="font-bold flex flex-row items-center gap-2">
                          <span>Book authors</span>{" "}
                          <div className="bg-yellow-600 text-white px-2 rounded-md text-sm">
                            {this.state.authors.length}
                          </div>
                        </div>
                        <div>
                          {this.state.authors.length > 0 && (
                            <div
                              onClick={() => {
                                this.state.loading_form === false &&
                                  this.setState({
                                    openSelectAuthors: true,
                                    error: null,
                                  });
                              }}
                              className="bg-gray-100 hover:bg-green-700 hover:text-white rounded px-3 py-1 w-max cursor-pointer font-semibold"
                            >
                              Add authors
                            </div>
                          )}
                        </div>
                      </div>
                      {this.state.authors.length === 0 ? (
                        <div className="flex flex-col items-center justify-center w-full bg-gray-100 rounded-md px-4 py-6 mt-3">
                          <div></div>
                          <div className="text-xl font-semibold">
                            No authors added
                          </div>
                          <div className="text-sm mb-3">
                            Click the following button to add authors for this
                            book
                          </div>
                          <div>
                            <div
                              onClick={() => {
                                this.state.loading_form === false &&
                                  this.setState({
                                    openSelectAuthors: true,
                                    error: null,
                                  });
                              }}
                              className="px-3 py-2 rounded-md w-max cursor-pointer bg-green-700 text-white hover:bg-green-800"
                            >
                              Select authors
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-3">
                          {GetBookAuthorsByIds(
                            this.state.authors,
                            this.props.systemBasicInfo.basic_info
                          ) !== null &&
                            GetBookAuthorsByIds(
                              this.state.authors,
                              this.props.systemBasicInfo.basic_info
                            ).map((item, i) => (
                              <div
                                key={i + 1}
                                className={`flex flex-row items-center justify-between gap-3 pr-4 p-1 rounded-md ${
                                  this.authorDetails(item.author_id) === true
                                    ? "bg-gray-100 font-extrabold"
                                    : "bg-gray-100 hover:bg-green-700 hover:text-white"
                                } group`}
                              >
                                <div className="flex flex-row items-center gap-3">
                                  <div>
                                    <div className="h-16 w-16 bg-white rounded overflow-hidden">
                                      <Image
                                        src={`${API_URL}/${ImageFolder.cover}/${item.author_pic}`}
                                        alt=""
                                        width={100}
                                        height={100}
                                        className={"object-cover"}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <div className="text-lg font-semibold">
                                      {item.author_name}
                                    </div>
                                    <div className="flex flex-row items-center gap-3 text-sm font-normal">
                                      <div>
                                        Contact: <span>{item.phone},</span>
                                      </div>
                                      <div>
                                        Email: <span>{item.email}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          `Are you sure do you want to remove ${item.author_name}?`
                                        ) === true &&
                                        this.state.loading_form === false
                                      ) {
                                        this.selectAuthor(item.author_id);
                                      }
                                    }}
                                    className="flex flex-row items-center justify-center gap-2 rounded-full bg-white h-10 w-10 text-red-700 font-bold text-sm cursor-pointer hover:bg-red-700 hover:text-white"
                                  >
                                    <div>
                                      <MdClose className="text-3xl" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                    <div className="col-span-12 lg:col-span-12 flex flex-row items-center justify-end">
                      {this.state.authors.length > 0 &&
                        this.state.loading_form === false && (
                          <div className="font-bold flex flex-row items-center justify-end gap-3">
                            <Button
                              title="Back to details"
                              theme="primary"
                              type="button"
                              className="bg-gray-200"
                              onClick={this.props.onGoBack}
                            />
                            <Button
                              title="Update book details"
                              theme="success"
                              type="submit"
                            />
                          </div>
                        )}
                      {this.state.loading_form === true && (
                        <div className="cursor-progress px-3 py-2 rounded-md flex flex-row items-center justify-center w-max gap-2 border border-yellow-300 bg-yellow-50 text-yellow-700 font-bold">
                          <div>
                            <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
                          </div>
                          <div className="animate__animated animate__fadeIn animate__infinite">
                            Saving, Please wait...
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4">
              <div className="bg-white rounded-md p-3 h-full">
                <div className="flex flex-row items-center gap-2">
                  <div>
                    <BsImage className="text-2xl text-green-600" />
                  </div>
                  <div className="font-normal">Book cover preview</div>
                </div>
                {this.state.book_cover === null ? (
                  <div
                    className="bg-gray-100 rounded-md mt-4"
                    style={{ minHeight: "300px" }}
                  ></div>
                ) : (
                  <div
                    className="animate__animated animate__zoomIn rounded-md mt-4 overflow-hidden"
                    style={{ minHeight: "300px" }}
                  >
                    <Image
                      src={`${API_URL}/${ImageFolder.cover}/${this.state.book_cover}`}
                      alt={this.state.title}
                      height={300}
                      width={300}
                      className="h-auto w-auto min-h-full min-w-full rounded-md object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {this.state.openSelectAuthors === true && (
          <Modal
            backDrop={true}
            theme={Themes.default}
            close={() =>
              this.setState({ openSelectAuthors: false, error: null })
            }
            backDropClose={true}
            widthSizeClass={ModalSize.large}
            displayClose={true}
            padding={{
              title: true,
              body: true,
              footer: undefined,
            }}
            title={"Book authors"}
          >
            <div>
              <SelectAuthors
                authorDetails={this.authorDetails}
                systemBasicInfo={this.props.systemBasicInfo}
                onSelectAuthor={this.selectAuthor}
              />
            </div>
          </Modal>
        )}
        {this.state.success !== "" && (
          <Modal
            backDrop={true}
            theme={Themes.default}
            close={() => this.props.onSubmitted(this.props.bookDetails.book_id)}
            backDropClose={true}
            widthSizeClass={ModalSize.medium}
            displayClose={false}
            padding={{
              title: false,
              body: true,
              footer: undefined,
            }}
          >
            <div className="flex flex-col items-center justify-center gap-2 text-center pt-6">
              <div>
                <BsFillCheckCircleFill className="text-6xl text-green-700" />
              </div>
              <div className="font-bold mt-0 text-2xl">Action succeeded</div>
              <div className="text-base">{this.state.success}</div>
              <div className="flex flex-row items-center justify-center gap-3 border-t border-gray-300 w-full pt-4 mt-2">
                <Button
                  title="Continue"
                  theme="success"
                  type="button"
                  onClick={() =>
                    this.props.onSubmitted(this.props.bookDetails.book_id)
                  }
                />
              </div>
            </div>
          </Modal>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  auth,
  systemBasicInfo,
}: StoreState): { auth: Auth; systemBasicInfo: SystemBasicInfoData } => {
  return { auth, systemBasicInfo };
};

export const EditBookDetails = connect(mapStateToProps, {})(_EditBookForm);
