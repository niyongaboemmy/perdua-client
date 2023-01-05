import React, { Component, Fragment } from "react";
import PageContainer from "../components/PageContainer/PageContainer";
import { PublicDataPage } from "../components/PublicDataPage/PublicDataPage";
import { StoreState } from "../reducers";
import { FC_GetBasicSystemInfo, SystemBasicInfoData } from "../actions";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import Modal, { ModalSize, Themes } from "../components/Modal/Modal";
import { BsArrowLeft } from "react-icons/bs";
import { RiSearchLine } from "react-icons/ri";
import Button from "../components/FormItems/Button";
import {
  FC_GetBooksByKeyword,
  GetBookInterface,
} from "../actions/books.action";
import { LoadingBooks } from "../components/HomepageComponents/NewBooks";
import Link from "next/link";
import { BookItem } from "../components/BookItem/BookItem";

interface AppPageProps {
  systemBasicInfo: SystemBasicInfoData;
  FC_GetBasicSystemInfo: (
    callBack: (
      loading: boolean,
      res: { type: "success" | "error"; msg: string } | null
    ) => void
  ) => void;
}
interface AppPageState {
  loading: boolean;
  error: string;
  search_data: string;
  show_open_modal: boolean;
  search_result: GetBookInterface[] | null;
  loading_search_result: boolean;
}

const MainHomePageContent = dynamic(
  () => import("../components/HomepageComponents/HomepageContent")
);

// export const config = {
//   unstable_runtimeJS: false,
// };

class _AppPage extends Component<AppPageProps, AppPageState> {
  constructor(props: AppPageProps) {
    super(props);

    this.state = {
      loading: false,
      error: "",
      search_data: "",
      show_open_modal: false,
      search_result: null,
      loading_search_result: false,
    };
  }
  GetBooksListByKeyword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.state.loading_search_result === false &&
      this.setState({ loading_search_result: true });
    FC_GetBooksByKeyword(
      this.state.search_data,
      (
        loading: boolean,
        res: {
          type: "success" | "error";
          msg: string;
          data: GetBookInterface[];
        } | null
      ) => {
        this.setState({ loading_search_result: loading });
        if (res !== null && res.type === "error") {
          this.setState({
            error: res.msg,
            search_result: res.data,
            loading_search_result: false,
          });
        }
        if (res !== null && res.type === "success") {
          this.setState({
            error: "",
            search_result: res.data,
            loading_search_result: false,
          });
        }
      }
    );
  };
  render() {
    return (
      <Fragment>
        <PageContainer className="">
          <PublicDataPage>
            <MainHomePageContent
              systemBasicInfo={this.props.systemBasicInfo}
              FC_GetBasicSystemInfo={this.props.FC_GetBasicSystemInfo}
              setShowOpenModal={(status: boolean) =>
                this.setState({ show_open_modal: status })
              }
            />
          </PublicDataPage>
        </PageContainer>
        {this.state.show_open_modal === true && (
          <Modal
            backDrop={true}
            theme={Themes.default}
            close={() =>
              this.setState({ show_open_modal: false, search_data: "" })
            }
            backDropClose={true}
            widthSizeClass={ModalSize.large}
            displayClose={false}
            padding={{
              title: undefined,
              body: true,
              footer: undefined,
            }}
          >
            <div>
              <div className="flex flex-row items-center gap-2">
                <div>
                  <div
                    onClick={() => this.setState({ show_open_modal: false })}
                    className="bg-gray-100 rounded-full flex items-center justify-center h-10 w-10 hover:bg-green-600 hover:text-white cursor-pointer"
                  >
                    <BsArrowLeft className="text-2xl" />
                  </div>
                </div>
                <div className="text-xl font-bold">Search book by keyword</div>
              </div>
              <form
                onSubmit={this.GetBooksListByKeyword}
                className="flex flex-row items-center gap-2 w-full"
              >
                <div className="relative w-full my-3">
                  <input
                    type="text"
                    className="bg-white py-2 px-4 pl-12 rounded-lg w-full border border-gray-400"
                    placeholder="Search book"
                    autoFocus={true}
                    value={this.state.search_data}
                    onChange={(e) =>
                      this.setState({ search_data: e.target.value })
                    }
                  />
                  <div
                    className="absolute top-2 left-3"
                    style={{ paddingTop: "1px" }}
                  >
                    <RiSearchLine className="text-2xl" />
                  </div>
                </div>
                <Button
                  title={`${
                    this.state.loading_search_result === false
                      ? "Search"
                      : "Loading..."
                  }`}
                  theme="success"
                  type="submit"
                />
              </form>
              {/* Search result */}
              <div>
                {this.state.loading_search_result === true ? (
                  <LoadingBooks cols={3} />
                ) : (
                  <div>
                    {this.state.search_result === null ? (
                      <div className="bg-gray-100 mt-2 p-3 py-6 text-gray-500 text-base font-light text-center">
                        Type search keyword to view the response!
                      </div>
                    ) : this.state.search_result.length === 0 ? (
                      <div className="bg-yellow-50 mt-2 p-3 py-6 text-yellow-700 text-xl font-light text-center">
                        No result found for selected keyword{" "}
                        <span className="font-bold">
                          {this.state.search_data}
                        </span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-12">
                        {this.state.search_result.map((item, i) => (
                          <Link
                            href={`/book_details?book=${item.book_id}&product_title=${item.title}&product_image=${item.book_cover}`}
                            key={i + 1}
                            className={`col-span-6 md:col-span-4 lg:col-span-3`}
                          >
                            <BookItem
                              item={item}
                              hide_price={true}
                              onClick={() => {}}
                            />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Modal>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  systemBasicInfo,
}: StoreState): { systemBasicInfo: SystemBasicInfoData } => {
  return { systemBasicInfo };
};

const AppPage = connect(mapStateToProps, { FC_GetBasicSystemInfo })(_AppPage);

export default AppPage;
