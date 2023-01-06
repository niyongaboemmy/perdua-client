import React, { Component } from "react";
import { BsArrowLeft } from "react-icons/bs";
import {
  FC_SubmitBookReview,
  GetBookDetailsInterface,
} from "../../actions/books.action";
import { Alert } from "../Alert/Alert";
import Button from "../FormItems/Button";

interface BookReviewProps {
  book_details: GetBookDetailsInterface;
  onClose: () => void;
}
interface BookReviewState {
  loading: boolean;
  ranking: 1 | 2 | 3 | 4 | 5;
  comment: string;
  error: string;
  success: string;
}

export class BookReview extends Component<BookReviewProps, BookReviewState> {
  constructor(props: BookReviewProps) {
    super(props);

    this.state = {
      loading: false,
      ranking: 3,
      comment: "",
      error: "",
      success: "",
    };
  }
  submitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.ranking) {
      this.setState({ loading: true, error: "", success: "" });
      FC_SubmitBookReview(
        {
          book_id: this.props.book_details.book_id,
          review: this.state.comment,
          rating: this.state.ranking,
        },
        (
          loading: boolean,
          res: {
            type: "success" | "error";
            msg: string;
          } | null
        ) => {
          this.setState({ loading: loading });
          if (res?.type === "error") {
            this.setState({ loading: false, error: res.msg, success: "" });
          }
          if (res?.type === "success") {
            this.setState({ loading: false, success: res.msg, error: "" });
            setTimeout(() => {
              this.props.onClose();
            }, 4000);
          }
        }
      );
    }
  };
  render() {
    return (
      <div>
        <div className="bg-gray-100 p-3 rounded-md animate__animated animate__fadeInDown">
          <div className="flex flex-row items-center gap-3 mb-3">
            <div>
              <div
                onClick={this.props.onClose}
                className="flex items-center justify-center h-10 w-10 cursor-pointer bg-white hover:bg-green-600 hover:text-white rounded-full"
              >
                <BsArrowLeft className="text-2xl" />
              </div>
            </div>
            <div>
              <div className="font-bold text-xl">Submit Book Review</div>
              <div className="text-sm text-gray-500">
                Fill the following inputs to submit your review for this book
              </div>
            </div>
          </div>
          <div>
            {/* Form here */}
            <form onSubmit={this.submitReview}>
              <div className="flex flex-col">
                <div className="font-semibold text-sm">Product rating</div>
                <div className="flex flex-row items-center gap-1 mt-1">
                  {(
                    [
                      { id: 1, value: "Worst" },
                      { id: 2, value: "Bad" },
                      { id: 3, value: "Medium" },
                      { id: 4, value: "Good" },
                      { id: 5, value: "Best" },
                    ] as { id: 1 | 2 | 3 | 4 | 5; value: string }[]
                  ).map((rate, r) => (
                    <div
                      key={r + 1}
                      onClick={() =>
                        this.state.loading === false &&
                        this.setState({
                          ranking: rate.id,
                          error: "",
                          success: "",
                        })
                      }
                      className={`p-1 px-4 border rounded-md ${
                        this.state.ranking === rate.id
                          ? "bg-green-100 font-bold border-green-600 text-green-700 animate__animated animate__zoomIn animate__faster"
                          : "bg-white cursor-pointer hover:bg-green-600 hover:text-white hover:border-green-700"
                      }`}
                    >
                      {rate.value}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <div className="font-semibold text-sm mb-1">
                  Comment (Optional)
                </div>
                <textarea
                  disabled={this.state.loading}
                  className="bg-gray-50 w-full h-auto rounded-md border border-gray-300 px-3 py-2 font-semibold"
                  rows={3}
                  onChange={(e) =>
                    this.setState({
                      comment: e.target.value,
                      error: "",
                      success: "",
                    })
                  }
                ></textarea>
              </div>
              {this.state.error !== "" && (
                <div className="my-3">
                  <Alert
                    title={this.state.error}
                    onClose={() => this.setState({ error: "", success: "" })}
                    type={"danger"}
                  />
                </div>
              )}
              {this.state.success !== "" && (
                <div className="my-3">
                  <Alert
                    title={this.state.success}
                    onClose={() => this.setState({ success: "", error: "" })}
                    type={"success"}
                  />
                </div>
              )}
              <div className="mt-4">
                <Button
                  theme="success"
                  disabled={this.state.loading}
                  type="submit"
                  title={`${
                    this.state.loading === true
                      ? "Loading, please wait..."
                      : "Submit Review"
                  }`}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
