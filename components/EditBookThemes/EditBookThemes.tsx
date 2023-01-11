import React, { Component } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import {
  BookTheme,
  GetBookThemesByIds,
  SystemBasicInfoData,
} from "../../actions";
import {
  FC_AddBookTheme,
  FC_RemoveBookTheme,
  GetBookInterface,
} from "../../actions/books.action";
import { search } from "../../utils/functions";
import { Alert } from "../Alert/Alert";
import Button from "../FormItems/Button";
import Loading from "../Loading/Loading";

interface EditBookThemesProps {
  systemBasicInfo: SystemBasicInfoData;
  book: GetBookInterface;
  onGoBack: () => void;
  onSubmitted: (book_id: string) => void;
}
interface EditBookThemesState {
  loading: boolean;
  themes: string[];
  openSelectTheme: boolean;
  error: string;
  success: string;
  save_updates: boolean;
  search_data: string;
}

class EditBookThemes extends Component<
  EditBookThemesProps,
  EditBookThemesState
> {
  constructor(props: EditBookThemesProps) {
    super(props);

    this.state = {
      loading: false,
      themes:
        this.props.book.theme === null ? [] : JSON.parse(this.props.book.theme),
      openSelectTheme: false,
      error: "",
      success: "",
      save_updates: false,
      search_data: "",
    };
  }
  themeDetails = (theme_id: string): boolean => {
    if (this.state.themes !== null) {
      console.log("Tes: ", {
        type: typeof this.state.themes,
        data: this.state.themes,
      });
      const author = this.state.themes.find(
        (itm) => itm.toString() === theme_id.toString()
      );
      if (author !== undefined) {
        return true;
      }
    }
    return false;
  };
  selectTheme = (theme_id: string) => {
    var temp_data: string[] = this.state.themes;
    if (this.state.themes.find((itm) => itm === theme_id) !== undefined) {
      this.setState({
        themes: temp_data.filter((itm) => itm !== theme_id),
      });
    } else {
      this.setState({ themes: [...temp_data, theme_id] });
    }
  };
  RemoveBookTheme = (theme_id: string) => {
    this.setState({ loading: true, error: "", success: "" });
    FC_RemoveBookTheme(
      this.props.book.book_id,
      theme_id,
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
          this.selectTheme(theme_id);
        }
      }
    );
  };
  AddNewBookTheme = (theme_id: string) => {
    this.setState({ loading: true, error: "", success: "" });
    FC_AddBookTheme(
      this.props.book.book_id,
      theme_id,
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
            openSelectTheme: false,
          });
        }
        if (res?.type === "success") {
          this.setState({
            success: res.msg,
            error: "",
            loading: false,
            openSelectTheme: false,
            save_updates: true,
          });
          this.selectTheme(theme_id);
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
    if (this.state.openSelectTheme === true) {
      return (
        <div className="mt-6 min-h-screen">
          <div className="flex flex-row items-center gap-2">
            <div>
              <div
                onClick={() =>
                  this.state.loading === false &&
                  this.setState({ openSelectTheme: false })
                }
                className="px-3 py-1 text-green-700 text-sm rounded-md border border-green-600 bg-green-50 cursor-pointer w-max hover:bg-green-600 hover:text-white"
              >
                Go back
              </div>
            </div>
            <div className="text-lg font-bold">Add new book theme</div>
          </div>
          <div className="mt-4">
            <div className="mb-2">
              <div className="relative w-full">
                <input
                  type="text"
                  className="bg-white py-3 px-4 pl-12 rounded-lg w-full border"
                  placeholder="Search book"
                  value={this.state.search_data}
                  onChange={(e) =>
                    this.setState({ search_data: e.target.value })
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
                  this.props.systemBasicInfo.basic_info.theme.filter(
                    (itm) =>
                      this.state.themes.find(
                        (test) => test === itm.theme_id
                      ) === undefined
                  ),
                  this.state.search_data
                ) as BookTheme[]
              ).length === 0 ? (
              <div>No result found!</div>
            ) : (
              (
                search(
                  this.props.systemBasicInfo.basic_info.theme.filter(
                    (itm) =>
                      this.state.themes.find(
                        (test) => test === itm.theme_id
                      ) === undefined
                  ),
                  this.state.search_data
                ) as BookTheme[]
              ).map((item, i) => (
                <div
                  key={i + 1}
                  className={`flex flex-row items-center justify-between gap-3 pr-4 p-1 rounded-md ${
                    this.themeDetails(item.theme_id) === true
                      ? "bg-gray-100 font-extrabold"
                      : "bg-gray-100 hover:bg-green-700 hover:text-white"
                  } cursor-pointer mb-2 group`}
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure do you want to add author ${item.theme}?`
                      ) === true &&
                      this.state.loading === false
                    ) {
                      this.AddNewBookTheme(item.theme_id);
                    }
                  }}
                >
                  <div className="flex flex-row items-center gap-3">
                    <div>
                      <div className="h-8 w-8 flex items-center justify-center bg-white rounded-full font-bold text-lg overflow-hidden">
                        {i + 1}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-base font-normal">{item.theme}</div>
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
              <span>Book themes</span>{" "}
              <div className="bg-yellow-600 text-white px-2 rounded-md text-sm">
                {this.state.themes.length}
              </div>
            </div>
            <div>
              {this.state.themes.length > 0 && (
                <div
                  onClick={() => {
                    this.state.loading === false &&
                      this.setState({
                        openSelectTheme: true,
                        error: "",
                      });
                  }}
                  className="bg-white text-green-600 border border-green-600 hover:border-green-700 hover:bg-green-700 hover:text-white rounded px-3 py-1 w-max cursor-pointer font-semibold"
                >
                  Add themes
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
          {this.state.themes.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full bg-gray-100 rounded-md px-4 py-6 mt-3">
              <div></div>
              <div className="text-xl font-semibold">No themes added</div>
              <div className="text-sm mb-3">
                Click the following button to add themes for this book
              </div>
              <div>
                <div
                  onClick={() => {
                    this.state.loading === false &&
                      this.setState({
                        openSelectTheme: true,
                        error: "",
                      });
                  }}
                  className="px-3 py-2 rounded-md w-max cursor-pointer bg-green-700 text-white hover:bg-green-800"
                >
                  Select themes
                </div>
              </div>
            </div>
          ) : (
            this.props.systemBasicInfo.basic_info !== null && (
              <div className="mt-3">
                {GetBookThemesByIds(
                  this.state.themes,
                  this.props.systemBasicInfo.basic_info.theme
                ) !== null &&
                  GetBookThemesByIds(
                    this.state.themes,
                    this.props.systemBasicInfo.basic_info.theme
                  ).map((item, i) => (
                    <div
                      key={i + 1}
                      className={`flex flex-row items-center justify-between gap-3 pr-4 p-1 rounded-md ${
                        this.themeDetails(item.theme_id) === true
                          ? "bg-gray-100 font-extrabold"
                          : "bg-gray-100 hover:bg-green-700 hover:text-white"
                      } mb-2 group`}
                    >
                      <div className="flex flex-row items-center gap-3">
                        <div>
                          <div className="h-8 w-8 flex items-center justify-center bg-white rounded-full font-bold text-lg overflow-hidden">
                            {i + 1}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-base font-normal">
                            {item.theme}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          onClick={() => {
                            if (
                              window.confirm(
                                `Are you sure do you want to remove ${item.theme}?`
                              ) === true &&
                              this.state.loading === false
                            ) {
                              this.RemoveBookTheme(item.theme_id);
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

export default EditBookThemes;
