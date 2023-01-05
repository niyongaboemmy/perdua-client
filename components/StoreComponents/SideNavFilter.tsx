import { NextRouter } from "next/router";
import React, { Component } from "react";
import { BiReset } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiChevronsLeft } from "react-icons/fi";
import { ImRadioUnchecked } from "react-icons/im";
import { BookCategory, BookLanguage, SystemBasicInfoData } from "../../actions";
import Loading from "../Loading/Loading";

interface sideNavFilterProps {
  router: NextRouter;
  initializeSelectLanguage: () => void;
  systemBasicInfo: SystemBasicInfoData;
  selectedLanguage: BookLanguage | null;
  onSelectLanguage: (data: BookLanguage) => void;
  selectedCategory: BookCategory | null;
  onSelectCategory: (data: BookCategory | null) => void;
  loading: boolean;
  selectedBooksCategoryId: string[];
}
interface sideNavFilterState {}

class SideNavFilter extends Component<sideNavFilterProps, sideNavFilterState> {
  componentDidMount(): void {
    this.props.initializeSelectLanguage();
  }
  render() {
    if (this.props.systemBasicInfo.basic_info === null) {
      return <Loading className="bg-white" />;
    }
    return (
      <div className="">
        <div className="bg-white rounded-lg p-4">
          <div className="flex flex-row items-center gap-3">
            <div>
              <div className="flex items-center justify-center h-9 w-9 rounded-full cursor-pointer bg-gray-100 hover:bg-yellow-600 hover:text-white">
                <FiChevronsLeft className="text-2xl" />
              </div>
            </div>
            <div className="font-semibold">Books Languages</div>
          </div>
          {/* Data here */}
          <div className="mt-3">
            {this.props.systemBasicInfo.basic_info.languages.map((item, i) => (
              <div
                key={i + 1}
                className={`flex flex-row items-center gap-3 w-full p-2 mb-2 cursor-pointer rounded-lg ${
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
        <div className="bg-white rounded-lg p-4 mt-4">
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
                className="flex flex-row items-center justify-center gap-1 rounded-md w-max cursor-pointer text-sm p-1 pr-2 text-yellow-600 border border-yellow-300 hover:border-none font-bold bg-yellow-50 hover:bg-yellow-600 hover:text-white"
              >
                <div>
                  <BiReset className="text-2xl animate-spi animate__animated animate__zoomIn" />
                </div>
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
                    className={`flex flex-row items-center gap-3 w-full p-2 mb-2 cursor-pointer rounded-lg ${
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
      </div>
    );
  }
}

export default SideNavFilter;
