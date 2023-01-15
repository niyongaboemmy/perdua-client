import Image from "next/image";
import React, { Component } from "react";
import {
  BookConsultancyInterface,
  FC_GetBooksConsultancies,
  FC_RemoveBook,
  ImageFolder,
} from "../../actions/books.action";
import { API_URL } from "../../utils/api";
import { Alert } from "../Alert/Alert";
import Container from "../Container/Container";
import { LoadingBooks } from "../HomepageComponents/NewBooks";

interface BookConsultanciesProps {
  allow_remove?: boolean;
}
interface BookConsultanciesState {
  loading: boolean;
  books: BookConsultancyInterface[] | null;
  error: string;
  success: string;
}

class BookConsultancies extends Component<
  BookConsultanciesProps,
  BookConsultanciesState
> {
  constructor(props: BookConsultanciesProps) {
    super(props);

    this.state = {
      loading: false,
      books: null,
      error: "",
      success: "",
    };
  }
  GetBookConsultancies = () => {
    this.setState({ loading: true });
    FC_GetBooksConsultancies(
      (
        loading: boolean,
        res: {
          type: "success" | "error";
          msg: string;
          data: BookConsultancyInterface[];
        } | null
      ) => {
        this.setState({ loading: loading });
        if (res?.type === "success") {
          this.setState({ books: res.data, loading: false, error: "" });
        }
        if (res?.type === "error") {
          this.setState({ error: res.msg, books: [], loading: false });
        }
      }
    );
  };
  RemoveBook = (book_id: string) => {
    // Function to remove book
    this.setState({ loading: true, error: "", success: "" });
    FC_RemoveBook(
      book_id,
      (
        loading: boolean,
        res: { type: "error" | "success"; msg: string } | null
      ) => {
        this.setState({ loading: loading });
        if (res?.type === "error") {
          this.setState({
            error: res.msg,
            success: "",
            loading: false,
          });
        }
        if (res?.type === "success") {
          this.setState({
            success: res.msg,
            error: "",
            loading: false,
          });
          setTimeout(() => {
            this.state.books !== null &&
              this.setState({
                books: this.state.books.filter(
                  (itm) => itm.book_id !== book_id
                ),
              });
          }, 1000);
        }
      }
    );
  };
  componentDidMount = () => {
    this.GetBookConsultancies();
  };
  render() {
    if (this.state.loading === true || this.state.books === null) {
      return (
        <Container className="bg-white rounded-lg py-6">
          <LoadingBooks cols={2} />
        </Container>
      );
    }
    if (this.state.books.length === 0) {
      return <div></div>;
    }
    return (
      <Container
        className={`${this.props.allow_remove === true ? "" : "py-6 md:py-20"}`}
      >
        {this.props.allow_remove !== true && (
          <div className="flex flex-row items-center mb-8">
            <div></div>
            <div>
              <div className="font-bold text-3xl">Consultancies</div>
              <div className="text-sm text-gray-600">
                Providing a thorough introduction to management consultancy
              </div>
            </div>
          </div>
        )}
        {this.state.success !== "" && (
          <div className="mb-3">
            <Alert
              title={this.state.success}
              type={"success"}
              onClose={() => this.setState({ success: "", error: "" })}
            />
          </div>
        )}
        {this.state.error !== "" && (
          <div className="mb-3">
            <Alert
              title={this.state.error}
              type={"danger"}
              onClose={() => this.setState({ success: "", error: "" })}
            />
          </div>
        )}
        <div className="grid grid-cols-12 gap-3 md:gap-14 lg:gap-12">
          {this.state.books.map((item, i) => (
            <div
              key={i + 1}
              className="col-span-6 md:col-span-4 lg:col-span-3 rounded-lg overflow-hidden bg-white shadow-lg"
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
            >
              <div className="w-full h-auto overflow-hidden rounded-t-lg bg-gray-100">
                <Image
                  src={`${API_URL}/${ImageFolder.cover}/${item.book_cover}`}
                  alt=""
                  height={200}
                  width={200}
                  className="h-auto w-auto min-h-full min-w-full object-cover"
                />
              </div>
              <div className="p-3 lg:p-5">
                <div className="text-sm">{item.title}</div>
                {this.props.allow_remove === true && (
                  <div
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure do you want to remove " +
                            item.title +
                            "?"
                        ) === true
                      ) {
                        this.RemoveBook(item.book_id);
                      }
                    }}
                    className="bg-red-100 text-red-700 hover:bg-red-700 hover:text-white px-3 py-2 rounded-md cursor-pointer text-center mt-2"
                  >
                    Remove
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    );
  }
}

export default BookConsultancies;
