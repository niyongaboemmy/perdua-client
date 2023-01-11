import React, { ReactNode } from "react";

const Container = (props: {
  children: ReactNode;
  className?: string;
  lgPadding?: string;
}) => {
  return (
    <div
      className={`w-full ${
        props.className !== undefined ? props.className : ""
      }`}
    >
      <div
        className={`container md:mx-auto px-3 md:px-4 xl:px-${
          props.lgPadding !== undefined ? props.lgPadding : "32"
        }`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Container;
