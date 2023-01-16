import Image from "next/image";
import React, { Component } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import { GetBookInterface, ImageFolder } from "../../actions/books.action";
import { API_URL } from "../../utils/api";
import { commaFy } from "../../utils/functions";

interface BookItemProps {
  item: GetBookInterface;
  hide_title?: boolean;
  hide_price?: boolean;
  onClick: () => void;
}
interface BookItemState {
  load_image: boolean;
}

export class BookItem extends Component<BookItemProps, BookItemState> {
  constructor(props: BookItemProps) {
    super(props);

    this.state = {
      load_image: true,
    };
  }
  render() {
    return (
      <div
        title={`${this.props.item.title} - ${
          this.props.hide_price !== true ? commaFy(this.props.item.price) : ""
        }`}
        className={`cursor-pointer bg-white rounded-lg group border border-white hover:border-green-600 animate__animated animate__fadeIn h-full`}
        onClick={this.props.onClick}
        data-aos="zoom-in-up"
        data-aos-duration="700"
      >
        <div
          className="mb-2 overflow-hidden bg-gray-100 rounded-md group-hover:rounded-b-none object-cover"
          style={{ height: "228px" }}
        >
          {this.state.load_image === true && (
            <div className="h-full w-full bg-gray-100 rounded-md flex flex-col items-center justify-center">
              <BsImage className="text-8xl mb-3 text-gray-300 animate__animated animate__fadeIn animate__infinite animate__slower" />
              <div className="flex flex-row items-center gap-2 text-gray-400"></div>
            </div>
          )}
          <Image
            src={`${API_URL}/${ImageFolder.cover}/${this.props.item.book_cover}`}
            alt={this.props.item.title}
            height={300}
            width={300}
            className={`h-0 w-0 bg-gray-100 animate__animated animate__fadeIn animate__infinite`}
            onLoadingComplete={(img: HTMLImageElement) => {
              img.className =
                "rounded-md group-hover:rounded-b-none w-auto h-auto min-w-full min-h-full object-cover animate__animated animate__fadeIn";
              this.setState({ load_image: false });
            }}
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
