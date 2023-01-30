import { NextRouter } from "next/router";
import React, { Component } from "react";
import { BiCategory, BiReset } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiChevronsLeft } from "react-icons/fi";
import { ImRadioUnchecked } from "react-icons/im";
import {
  BookCategory,
  BookLanguage,
  BookLevel,
  SystemBasicInfoData,
} from "../../actions";
import Loading from "../Loading/Loading";

interface sideNavFilterProps {
  router: NextRouter;
  initializeSelectLanguage: (
    callBack: (
      selectedLanguage: BookLanguage | null,
      selectedCategory: BookCategory | null,
      selectLevel: BookLevel | null
    ) => void
  ) => void;
  systemBasicInfo: SystemBasicInfoData;
  selectedLanguage: BookLanguage | null;
  onSelectLanguage: (data: BookLanguage) => void;
  selectedCategory: BookCategory | null;
  onSelectCategory: (data: BookCategory | null) => void;
  selectedLevel: BookLevel | null;
  onSelectLevel: (data: BookLevel | null) => void;
  loading: boolean;
  selectedBooksCategoryId: string[];
  selectedBooksLevelId: string[];
  hideNav: boolean;
  setHideNav: (hideNav: boolean) => void;
}
interface sideNavFilterState {}

class SideNavFilter extends Component<sideNavFilterProps, sideNavFilterState> {
  constructor(props: sideNavFilterProps) {
    super(props);

    this.state = {};
  }
  componentDidMount(): void {
    this.props.initializeSelectLanguage(
      (
        selectedLanguage: BookLanguage | null,
        selectedCategory: BookCategory | null,
        selectLevel: BookLevel | null
      ) => {
        selectedLanguage !== null &&
          this.props.onSelectLanguage(selectedLanguage);
        this.props.onSelectCategory(selectedCategory);
        this.props.onSelectLevel(selectLevel);
      }
    );
  }
  render() {
    if (this.props.systemBasicInfo.basic_info === null) {
      return <Loading className="bg-white" />;
    }
    if (this.props.hideNav === true) {
      return (
        <div className="h-10">
          <div
            className="flex flex-row items-center justify-between gap-2 fixed top-16 left-0 right-0 bg-white px-3 md:px-6 py-3"
            style={{ zIndex: 9 }}
          >
            <div className="font-bold text-xl">List of books</div>
            <div
              onClick={() => this.props.setHideNav(false)}
              className="bg-white border border-green-600 text-green-700 text-sm hover:text-white rounded-lg p-1 pr-3 w-max cursor-pointer font-bold flex flex-row items-center gap-2 animate__animated animate__zoomIn"
            >
              <div>
                <div className="rounded-full bg-green-600 text-white flex items-center justify-center p-1">
                  <BiCategory className="text-xl" />
                </div>
              </div>
              <div>Show filter</div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div
        // className="fixed lg:block top-30 left-4 right-4 bg-gray-100 h-auto border border-b border-gray-200 lg:border-none rounded-md lg:rounded-none shadow-lg lg:shadow-none"
        style={{
          zIndex: 9,
          // maxHeight: "calc(100vh - 100px)",
          overflowY: "auto",
        }}
        className="text-sm"
      >
        <div className="bg-white rounded-lg p-1 animate__animated animate__fadeInLeft animate__fast">
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex flex-row items-center gap-3">
              <div>
                <div className="flex items-center justify-center h-9 w-9 rounded-full cursor-pointer bg-gray-100 hover:bg-yellow-600 hover:text-white">
                  <FiChevronsLeft className="text-2xl" />
                </div>
              </div>
              <div className="font-semibold">Books Languages</div>
            </div>
            <div
              onClick={() => this.props.setHideNav(true)}
              className="block lg:hidden bg-red-600 text-white rounded-md px-3 py-2 w-max cursor-pointer"
            >
              Close
            </div>
          </div>
          {/* Data here */}
          <div className="mt-3">
            {this.props.systemBasicInfo.basic_info.languages.map((item, i) => (
              <div
                key={i + 1}
                className={`flex flex-row items-center gap-3 w-full p-1 mb-2 cursor-pointer rounded-lg ${
                  this.props.selectedLanguage !== null &&
                  this.props.selectedLanguage.language_id === item.language_id
                    ? "bg-green-50 text-green-700 font-semibold animate__animated animate__zoomIn"
                    : "bg-gray-50 hover:bg-green-50 hover:text-green-700"
                } group`}
                onClick={() => {
                  this.props.onSelectLanguage(item);
                }}
              >
                <div>
                  {this.props.selectedLanguage !== null &&
                  this.props.selectedLanguage.language_id ===
                    item.language_id ? (
                    <BsCheckCircleFill className="text-xl text-green-700" />
                  ) : (
                    <ImRadioUnchecked className="text-xl group-hover:text-green-700" />
                  )}
                </div>
                <span>{item.language_name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Books categories */}
        <div className="bg-white rounded-lg p-1 mt-2 animate__animated animate__fadeInLeft">
          <div className="flex flex-row items-center justify-between gap-3">
            <div className="flex flex-row items-center gap-3">
              <div>
                <div className="flex items-center justify-center h-9 w-9 rounded-full cursor-pointer bg-gray-100 hover:bg-yellow-600 hover:text-white">
                  <FiChevronsLeft className="text-2xl" />
                </div>
              </div>
              <div className="font-semibold">Categories</div>
            </div>
            {this.props.selectedCategory !== null && (
              <div
                onClick={() => this.props.onSelectCategory(null)}
                className="flex flex-row items-center justify-center gap-1 rounded-md w-max cursor-pointer text-sm px-2 py-1 text-yellow-600 border border-yellow-300 hover:border-none font-bold bg-yellow-50 hover:bg-yellow-600 hover:text-white"
              >
                {/* <div>
                  <BiReset className="text-2xl animate-spi animate__animated animate__zoomIn" />
                </div> */}
                <span>Reset</span>
              </div>
            )}
          </div>
          {/* Data here */}
          <div className="mt-3">
            {this.props.loading === true ? (
              <div>
                {[1, 2, 3].map((count, c) => (
                  <div
                    key={c + 1}
                    className={`bg-gray-100 animate__animated animate__fadeIn animate__infinite animate__${
                      c % 2 !== 0 ? "slow" : c !== 3 ? "fast" : "slower"
                    } h-10 rounded-lg w-full mb-3`}
                  ></div>
                ))}
              </div>
            ) : (
              this.props.systemBasicInfo.basic_info.categories
                .filter(
                  (itm) =>
                    this.props.selectedBooksCategoryId.find(
                      (cat) => cat === itm.category_id
                    ) !== undefined
                )
                .map((item, i) => (
                  <div
                    key={i + 1}
                    className={`flex flex-row items-center gap-3 w-full p-1 mb-2 cursor-pointer rounded-lg ${
                      this.props.selectedCategory !== null &&
                      this.props.selectedCategory.category_id ===
                        item.category_id
                        ? "bg-white text-yellow-600 font-semibold animate__animated animate__zoomIn"
                        : "bg-gray-50 hover:bg-yellow-50 hover:text-yellow-600"
                    } group`}
                    onClick={() => {
                      this.props.onSelectCategory(
                        item.category_id ===
                          this.props.selectedCategory?.category_id
                          ? null
                          : item
                      );
                    }}
                  >
                    <div>
                      {this.props.selectedCategory !== null &&
                      this.props.selectedCategory.category_id ===
                        item.category_id ? (
                        <BsCheckCircleFill className="text-xl text-yellow-600" />
                      ) : (
                        <ImRadioUnchecked className="text-xl group-hover:text-yellow-700" />
                      )}
                    </div>
                    <span className="font-normal">{item.category_name}</span>
                  </div>
                ))
            )}
          </div>
        </div>
        {/* Books levels */}
        <div className="bg-white rounded-lg p-1 mt-2 animate__animated animate__fadeInLeft">
          <div className="flex flex-row items-center justify-between gap-3">
            <div className="flex flex-row items-center gap-3">
              <div>
                <div className="flex items-center justify-center h-9 w-9 rounded-full cursor-pointer bg-gray-100 hover:bg-yellow-600 hover:text-white">
                  <FiChevronsLeft className="text-2xl" />
                </div>
              </div>
              <div className="font-semibold">Books levels</div>
            </div>
            {this.props.selectedLevel !== null && (
              <div
                onClick={() => this.props.onSelectLevel(null)}
                className="flex flex-row items-center justify-center gap-1 rounded-md w-max cursor-pointer text-sm px-2 py-1 text-yellow-600 border border-yellow-300 hover:border-none font-bold bg-yellow-50 hover:bg-yellow-600 hover:text-white"
              >
                {/* <div>
                  <BiReset className="text-2xl animate-spi animate__animated animate__zoomIn" />
                </div> */}
                <span>Reset</span>
              </div>
            )}
          </div>
          {/* Data here */}
          <div className="mt-3">
            {this.props.loading === true ? (
              <div>
                {[1, 2, 3].map((count, c) => (
                  <div
                    key={c + 1}
                    className={`bg-gray-100 animate__animated animate__fadeIn animate__infinite animate__${
                      c % 2 !== 0 ? "slow" : c !== 3 ? "fast" : "slower"
                    } h-10 rounded-lg w-full mb-3`}
                  ></div>
                ))}
              </div>
            ) : (
              this.props.systemBasicInfo.basic_info.level
                .filter(
                  (itm) =>
                    this.props.selectedBooksLevelId.find(
                      (cat) => cat === itm.level_id
                    ) !== undefined
                )
                .map((item, i) => (
                  <div
                    key={i + 1}
                    className={`flex flex-row items-center gap-3 w-full p-1 mb-2 cursor-pointer rounded-lg ${
                      this.props.selectedLevel !== null &&
                      this.props.selectedLevel.level_id === item.level_id
                        ? "bg-white text-yellow-600 font-semibold animate__animated animate__zoomIn"
                        : "bg-gray-50 hover:bg-yellow-50 hover:text-yellow-600"
                    } group`}
                    onClick={() => {
                      this.props.onSelectLevel(
                        item.level_id === this.props.selectedLevel?.level_id
                          ? null
                          : item
                      );
                    }}
                  >
                    <div>
                      {this.props.selectedLevel !== null &&
                      this.props.selectedLevel.level_id === item.level_id ? (
                        <BsCheckCircleFill className="text-xl text-yellow-600" />
                      ) : (
                        <ImRadioUnchecked className="text-xl group-hover:text-yellow-700" />
                      )}
                    </div>
                    <span className="font-normal">{item.level}</span>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SideNavFilter;
