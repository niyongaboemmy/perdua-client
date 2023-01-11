import Image from "next/image";
import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { ImCheckboxUnchecked } from "react-icons/im";
import { BookAuthor, BookTheme, SystemBasicInfoData } from "../../actions";
import { search } from "../../utils/functions";

export const ThemesTemp: BookTheme[] = [
  {
    theme_id: "1",
    theme: "Gender",
  },
  {
    theme_id: "2",
    theme: "Peace and values Education",
  },
  {
    theme_id: "3",
    theme: "Inclusiveness",
  },
  {
    theme_id: "4",
    theme: "Environment and sustainability",
  },

  {
    theme_id: "5",
    theme: "STEM",
  },
  {
    theme_id: "6",
    theme: "Animal, fun and Friendship",
  },
  {
    theme_id: "7",
    theme: "Financial education ",
  },
  {
    theme_id: "8",
    theme: "Entrepreneurship",
  },
  {
    theme_id: "9",
    theme: "Farming and discovery",
  },
  {
    theme_id: "10",
    theme: "Social emotional education",
  },
  {
    theme_id: "11",
    theme: "Behaving well",
  },
  {
    theme_id: "12",
    theme: "Hardworking",
  },
  {
    theme_id: "13",
    theme: "Bravery and adventure",
  },
  {
    theme_id: "14",
    theme: "Discipline and obedience",
  },
  {
    theme_id: "15",
    theme: "Health and hygiene",
  },
  {
    theme_id: "16",
    theme: "Compassion and friendship",
  },
  {
    theme_id: "17",
    theme: "Bravery, determination, and adventure",
  },
];

const SelectThemes = (props: {
  systemBasicInfo: SystemBasicInfoData;
  themeDetails: (theme_id: string) => boolean;
  onSelectTheme: (theme_id: string) => void;
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
      {(search(ThemesTemp, searchData) as BookAuthor[]).length === 0 ? (
        <div>No result found</div>
      ) : (
        <div>
          {(search(ThemesTemp, searchData) as BookTheme[]).map((item, i) => (
            <div
              key={i + 1}
              className={`flex flex-row items-center justify-between gap-3 pr-4 p-1 rounded-md ${
                props.themeDetails(item.theme_id) === true
                  ? "bg-green-50 text-green-700 font-extrabold"
                  : "bg-gray-100 hover:bg-green-700 hover:text-white"
              } cursor-pointer group`}
              onClick={() => props.onSelectTheme(item.theme_id)}
            >
              <div className="flex flex-row items-center gap-3">
                <div>
                  <div className="h-10 w-10 bg-white group-hover:bg-green-600 group-hover:text-white rounded-full flex items-center justify-center font-bold overflow-hidden">
                    {i + 1}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-base font-normal">{item.theme}</div>
                </div>
              </div>
              <div>
                {props.themeDetails(item.theme_id) === true ? (
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

export default SelectThemes;
