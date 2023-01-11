import Image from "next/image";
import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { ImCheckboxUnchecked } from "react-icons/im";
import { BookAuthor, BookLevel, SystemBasicInfoData } from "../../actions";
import { ImageFolder } from "../../actions/books.action";
import { API_URL } from "../../utils/api";
import { search } from "../../utils/functions";

const SelectLevels = (props: {
  systemBasicInfo: SystemBasicInfoData;
  levelDetails: (author_id: string) => boolean;
  onSelectLevel: (author_id: string) => void;
}) => {
  const [searchData, setSearchData] = useState<string>("");
  if (props.systemBasicInfo.basic_info === null) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="-mt-3">
        <input
          type="text"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          className="bg-white border border-gray-500 px-3 py-2 rounded w-full mb-3"
        />
      </div>
      {(
        search(
          props.systemBasicInfo.basic_info.level,
          searchData
        ) as BookAuthor[]
      ).length === 0 ? (
        <div>No result found</div>
      ) : (
        <div>
          {(
            search(
              props.systemBasicInfo.basic_info.level,
              searchData
            ) as BookLevel[]
          ).map((item, i) => (
            <div
              key={i + 1}
              className={`flex flex-row items-center justify-between gap-3 pr-4 p-1 rounded-md ${
                props.levelDetails(item.level_id) === true
                  ? "bg-green-50 text-green-700 font-extrabold"
                  : "bg-gray-100 hover:bg-green-700 hover:text-white"
              } cursor-pointer group`}
              onClick={() => props.onSelectLevel(item.level_id)}
            >
              <div className="flex flex-row items-center gap-3">
                <div>
                  <div className="h-10 w-10 bg-white group-hover:bg-green-600 group-hover:text-white rounded-full flex items-center justify-center font-bold overflow-hidden">
                    {i + 1}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-base font-normal">{item.level}</div>
                </div>
              </div>
              <div>
                {props.levelDetails(item.level_id) === true ? (
                  <BsCheckCircleFill className="text-3xl" />
                ) : (
                  <ImCheckboxUnchecked className="text-3xl text-gray-300 group-hover:text-white" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectLevels;
