import Link from "next/link";
import React, { Component } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AuthorType, FC_RegisterAuthor } from "../../actions/author.action";
import { Alert } from "../Alert/Alert";
import FilePreview from "../FilePreview/FilePreview";
import Button from "../FormItems/Button";

export interface AuthorSocialMedia {
  facebook: string;
  googleSite: string;
  instagram: string;
  linkedin: string;
  researchGate: string;
  twitter: string;
}

interface RegisterAuthorProps {}
interface RegisterAuthorState {
  loading: boolean;
  author_name: string;
  social_media: AuthorSocialMedia;
  author_pic: File | null;
  phone: string;
  email: string;
  bibliography: string;
  error: {
    target:
      | "author_name"
      | "social_media"
      | "author_pic"
      | "phone"
      | "email"
      | "bibliography"
      | "main";
    msg: string;
  } | null;
  success: string;
  type: AuthorType;
}

const initialState: RegisterAuthorState = {
  loading: false,
  author_name: "",
  social_media: {
    facebook: "",
    googleSite: "",
    instagram: "",
    linkedin: "",
    researchGate: "",
    twitter: "",
  },
  author_pic: null,
  phone: "",
  email: "",
  bibliography: "",
  error: null,
  success: "",
  type: AuthorType.AUTHOR,
};

class RegisterAuthor extends Component<
  RegisterAuthorProps,
  RegisterAuthorState
