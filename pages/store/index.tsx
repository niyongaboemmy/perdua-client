import React, { Component } from "react";
import PageContainer from "../../components/PageContainer/PageContainer";
import { PublicDataPage } from "../../components/PublicDataPage/PublicDataPage";
import { StoreState } from "../../reducers";
import { BookCategory, BookLanguage, SystemBasicInfoData } from "../../actions";
import { connect } from "react-redux";
import {
  FC_GetBooksByLanguage,
  GetBookInterface,
} from "../../actions/books.action";
import Loading from "../../components/Loading/Loading";
import { NextRouter, useRouter } from "next/router";
// import { SideNavFilter } from "../../components/StoreComponents/SideNavFilter";
// import { ProductsList } from "../../components/StoreComponents/ProductsList";
import dynamic from "next/dynamic";

const SideNavFilterContent = dynamic(
  () => import("../../components/StoreComponents/SideNavFilter")
);
const ProductsListContent = dynamic(
  () => import("../../components/StoreComponents/ProductsList")
);

interface BookStoreProps {
  router: NextRouter;
  systemBasicInfo: SystemBasicInfoData;
}
interface BookStoreState {
  loading_page: boolean;
  loading_data: boolean;
  success: string;
  error: string;
  showLeftNav: boolean;
  showRightNav: boolean;
  selectedLanguage: BookLanguage | null;
  selectedCategory: BookCategory | null;
  books: GetBookInterface[] | null;
  hideNav: boolean;
}

