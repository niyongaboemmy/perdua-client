import React, { Component, ReactNode } from "react";
import Container from "../Container/Container";
import ActiveLink from "./ActiveLink";
import Logo from "../../assets/icon.ico";
import Image from "next/image";
import { AiOutlineLogout, AiOutlineShoppingCart } from "react-icons/ai";
import { StoreState } from "../../reducers";
import { Auth, FC_Logout } from "../../actions";
import { connect } from "react-redux";
import Link from "next/link";

interface NavBarProps {
  auth: Auth;
  FC_Logout: () => void;
}
interface NavBarState {
  loading: boolean;
}

const NavigationComponent = (props: {
  path: string;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <ActiveLink
      activeClassName="bg-gray-100 font-semibold text-gray-700 animate__animated animate__bounceIn"
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
    };
  }
  render() {
    return (
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
                <div className="text-xl font-bold flex flex-row items-center gap-1 ml-2">
                  <div className="text-green-600">Perdua</div>
                  <div className="text-lg text-gray-800">Publishers Ltd</div>
                </div>
              </Link>
            </div>
            {/* Right nav */}
            {this.props.auth.isAuthenticated === false ? (
              <div className="hidden md:flex flex-row items-center justify-end gap-3">
                <NavigationComponent path="/">Home</NavigationComponent>
                <NavigationComponent path="/about">
                  About Us
                </NavigationComponent>
                <NavigationComponent
                  path="/store"
                  className="flex flex-row items-center justify-center w-amx gap-2"
                >
                  <div>
                    <AiOutlineShoppingCart className="text-xl" />
                  </div>
                  <span>Store</span>
                </NavigationComponent>
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
    );
  }
}

const mapStateToProps = ({ auth }: StoreState): { auth: Auth } => {
  return { auth };
};

const NavBar = connect(mapStateToProps, { FC_Logout })(_NavBar);
export default NavBar;
