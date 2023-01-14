import axios from "axios";
import dynamic from "next/dynamic";
import React, { Component } from "react";
import Loading from "../../components/Loading/Loading";
import { PageDetails } from "../../components/PageDetails/PageDetails";
import PdfViewer from "../../components/PdfViewer/PdfViewer";
import { API_URL } from "../../utils/api";

interface AppProps {}
interface AppState {
  loading: boolean;
}

class index extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      loading: true,
    };
  }
  render() {
    return (
      <PageDetails
        title="Catalogue of Perdua publishers"
        description="Catalogue of Perdua publishers"
      >
        {this.state.loading === true && (
          <div className="animate__animated animate__fadeIn">
            <Loading title="Loading catalogue, please wait..." />
          </div>
        )}
        <div className={`${this.state.loading === true ? "" : "h-screen"}`}>
          <PdfViewer
            class_name={`w-full rounded-lg  ${
              this.state.loading === true
                ? "bg-white"
                : "h-screen bg-gray-600 animate__animated animate__fadeIn"
            }`}
            file_url={`${API_URL}/catalogue/catalogue.pdf`}
            setLoadingFile={(state: boolean) => {
              this.setState({ loading: state });
            }}
            frame_title={"Catalogue of Perdua publishers"}
          />
        </div>
      </PageDetails>
    );
  }
}

export default index;
