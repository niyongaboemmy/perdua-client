import React, { Component, Fragment, ReactNode } from "react";
import Container from "../Container/Container";
import ActiveLink from "./ActiveLink";
import Logo from "../../assets/icon.ico";
import Image from "next/image";
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineRead,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { StoreState } from "../../reducers";
import {
  Auth,
  FC_GetBasicSystemInfo,
  FC_Logout,
  SystemBasicInfoData,
} from "../../actions";
import { connect } from "react-redux";
import Link from "next/link";
import { IconType } from "react-icons";
import { RiSearchLine } from "react-icons/ri";
import { HiMenu, HiOutlineArrowLeft } from "react-icons/hi";
import { BiDetail } from "react-icons/bi";
import { FiPhoneCall } from "react-icons/fi";
import { BsCheckCircle, BsFileEarmarkPdf } from "react-icons/bs";
import {
  MdAdminPanelSettings,
  MdOutlineAdminPanelSettings,
  MdOutlineDesignServices,
} from "react-icons/md";
import Loading from "../Loading/Loading";
import BookSearch from "../BookSearch/BookSearch";

export const PublicMenus: {
  title: string;
  path: string;
  icon: IconType;
}[] = [
  {
    title: "Home page",
    path: "/",
    icon: AiOutlineHome,
  },
  {
    title: "About Perdua publishers",
    path: "/about",
    icon: BiDetail,
  },
  {
    title: "Contact us",
    path: "/contact",
    icon: FiPhoneCall,
  },
  {
    title: "Our authors",
    path: "/authors",
    icon: MdOutlineAdminPanelSettings,
  },
  {
    title: "Illustrators",
    path: "/illustrators",
    icon: MdOutlineDesignServices,
  },
  {
    title: "Catalogue",
    path: "/catalogue",
    icon: BsFileEarmarkPdf,
  },
  {
    title: "Books store",
    path: "/store",
    icon: AiOutlineShoppingCart,
  },
  {
    title: "Consultancies",
    path: "/consultancies",
    icon: MdAdminPanelSettings,
  },
];

interface NavBarProps {
  auth: Auth;
  systemBasicInfo: SystemBasicInfoData;
  FC_Logout: () => void;
  FC_GetBasicSystemInfo: (
    callBack: (
      loading: boolean,
      res: { type: "success" | "error"; msg: string } | null
    ) => void
  ) => void;
}
interface NavBarState {
  loading: boolean;
  sideNav: boolean;
  show_open_modal: boolean;
}

const NavigationComponent = (props: {
  path: string;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <ActiveLink
      activeClassName="bg-green-50 font-semibold text-green-700 animate__animated animate__bounceIn"
      className={`bg-white px-6 py-3 hover:bg-primary-800 hover:text-white rounded-full ${
        props.className !== undefined ? props.className : ""
      }`}
      href={props.path}
    >
      {props.children}
    </ActiveLink>
  );
};

