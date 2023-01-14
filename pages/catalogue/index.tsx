import React, { Component } from "react";
import Loading from "../../components/Loading/Loading";
import { PageDetails } from "../../components/PageDetails/PageDetails";
import PdfViewer from "../../components/PdfViewer/PdfViewer";

interface AppProps {}
interface AppState {
  loading: boolean;
}

class index extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      loading: false,
    };
  }
  render() {
    return (
      <PageDetails
        title="Catalogue of Perdua publishers"
        description="Catalogue of Perdua publishers"
      >
        {this.state.loading === false ? (
          <div className="h-screen">
            {/* <PdfViewer
              class_name="w-full h-screen rounded-lg"
              file_url={"/PerduaPublishersCatalogue.pdf"}
              setLoadingFile={(state: boolean) => {
                this.setState({ loading: state });
              }}
              frame_title={"Catalogue of Perdua publishers"}
            /> */}
          </div>
        ) : (
          <div>
            <Loading title="Loading catalogue, please wait..." />
          </div>
        )}
      </PageDetails>
    );
  }
}

export default index;
