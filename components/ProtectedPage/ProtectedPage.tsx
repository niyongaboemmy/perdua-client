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
  FC_CheckLoggedIn,
  FC_GetBasicSystemInfo,
  SystemBasicInfoData,
} from "../../actions";
import { StoreState } from "../../reducers";
import Loading from "../Loading/Loading";
import ActiveLink from "../NavBar/ActiveLink";
import PageContainer from "../PageContainer/PageContainer";

export const AdminNavigation: {
  id: string;
  title: string;
  path: string;
}[] = [
  {
    id: "1",
    title: "Dashboard",
    path: "/admin_homepage",
  },
  {
    id: "2",
    title: "Register a book",
    path: "/register_book",
  },
  {
    id: "3",
    title: "Books list",
    path: "/books_list",
  },
  {
    id: "3",
    title: "Books languages",
    path: "/book_languages",
  },
];

const NavigationComponent = (props: {
  path: string;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <ActiveLink
      activeClassName="bg-gray-100 font-semibold text-gray-700 animate__animated animate__bounceIn"
      className={`bg-white text-gray-500 px-3 py-2 hover:bg-primary-800 hover:text-white rounded ${
        props.className !== undefined ? props.className : ""
      }`}
      href={props.path}
    >
      {props.children}
    </ActiveLink>
  );
};

interface ProtectedPageProps {
  auth: Auth;
  systemBasicInfo: SystemBasicInfoData;
  FC_CheckLoggedIn: (callBack: (status: boolean) => void) => void;
  FC_GetBasicSystemInfo: (
    callBack: (
      loading: boolean,
      res: { type: "success" | "error"; msg: string } | null
    ) => void
  ) => void;
  children: ReactNode;
}
interface ProtectedPageState {
  loading: boolean;
  error: string;
}

class _ProtectedPage extends Component<ProtectedPageProps, ProtectedPageState> {
  constructor(props: ProtectedPageProps) {
    super(props);

    this.state = {
      loading: false,
      error: "",
    };
  }
  componentDidMount = (): void => {
    if (
      this.props.auth.isAuthenticated === false ||
      this.props.auth.user === null
    ) {
      this.setState({ loading: true });
      this.props.FC_CheckLoggedIn((status: boolean) => {
        if (status === true) {
          this.setState({ loading: false });
        }
      });
    }
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
      return (
        <div className="pt-24 px-2 md:px-8">
          <Loading className="bg-white" title="User authenticating . . ." />
        </div>
      );
    }
    if (
      this.props.auth.isAuthenticated === false ||
      this.props.auth.user === null
    ) {
      return (
        <div>
          <div
            className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 flex items-center justify-center"
            style={{ zIndex: 9 }}
          >
            <div className="grid grid-cols-12">
              <div className="col-span-3"></div>
              <div className="col-span-6">
                <div className="bg-white rounded-md p-3 md:p-6 md:px-20 animate__animated animate__zoomIn animate__faster">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div>
                      <MdAdminPanelSettings className="text-8xl text-yellow-700 animate__animated animate__shakeX" />
                    </div>
                    <div className="text-3xl font-bold">You logged out</div>
                    <div className="mt-2">
                      Your authentication may be has expired or you did not
                      login the system admin, Please click to the following
                      button to login again
                    </div>
                    <div className="flex flex-row items-center justify-center gap-3 mt-6 font-semibold">
                      <Link
                        href={"/"}
                        className="bg-gray-100 rounded-md px-4 py-2 w-max cursor-pointer hover:bg-gray-200 flex flex-row items-center justify-center gap-2"
                      >
                        <div>
                          <BsArrowLeft className="text-2xl" />
                        </div>
                        <span>Homepage</span>
                      </Link>
                      <Link
                        href={"/admin_login"}
                        className="bg-green-700 rounded-md px-4 py-2 w-max cursor-pointer text-white hover:bg-green-800 flex flex-row items-center justify-center gap-2 animate__animated animate__zoomIn"
                      >
                        <div>
                          <AiOutlineLogin className="text-2xl" />
                        </div>
                        <span>Back to login</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-3"></div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <PageContainer page_title="Admin Panel | Perdua Publishers Ltd">
        <div className="pt-16">
          <div className="grid grid-cols-12 mt-2">
            <div className="col-span-12 md:col-span-2 pl-2">
              <div className="bg-white h-screen rounded-md p-3">
                <div className="bg-gray-100 rounded-md p-3 py-5 flex flex-col items-center justify-center">
                  <div className="">
                    <FaUserCircle className="text-6xl text-gray-400" />
                  </div>
                  <div className="text-center mt-1">
                    {this.props.auth.user.user_names}
                  </div>
                </div>
                <div className="mt-3">
                  {AdminNavigation.map((item, i) => (
                    <div className="w-full" key={i + 1}>
                      <NavigationComponent
                        path={item.path}
                        className="w-full flex flex-row items-center gap-2"
                      >
                        <div>
                          <FiChevronsRight className="text-xl" />
                        </div>
                        <span>{item.title}</span>
                      </NavigationComponent>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-10 px-3">
              {this.props.children}
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }
}

const mapStateToProps = ({
  auth,
  systemBasicInfo,
}: StoreState): { auth: Auth; systemBasicInfo: SystemBasicInfoData } => {
  return { auth, systemBasicInfo };
};

export const ProtectedPage = connect(mapStateToProps, {
  FC_CheckLoggedIn,
  FC_GetBasicSystemInfo,
})(_ProtectedPage);
