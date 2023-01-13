import Link from "next/link";
import React, { Component } from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaLayerGroup } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import { BookLanguage } from "../../actions";
import Container from "../Container/Container";

interface BookCategoriesProps {
  book_languages: BookLanguage[];
  setShowOpenModal: (status: boolean) => void;
}
interface BookCategoriesState {}

class BookCategories extends Component<
  BookCategoriesProps,
  BookCategoriesState
> {
  render() {
    return (
      <div className="py-14 bg-gray-100">
        <Container>
          <div className="w-full">
            <div className="col-span-12 flex flex-col items-center text-center">
              <div className="text-3xl font-bold">Explore Books Categories</div>
              <div className="text-gray-500 text-sm">
                Choose the category for books you want in the store
              </div>
              <div className="w-full md:w-2/3 lg:w-1/2 mt-4">
                <div
                  className="relative w-full"
                  onClick={() => this.props.setShowOpenModal(true)}
                >
                  <input
                    type="text"
                    className="bg-white py-3 px-4 pl-12 rounded-lg w-full border-2 border-green-800"
                    placeholder="Search book"
                  />
                  <div
                    className="absolute top-3 left-3"
                    style={{ paddingTop: "2px" }}
                  >
                    <RiSearchLine className="text-2xl text-green-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Categories here */}
          <div className="grid grid-cols-12 mt-12 p-4 pb-0 px-0 bg-white rounded-lg">
            {this.props.book_languages.map((item, i) => (
              <Link
                href={`/store?language_id=${item.language_id}`}
                key={i + 1}
                className={`col-span-12 md:col-span-6 lg:col-span-3 border-r border-gray-200 group animate__animated animate__fadeIn px-4 mb-4`}
              >
                <div
                  className={`w-full bg-white rounded-md hover:bg-green-100 p-2 flex flex-row items-center justify-between gap-2 cursor-pointer`}
                >
                  <div className="flex flex-row items-center gap-2">
                    <div>
                      <div className="bg-gray-100 group-hover:bg-white rounded-full h-14 w-14 flex items-center justify-center">
                        <FaLayerGroup className="text-2xl text-gray-300 group-hover:text-primary-800" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold">
                        {item.language_name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {"View books list"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="h-9 w-9 flex items-center justify-center bg-white rounded-full group-hover:bg-green-100">
                      <BsArrowRight className="text-2xl text-white group-hover:text-primary-800" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default BookCategories;
