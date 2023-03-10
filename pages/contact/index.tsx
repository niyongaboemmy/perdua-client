import React, { Component } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { MdContactSupport, MdLocationPin } from "react-icons/md";
import { FC_ContactUsForm } from "../../actions";
import { Alert } from "../../components/Alert/Alert";
import { PageDetails } from "../../components/PageDetails/PageDetails";

interface ContactPageProps {
  is_component?: boolean;
}
interface ContactPageState {
  loading: boolean;
  email: string;
  message: string;
  phone: string;
  error: string;
  success: string;
}

class ContactPage extends Component<ContactPageProps, ContactPageState> {
  constructor(props: ContactPageProps) {
    super(props);

    this.state = {
      loading: false,
      phone: "",
      email: "",
      message: "",
      error: "",
      success: "",
    };
  }
  onSubmitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.phone === "") {
      return this.setState({
        error: "Please fill your phone number",
      });
    }
    if (this.state.email === "") {
      return this.setState({
        error: "Please fill your email",
      });
    }
    if (this.state.message === "") {
      return this.setState({
        error: "Please provide your message",
      });
    }
    this.setState({ loading: true });
    FC_ContactUsForm(
      {
        phone_number: this.state.phone,
        email: this.state.email,
        message: this.state.message,
      },
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
            success: res.msg,
            error: "",
            message: "",
            phone: "",
            email: "",
            loading: false,
          });
        }
        if (res?.type === "error") {
          this.setState({ loading: false, error: res.msg, success: "" });
        }
      }
    );
  };
  MainComponentDetails = () => {
    return (
      <div className="p-2 md:p-8">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6">
            <div className="font-bold text-2xl">Contact information</div>
            <div className="flex flex-row gap-3 mt-5">
              <div>
                <div>
                  <MdContactSupport className="text-5xl text-green-700 animate__animated animate__zoomIn" />
                </div>
              </div>
              <div>
                <div className="">
                  <div>P.O. Box 3405 Kigali, Rwanda</div>
                  <div className="flex flex-row items-center gap-2">
                    <span>CEO: </span>
                    <span className="font-semibold">Tel +250 782 339 567</span>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <span>Managing Director: </span>
                    <span className="font-semibold">Tel +250 782 339 567</span>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <span>Customer Relations Officer: </span>
                    <span className="font-semibold">Tel +250 783 850 552</span>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <span>E-mail: </span>
                    <span className="font-semibold">info@perduap.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="font-bold text-2xl">Location</div>
            <div className="flex flex-row items-center gap-3 mt-5">
              <div>
                <div>
                  <MdLocationPin className="text-5xl text-green-700 animate__animated animate__zoomIn" />
                </div>
              </div>
              <div>
                <div className="">
                  <div>Kigali, Rwanda</div>
                  <div className="flex flex-row items-center gap-2">
                    <span>Location: </span>
                    <span className="font-semibold">Remera - Giporoso</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 border-b my-5"></div>
          <div className="col-span-12 md:col-span-6">
            <div className="bg-gray-50 rounded-md p-3 md:p-6 animate__animated animate__fadeIn">
              <div className="font-bold text-xl mb-2">Submit your enquiry</div>
              <form onSubmit={this.onSubmitData} className="mt-4">
                <div className="flex flex-col mb-3">
                  <span>Phone number</span>
                  <input
                    type="tel"
                    className="border border-gray-300 bg-white rounded-md px-3 py-2 w-full"
                    placeholder=""
                    onChange={(e) =>
                      this.setState({ phone: e.target.value, error: "" })
                    }
                    value={this.state.phone}
                    disabled={this.state.loading}
                  />
                </div>
                <div className="flex flex-col mb-3">
                  <span>Email</span>
                  <input
                    type="email"
                    className="border border-gray-300 bg-white rounded-md px-3 py-2 w-full"
                    placeholder="example@gmail.com"
                    onChange={(e) =>
                      this.setState({ email: e.target.value, error: "" })
                    }
                    value={this.state.email}
                    disabled={this.state.loading}
                  />
                </div>
                <div className="flex flex-col mb-3">
                  <span>Message</span>
                  <textarea
                    className="border border-gray-300 bg-white rounded-md px-3 py-2 w-full"
                    placeholder="Type message"
                    onChange={(e) =>
                      this.setState({ message: e.target.value, error: "" })
                    }
                    value={this.state.message}
                    disabled={this.state.loading}
                  ></textarea>
                </div>
                {this.state.error !== "" && (
                  <div className="my-3">
                    <Alert
                      title={this.state.error}
                      type="danger"
                      allow_time_out={true}
                      onClose={() => {
                        this.setState({ error: "" });
                      }}
                    />
                  </div>
                )}
                {this.state.success !== "" && (
                  <div className="my-3">
                    <Alert
                      title={this.state.success}
                      type="success"
                      allow_time_out={true}
                      onClose={() => {
                        this.setState({ error: "", success: "" });
                      }}
                    />
                  </div>
                )}
                <div className="">
                  <button
                    type="submit"
                    className="flex flex-row items-center gap-3 justify-center pl-2 pr-3 py-2 rounded-md bg-primary-800 hover:bg-green-700 text-white animate__animated animate__zoomIn"
                    disabled={this.state.loading}
                  >
                    <div>
                      {this.state.loading === true ? (
                        <AiOutlineLoading3Quarters className="text-2xl animate-spin" />
                      ) : (
                        <FiSend className="text-xl ml-1" />
                      )}
                    </div>
                    <span>
                      {this.state.loading === true
                        ? "Loading, please wait..."
                        : "Submit"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.488790938404!2d30.11529321508763!3d-1.95801629467517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca7a9e43b279b%3A0x3ad3777ac395baf8!2sBank%20of%20Kigali%2C%20Giporoso%20Branch!5e0!3m2!1sen!2srw!4v1674575969290!5m2!1sen!2srw"
              width="100%"
              height="450"
              style={{ border: "0" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="animate__animated animate__fadeIn"
            ></iframe>
          </div>
        </div>
      </div>
    );
  };
  render() {
    if (this.props.is_component === true) {
      return <this.MainComponentDetails />;
    }
    return (
      <PageDetails
        title="Contact Us"
        description="Perdua Publishers contact information"
      >
        <this.MainComponentDetails />
      </PageDetails>
    );
  }
}

export default ContactPage;