export class _NavBar extends Component<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props);

    this.state = {
      loading: false,
      sideNav: false,
      show_open_modal: false,
    };
  }
  CheckBasicData = () => {
    this.setState({ sideNav: true });
    if (this.props.systemBasicInfo.basic_info === null) {
      this.setState({ loading: true });
      this.props.FC_GetBasicSystemInfo(
        (
          loading: boolean,
          res: { type: "success" | "error"; msg: string } | null
        ) => {
          this.setState({ loading: loading });
          if (res !== null) {
            this.setState({ loading: false });
          }
        }
      );
    }
  };
  render() {
    return (
      <Fragment>
        <nav className="fixed top-0 left-0 right-0 z-50" style={{ zIndex: 9 }}>
          <Container className="bg-white py-2">
            <div className="flex flex-row items-center justify-between gap-2">
              {/* Left icon */}
              <div className="flex flex-row items-center justify-center">
                <Link href={"/"}>
                  <Image
                    priority={true}
                    src={Logo}
                    alt="Perdua"
                    className="h-14 w-auto"
                  />
                </Link>
                <Link href={"/"}>
                  <div className="text-xl font-bold flex flex-col md:flex-row md:items-center md:gap-2 ml-2">
                    <div className="text-green-600 text-lg md:text-xl">
                      Perdua
                    </div>
                    <div className="text-gray-800 text-sm md:text-lg -mt-1 md:mt-0 font-normal">
                      Publishers
                    </div>
                  </div>
                </Link>
              </div>
              {/* Right nav */}
              {this.props.auth.isAuthenticated === false ? (
                <div className="flex flex-row items-center justify-end gap-1">
                  <NavigationComponent path="/" className="hidden md:block">
                    Home
                  </NavigationComponent>
                  <NavigationComponent
                    path="/catalogue"
                    className="hidden md:block"
                  >
                    Catalogue
                  </NavigationComponent>
                  <div className="ml-2">
                    <div
                      onClick={() => this.setState({ show_open_modal: true })}
                      className="bg-gray-100 mr-3 md:mr-0 rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-green-700 hover:text-white"
                    >
                      <RiSearchLine className="text-2xl" />
                    </div>
                  </div>
                  <div
                    className="bg-green-600 text-white hover:bg-green-700 py-2 rounded-md px-3 pl-2 ml-0 md:ml-6 cursor-pointer flex flex-row items-center gap-2"
                    onClick={() => this.CheckBasicData()}
                  >
                    <div>
                      <HiMenu className="text-2xl" />
                    </div>
                    <span>Menu</span>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => this.props.FC_Logout()}
                  className="bg-gray-100 rounded p-2 pr-3 flex flex-row items-center justify-center gap-3 w-max hover:bg-yellow-700 hover:text-white font-bold group cursor-pointer"
                >
                  <div>
                    <AiOutlineLogout className="text-2xl text-yellow-700 group-hover:text-white" />
                  </div>
                  <span>Logout</span>
                </div>
              )}
            </div>
          </Container>
        </nav>
        {this.state.sideNav === true && (
          <div
            className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-60 flex flex-row w-full animate__animated animate__fadeIn animate__faster"
            style={{ zIndex: 9 }}
          >
            <div
              className="w-1/6 md:w-2/4 lg:w-3/4"
              onClick={() => this.setState({ sideNav: false })}
            ></div>
            <div className="w-5/6 md:w-2/4 lg:w-1/4 bg-white h-screen overflow-y-auto animate__animated animate__fadeInRight animate__fast p-3">
              <div className="flex flex-row items-center gap-3 mb-5">
                <div>
                  <div
                    onClick={() => this.setState({ sideNav: false })}
                    className="bg-gray-100 text-gray-700 flex items-center justify-center h-10 w-10 rounded-full cursor-pointer hover:bg-green-700 hover:text-white"
                  >
                    <HiOutlineArrowLeft className="text-2xl" />
                  </div>
                </div>
                <div className="text-lg font-semibold text-gray-700">
                  Explore menus
                </div>
              </div>
              <div>
                {PublicMenus.map((menu, m) => {
                  const IconMenu = menu.icon;
                  return (
                    <ActiveLink
                      key={m + 1}
                      className="flex flex-row items-center gap-2 group w-full hover:text-green-700 p-2 pr-4"
                      activeClassName="text-green-700 font-semibold"
                      href={`${menu.path}`}
                      onClick={() => this.setState({ sideNav: false })}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <div>
                          <IconMenu className="text-2xl text-gray-300 group-hover:text-green-600" />
                        </div>
                        <div className="text-sm">{menu.title}</div>
                      </div>
                    </ActiveLink>
                  );
                })}
              </div>
              {/* List of books categories */}

              <div className="mt-6">
                <div className="flex flex-row items-center gap-3 mb-2">
                  <div>
                    <AiOutlineRead className="text-3xl text-gray-400" />
                  </div>
                  <div className="text-lg font-semibold text-gray-700">
                    Books categories
                  </div>
                </div>
                <div>
                  {this.props.systemBasicInfo.basic_info === null ||
                  this.state.loading === true ? (
                    <div className="bg-gray-100 rounded-lg mb-5 mt-3 py-6">
                      <Loading className="bg-gray-100" />
                    </div>
                  ) : (
                    this.props.systemBasicInfo.basic_info.languages.map(
                      (item, i) => (
                        <Link
                          key={i + 1}
                          href={`/store?language_id=${item.language_id}`}
                          onClick={() => this.setState({ sideNav: false })}
                          target="_blank"
                        >
                          <div className="flex flex-row items-center gap-2 mb-1 text-sm rounded-md p-2 pr-3 w-full hover:bg-green-700 hover:text-white group animate__animated animate__fadeIn">
                            <div>
                              <BsCheckCircle className="text-2xl text-green-600 group-hover:text-white" />
                            </div>
                            <span>{item.language_name}</span>
                          </div>
                        </Link>
                      )
                    )
                  )}
                </div>
                {/* Custom search */}
                <div
                  onClick={() =>
                    this.setState({ show_open_modal: true, sideNav: false })
                  }
                  className="flex items-center gap-3 px-5 pl-3 py-3 bg-green-50 text-green-700 hover:text-white font-semibold text-sm cursor-pointer rounded-md hover:bg-green-700 w-full text-center mt-6"
                >
                  <div>
                    <RiSearchLine className="text-2xl" />
                  </div>
                  <span>Books custom search</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <BookSearch
          setShowOpenModal={(status: boolean) =>
            this.setState({ show_open_modal: status })
          }
          show_open_modal={this.state.show_open_modal}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  auth,
  systemBasicInfo,
}: StoreState): { auth: Auth; systemBasicInfo: SystemBasicInfoData } => {
  return { auth, systemBasicInfo };
};

const NavBar = connect(mapStateToProps, { FC_Logout, FC_GetBasicSystemInfo })(
  _NavBar
);
export default NavBar;
