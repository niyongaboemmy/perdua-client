import Image from "next/image";
import Link from "next/link";
import React, { Component } from "react";
import { FC_GetPartners, PartnerGetInterface } from "../../actions";
import { ImageFolder } from "../../actions/books.action";
import { Alert } from "../../components/Alert/Alert";
import BookConsultancies from "../../components/BookConsultancies/BookConsultancies";
import { LoadingBooks } from "../../components/HomepageComponents/NewBooks";
import { PageDetails } from "../../components/PageDetails/PageDetails";
import { API_URL } from "../../utils/api";

interface ContactPageProps {
  is_component?: boolean;
}
interface ContactPageState {
  partners: PartnerGetInterface[] | null;
  loading: boolean;
  error: string;
}

class ContactPage extends Component<ContactPageProps, ContactPageState> {
  constructor(props: ContactPageProps) {
    super(props);

    this.state = {
      partners: null,
      loading: false,
      error: "",
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
  componentDidMount = () => {
    this.GetPartners();
  };
  render() {
    return (
      <PageDetails title="Partners" description="Perdua Publishers Partners">
        <div className="">
          {this.state.error !== "" && (
            <div>
              <Alert
                title={this.state.error}
                type={"danger"}
                onClose={() => {}}
              />
            </div>
          )}
          {this.state.loading === true || this.state.partners === null ? (
            <div className="bg-white rounded-md p-4">
              <LoadingBooks cols={2} />
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-4">
              {this.state.partners.length === 0 ? (
                <div className="col-span-12 py-6 px-3 text-center text-xl font-light">
                  No partners found!
                </div>
              ) : (
                this.state.partners.map((item, i) => (
                  <div
                    className="cols-span-6 md:col-span-3 lg:col-span-2 bg-gray-100 rounded-lg overflow-hidden"
                    key={i + 1}
                  >
                    <Link
                      href={item.link}
                      target="_blank"
                      className="h-full flex flex-col items-center p-3 justify-center hover:bg-white border border-white rounded-lg overflow-hidden hover:border-green-600"
                    >
                      <Image
                        src={`${API_URL}/${ImageFolder.partner}/${item.partner_logo}`}
                        alt=""
                        height={200}
                        width={200}
                        className="w-full h-44 rounded-lg animate__animated animate__fadeIn animate__infinite"
                        onLoadingComplete={(img: HTMLImageElement) => {
                          img.className = "w-full h-auto rounded-lg";
                        }}
                      />
                    </Link>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </PageDetails>
    );
  }
}

export default ContactPage;
