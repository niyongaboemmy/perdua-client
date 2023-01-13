import Link from "next/link";
import React, { Component, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { RiSearchLine } from "react-icons/ri";
import {
  FC_GetBooksByKeyword,
  GetBookInterface,
} from "../../actions/books.action";
import { BookItem } from "../BookItem/BookItem";
import Button from "../FormItems/Button";
import { LoadingBooks } from "../HomepageComponents/NewBooks";
import Modal, { Themes, ModalSize } from "../Modal/Modal";

interface BookSearchProps {
  show_open_modal: boolean;
  setShowOpenModal: (status: boolean) => void;
}

interface BookSearchState {
  loading: boolean;
  error: string;
  search_data: string;
  search_result: GetBookInterface[] | null;
  loading_search_result: boolean;
  loaded_books_languages: {
    language_id: string;
    loaded: boolean;
  }[];
  selected_key: string;
}

export class BookSearch extends Component<BookSearchProps, BookSearchState> {
  constructor(props: BookSearchProps) {
    super(props);

    this.state = {
      loading: false,
      error: "",
      search_data: "",
      search_result: null,
      loading_search_result: false,
      loaded_books_languages: [],
      selected_key: "title",
    };
  }
  GetBooksListByKeyword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.state.loading_search_result === false &&
      this.setState({ loading_search_result: true });
    FC_GetBooksByKeyword(
      this.state.search_data,
      this.state.selected_key as "title" | "price" | "desc",
      (
        loading: boolean,
        res: {
          type: "success" | "error";
          msg: string;
          data: GetBookInterface[];
        } | null
      ) => {
        this.setState({ loading_search_result: loading });
        if (res !== null && res.type === "error") {
          this.setState({
            error: res.msg,
            search_result: res.data,
            loading_search_result: false,
          });
        }
        if (res !== null && res.type === "success") {
          this.setState({
            error: "",
            search_result: res.data,
            loading_search_result: false,
          });
        }
      }
    );
  };
  render() {
    return (
      <Fragment>
        <div></div>
        {this.props.show_open_modal === true && (
          <Modal
            backDrop={true}
            theme={Themes.default}
            close={() => {
              this.setState({ search_data: "" });
              this.props.setShowOpenModal(false);
            }}
            backDropClose={true}
            widthSizeClass={ModalSize.large}
            displayClose={false}
            padding={{
              title: undefined,
              body: true,
              footer: undefined,
            }}
          >
            <div>
              <div className="flex flex-row items-center gap-2">
                <div>
                  <div
                    onClick={() => this.props.setShowOpenModal(false)}
                    className="bg-gray-100 rounded-full flex items-center justify-center h-10 w-10 hover:bg-green-600 hover:text-white cursor-pointer"
                  >
                    <BsArrowLeft className="text-2xl" />
                  </div>
                </div>
                <div className="text-xl font-bold">Search book by keyword</div>
              </div>
              <form
                onSubmit={this.GetBooksListByKeyword}
                className="flex flex-col md:flex-row md:items-center gap-2 w-full"
              >
                <div>
                  <select
                    value={this.state.selected_key}
                    onChange={(e) =>
                      this.setState({ selected_key: e.target.value })
                    }
                    className="px-3 py-2 h-11 rounded-lg border-2 border-green-700 font-bold text-green-700"
                  >
                    <option value={"title"}>By title</option>
                    <option value={"desc"}>By description</option>
                    <option value={"price"}>By price</option>
                  </select>
                </div>
                <div className="relative w-full my-3">
                  <input
                    type="text"
                    className="bg-white py-2 px-4 pl-12 rounded-lg w-full border border-gray-400"
                    placeholder="Search book"
                    autoFocus={true}
                    value={this.state.search_data}
                    onChange={(e) =>
                      this.setState({ search_data: e.target.value })
                    }
                  />
                  <div
                    className="absolute top-2 left-3"
                    style={{ paddingTop: "1px" }}
                  >
                    <RiSearchLine className="text-2xl" />
                  </div>
                </div>
                <Button
                  title={`${
                    this.state.loading_search_result === false
                      ? "Search"
                      : "Loading..."
                  }`}
                  theme="success"
                  type="submit"
                />
              </form>
              {/* Search result */}
              <div>
                {this.state.loading_search_result === true ? (
                  <LoadingBooks cols={3} />
                ) : (
                  <div>
                    {this.state.search_result === null ? (
                      <div className="bg-gray-100 mt-2 p-3 py-6 text-gray-500 text-base font-light text-center">
                        Type search keyword to view the response!
                      </div>
                    ) : this.state.search_result.length === 0 ? (
                      <div className="bg-yellow-50 mt-2 p-3 py-6 text-yellow-700 text-xl font-light text-center">
                        No result found for selected keyword{" "}
                        <span className="font-bold">
                          {this.state.search_data}
                        </span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-12 gap-3">
                        {this.state.search_result.map((item, i) => (
                          <Link
                            href={`/book_details?book=${item.book_id}&product_title=${item.title}&product_image=${item.book_cover}`}
                            key={i + 1}
                            className={`col-span-6 md:col-span-4 lg:col-span-3`}
                          >
                            <BookItem
                              item={item}
                              hide_price={true}
                              onClick={() => {}}
                            />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Modal>
        )}
      </Fragment>
    );
  }
}

export default BookSearch;
