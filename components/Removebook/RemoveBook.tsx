import React, { Component } from "react";
import { FC_RemoveBook, GetBookInterface } from "../../actions/books.action";
import { Alert } from "../Alert/Alert";
import Button from "../FormItems/Button";
import Loading from "../Loading/Loading";

interface RemoveBookProps {
  book: GetBookInterface;
  onGoBack: () => void;
  onSubmitted: (book_id: string) => void;
}

interface RemoveBookState {
  loading: boolean;
  error: string;
  success: string;
  showButtons: boolean;
}

export class RemoveBook extends Component<RemoveBookProps, RemoveBookState> {
  constructor(props: RemoveBookProps) {
    super(props);

    this.state = {
      loading: false,
      error: "",
      success: "",
      showButtons: true,
    };
  }
  RemoveBook = () => {
    // Function to remove book
    this.setState({ loading: true, error: "", success: "" });
    FC_RemoveBook(
      this.props.book.book_id,
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
            showButtons: true,
          });
        }
        if (res?.type === "success") {
          this.setState({
            success: res.msg,
            error: "",
            loading: false,
            showButtons: false,
          });
          setTimeout(() => {
            this.props.onSubmitted(this.props.book.book_id);
          }, 3000);
        }
      }
    );
  };
  render() {
    if (this.state.loading === true) {
      return (
        <div className="mt-6 bg-gray-100">
          <Loading className="bg-gray-100" title="Deleting, please wait..." />
        </div>
      );
    }
    return (
      <div className="mt-6">
        <div className="flex flex-col items-center justify-center w-full">
          <div></div>
          <div className="text-lg">
            Are you sure do you want to remove{" "}
            <span className="text-yellow-700 font-bold">
              {this.props.book.title}
            </span>
            ?
          </div>
          {this.state.success !== "" && (
            <div>
              <Alert
                type="success"
                title={this.state.success}
                onClose={() => this.props.onSubmitted(this.props.book.book_id)}
              />
            </div>
          )}
          {this.state.error !== "" && (
            <div>
              <Alert
                type="danger"
                title={this.state.error}
                onClose={() =>
                  this.setState({ error: "", success: "", showButtons: true })
                }
              />
            </div>
          )}
          {this.state.showButtons === true && (
            <div className="flex flex-row items-center justify-center gap-2 mt-4 mb-5">
              <Button
                theme="success"
                title="No, Cancel"
                onClick={() => this.props.onGoBack()}
                className="bg-gray-200 hover:bg-gray-500 text-black hover:text-white"
              />
              <Button
                theme="success"
                title="Yes, Remove the book"
                onClick={() => this.RemoveBook()}
                className="bg-yellow-700 hover:bg-yellow-800 text-white"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RemoveBook;
