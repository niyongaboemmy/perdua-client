import dynamic from "next/dynamic";
import Link from "next/link";
import React, { Component } from "react";
import { MdLibraryBooks, MdOutlineAdminPanelSettings } from "react-icons/md";
import { ProtectedPage } from "../../components/ProtectedPage/ProtectedPage";
// import { RegisterAuthorForm } from "../../components/RegisterAuthor/RegisterAuthorForm";

interface RegisterAuthorProps {}
interface RegisterAuthorState {}

const RegisterAuthorFormComponent = dynamic(
  () => import("../../components/RegisterAuthor/RegisterAuthor")
);

class RegisterAuthor extends Component<
  RegisterAuthorProps,
  RegisterAuthorState
> {
  render() {
    return (
      <ProtectedPage>
        <div className="rounded-md">
          <div className="flex flex-row items-center justify-between gap-4 bg-white p-2 md:p-4 rounded-md">
            <div className="flex flex-row items-center gap-3">
              <div>
                <MdOutlineAdminPanelSettings className="text-5xl text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">Register author</div>
                <div className="text-sm">Create new author</div>
              </div>
            </div>
            <Link
              href={"/authors_list"}
              className="bg-white rounded-md border border-green-600 hover:bg-green-600 hover:text-white w-max px-3 py-2 font-semibold  cursor-pointer flex flex-row items-center justify-center gap-2"
            >
              <div>
                <MdLibraryBooks className="text-2xl" />
              </div>
              <span>View list</span>
            </Link>
          </div>
          {/* Contents here */}
          <div className="mt-3">
            <RegisterAuthorFormComponent />
          </div>
        </div>
      </ProtectedPage>
    );
  }
}

export default RegisterAuthor;
