import React, { Component } from "react";
import PageContainer from "../components/PageContainer/PageContainer";
import { PublicDataPage } from "../components/PublicDataPage/PublicDataPage";
import { StoreState } from "../reducers";
import { FC_GetBasicSystemInfo, SystemBasicInfoData } from "../actions";
import { connect } from "react-redux";
import dynamic from "next/dynamic";

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
}

const MainHomePageContent = dynamic(
  () => import("../components/HomepageComponents/HomepageContent")
);

export const config = {
  unstable_runtimeJS: false,
};

class _AppPage extends Component<AppPageProps, AppPageState> {
  constructor(props: AppPageProps) {
    super(props);

    this.state = {
      loading: false,
      error: "",
    };
  }
  render() {
    return (
      <PageContainer className="">
        <PublicDataPage>
          <MainHomePageContent
            systemBasicInfo={this.props.systemBasicInfo}
            FC_GetBasicSystemInfo={this.props.FC_GetBasicSystemInfo}
          />
        </PublicDataPage>
      </PageContainer>
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
