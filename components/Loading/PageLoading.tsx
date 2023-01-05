import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const PageLoading = (props: {
  title?: string;
  className?: string;
  css: string;
}) => {
  if (props.css !== "green") {
    return <div className="h-60 bg-red-600"></div>;
  }
  return (
    <div
      className={`flex flex-col items-center justify-center px-4 py-4 rounded-md w-full ${
        props.className !== undefined ? props.className : ""
      }`}
    >
      <div>
        <div>
          <AiOutlineLoading3Quarters className="text-6xl animate-spin" />
        </div>
      </div>
      <div className="text-xl animate__animated animate__fadeIn animate__infinite font-normal">
        {props.title !== undefined ? props.title : "Loading..."}
      </div>
    </div>
  );
};

export default PageLoading;
