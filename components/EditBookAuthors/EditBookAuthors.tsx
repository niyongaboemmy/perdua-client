import Image from "next/image";
import React, { Component } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import {
  BookAuthor,
  GetBookAuthorsByIds,
  SystemBasicInfoData,
} from "../../actions";
import {
  FC_AddBookAuthor,
  FC_RemoveBookAuthor,
  GetBookInterface,
  ImageFolder,
} from "../../actions/books.action";
import { API_URL } from "../../utils/api";
import { search } from "../../utils/functions";
import { Alert } from "../Alert/Alert";
import Button from "../FormItems/Button";
import Loading from "../Loading/Loading";

interface EditBookAuthorsProps {
  systemBasicInfo: SystemBasicInfoData;
  book: GetBookInterface;
  onGoBack: () => void;
  onSubmitted: (book_id: string) => void;
}
interface EditBookAuthorsState {
  loading: boolean;
  authors: string[];
  openSelectAuthor: boolean;
  error: string;
  success: string;
  save_updates: boolean;
  search_author: string;
}

class EditBookAuthors extends Component<
  EditBookAuthorsProps,
  EditBookAuthorsState
> {
  constructor(props: EditBookAuthorsProps) {
    super(props);

    this.state = {
      loading: false,
      authors: this.props.book.book_authors.map((itm) => itm),
      openSelectAuthor: false,
      error: "",
      success: "",
      save_updates: false,
      search_author: "",
    };
  }
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
  RemoveBookAuthor = (author_id: string) => {
    this.setState({ loading: true, error: "", success: "" });
    FC_RemoveBookAuthor(
      this.props.book.book_id,
      author_id,
      (
        loading: boolean,
        res: { type: "error" | "success"; msg: string } | null
      ) => {
        this.setState({ loading: loading });
        if (res?.type === "error") {
          this.setState({ error: res.msg, success: "", loading: false });
        }
        if (res?.type === "success") {
          this.setState({
            success: res.msg,
            error: "",
            loading: false,
            save_updates: true,
          });
          this.selectAuthor(author_id);
        }
      }
    );
  };
  AddNewBookAuthor = (author_id: string) => {
    this.setState({ loading: true, error: "", success: "" });
    FC_AddBookAuthor(
      {
        book_id: this.props.book.book_id,
        author_id: parseInt(author_id),
      },
      (
        loading: boolean,
        res: { type: "error" | "success"; msg: string } | null
      ) => {
        this.setState({ loading: loading });
        if (res?.type === "error") {
          this.setState({
            error: res.msg,
            success: "",
            loading: false,
            openSelectAuthor: false,
          });
        }
        if (res?.type === "success") {
          this.setState({
            success: res.msg,
            error: "",
            loading: false,
            openSelectAuthor: false,
            save_updates: true,
          });
          this.selectAuthor(author_id);
        }
      }
    );
  };
  render() {
    if (this.state.loading === true) {
      return (
        <div className="mt-6 bg-gray-100">
          <Loading title="Loading, please wait..." className="bg-gray-100" />
        </div>
      );
    }
    if (this.state.openSelectAuthor === true) {
      return (
        <div className="mt-6 min-h-screen">
          <div className="flex flex-row items-center gap-2">
            <div>
              <div
                onClick={() =>
                  this.state.loading === false &&
                  this.setState({ openSelectAuthor: false })
                }
                className="px-3 py-1 text-green-700 text-sm rounded-md border border-green-600 bg-green-50 cursor-pointer w-max hover:bg-green-600 hover:text-white"
              >
                Go back
              </div>
            </div>
            <div className="text-lg font-bold">Add new book author</div>
          </div>
          <div className="mt-4">
            <div className="mb-2">
              <div className="relative w-full">
                <input
                  type="text"
                  className="bg-white py-3 px-4 pl-12 rounded-lg w-full border"
                  placeholder="Search book"
                  value={this.state.search_author}
                  onChange={(e) =>
                    this.setState({ search_author: e.target.value })
                  }
                />
                <div
                  className="absolute top-3 left-3"
                  style={{ paddingTop: "2px" }}
                >
                  <RiSearchLine className="text-2xl" />
                </div>
              </div>
            </div>
            {this.props.systemBasicInfo.basic_info === null ? (
              <div>Loading, please wait...</div>
            ) : (
                search(
                  this.props.systemBasicInfo.basic_info.authors.filter(
                    (itm) =>
                      this.state.authors.find(
                        (test) => test === itm.author_id
                      ) === undefined
                  ),
                  this.state.search_author
                ) as BookAuthor[]
              ).length === 0 ? (
              <div>No result found!</div>
            ) : (
              (
                search(
                  this.props.systemBasicInfo.basic_info.authors.filter(
                    (itm) =>
                      this.state.authors.find(
                        (test) => test === itm.author_id
                      ) === undefined
                  ),
                  this.state.search_author
                ) as BookAuthor[]
              ).map((item, i) => (
                <div
                  key={i + 1}
                  className={`flex flex-row items-center justify-between gap-3 pr-4 p-1 rounded-md ${
                    this.authorDetails(item.author_id) === true
                      ? "bg-gray-100 font-extrabold"
                      : "bg-gray-100 hover:bg-green-700 hover:text-white"
                  } cursor-pointer mb-2 group`}
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure do you want to add author ${item.author_name}?`
                      ) === true &&
                      this.state.loading === false
                    ) {
                      this.AddNewBookAuthor(item.author_id);
                    }
                  }}
                >
                  <div className="flex flex-row items-center gap-3">
                    <div>
                      <div className="h-16 w-16 bg-white rounded overflow-hidden">
                        <Image
                          src={`${API_URL}/${ImageFolder.author}/${item.author_pic}`}
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
                    <div className="flex flex-row items-center justify-center gap-2 rounded-md bg-white p-2 pr-4 text-green-700 font-bold text-sm cursor-pointer hover:bg-green-700 hover:text-white border border-green-600 group-hover:border-white">
                      <div>
                        <IoPersonAddSharp className="text-xl" />
                      </div>
                      <div>Add</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="mt-6">
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
                    this.state.loading === false &&
                      this.setState({
                        openSelectAuthor: true,
                        error: "",
                      });
                  }}
                  className="bg-white text-green-600 border border-green-600 hover:border-green-700 hover:bg-green-700 hover:text-white rounded px-3 py-1 w-max cursor-pointer font-semibold"
                >
                  Add authors
                </div>
              )}
            </div>
          </div>
          {this.state.success !== "" && (
            <div className="my-4">
              <Alert
                title={this.state.success}
                onClose={() => this.setState({ success: "", error: "" })}
                type="success"
              />
            </div>
          )}
          {this.state.error !== "" && (
            <div className="my-4">
              <Alert
                title={this.state.error}
                onClose={() => this.setState({ error: "", success: "" })}
                type="danger"
              />
            </div>
          )}
          {this.state.authors.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full bg-gray-100 rounded-md px-4 py-6 mt-3">
              <div></div>
              <div className="text-xl font-semibold">No authors added</div>
              <div className="text-sm mb-3">
                Click the following button to add authors for this book
              </div>
              <div>
                <div
                  onClick={() => {
                    this.state.loading === false &&
                      this.setState({
                        openSelectAuthor: true,
                        error: "",
                      });
                  }}
                  className="px-3 py-2 rounded-md w-max cursor-pointer bg-green-700 text-white hover:bg-green-800"
                >
                  Select authors
                </div>
              </div>
            </div>
          ) : (
            this.props.systemBasicInfo.basic_info !== null && (
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
                      } mb-2 group`}
                    >
                      <div className="flex flex-row items-center gap-3">
                        <div>
                          <div className="h-16 w-16 bg-white rounded overflow-hidden">
                            <Image
                              src={`${API_URL}/${ImageFolder.author}/${item.author_pic}`}
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
                              this.state.loading === false
                            ) {
                              this.RemoveBookAuthor(item.author_id);
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
            )
          )}
        </div>
        {this.state.save_updates === true && (
          <div className="mt-4">
            <Button
              type="button"
              theme="success"
              title="Save updates"
              onClick={() => this.props.onSubmitted(this.props.book.book_id)}
              className="animate__animated animate__zoomIn"
            />
          </div>
        )}
      </div>
    );
  }
}

export default EditBookAuthors;