> {
  constructor(props: RegisterAuthorProps) {
    super(props);

    this.state = initialState;
  }
  CleanForm = () => {
    this.setState({
      ...initialState,
    });
  };
  FC_HandleSubmitAuthor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validation
    this.setState({ error: null, success: "", loading: false });
    if (this.state.author_name === "") {
      return this.setState({
        error: {
          target: "author_name",
          msg: "Please fill author name",
        },
      });
    }
    if (this.state.phone === "") {
      return this.setState({
        error: {
          target: "phone",
          msg: "Please fill author phone number",
        },
      });
    }
    if (this.state.email === "") {
      return this.setState({
        error: {
          target: "email",
          msg: "Please fill author email address",
        },
      });
    }
    if (this.state.bibliography === "") {
      return this.setState({
        error: {
          target: "bibliography",
          msg: "Please fill author bibliography",
        },
      });
    }
    if (this.state.author_pic === null || this.state.author_pic.size <= 0) {
      return this.setState({
        error: {
          target: "author_pic",
          msg: "Please select author profile picture",
        },
      });
    }
    // ------------Register author-----------
    this.setState({ loading: true });
    FC_RegisterAuthor(
      {
        author_name: this.state.author_name,
        author_pic: this.state.author_pic,
        bibliography: this.state.bibliography,
        email: this.state.email,
        phone: this.state.phone,
        social_media: this.state.social_media,
        type: this.state.type,
      },
      (
        loading: boolean,
        res: { type: "success" | "error"; msg: string } | null
      ) => {
        this.setState({ loading: loading });
        if (res?.type === "success") {
          this.setState({ loading: false, error: null, success: res.msg });
        }
        if (res?.type === "error") {
          this.setState({
            loading: false,
            success: "",
            error: {
              target: "main",
              msg: res.msg,
            },
          });
        }
      }
    );
  };
  render() {
    if (this.state.success !== "") {
      return (
        <div className="mt-2 bg-white h-screen p-3 md:p-6 rounded-md">
          <Alert
            title="Done successfully!"
            description={this.state.success}
            type={"success"}
            onClose={() => this.setState({ error: null, success: "" })}
          />
          <div className="flex flex-row items-center justify-center mt-5 gap-5">
            <Button
              title="Register another"
              theme="success"
              type="button"
              className="font-semibold animate__animated animate__fadeIn animate__slow"
              onClick={() => {
                this.setState({ error: null, success: "" });
                this.CleanForm();
              }}
            />
            <Link
              href={"/authors_list"}
              className="px-3 py-2 rounded border border-gray-400 text-gray-700 font-semibold animate__animated animate__fadeIn animate__slow"
            >
              View contributors
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="bg-white rounded-md p-3 md:p-5">
          <form
            onSubmit={this.FC_HandleSubmitAuthor}
            className="w-full grid grid-cols-12 gap-5"
          >
            <div className="col-span-12 md:col-span-6 lg:col-span-9 grid grid-cols-12 gap-3">
              <div className="col-span-12 lg:col-span-6">
                <div className="font-bold mb-5">Contributor information</div>
                <div className="flex flex-col mb-4">
                  <span className="text-sm">Contributor category</span>
                  <select
                    disabled={this.state.loading}
                    className={`rounded border border-yellow-600 text-yellow-600 font-semibold px-3 py-2 w-full mt-1`}
                    value={this.state.type}
                    onChange={(e) =>
                      this.setState({
                        type:
                          e.target.value === ""
                            ? AuthorType.AUTHOR
                            : (e.target.value as AuthorType),
                        error: null,
                      })
                    }
                  >
                    <option value={AuthorType.AUTHOR}>
                      Author Contributor
                    </option>
                    <option value={AuthorType.ILLUSTRATOR}>
                      Illustrator Contributor
                    </option>
                  </select>
                </div>
                <div className="flex flex-col mb-4">
                  <span className="text-sm">Contributor names</span>
                  <input
                    type="text"
                    disabled={this.state.loading}
                    className={`${
                      this.state.error?.target === "author_name"
                        ? "border border-red-600"
                        : ""
                    } rounded border border-gray-400 font-semibold px-3 py-2 w-full mt-1`}
                    value={this.state.author_name}
                    onChange={(e) =>
                      this.setState({
                        author_name: e.target.value,
                        error: null,
                      })
                    }
                  />
                  {this.state.error?.target === "author_name" && (
                    <div className="mt-2">
                      <Alert
                        title="Invalid input"
                        description={this.state.error.msg}
                        type={"danger"}
                        onClose={() => this.setState({ error: null })}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <span className="text-sm">Phone number</span>
                  <input
                    type="tel"
                    disabled={this.state.loading}
                    className={`${
                      this.state.error?.target === "phone"
                        ? "border border-red-600"
                        : ""
                    } rounded border border-gray-400 font-semibold px-3 py-2 w-full mt-1`}
                    value={this.state.phone}
                    onChange={(e) =>
                      this.setState({
                        phone: e.target.value,
                        error: null,
                      })
                    }
                  />
                  {this.state.error?.target === "phone" && (
                    <div className="mt-2">
                      <Alert
                        title="Invalid input"
                        description={this.state.error.msg}
                        type={"danger"}
                        onClose={() => this.setState({ error: null })}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <span className="text-sm">Email</span>
                  <input
                    type="email"
                    disabled={this.state.loading}
                    className={`${
                      this.state.error?.target === "email"
                        ? "border border-red-600"
                        : ""
                    } rounded border border-gray-400 font-semibold px-3 py-2 w-full mt-1`}
                    value={this.state.email}
                    onChange={(e) =>
                      this.setState({
                        email: e.target.value,
                        error: null,
                      })
                    }
                  />
                  {this.state.error?.target === "email" && (
                    <div className="mt-2">
                      <Alert
                        title="Invalid input"
                        description={this.state.error.msg}
                        type={"danger"}
                        onClose={() => this.setState({ error: null })}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <span className="text-sm">Bibliography</span>
                  <textarea
                    disabled={this.state.loading}
                    className={`${
                      this.state.error?.target === "bibliography"
                        ? "border border-red-600"
                        : ""
                    } rounded border border-gray-400 font-semibold px-3 py-2 w-full mt-1`}
                    value={this.state.bibliography}
                    onChange={(e) =>
                      this.setState({
                        bibliography: e.target.value,
                        error: null,
                      })
                    }
                    style={{ minHeight: "130px" }}
                  ></textarea>
                  {this.state.error?.target === "bibliography" && (
                    <div className="mt-2">
                      <Alert
                        title="Invalid input"
                        description={this.state.error.msg}
                        type={"danger"}
                        onClose={() => this.setState({ error: null })}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6">
                <div className="font-bold mb-5">
                  Social media{" "}
                  <span className="text-sm font-bold text-yellow-700">
                    (Optional)
                  </span>
                </div>
                <div className="flex flex-col mb-4">
                  <span className="text-sm">Facebook profile link</span>
                  <input
                    type="text"
                    disabled={this.state.loading}
                    className={`${
                      this.state.error?.target === "social_media"
                        ? "border border-red-600"
                        : ""
                    } rounded border border-gray-400 font-semibold px-3 py-2 w-full mt-1`}
                    value={this.state.social_media.facebook}
                    onChange={(e) =>
                      this.setState({
                        social_media: {
                          ...this.state.social_media,
                          facebook: e.target.value,
                        },
                        error: null,
                      })
                    }
                  />
                  {this.state.error?.target === "social_media" && (
                    <div className="mt-2">
                      <Alert
                        title="Invalid input"
                        description={this.state.error.msg}
                        type={"danger"}
                        onClose={() => this.setState({ error: null })}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <span className="text-sm">Twitter profile link</span>
                  <input
                    type="text"
                    disabled={this.state.loading}
                    className={`${
                      this.state.error?.target === "social_media"
                        ? "border border-red-600"
                        : ""
                    } rounded border border-gray-400 font-semibold px-3 py-2 w-full mt-1`}
                    value={this.state.social_media.twitter}
                    onChange={(e) =>
                      this.setState({
                        social_media: {
                          ...this.state.social_media,
                          twitter: e.target.value,
                        },
                        error: null,
                      })
                    }
                  />
                  {this.state.error?.target === "social_media" && (
                    <div className="mt-2">
                      <Alert
                        title="Invalid input"
                        description={this.state.error.msg}
                        type={"danger"}
                        onClose={() => this.setState({ error: null })}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <span className="text-sm">Instagram profile link</span>
                  <input
                    type="text"
                    disabled={this.state.loading}
                    className={`${
                      this.state.error?.target === "social_media"
                        ? "border border-red-600"
                        : ""
                    } rounded border border-gray-400 font-semibold px-3 py-2 w-full mt-1`}
                    value={this.state.social_media.instagram}
                    onChange={(e) =>
                      this.setState({
                        social_media: {
                          ...this.state.social_media,
                          instagram: e.target.value,
                        },
                        error: null,
                      })
                    }
                  />
                  {this.state.error?.target === "social_media" && (
                    <div className="mt-2">
                      <Alert
                        title="Invalid input"
                        description={this.state.error.msg}
                        type={"danger"}
                        onClose={() => this.setState({ error: null })}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <span className="text-sm">LinkedIn profile link</span>
                  <input
                    type="text"
                    disabled={this.state.loading}
                    className={`${
                      this.state.error?.target === "social_media"
                        ? "border border-red-600"
                        : ""
                    } rounded border border-gray-400 font-semibold px-3 py-2 w-full mt-1`}
                    value={this.state.social_media.linkedin}
                    onChange={(e) =>
                      this.setState({
                        social_media: {
                          ...this.state.social_media,
                          linkedin: e.target.value,
                        },
                        error: null,
                      })
                    }
                  />
                  {this.state.error?.target === "social_media" && (
                    <div className="mt-2">
                      <Alert
                        title="Invalid input"
                        description={this.state.error.msg}
                        type={"danger"}
                        onClose={() => this.setState({ error: null })}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <span className="text-sm">Research gate link</span>
                  <input
                    type="link"
                    disabled={this.state.loading}
                    className={`${
                      this.state.error?.target === "social_media"
                        ? "border border-red-600"
                        : ""
                    } rounded border border-gray-400 font-semibold px-3 py-2 w-full mt-1`}
                    value={this.state.social_media.researchGate}
                    onChange={(e) =>
                      this.setState({
                        social_media: {
                          ...this.state.social_media,
                          researchGate: e.target.value,
                        },
                        error: null,
                      })
                    }
                  />
                  {this.state.error?.target === "social_media" && (
                    <div className="mt-2">
                      <Alert
                        title="Invalid input"
                        description={this.state.error.msg}
                        type={"danger"}
                        onClose={() => this.setState({ error: null })}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <span className="text-sm">Google site link or website</span>
                  <input
                    type="link"
                    disabled={this.state.loading}
                    className={`${
                      this.state.error?.target === "social_media"
                        ? "border border-red-600"
                        : ""
                    } rounded border border-gray-400 font-semibold px-3 py-2 w-full mt-1`}
                    value={this.state.social_media.googleSite}
                    onChange={(e) =>
                      this.setState({
                        social_media: {
                          ...this.state.social_media,
                          googleSite: e.target.value,
                        },
                        error: null,
                      })
                    }
                  />
                  {this.state.error?.target === "social_media" && (
                    <div className="mt-2">
                      <Alert
                        title="Invalid input"
                        description={this.state.error.msg}
                        type={"danger"}
                        onClose={() => this.setState({ error: null })}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="">
                {this.state.author_pic === null ? (
                  <div
                    className="w-full bg-gray-100 rounded-md flex flex-col items-center justify-center"
                    style={{ height: "300px" }}
                  >
                    <div>
                      <FaUserCircle className="text-6xl text-gray-300" />
                    </div>
                    <div className="text-xl font-extrabold text-gray-500 mt-2">
                      Preview
                    </div>
                  </div>
                ) : (
                  <div
                    className="animate__animated animate__zoomIn rounded-lg overflow-hidden"
                    style={{ minHeight: "300px" }}
                  >
                    <FilePreview
                      isComponent={true}
                      selectedFile={this.state.author_pic}
                      onClose={() => {}}
                    />
                  </div>
                )}
              </div>
              <div className="mt-5">
                <div className="flex flex-col">
                  <span className="text-sm font-bold">
                    Upload author picture
                  </span>
                  <input
                    type="file"
                    disabled={this.state.loading}
                    className={`${
                      this.state.error?.target === "author_pic"
                        ? "border border-red-600"
                        : ""
                    } bg-gray-100 rounded-md px-3 py-1 w-full mt-1`}
                    onChange={(e) =>
                      this.setState({
                        author_pic:
                          e.target.files === null || e.target.files.length === 0
                            ? null
                            : e.target.files[0],
                        error: null,
                      })
                    }
                  />
                  {this.state.error?.target === "author_pic" && (
                    <div className="mt-2">
                      <Alert
                        title="Invalid input"
                        description={this.state.error.msg}
                        type={"danger"}
                        onClose={() => this.setState({ error: null })}
                      />
                    </div>
                  )}

                  {this.state.error?.target === "main" && (
                    <div className="mt-4 -mb-3">
                      <Alert
                        title="Error occurred"
                        description={this.state.error.msg}
                        type={"danger"}
                        onClose={() => this.setState({ error: null })}
                      />
                    </div>
                  )}

                  <div className="mt-6">
                    <Button
                      title={`${
                        this.state.loading === true
                          ? "Loading..."
                          : "Register contributor"
                      }`}
                      theme="success"
                      type="submit"
                      className="font-semibold"
                      disabled={this.state.loading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterAuthor;
