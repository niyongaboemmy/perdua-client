import React, { FC, Fragment, ReactElement, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

import { search } from "../../utils/functions";
import Loading from "../Loading/Loading";
type SelectCustomProps = {
  loading: boolean;
  id: string;
  title: string;
  close: Function;
  data: any;
  click: Function;
};

const SelectCustom: FC<SelectCustomProps> = ({
  loading,
  id,
  title,
  close,
  data,
  click,
}): ReactElement => {
  const [searchText, setSearch] = useState("");
  let dataList = search(data, searchText, {
    [title]: true,
  });
  /* function body */
  return (
    <div className=" bg-gray-100 shadow-lg border-gray-500 border-2 h-64 rounded-md flex flex-col">
      <div className="p-1 bg-white rounded flex items-center">
        <label htmlFor="search-input-data">
          <RiSearchLine className="text-2xl" />
        </label>
        <input
          type="search"
          className="py-1 px-3 flex-1"
          placeholder="Search"
          value={searchText}
          id="search-input-data"
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading === false && (
          <button
            onClick={() => close()}
            type={"button"}
            className="px-2 py-0.5 rounded text-sm ml-3 bg-red-200 text-red-800"
          >
            Close
          </button>
        )}
      </div>
      <div className="flex-1 p-2 overflow-y-auto border-t ">
        {loading === true ? (
          <div className="my-4 cursor-pointer" onClick={() => close()}>
            <div className="mx-auto text-center">
              <Loading />
            </div>
          </div>
        ) : (
          <Fragment>
            {dataList.length === 0 ? (
              <section className="p-4 text-center">
                <h2 className="text-lg text-gray-400">No results found</h2>
              </section>
            ) : (
              dataList.map((itm: any, key: number) => (
                <button
                  onClick={() => click(itm)}
                  className="block p-1 px-3 border-b w-full text-left border-gray-300 hover:text-white hover:bg-green-700 hover:rounded-md"
                  key={key}
                  type="button"
                >
                  {itm[title]}
                </button>
              ))
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};
export default SelectCustom;
