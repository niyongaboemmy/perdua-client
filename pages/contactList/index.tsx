import Image from "next/image";
import Link from "next/link";
import React, { Component, Fragment } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { IoBusinessOutline, IoNotificationsOutline } from "react-icons/io5";
import {
  FC_GetContactUs,
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
  data:
    | {
        phone_number: string;
        email: string;
        message: string;
      }[]
    | null;
  error: string;
  success: string;
}

export class index extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      loading: false,
      data: null,
      error: "",
      success: "",
    };
  }
  GetPartners = () => {
    this.setState({ loading: true });
    FC_GetContactUs(
      (
        loading: boolean,
        res: {
          type: "success" | "error";
          data: {
            phone_number: string;
            email: string;
            message: string;
          }[];
          msg: string;
        } | null
      ) => {
        this.setState({ loading: loading });
        if (res?.type === "success") {
          this.setState({ loading: false, data: res.data });
        }
        if (res?.type === "error") {
          this.setState({ error: res?.msg, data: [], loading: false });
        }
      }
    );
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
                <AiOutlineMessage className="text-5xl text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">Contacted visitors</div>
                <div className="text-sm">
                  List of messages submitted by visitors
                </div>
              </div>
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
                onClose={() => this.setState({ error: "", success: "" })}
              />
            </div>
          )}
          <div className="mt-3">
            {this.state.loading === true || this.state.data === null ? (
              <div className="bg-white rounded-lg py-5 px-4">
                <LoadingBooks cols={2} />
              </div>
            ) : (
              <div className="grid grid-cols-12 gap-8 bg-white rounded-lg p-3">
                {this.state.data.length === 0 ? (
                  <div className="col-span-12 py-3 px-3 text-center text-xl font-light">
                    No messages available
                  </div>
                ) : (
                  this.state.data.map((item, i) => (
                    <div
                      className="col-span-12 md:col-span-6 p-3 bg-white rounded-lg text-sm"
                      key={i + 1}
                    >
                      <div className="mb-2">
                        <AiOutlineMessage className="text-5xl text-gray-300" />
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <span className="text-gray-500">Phone: </span>
                        <span className="font-semibold">
                          {item.phone_number}
                        </span>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <span className="text-gray-500">Email: </span>
                        <span className="font-semibold">{item.email}</span>
                      </div>
                      <div className="border-t border-gray-300 pt-4 mt-4">
                        <div className="font-bold text-gray-500">
                          Contact message
                        </div>
                        <div className="font-normal text-base">
                          {item.message}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </ProtectedPage>
      </Fragment>
    );
  }
}

export default index;
