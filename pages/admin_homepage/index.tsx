import Link from "next/link";
import React, { Component } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { connect } from "react-redux";
import { Auth } from "../../actions";
import { ProtectedPage } from "../../components/ProtectedPage/ProtectedPage";
import { StoreState } from "../../reducers";
import { HiViewGrid } from "react-icons/hi";

interface AdminHomepageProps {
  auth: Auth;
}
interface AdminHomepageState {}

class _AdminHomepage extends Component<AdminHomepageProps, AdminHomepageState> {
  render() {
    return (
      <ProtectedPage>
        <div className="bg-white rounded-md p-3 md:p-6">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-3xl font-bold">
              Welcome{" "}
              <span className="text-yellow-800">
                {this.props.auth.user?.user_names}
              </span>
            </div>
            <div className="mb-4">You are logged as system administrator</div>
            <div className="flex flex-row items-center justify-center gap-3 font-semibold">
              <Link
                href={"/register_book"}
                className="bg-green-700 rounded-md px-4 pl-2 py-2 w-max cursor-pointer text-white hover:bg-green-800 flex flex-row items-center justify-center gap-2 animate__animated animate__zoomIn"
              >
                <div>
                  <IoAddCircleOutline className="text-2xl" />
                </div>
                <span>Register new book</span>
              </Link>
              <Link
                href={"/books_list"}
                className="bg-gray-100 rounded-md px-4 pl-2 py-2 w-max cursor-pointer hover:bg-gray-200 flex flex-row items-center justify-center gap-2"
              >
                <div>
                  <HiViewGrid className="text-2xl" />
                </div>
                <span>View books store</span>
              </Link>
            </div>
          </div>
        </div>
      </ProtectedPage>
    );
  }
}

const mapStateToProps = ({ auth }: StoreState): { auth: Auth } => {
  return { auth };
};

const AdminHomepage = connect(mapStateToProps, {})(_AdminHomepage);

export default AdminHomepage;
