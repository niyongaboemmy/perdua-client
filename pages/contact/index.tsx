import React, { Component } from "react";
import { FiSend } from "react-icons/fi";
import { MdContactSupport, MdLocationPin } from "react-icons/md";
import { Alert } from "../../components/Alert/Alert";
import { PageDetails } from "../../components/PageDetails/PageDetails";

interface ContactPageProps {}
interface ContactPageState {
  loading: boolean;
  email: string;
  message: string;
  error: string;
  success: string;
}

class ContactPage extends Component<ContactPageProps, ContactPageState> {
  constructor(props: ContactPageProps) {
    super(props);

    this.state = {
      loading: false,
      email: "",
      message: "",
      error: "",
      success: "",
    };
  }
  onSubmitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  };
  render() {
    return (
      <PageDetails
        title="Contact Us"
        description="Perdua Publishers contact information"
      >
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
                      <span className="font-semibold">
                        Tel +250 782 339 567
                      </span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <span>Managing Director: </span>
                      <span className="font-semibold">
                        Tel +250 782 339 567
                      </span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <span>Customer Relations Officer: </span>
                      <span className="font-semibold">
                        Tel +250 783 850 552
                      </span>
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
                      <span className="font-semibold">Kicukiro</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 border-b my-5"></div>
            <div className="col-span-12 md:col-span-6">
              <div className="bg-gray-50 rounded-md p-3 md:p-6 animate__animated animate__fadeIn">
                <div className="font-bold text-xl mb-2">
                  Submit your enquiry
                </div>
                <form onSubmit={this.onSubmitData}>
                  <div className="flex flex-col mb-3">
                    <span>Email</span>
                    <input
                      type="email"
                      className="border border-gray-300 bg-white rounded-md px-3 py-2 w-full"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div className="flex flex-col mb-3">
                    <span>Message</span>
                    <textarea
                      className="border border-gray-300 bg-white rounded-md px-3 py-2 w-full"
                      placeholder="Type message"
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
                  <div className="">
                    <button
                      type="submit"
                      className="flex flex-row items-center gap-3 justify-center px-3 py-2 rounded-md bg-primary-800 hover:bg-green-700 text-white animate__animated animate__zoomIn"
                    >
                      <div>
                        <FiSend className="text-xl" />
                      </div>
                      <span>Submit</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63799.52609891436!2d30.02869225324941!3d-1.9657387101841561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6f46d387275%3A0x7b8b917a7206d1e2!2sKigali%20Convention%20Centre!5e0!3m2!1sen!2srw!4v1672383652583!5m2!1sen!2srw"
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
      </PageDetails>
    );
  }
}

export default ContactPage;