class _BookStore extends Component<BookStoreProps, BookStoreState> {
  constructor(props: BookStoreProps) {
    super(props);

    this.state = {
      loading_page: false,
      loading_data: false,
      error: "",
      success: "",
      showLeftNav: true,
      showRightNav: false,
      selectedLanguage: null,
      selectedCategory: null,
      books: null,
      hideNav: false,
    };
  }
  SetHideNav = (hideNav: boolean) => {
    this.setState({ hideNav: hideNav });
  };
  selectedBooksCategoryId = () => {
    if (this.state.books === null) {
      return [];
    }
    const response: string[] = [];
    if (this.state.books.length > 0) {
      for (const b of this.state.books) {
        if (response.find((itm) => itm === b.category_id) === undefined) {
          response.push(b.category_id);
        }
      }
    }
    return response;
  };
  initializeSelectLanguage = () => {
    if (this.props.systemBasicInfo.basic_info !== null) {
      if (this.state.selectedLanguage === null) {
        const { language_id, language_name, category_id, category_name } =
          this.props.router.query;

        if (this.props.systemBasicInfo.basic_info.languages.length > 0) {
          if (
            language_id !== undefined &&
            language_id !== null &&
            language_id !== ""
          ) {
            // Select language
            const selectedLanguageDetails =
              this.props.systemBasicInfo.basic_info.languages.find(
                (itm) => itm.language_id.toString() === language_id.toString()
              );
            this.setState({
              selectedLanguage:
                selectedLanguageDetails === undefined
                  ? null
                  : selectedLanguageDetails,
            });
            this.GetBooksListByLanguage(language_id as string);
            // Category
            if (
              category_id !== undefined &&
              category_id !== null &&
              category_id !== ""
            ) {
              const selectedCategoryDetails =
                this.props.systemBasicInfo.basic_info.categories.find(
                  (itm) => itm.category_id.toString() === category_id.toString()
                );
              selectedCategoryDetails !== undefined &&
                this.setState({ selectedCategory: selectedCategoryDetails });
              selectedCategoryDetails !== undefined &&
                this.props.router.push(
                  `/store?language_id=${language_id}&category_id=${selectedCategoryDetails.category_id}`
                );
            } else {
              this.props.router.push(`/store?language_id=${language_id}`);
            }
          } else {
            this.setState({
              selectedLanguage:
                this.props.systemBasicInfo.basic_info.languages[0],
            });
            this.GetBooksListByLanguage(
              this.props.systemBasicInfo.basic_info.languages[0].language_id
            );
            this.props.router.push(
              `/store?language_id=${this.props.systemBasicInfo.basic_info.languages[0].language_id}`
            );
          }
        }
      }
    }
  };
  GetBooksListByLanguage = (language_id: string) => {
    this.state.loading_data === false && this.setState({ loading_data: true });
    FC_GetBooksByLanguage(
      language_id,
      (
        loading: boolean,
        res: {
          type: "success" | "error";
          msg: string;
          data: GetBookInterface[];
        } | null
      ) => {
        this.setState({ loading_data: loading });
        if (res !== null && res.type === "error") {
          this.setState({
            error: res.msg,
            books: res.data,
            loading_data: false,
          });
        }
        if (res !== null && res.type === "success") {
          this.setState({
            error: "",
            books: res.data,
            loading_data: false,
            selectedCategory: null,
          });
        }
      }
    );
  };
  componentDidMount(): void {}
  render() {
    return (
      <PublicDataPage>
        <PageContainer
          page_title={`${
            this.state.selectedLanguage !== null
              ? `${this.state.selectedLanguage.language_name}${
                  this.state.selectedCategory !== null
                    ? " - " + this.state.selectedCategory.category_name
                    : ""
                } books`
              : "Books store"
          } | Perdua Publishers`}
        >
          <div className="pt-20 px-2 md:px-4">
            <div className="grid grid-cols-12 gap-4">
              <div
                className={`col-span-12 ${
                  this.state.hideNav === true
                    ? "lg:col-span-12"
                    : "lg:col-span-3"
                }`}
              >
                <SideNavFilterContent
                  router={this.props.router}
                  initializeSelectLanguage={this.initializeSelectLanguage}
                  systemBasicInfo={this.props.systemBasicInfo}
                  selectedLanguage={this.state.selectedLanguage}
                  onSelectLanguage={(data: BookLanguage) => {
                    this.setState({ selectedLanguage: data });
                    this.props.systemBasicInfo.basic_info !== null &&
                      this.GetBooksListByLanguage(data.language_id);
                    this.props.router.push(
                      `/store?language_id=${data.language_id}`
                    );
                  }}
                  selectedCategory={this.state.selectedCategory}
                  onSelectCategory={(data: BookCategory | null) => {
                    if (this.state.selectedLanguage !== null) {
                      this.setState({ selectedCategory: data });

                      this.props.router.push(
                        `/store?language_id=${
                          this.state.selectedLanguage.language_id
                        }${
                          data !== null
                            ? `&category_id=${data.category_id}`
                            : ""
                        }`
                      );
                    }
                  }}
                  loading={this.state.loading_data}
                  selectedBooksCategoryId={this.selectedBooksCategoryId()}
                  hideNav={this.state.hideNav}
                  setHideNav={this.SetHideNav}
                />
              </div>
              <div
                className={`col-span-12 ${
                  this.state.hideNav === true
                    ? "lg:col-span-12"
                    : "lg:col-span-9"
                }`}
              >
                <div className="bg-white rounded-lg p-3 min-h-screen mb-3">
                  {this.state.books === null ||
                  this.state.loading_data === true ? (
                    <div>
                      <div className="grid grid-cols-12 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((count, i) => (
                          <div
                            key={i + 1}
                            className={`col-span-6 md:col-span-3 lg:col-span-2 h-64 rounded-md bg-white animate__animated animate__fadeIn animate__infinite ${
                              i % 2 !== 0 ? "animate__slower" : "animate__slow"
                            }`}
                          >
                            <div className="bg-gray-100 rounded-lg h-44 mb-4"></div>
                            <div className="bg-gray-100 rounded-lg h-4 mb-3"></div>
                            <div className="bg-gray-100 rounded-lg h-2 mb-3 w-3/4"></div>
                          </div>
                        ))}
                      </div>
                      <Loading
                        className=" mt-4"
                        title="Loading data, please wait..."
                      />
                    </div>
                  ) : this.state.selectedLanguage !== null ? (
                    <ProductsListContent
                      books={
                        this.state.selectedCategory === null
                          ? this.state.books
                          : this.state.books.filter(
                              (itm) =>
                                this.state.selectedCategory !== null &&
                                itm.category_id ===
                                  this.state.selectedCategory.category_id
                            )
                      }
                      systemBasicInfo={this.props.systemBasicInfo}
                      selectedLanguage={this.state.selectedLanguage}
                      selectedCategory={this.state.selectedCategory}
                    />
                  ) : (
                    <div>No language selected</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </PublicDataPage>
    );
  }
}

const mapStateToProps = ({
  systemBasicInfo,
}: StoreState): { systemBasicInfo: SystemBasicInfoData } => {
  return { systemBasicInfo };
};

const BookStore = connect(mapStateToProps, {})(_BookStore);

const BookStorePage = () => {
  const router = useRouter();
  return <BookStore router={router} />;
};

export default BookStorePage;
