import React, { Component, Fragment } from "react";
import PageContainer from "../components/PageContainer/PageContainer";
import { PublicDataPage } from "../components/PublicDataPage/PublicDataPage";
import { StoreState } from "../reducers";
import { FC_GetBasicSystemInfo, SystemBasicInfoData } from "../actions";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import { GetBookInterface } from "../actions/books.action";
import { LoadingBooks } from "../components/HomepageComponents/NewBooks";
import Link from "next/link";
import { BookItem } from "../components/BookItem/BookItem";
import BookSearch from "../components/BookSearch/BookSearch";

interface AppPageProps {
  systemBasicInfo: SystemBasicInfoData;
  FC_GetBasicSystemInfo: (
    callBack: (
      loading: boolean,
      res: { type: "success" | "error"; msg: string } | null
    ) => void
  ) => void;
}
interface AppPageState {
  loading: boolean;
  error: string;
  search_data: string;
  show_open_modal: boolean;
  search_result: GetBookInterface[] | null;
  loading_search_result: boolean;
  loaded_books_languages: {
    language_id: string;
    loaded: boolean;
  }[];
}

const MainHomePageContent = dynamic(
  () => import("../components/HomepageComponents/HomepageContent")
);

// export const config = {
//   unstable_runtimeJS: false,
// };

class _AppPage extends Component<AppPageProps, AppPageState> {
  constructor(props: AppPageProps) {
    super(props);

    this.state = {
      loading: false,
      error: "",
      search_data: "",
      show_open_modal: false,
      search_result: null,
      loading_search_result: false,
      loaded_books_languages: [],
    };
  }
  render() {
    return (
      <Fragment>
        <PageContainer className="">
          <PublicDataPage>
            <MainHomePageContent
              systemBasicInfo={this.props.systemBasicInfo}
              FC_GetBasicSystemInfo={this.props.FC_GetBasicSystemInfo}
              setShowOpenModal={(status: boolean) =>
                this.setState({ show_open_modal: status })
              }
            />
          </PublicDataPage>
        </PageContainer>
        <BookSearch
          show_open_modal={this.state.show_open_modal}
          setShowOpenModal={(status: boolean) =>
            this.setState({ show_open_modal: status })
          }
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  systemBasicInfo,
}: StoreState): { systemBasicInfo: SystemBasicInfoData } => {
  return { systemBasicInfo };
};

const AppPage = connect(mapStateToProps, { FC_GetBasicSystemInfo })(_AppPage);

export default AppPage;
