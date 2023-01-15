import dynamic from "next/dynamic";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import React, { Component, Fragment } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { MdLibraryBooks, MdOutlineAdminPanelSettings } from "react-icons/md";
import { AuthorGetInterface } from "../../actions/author.action";
import Modal, {
  ModalMarginTop,
  ModalSize,
  Themes,
} from "../../components/Modal/Modal";
import { ProtectedPage } from "../../components/ProtectedPage/ProtectedPage";
// import { AuthorsListForm } from "../../components/AuthorsList/AuthorsListForm";

interface AuthorsListProps {
  router: NextRouter;
}
interface AuthorsListState {
  loading: boolean;
  selectedAuthor: AuthorGetInterface | null;
}

const AuthorsListFormComponent = dynamic(
  () => import("../../components/AuthorsList/AuthorsList")
);
const UpdateAuthorComponent = dynamic(
  () => import("../../components/UpdateAuthor/UpdateAuthor")
);

class AuthorsList extends Component<AuthorsListProps, AuthorsListState> {
  constructor(props: AuthorsListProps) {
    super(props);

    this.state = {
      loading: false,
      selectedAuthor: null,
    };
  }
  render() {
    return (
      <Fragment>
        <ProtectedPage>
          <div className="rounded-md">
            <div className="flex flex-row items-center justify-between gap-4 bg-white p-2 md:p-4 rounded-md">
              <div className="flex flex-row items-center gap-3">
                <div>
                  <MdOutlineAdminPanelSettings className="text-5xl text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">Authors</div>
                  <div className="text-sm">List of available authors</div>
                </div>
              </div>
              <Link
                href={"/register_author"}
                className="bg-white rounded-md border border-green-600 hover:bg-green-600 hover:text-white w-max px-3 py-2 font-semibold  cursor-pointer flex flex-row items-center justify-center gap-2"
              >
                <div>
                  <MdLibraryBooks className="text-2xl" />
                </div>
                <span>Register author</span>
              </Link>
            </div>
            {/* Contents here */}
            <div className="mt-3">
              <AuthorsListFormComponent
                selectedAuthor={this.state.selectedAuthor}
                setSelectAuthor={(author: AuthorGetInterface) =>
                  this.setState({ selectedAuthor: author })
                }
              />
            </div>
          </div>
        </ProtectedPage>
        {this.state.selectedAuthor !== null && (
          <Modal
            backDrop={true}
            theme={Themes.default}
            close={() => this.setState({ selectedAuthor: null })}
            backDropClose={true}
            widthSizeClass={ModalSize.maxWidth}
            displayClose={true}
            padding={{
              title: true,
              body: undefined,
              footer: undefined,
            }}
            marginTop={ModalMarginTop.small}
            title={
              <div>
                <div className="flex flex-row items-center gap-2">
                  <div>
                    <div
                      onClick={() => this.setState({ selectedAuthor: null })}
                      className="bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-green-600 hover:text-white"
                    >
                      <HiOutlineArrowLeft className="text-3xl" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">
                    {this.state.selectedAuthor.author_name}
                  </div>
                </div>
              </div>
            }
          >
            <UpdateAuthorComponent
              selectedAuthor={this.state.selectedAuthor}
              onClose={() => this.setState({ selectedAuthor: null })}
              onUpdated={(selectedAuthorId: string) => {
                this.setState({
                  selectedAuthor: null,
                });
                this.props.router.reload();
              }}
            />
          </Modal>
        )}
      </Fragment>
    );
  }
}

const AuthorsPage = () => {
  const router = useRouter();
  return <AuthorsList router={router} />;
};

export default AuthorsPage;
