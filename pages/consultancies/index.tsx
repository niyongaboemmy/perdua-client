import React, { Component } from "react";
import { FiSend } from "react-icons/fi";
import { MdContactSupport, MdLocationPin } from "react-icons/md";
import { Alert } from "../../components/Alert/Alert";
import BookConsultancies from "../../components/BookConsultancies/BookConsultancies";
import { PageDetails } from "../../components/PageDetails/PageDetails";

interface ContactPageProps {
  is_component?: boolean;
}
interface ContactPageState {}

class ContactPage extends Component<ContactPageProps, ContactPageState> {
  constructor(props: ContactPageProps) {
    super(props);

    this.state = {};
  }
  MainComponentDetails = () => {
    return <div className="p-2 md:p-8"></div>;
  };
  render() {
    if (this.props.is_component === true) {
      return <this.MainComponentDetails />;
    }
    return (
      <PageDetails
        title="Consultancies"
        description="Perdua Publishers consultancies"
      >
        <this.MainComponentDetails />
        <div className="-mt-10">
          <BookConsultancies isComponent={true} />
        </div>
      </PageDetails>
    );
  }
}

export default ContactPage;
