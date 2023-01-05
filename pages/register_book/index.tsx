import Link from "next/link";
import React, { Component } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdLibraryBooks } from "react-icons/md";
import { ProtectedPage } from "../../components/ProtectedPage/ProtectedPage";
import { RegisterBookForm } from "../../components/RegisterBook/RegisterBookForm";

interface RegisterBookProps {}
interface RegisterBookState {}

class RegisterBook extends Component<RegisterBookProps, RegisterBookState> {
  render() {
    return (
      <ProtectedPage>
        <div className="rounded-md">
          <div className="flex flex-row items-center justify-between gap-4 bg-white p-2 md:p-4 rounded-md">
            <div className="flex flex-row items-center gap-3">
              <div>
                <AiOutlineAppstoreAdd className="text-5xl text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">Register a book</div>
                <div className="text-sm">
                  Create new book to the available list and publish it
                </div>
              </div>
            </div>
            <Link
              href={"/books_list"}
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
            <RegisterBookForm />
          </div>
        </div>
      </ProtectedPage>
    );
  }
}

export default RegisterBook;
