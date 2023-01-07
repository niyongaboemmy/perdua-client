import Image from "next/image";
import React, { Component } from "react";
import {
  FC_UpdateBookCoverImage,
  GetBookInterface,
  ImageFolder,
} from "../../actions/books.action";
import { API_URL } from "../../utils/api";
import { Alert } from "../Alert/Alert";
import FilePreview from "../FilePreview/FilePreview";
import Button from "../FormItems/Button";

interface UpdateBookCoverProps {
  book: GetBookInterface;
  onGoBack: () => void;
  onSubmitted: (book_id: string) => void;
}
interface UpdateBookCoverState {
  error: string;
  success: string;
  loading: boolean;
  book_cover: File | null;
}

export class UpdateBookCover extends Component<
  UpdateBookCoverProps,
  UpdateBookCoverState
> {
  constructor(props: UpdateBookCoverProps) {
    super(props);

    this.state = {
      error: "",
      success: "",
      loading: false,
      book_cover: null,
    };
  }
  UpdateBookCover = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.book_cover === null) {
      return this.setState({
        error: "Please select book cover",
        success: "",
      });
    }
    this.setState({ loading: true, success: "" });
    FC_UpdateBookCoverImage(
      {
        book_id: this.props.book.book_id,
        book_cover: this.state.book_cover,
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
            {this.state.book_cover === null ? (
              <Image
                src={`${API_URL}/${ImageFolder.cover}/${this.props.book.book_cover}`}
                alt="Update cover"
                height={200}
                width={200}
                className="w-full h-auto"
              />
            ) : (
              <FilePreview
                isComponent={true}
                selectedFile={this.state.book_cover}
                onClose={() => {}}
              />
            )}
          </div>
          <form onSubmit={this.UpdateBookCover} className="w-full">
            <div className="flex flex-col">
              <span>
                Select book cover image <span className="font-bold">(RWF)</span>
              </span>
              <input
                type="file"
                onChange={(e) =>
                  this.setState({
                    book_cover:
                      e.target.files === null || e.target.files.length === 0
                        ? null
                        : e.target.files[0],
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
                    : "Update book cover"
                }`}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateBookCover;
