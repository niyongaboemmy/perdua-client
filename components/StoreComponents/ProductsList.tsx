import Link from "next/link";
import React, { Component } from "react";
import { ImBook } from "react-icons/im";
import { RiSearchLine } from "react-icons/ri";
import { BookCategory, BookLanguage, SystemBasicInfoData } from "../../actions";
import { GetBookInterface } from "../../actions/books.action";
import { BookItem } from "../BookItem/BookItem";
import Loading from "../Loading/Loading";
import { commaFy, search } from "../../utils/functions";

interface ProductsListProps {
  books: GetBookInterface[];
  systemBasicInfo: SystemBasicInfoData;
  selectedLanguage: BookLanguage;
  selectedCategory: BookCategory | null;
}
interface ProductsListState {
  search_data: string;
}

class ProductsList extends Component<ProductsListProps, ProductsListState> {
  constructor(props: ProductsListProps) {
    super(props);

    this.state = {
      search_data: "",
    };
  }
  render() {
    if (this.props.systemBasicInfo.basic_info === null) {
      return <Loading className="bg-white" />;
    }
    return (
      <div>
        <div>
          <div className="flex flex-row items-center justify-between gap-3 w-full">
            <div className="mb-3 flex flex-row items-center gap-2">
              <div>
                <ImBook className="text-2xl text-green-600" />
              </div>
              <div className="text-xl font-bold px-2 flex flex-col">
                <span>{this.props.selectedLanguage.language_name}</span>
                {this.props.selectedCategory !== null && (
                  <div className="text-yellow-600 text-sm font-normal">
                    <span className="text-gray-600">Category: </span>
                    {this.props.selectedCategory.category_name}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row items-center justify-end gap-2">
              <div className="font-semibold text-gray-500 hidden md:block">
                Total books:
              </div>
              <div className="font-bold text-lg bg-gray-100 px-2 rounded-md">
                {commaFy(this.props.books.length)}
              </div>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              className="w-full bg-gray-100 rounded-md px-3 py-2 pl-12"
              placeholder="Search . . ."
              value={this.state.search_data}
              onChange={(e) => this.setState({ search_data: e.target.value })}
            />
            <div className="absolute top-2 left-2">
              <RiSearchLine className="text-2xl" />
            </div>
          </div>
        </div>
        {/* Products list */}
        <div className="grid grid-cols-12 gap-3 w-full mt-5">
          {(
            search(
              this.props.books,
              this.state.search_data
            ) as GetBookInterface[]
          ).length === 0 ? (
            <div className="col-span-12 font-light text-xl p-6 text-center rounded-md my-3 bg-gray-100 animate__animated animate__shakeX">
              No books found!
            </div>
          ) : (
            (
              search(
                this.props.books,
                this.state.search_data
              ) as GetBookInterface[]
            ).map((item, i) => (
              <Link
                href={`/book_details?book=${item.book_id}&product_title=${item.title}&product_image=${item.book_cover}`}
                key={i + 1}
                className={`col-span-6 md:col-span-3 lg:col-span-2`}
              >
                <BookItem item={item} onClick={() => {}} hide_price={true} />
              </Link>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default ProductsList;
