import Link from "next/link";
import React, { Component, ReactNode } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronsRight } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import { connect } from "react-redux";
import {
  Auth,
  FC_GetBasicSystemInfo,
  SystemBasicInfoData,
} from "../../actions";
import { StoreState } from "../../reducers";
import Loading from "../Loading/Loading";
import ActiveLink from "../NavBar/ActiveLink";
import PageContainer from "../PageContainer/PageContainer";
import PublicPageLoading from "../PublicPageLoading/PublicPageLoading";

interface PublicDataPageProps {
  systemBasicInfo: SystemBasicInfoData;
  FC_GetBasicSystemInfo: (
    callBack: (
      loading: boolean,
      res: { type: "success" | "error"; msg: string } | null
    ) => void
  ) => void;
  children: ReactNode;
}
interface PublicDataPageState {
  loading: boolean;
  error: string;
}

class _PublicDataPage extends Component<
  PublicDataPageProps,
  PublicDataPageState
> {
  constructor(props: PublicDataPageProps) {
    super(props);

    this.state = {
      loading: false,
      error: "",
    };
  }
  componentDidMount = (): void => {
    if (this.props.systemBasicInfo.basic_info === null) {
      this.setState({ loading: true });
      this.props.FC_GetBasicSystemInfo(
        (
          loading: boolean,
          res: { type: "success" | "error"; msg: string } | null
        ) => {
          this.setState({ loading: loading });
          if (res !== null && res.type === "error") {
            this.setState({ error: res.msg, loading: false });
          }
          if (res !== null && res.type === "success") {
            this.setState({ error: "", loading: false });
          }
        }
      );
    }
  };
  render() {
    if (this.state.loading === true) {
      return <PublicPageLoading />;
    }
    return <div>{this.props.children}</div>;
  }
}

const mapStateToProps = ({
  systemBasicInfo,
}: StoreState): { systemBasicInfo: SystemBasicInfoData } => {
  return { systemBasicInfo };
};

export const PublicDataPage = connect(mapStateToProps, {
  FC_GetBasicSystemInfo,
})(_PublicDataPage);
