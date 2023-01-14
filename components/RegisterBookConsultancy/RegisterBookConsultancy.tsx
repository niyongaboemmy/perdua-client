import React, { Component } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FC_AddBookConsultancy } from "../../actions/books.action";
import { Alert } from "../Alert/Alert";
import FilePreview from "../FilePreview/FilePreview";
import Button from "../FormItems/Button";

interface RegisterBookConsultancyProps {
  onSubmit: () => void;
}
interface RegisterBookConsultancyState {
  loading: boolean;
  error: string;
  success: string;
  title: string;
  book_cover: File | null;
}

class RegisterBookConsultancy extends Component<
  RegisterBookConsultancyProps,
  RegisterBookConsultancyState
> {
  constructor(props: RegisterBookConsultancyProps) {
    super(props);

    this.state = {
      loading: false,
      error: "",
      success: "",
      title: "",
      book_cover: null,
    };
  }
  RegisterBookConsultancyFn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.title === "") {
      return this.setState({ error: "Please fill title" });
    }
    if (this.state.book_cover === null || this.state.book_cover.length === 0) {
      return this.setState({ error: "Please select book cover photo" });
    }
    this.setState({ loading: true });
    this.state.book_cover !== null &&
      FC_AddBookConsultancy(
        {
          title: this.state.title,
          book_cover: this.state.book_cover,
        },
        (
          loading: boolean,
          res: { type: "error" | "success"; msg: string } | null
        ) => {
          this.setState({ loading: loading });
          if (res?.type === "success") {
            this.setState({
              error: "",
              success: res.msg,
              title: "",
              book_cover: null,
            });
            // OnSubmit
            setTimeout(() => {
              this.props.onSubmit();
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
      <div>
        <form onSubmit={this.RegisterBookConsultancyFn}>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 md:col-span-5">
              <div className="rounded-md overflow-hidden">
                {this.state.book_cover === null ? (
                  <div className="bg-gray-200 rounded-md h-96"></div>
                ) : (
                  <FilePreview
                    selectedFile={this.state.book_cover}
                    onClose={() => {}}
                    isComponent={true}
                  />
                )}
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <div className="flex flex-col">
                <div className="mb-1">Book title</div>
                <input
                  type="text"
                  className="px-3 py-2 rounded-md w-full border border-gray-500"
                  value={this.state.title}
                  onChange={(e) =>
                    this.setState({
                      title: e.target.value,
                      error: "",
                      success: "",
                    })
                  }
                  disabled={this.state.loading}
                />
              </div>
              <div className="flex flex-col mt-5">
                <div className="mb-1">Book cover photo</div>
                <input
                  type="file"
                  className="px-3 py-2 rounded-md w-full border border-gray-500"
                  onChange={(e) =>
                    this.setState({
                      book_cover:
                        e.target.files === null || e.target.files.length <= 0
                          ? null
                          : e.target.files[0],
                      error: "",
                      success: "",
                    })
                  }
                  disabled={this.state.loading}
                />
              </div>
              {this.state.loading === true && (
                <div className="flex flex-row items-center gap-3 mt-4 text-yellow-700">
                  <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
                  <div>Saving book consultancy</div>
                </div>
              )}
              <div>
                {this.state.error !== "" && (
                  <div className="my-3">
                    <Alert
                      title={this.state.error}
                      type={"danger"}
                      onClose={() => this.setState({ error: "", success: "" })}
                    />
                  </div>
                )}
                {this.state.success !== "" && (
                  <div className="my-3">
                    <Alert
                      title={this.state.success}
                      type={"success"}
                      onClose={() => this.setState({ error: "", success: "" })}
                    />
                  </div>
                )}
                <div className="my-6">
                  <Button
                    type="submit"
                    title={
                      this.state.loading === true
                        ? "Loading, please wait..."
                        : "Register consultancy"
                    }
                    theme="success"
                    disabled={this.state.loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterBookConsultancy;
