import Image from "next/image";
import React, { Component } from "react";
import {
  FC_UpdateBookPrice,
  GetBookInterface,
  ImageFolder,
} from "../../actions/books.action";
import { API_URL } from "../../utils/api";
import { Alert } from "../Alert/Alert";
import Button from "../FormItems/Button";

interface UpdateBookPriceProps {
  book: GetBookInterface;
  onGoBack: () => void;
  onSubmitted: (book_id: string) => void;
}
interface UpdateBookPriceState {
  book_price: string;
  error: string;
  success: string;
  loading: boolean;
}

export class UpdateBookPrice extends Component<
  UpdateBookPriceProps,
  UpdateBookPriceState
> {
  constructor(props: UpdateBookPriceProps) {
    super(props);

    this.state = {
      book_price: this.props.book.price.toString(),
      error: "",
      success: "",
      loading: false,
    };
  }
  UpdateBookPrice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.book_price === "") {
      return this.setState({
        error: "Please fill book price",
        success: "",
      });
    }
    if (isNaN(parseInt(this.state.book_price))) {
      return this.setState({
        error: "Please price should be numeric",
        success: "",
      });
    }
    this.setState({ loading: true, success: "" });
    FC_UpdateBookPrice(
      {
        book_id: this.props.book.book_id,
        book_price: parseInt(this.state.book_price),
      },
      (
        loading: boolean,
        res: { type: "error" | "success"; msg: string } | null
      ) => {
        this.setState({ loading: loading });
        if (res?.type === "success") {
          this.setState({ success: res.msg, error: "", loading: false });
          setTimeout(() => {
            this.props.onSubmitted(this.props.book.book_id);
          }, 3000);
        }
        if (res?.type === "error") {
          this.setState({ error: res.msg, success: "", loading: false });
        }
      }
    );
  };
  render() {
    return (
      <div className="pt-3">
        <div className="flex flex-row items-center gap-4 w-full">
          <div className="w-32 h-auto bg-gray-200 rounded-md overflow-hidden">
            <Image
              src={`${API_URL}/${ImageFolder.cover}/${this.props.book.book_cover}`}
              alt="Update price"
              height={200}
              width={200}
              className="w-full h-auto"
            />
          </div>
          <form onSubmit={this.UpdateBookPrice} className="w-full">
            <div className="flex flex-col">
              <span>
                Change book price <span className="font-bold">(RWF)</span>
              </span>
              <input
                type="text"
                value={this.state.book_price}
                onChange={(e) =>
                  this.setState({
                    book_price: e.target.value,
                    error: "",
                    success: "",
                  })
                }
                className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full font-bold"
                autoFocus={true}
                disabled={this.state.loading}
              />
            </div>
            {this.state.error !== "" && (
              <div className="my-3">
                <Alert
                  type="danger"
                  title={this.state.error}
                  onClose={() => this.setState({ error: "", success: "" })}
                />
              </div>
            )}
            {this.state.success !== "" && (
              <div className="my-3">
                <Alert
                  type="success"
                  title={this.state.success}
                  onClose={() => this.setState({ error: "", success: "" })}
                />
              </div>
            )}
            <div className="mt-4 flex flex-row items-end gap-3">
              <Button
                type="button"
                theme="primary"
                title={`Go back to details`}
                className="bg-gray-200"
                onClick={() =>
                  this.state.loading === false && this.props.onGoBack()
                }
              />
              <Button
                type="submit"
                theme="success"
                title={`${
                  this.state.loading === true
                    ? "Loading, please wait..."
                    : "Update book price"
                }`}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateBookPrice;
