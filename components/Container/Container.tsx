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
        className={`container md:mx-auto px-3 ${
          props.lgPadding !== undefined
            ? `md:px-2 lg:px-${props.lgPadding}`
            : "md:px-2 lg:px-6"
        }`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Container;
