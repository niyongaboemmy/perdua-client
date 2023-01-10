import Image from "next/image";
import React, { Component } from "react";
import { GetBookInterface, ImageFolder } from "../../actions/books.action";
import { API_URL } from "../../utils/api";
import { commaFy } from "../../utils/functions";

interface BookItemProps {
  item: GetBookInterface;
  hide_title?: boolean;
  hide_price?: boolean;
  onClick: () => void;
}
interface BookItemState {}

export class BookItem extends Component<BookItemProps, BookItemState> {
  render() {
    return (
      <div
        title={`${this.props.item.title} - ${
          this.props.hide_price !== true ? commaFy(this.props.item.price) : ""
        }`}
        className={`cursor-pointer bg-white rounded-lg group border border-white hover:border-green-600 animate__animated animate__fadeIn h-full`}
        onClick={this.props.onClick}
      >
        <div
          className="mb-2 overflow-hidden bg-gray-100 rounded-md group-hover:rounded-b-none object-cover"
          style={{ height: "228px" }}
        >
          <Image
            src={`${API_URL}/${ImageFolder.cover}/${this.props.item.book_cover}`}
            alt={this.props.item.title}
            className={`rounded-md group-hover:rounded-b-none w-auto h-auto min-w-full min-h-full object-cover`}
            height={300}
            width={300}
          />
        </div>
        <div className="p-3 pt-0">
          <div className="flex flex-col">
            {this.props.hide_title !== true && (
              <div className="text-sm truncate">{this.props.item.title}</div>
            )}
            {this.props.hide_price !== true && (
              <div className="text-xl font-bold -mt-1 text-gray-800 group-hover:text-green-600">
                <span className="text-base">RWF</span>{" "}
                {commaFy(this.props.item.price)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
