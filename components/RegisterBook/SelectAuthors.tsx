import Image from "next/image";
import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { ImCheckboxUnchecked } from "react-icons/im";
import {
  BookAuthor,
  SystemBasicInfo,
  SystemBasicInfoData,
} from "../../actions";
import { ImageFolder } from "../../actions/books.action";
import { API_URL } from "../../utils/api";
import { search } from "../../utils/functions";

const SelectAuthors = (props: {
  systemBasicInfo: SystemBasicInfoData;
  authorDetails: (author_id: string) => boolean;
  onSelectAuthor: (author_id: string) => void;
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
          props.systemBasicInfo.basic_info.authors,
          searchData
        ) as BookAuthor[]
      ).length === 0 ? (
        <div>No result found</div>
      ) : (
        <div>
          {(
            search(
              props.systemBasicInfo.basic_info.authors,
              searchData
            ) as BookAuthor[]
          ).map((item, i) => (
            <div
              key={i + 1}
              className={`flex flex-row items-center justify-between gap-3 pr-4 p-1 rounded-md ${
                props.authorDetails(item.author_id) === true
                  ? "bg-green-50 text-green-700 font-extrabold"
                  : "bg-gray-100 hover:bg-green-700 hover:text-white"
              } cursor-pointer group`}
              onClick={() => props.onSelectAuthor(item.author_id)}
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
                {props.authorDetails(item.author_id) === true ? (
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

export default SelectAuthors;
