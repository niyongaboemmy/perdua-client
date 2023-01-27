import Image from "next/image";
import Link from "next/link";
import React, { Component, Fragment } from "react";
import { IoBusinessOutline } from "react-icons/io5";
import {
  FC_GetPartners,
  FC_RegisterNewPartner,
  FC_RemoveNewPartner,
  PartnerGetInterface,
} from "../../actions";
import { ImageFolder } from "../../actions/books.action";
import { Alert } from "../../components/Alert/Alert";
import FilePreview from "../../components/FilePreview/FilePreview";
import Button from "../../components/FormItems/Button";
import { LoadingBooks } from "../../components/HomepageComponents/NewBooks";
import Modal, { ModalSize, Themes } from "../../components/Modal/Modal";
import { ProtectedPage } from "../../components/ProtectedPage/ProtectedPage";
import { API_URL } from "../../utils/api";

interface AppProps {}
interface AppState {
  loading: boolean;
  partners: PartnerGetInterface[] | null;
  error: string;
  addNew: boolean;
  link: string;
  logo: File | null;
  formError: string;
  success: string;
  deleting: string;
}

export class index extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      loading: false,
      partners: null,
      error: "",
      addNew: false,
      link: "",
      logo: null,
      formError: "",
      success: "",
      deleting: "",
    };
  }
  GetPartners = () => {
    this.setState({ loading: true });
    FC_GetPartners(
      (
        loading: boolean,
        res: {
          type: "success" | "error";
          response: PartnerGetInterface[] | null;
          msg: string;
        } | null
      ) => {
        this.setState({ loading: loading });
        if (res?.type === "success") {
          this.setState({ loading: false, partners: res.response });
        }
        if (res?.type === "error") {
          this.setState({ error: res.msg, partners: [], loading: false });
        }
      }
    );
  };
  RemovePartner = (partner: PartnerGetInterface) => {
    if (
      window.confirm("Are you sure do you wan to remove this partner?") === true
    ) {
      this.setState({
        deleting: partner.pertner_id,
        loading: false,
        error: "",
        formError: "",
        success: "",
      });
      FC_RemoveNewPartner(
        partner.pertner_id,
        (
          loading: boolean,
          res: {
            type: "success" | "error";
            msg: string;
          } | null
        ) => {
          if (res?.type === "success") {
            this.setState({ error: "", success: res.msg });
            setTimeout(() => {
              this.setState({ deleting: "" });
              this.GetPartners();
            }, 1000);
          }
          if (res?.type === "error") {
            this.setState({ deleting: "", error: res.msg, success: "" });
          }
        }
      );
    }
  };
  RegisterNewPartner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.link === "") {
      return this.setState({ formError: "Please fill the link" });
    }
    if (this.state.logo === null || this.state.logo.length <= 0) {
      return this.setState({ formError: "Please fill select the logo/image" });
    }
    if (this.state.logo !== null) {
      this.setState({ loading: true });
      const formData = new FormData();
      formData.append("link", this.state.link);
      formData.append("partner_logo", this.state.logo);
      FC_RegisterNewPartner(
        formData,
        (
          loading: boolean,
          res: {
            type: "success" | "error";
            msg: string;
          } | null
        ) => {
          this.setState({ loading: loading });
          if (res?.type === "success") {
            this.setState({
              error: "",
              formError: "",
              success: res.msg,
              link: "",
              logo: null,
              loading: false,
            });
            setTimeout(() => {
              this.setState({ addNew: false });
              this.GetPartners();
            }, 1000);
          }
          if (res?.type === "error") {
            this.setState({
              loading: false,
              formError: res.msg,
              success: "",
            });
          }
        }
      );
    }
  };
  componentDidMount = () => {
    this.GetPartners();
  };
  render() {
    return (
      <Fragment>
        <ProtectedPage>
          <div className="flex flex-row items-center justify-between gap-4 bg-white p-2 md:p-4 rounded-md">
            <div className="flex flex-row items-center gap-3">
              <div>
                <IoBusinessOutline className="text-5xl text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">Partners</div>
                <div className="text-sm">List of partners</div>
              </div>
            </div>
            <div
              onClick={() =>
                this.state.deleting === "" && this.setState({ addNew: true })
              }
              className="bg-white rounded-md border border-green-600 hover:bg-green-600 hover:text-white w-max px-3 py-2 font-semibold  cursor-pointer flex flex-row items-center justify-center gap-2"
            >
              {/* <div>
                <MdLibraryBooks className="text-2xl" />
              </div> */}
              <span>Add new</span>
            </div>
          </div>
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
                onClose={() =>
                  this.setState({ error: "", formError: "", success: "" })
                }
              />
            </div>
          )}
          <div className="mt-3">
            {this.state.loading === true || this.state.partners === null ? (
              <div className="bg-white rounded-lg">
                <LoadingBooks cols={2} />
              </div>
            ) : (
              <div className="grid grid-cols-12 gap-8 bg-white rounded-lg p-3">
                {this.state.partners.length === 0 ? (
                  <div className="col-span-12 py-3 px-3 text-center text-xl font-light">
                    No partners available
                  </div>
                ) : (
                  this.state.partners.map((item, i) => (
                    <div
                      className="col-span-3 p-2 bg-white border rounded-lg overflow-hidden  flex flex-col justify-between"
                      key={i + 1}
                    >
                      <Link
                        href={item.link}
                        target="_blank"
                        title="Click to open the page"
                      >
                        <Image
                          src={`${API_URL}/${ImageFolder.partner}/${item.partner_logo}`}
                          alt=""
                          height={200}
                          width={200}
                          className="w-full h-auto rounded-lg"
                        />
                      </Link>
                      <div
                        onClick={() => {
                          if (this.state.deleting === "") {
                            this.RemovePartner(item);
                          }
                        }}
                        className={`${
                          this.state.deleting === item.pertner_id
                            ? "bg-gray-200 font-bold cursor-not-allowed animate__animated animate__fadeIn animate__infinite"
                            : "bg-red-100 text-red-700 hover:bg-red-700 hover:text-white cursor-pointer"
                        } px-3 py-2 rounded-md w-max mt-5`}
                      >
                        {this.state.deleting === item.pertner_id
                          ? "Removing..."
                          : "Remove"}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </ProtectedPage>
        {this.state.addNew === true && (
          <Modal
            backDrop={true}
            theme={Themes.default}
            close={() =>
              this.state.loading === false && this.setState({ addNew: false })
            }
            backDropClose={false}
            widthSizeClass={ModalSize.medium}
            displayClose={true}
            padding={{
              title: true,
              body: true,
              footer: undefined,
            }}
            title="Add new partner"
          >
            <div className="-mt-4">
              <form onSubmit={this.RegisterNewPartner}>
                <div className="flex flex-col">
                  <span>Partner website/link</span>
                  <input
                    type="link"
                    className="border border-gray-300 w-full px-3 py-2 rounded-md"
                    disabled={this.state.loading}
                    value={this.state.link}
                    onChange={(e) =>
                      this.setState({
                        link: e.target.value,
                        error: "",
                        formError: "",
                      })
                    }
                  />
                </div>
                <div className="flex flex-col mt-3">
                  <span>Partner image/logo</span>
                  <input
                    type="file"
                    className="border border-gray-300 w-full px-3 py-2 rounded-md"
                    disabled={this.state.loading}
                    onChange={(e) =>
                      this.setState({
                        logo:
                          e.target.files === null || e.target.files.length === 0
                            ? null
                            : e.target.files[0],
                        error: "",
                        formError: "",
                      })
                    }
                  />
                </div>
                {this.state.logo !== null && (
                  <div
                    className="my-3 rounded-lg overflow-hidden"
                    style={{ maxHeight: "300px" }}
                  >
                    <div className="w-full md:w-2/4 rounded-lg overflow-hidden">
                      <FilePreview
                        selectedFile={this.state.logo}
                        onClose={() => {}}
                        isComponent={true}
                      />
                    </div>
                  </div>
                )}
                {this.state.formError !== "" && (
                  <div className="my-3">
                    <Alert
                      title={this.state.formError}
                      type={"danger"}
                      onClose={() =>
                        this.setState({ error: "", formError: "", success: "" })
                      }
                    />
                  </div>
                )}
                {this.state.success !== "" && (
                  <div className="my-3">
                    <Alert
                      title={this.state.success}
                      type={"success"}
                      onClose={() =>
                        this.setState({ error: "", formError: "", success: "" })
                      }
                    />
                  </div>
                )}
                <div className="mt-4">
                  <Button
                    title={
                      this.state.loading === true
                        ? "Loading, please wait..."
                        : "Submit partner"
                    }
                    type="submit"
                    theme="success"
                    disabled={this.state.loading}
                    className={`${
                      this.state.loading === true
                        ? "animate__animated animate__fadeIn animate__infinite"
                        : ""
                    } font-bold`}
                  />
                </div>
              </form>
            </div>
          </Modal>
        )}
      </Fragment>
    );
  }
}

export default index;
