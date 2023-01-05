import Link from "next/link";
import React, { Component } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { MdKeyboardArrowDown, MdLibraryBooks } from "react-icons/md";
import { connect } from "react-redux";
import {
  Auth,
  BookLanguage,
  GetBookCategoryById,
  SystemBasicInfoData,
} from "../../actions";
import {
  BookAvailability,
  FC_GetBooksByLanguage,
  GetBookInterface,
} from "../../actions/books.action";
import { Alert } from "../../components/Alert/Alert";
import Loading from "../../components/Loading/Loading";
import { ProtectedPage } from "../../components/ProtectedPage/ProtectedPage";
import SelectCustom from "../../components/SelectCustom/SelectCustom";
import { StoreState } from "../../reducers";
import { commaFy, DATE, search } from "../../utils/functions";

interface BooksListProps {
  auth: Auth;
  systemBasicInfo: SystemBasicInfoData;
}
interface BooksListState {
  loading: boolean;
  error: string;
  books: GetBookInterface[] | null;
  selected_language: BookLanguage | null;
  openSelectLanguage: boolean;
  search_data: string;
}

class _BooksList extends Component<BooksListProps, BooksListState> {
  constructor(props: BooksListProps) {
    super(props);

    this.state = {
      loading: false,
      error: "",
      books: null,
      selected_language: null,
      openSelectLanguage: false,
      search_data: "",
    };
  }
  GetBooksListByLanguage = (language_id: string) => {
    this.state.loading === false && this.setState({ loading: true });
    FC_GetBooksByLanguage(
      language_id,
      (
        loading: boolean,
        res: {
          type: "success" | "error";
          msg: string;
          data: GetBookInterface[];
        } | null
      ) => {
        this.setState({ loading: loading });
        if (res !== null && res.type === "error") {
          this.setState({ error: res.msg, books: res.data, loading: false });
        }
        if (res !== null && res.type === "success") {
          this.setState({ error: "", books: res.data, loading: false });
        }
      }
    );
  };
  componentDidMount = () => {
    if (this.props.systemBasicInfo.basic_info === null) {
      this.setState({ loading: true });
    }
  };
  render() {
    if (this.props.systemBasicInfo.basic_info === null) {
      return <Loading />;
    }
    return (
      <ProtectedPage>
        <div className="bg-white rounded-md p-2 md:p-4">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-row items-center gap-3">
              <div>
                <MdLibraryBooks className="text-5xl text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">Books store catalogue</div>
                <div className="text-sm">
                  List of books and their description. Verify and publish them
                </div>
              </div>
            </div>
            {this.state.loading === false && (
              <Link
                href={"/register_book"}
                className="bg-white rounded-md border border-green-600 hover:bg-green-600 hover:text-white w-max px-3 py-2 font-semibold  cursor-pointer flex flex-row items-center justify-center gap-2"
              >
                <div>
                  <AiOutlineAppstoreAdd className="text-2xl" />
                </div>
                <span>Register new book</span>
              </Link>
            )}
          </div>
          {/* Contents here */}
          <div>
            <div className="w-full overflow-x-auto mt-5">
              <div className="mb-4 flex flex-row items-center gap-2 w-full">
                <div className="w-full">
                  <div className="flex flex-col relative bg-gray-100 rounded-md">
                    <div
                      onClick={() =>
                        this.setState({
                          openSelectLanguage: true,
                          error: "",
                        })
                      }
                      className={`"bg-gray-100 rounded-md pl-3 font-semibold w-full cursor-pointer h-10 flex flex-row items-center justify-between gap-2`}
                    >
                      <span>
                        {this.state.selected_language !== null ? (
                          `Book-language - ${this.state.selected_language.language_name}`
                        ) : (
                          <div className="text-gray-700">
                            Click to choose language
                          </div>
                        )}
                      </span>
                      <div className="mr-2">
                        <MdKeyboardArrowDown className="text-2xl" />
                      </div>
                    </div>
                    {this.state.openSelectLanguage === true && (
                      <div
                        className="absolute top-10 right-0 left-0 animate__animated animate__zoomIn animate__faster"
                        style={{ zIndex: 9 }}
                      >
                        <SelectCustom
                          loading={this.state.loading}
                          id={"language_id"}
                          title={"language_name"}
                          close={() =>
                            this.setState({ openSelectLanguage: false })
                          }
                          data={this.props.systemBasicInfo.basic_info.languages}
                          click={(data: BookLanguage) => {
                            this.setState({
                              selected_language: data,
                              openSelectLanguage: false,
                            });
                            this.GetBooksListByLanguage(data.language_id);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <input
                  type="text"
                  className="px-3 py-2 rounded-md bg-gray-100 w-full border border-gray-100"
                  placeholder="Search book by name..."
                  value={this.state.search_data}
                  onChange={(e) =>
                    this.setState({ search_data: e.target.value })
                  }
                />
              </div>
              <div className="" style={{ minHeight: "calc(100vh - 300px)" }}>
                {this.state.error !== "" && (
                  <div className="my-4">
                    <Alert
                      title="Error occurred"
                      description={this.state.error}
                      type={"danger"}
                      onClose={() => this.setState({ error: "" })}
                    />
                  </div>
                )}
                {this.state.selected_language === null ? (
                  <div className="flex flex-col items-center justify-center w-full bg-gray-100 rounded-md px-3 py-6 text-center">
                    <div className="text-2xl font-bold mt-3">
                      Choose book language
                    </div>
                    <div className="text-sm">
                      To view books list, you are required to choose language
                    </div>
                    {this.state.openSelectLanguage === false && (
                      <div className="mt-3">
                        <div
                          onClick={() =>
                            this.setState({ openSelectLanguage: true })
                          }
                          className="bg-green-700 text-white hover:bg-green-800 font-bold px-3 py-2 rounded-md w-max cursor-pointer"
                        >
                          Choose language
                        </div>
                      </div>
                    )}
                  </div>
                ) : this.state.loading === true || this.state.books === null ? (
                  <div>
                    <Loading className="bg-gray-100" />
                  </div>
                ) : (
                  <table className="text-sm text-left min-w-full">
                    <thead>
                      <tr>
                        <th className="border px-3 py-2">#</th>
                        <th className="border px-3 py-2">Book title</th>
                        <th className="border px-3 py-2 truncate">Category</th>
                        <th className="border px-3 py-2 truncate">Language</th>
                        <th className="border px-3 py-2 truncate">
                          Number of Pages
                        </th>
                        <th className="border px-3 py-2 truncate">
                          Publication Date
                        </th>
                        <th className="border px-3 py-2 truncate">
                          Book price
                        </th>
                        <th className="border px-3 py-2 truncate">
                          Availability
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(
                        search(
                          this.state.books,
                          this.state.search_data
                        ) as GetBookInterface[]
                      ).length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            className="text-lg font-semilight text-center py-6"
                          >
                            No result found!
                          </td>
                        </tr>
                      ) : (
                        (
                          search(
                            this.state.books,
                            this.state.search_data
                          ) as GetBookInterface[]
                        ).map((item, i) => (
                          <tr
                            title="Click to view more details"
                            key={i + 1}
                            className="hover:text-green-700 cursor-pointer"
                          >
                            <td className="border px-3 py-2">{i + 1}</td>
                            <td className="border px-3 py-2">{item.title}</td>
                            <td className="border px-3 py-2">
                              {this.props.systemBasicInfo.basic_info !== null &&
                                GetBookCategoryById(
                                  item.category_id,
                                  this.props.systemBasicInfo.basic_info
                                )?.category_name}
                            </td>
                            <td className="border px-3 py-2">
                              {this.state.selected_language?.language_name}
                            </td>
                            <td className="border px-3 py-2">
                              {item.num_pages}
                            </td>
                            <td className="border px-3 py-2">
                              {DATE(item.publication_date)}
                            </td>
                            <td className="border px-3 py-2">
                              RWF {commaFy(item.price)}
                            </td>
                            <td className="border px-3 py-2">
                              {item.availability === BookAvailability.IN_STOCK
                                ? "In stock"
                                : "Out stock"}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </ProtectedPage>
    );
  }
}

const mapStateToProps = ({
  auth,
  systemBasicInfo,
}: StoreState): { auth: Auth; systemBasicInfo: SystemBasicInfoData } => {
  return { auth, systemBasicInfo };
};

export const BooksList = connect(mapStateToProps, {})(_BooksList);

export default BooksList;
