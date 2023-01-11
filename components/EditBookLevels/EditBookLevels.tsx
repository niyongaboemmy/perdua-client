import React, { Component } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import {
  BookLevel,
  GetBookLevelsByIds,
  SystemBasicInfoData,
} from "../../actions";
import {
  FC_AddBookLevel,
  FC_RemoveBookLevel,
  GetBookInterface,
} from "../../actions/books.action";
import { search } from "../../utils/functions";
import { Alert } from "../Alert/Alert";
import Button from "../FormItems/Button";
import Loading from "../Loading/Loading";

interface EditBookLevelsProps {
  systemBasicInfo: SystemBasicInfoData;
  book: GetBookInterface;
  onGoBack: () => void;
  onSubmitted: (book_id: string) => void;
}
interface EditBookLevelsState {
  loading: boolean;
  levels: string[];
  openSelectLevel: boolean;
  error: string;
  success: string;
  save_updates: boolean;
  search_data: string;
}

class EditBookLevels extends Component<
  EditBookLevelsProps,
  EditBookLevelsState
> {
  constructor(props: EditBookLevelsProps) {
    super(props);

    this.state = {
      loading: false,
      levels: this.props.book.level.map((itm) => itm),
      openSelectLevel: false,
      error: "",
      success: "",
      save_updates: false,
      search_data: "",
    };
  }
  levelDetails = (level_id: string): boolean => {
    if (this.state.levels !== null) {
      const author = this.state.levels.find(
        (itm) => itm.toString() === level_id.toString()
      );
      if (author !== undefined) {
        return true;
      }
    }
    return false;
  };
  selectLevel = (level_id: string) => {
    var temp_data = this.state.levels;
    if (this.state.levels.find((itm) => itm === level_id) !== undefined) {
      this.setState({
        levels: temp_data.filter((itm) => itm !== level_id),
      });
    } else {
      this.setState({ levels: [...temp_data, level_id] });
    }
  };
  RemoveBookLevel = (level_id: string) => {
    this.setState({ loading: true, error: "", success: "" });
    FC_RemoveBookLevel(
      this.props.book.book_id,
      level_id,
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
          this.selectLevel(level_id);
        }
      }
    );
  };
  AddNewBookLevel = (level_id: string) => {
    this.setState({ loading: true, error: "", success: "" });
    FC_AddBookLevel(
      this.props.book.book_id,
      level_id,
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
            openSelectLevel: false,
          });
        }
        if (res?.type === "success") {
          this.setState({
            success: res.msg,
            error: "",
            loading: false,
            openSelectLevel: false,
            save_updates: true,
          });
          this.selectLevel(level_id);
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
    if (this.state.openSelectLevel === true) {
      return (
        <div className="mt-6 min-h-screen">
          <div className="flex flex-row items-center gap-2">
            <div>
              <div
                onClick={() =>
                  this.state.loading === false &&
                  this.setState({ openSelectLevel: false })
                }
                className="px-3 py-1 text-green-700 text-sm rounded-md border border-green-600 bg-green-50 cursor-pointer w-max hover:bg-green-600 hover:text-white"
              >
                Go back
              </div>
            </div>
            <div className="text-lg font-bold">Add new book level</div>
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
                  this.props.systemBasicInfo.basic_info.level.filter(
                    (itm) =>
                      this.state.levels.find(
                        (test) => test === itm.level_id
                      ) === undefined
                  ),
                  this.state.search_data
                ) as BookLevel[]
              ).length === 0 ? (
              <div>No result found!</div>
            ) : (
              (
                search(
                  this.props.systemBasicInfo.basic_info.level.filter(
                    (itm) =>
                      this.state.levels.find(
                        (test) => test === itm.level_id
                      ) === undefined
                  ),
                  this.state.search_data
                ) as BookLevel[]
              ).map((item, i) => (
                <div
                  key={i + 1}
                  className={`flex flex-row items-center justify-between gap-3 pr-4 p-1 rounded-md ${
                    this.levelDetails(item.level_id) === true
                      ? "bg-gray-100 font-extrabold"
                      : "bg-gray-100 hover:bg-green-700 hover:text-white"
                  } cursor-pointer mb-2 group`}
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure do you want to add author ${item.level}?`
                      ) === true &&
                      this.state.loading === false
                    ) {
                      this.AddNewBookLevel(item.level_id);
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
                      <div className="text-base font-normal">{item.level}</div>
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
              <span>Book levels</span>{" "}
              <div className="bg-yellow-600 text-white px-2 rounded-md text-sm">
                {this.state.levels.length}
              </div>
            </div>
            <div>
              {this.state.levels.length > 0 && (
                <div
                  onClick={() => {
                    this.state.loading === false &&
                      this.setState({
                        openSelectLevel: true,
                        error: "",
                      });
                  }}
                  className="bg-white text-green-600 border border-green-600 hover:border-green-700 hover:bg-green-700 hover:text-white rounded px-3 py-1 w-max cursor-pointer font-semibold"
                >
                  Add levels
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
          {this.state.levels.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full bg-gray-100 rounded-md px-4 py-6 mt-3">
              <div></div>
              <div className="text-xl font-semibold">No levels added</div>
              <div className="text-sm mb-3">
                Click the following button to add levels for this book
              </div>
              <div>
                <div
                  onClick={() => {
                    this.state.loading === false &&
                      this.setState({
                        openSelectLevel: true,
                        error: "",
                      });
                  }}
                  className="px-3 py-2 rounded-md w-max cursor-pointer bg-green-700 text-white hover:bg-green-800"
                >
                  Select levels
                </div>
              </div>
            </div>
          ) : (
            this.props.systemBasicInfo.basic_info !== null && (
              <div className="mt-3">
                {GetBookLevelsByIds(
                  this.state.levels,
                  this.props.systemBasicInfo.basic_info
                ) !== null &&
                  GetBookLevelsByIds(
                    this.state.levels,
                    this.props.systemBasicInfo.basic_info
                  ).map((item, i) => (
                    <div
                      key={i + 1}
                      className={`flex flex-row items-center justify-between gap-3 pr-4 p-1 rounded-md ${
                        this.levelDetails(item.level_id) === true
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
                            {item.level}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          onClick={() => {
                            if (
                              window.confirm(
                                `Are you sure do you want to remove ${item.level}?`
                              ) === true &&
                              this.state.loading === false
                            ) {
                              this.RemoveBookLevel(item.level_id);
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

export default EditBookLevels;
