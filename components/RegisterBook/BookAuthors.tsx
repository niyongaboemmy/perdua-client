import Image from "next/image";
import React, { Component } from "react";
import { MdClose } from "react-icons/md";
import { BookAuthor, SystemBasicInfo } from "../../actions";
import { AuthorType } from "../../actions/author.action";
import { ImageFolder } from "../../actions/books.action";
import { API_URL } from "../../utils/api";

interface BookAuthorsProps {
  authors: string[];
  loading_form: boolean;
  GetBookAuthorsByIds: (
    authors: string[],
    systemBasicInfo: SystemBasicInfo
  ) => BookAuthor[];
  systemBasicInfo: SystemBasicInfo;
  authorDetails: (author_id: string) => boolean;
  selectAuthor: (author_id: string) => void;
  type: AuthorType;
  openSelectAuthors: () => void;
}
interface BookAuthorsState {}

class BookAuthors extends Component<BookAuthorsProps, BookAuthorsState> {
  render() {
    const typeName =
      this.props.type === AuthorType.AUTHOR ? "Author" : "Illustrator";
    return (
      <div className="col-span-12 lg:col-span-12">
        <div className="flex flex-row items-center justify-between gap-3">
          <div className="font-bold flex flex-row items-center gap-2">
            <span>Book {typeName}</span>{" "}
            <div className="bg-yellow-600 text-white px-2 rounded-md text-sm">
              {this.props.authors.length}
            </div>
          </div>
          <div>
            {this.props.authors.length > 0 && (
              <div
                onClick={this.props.openSelectAuthors}
                className="bg-white text-green-600 border border-green-600 hover:border-green-700 hover:bg-green-700 hover:text-white rounded px-3 py-1 w-max cursor-pointer font-semibold"
              >
                Add {typeName}s
              </div>
            )}
          </div>
        </div>
        {this.props.authors.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full bg-gray-100 rounded-md px-4 py-6 mt-3">
            <div></div>
            <div className="text-xl font-semibold">No {typeName}s added</div>
            <div className="text-sm mb-3">
              Click the following button to add authors for this book
            </div>
            <div>
              <div
                onClick={this.props.openSelectAuthors}
                className="px-3 py-2 rounded-md w-max cursor-pointer bg-green-700 text-white hover:bg-green-800"
              >
                Select {typeName}s
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-3">
            {this.props.GetBookAuthorsByIds(
              this.props.authors,
              this.props.systemBasicInfo
            ) !== null &&
              this.props
                .GetBookAuthorsByIds(
                  this.props.authors,
                  this.props.systemBasicInfo
                )
                .filter((itm) => itm.type === this.props.type)
                .map((item, i) => (
                  <div
                    key={i + 1}
                    className={`flex flex-row items-center justify-between gap-3 pr-4 p-1 rounded-md ${
                      this.props.authorDetails(item.author_id) === true
                        ? "bg-gray-100 font-extrabold"
                        : "bg-gray-100 hover:bg-green-700 hover:text-white"
                    } mb-2 group`}
                  >
                    <div className="flex flex-row items-center gap-3">
                      <div>
                        <div className="h-16 w-16 bg-white rounded overflow-hidden">
                          <Image
                            src={`${API_URL}/${ImageFolder.author}/${item.author_pic}`}
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
                      <div
                        onClick={() => {
                          if (
                            window.confirm(
                              `Are you sure do you want to remove ${item.author_name}?`
                            ) === true &&
                            this.props.loading_form === false
                          ) {
                            this.props.selectAuthor(item.author_id);
                          }
                        }}
                        className="flex flex-row items-center justify-center gap-2 rounded-full bg-white h-10 w-10 text-red-700 font-bold text-sm cursor-pointer hover:bg-red-700 hover:text-white"
                      >
                        <div>
                          <MdClose className="text-3xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>
    );
  }
}

export default BookAuthors;
