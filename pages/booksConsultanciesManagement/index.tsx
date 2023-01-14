import dynamic from "next/dynamic";
import { NextRouter, useRouter } from "next/router";
import React, { Component, Fragment } from "react";
import Modal, { ModalSize, Themes } from "../../components/Modal/Modal";
import { ProtectedPage } from "../../components/ProtectedPage/ProtectedPage";
const BookConsultanciesContent = dynamic(
  () => import("../../components/BookConsultancies/BookConsultancies")
);
const RegisterBookConsultanciesContent = dynamic(
  () =>
    import("../../components/RegisterBookConsultancy/RegisterBookConsultancy")
);
interface BookConsultanciesProps {
  router: NextRouter;
}
interface BookConsultanciesState {
  loading: boolean;
  error: string;
  success: string;
  registerConsultancy: boolean;
}
class BookConsultancies extends Component<
  BookConsultanciesProps,
  BookConsultanciesState
> {
  constructor(props: BookConsultanciesProps) {
    super(props);

    this.state = {
      loading: false,
      error: "",
      success: "",
      registerConsultancy: false,
    };
  }
  render() {
    return (
      <Fragment>
        <ProtectedPage>
          <div className="pt-4">
            <div className="flex flex-row items-center justify-between mb-8 bg-white rounded-md p-3">
              <div>
                <div className="font-bold text-3xl">Consultancies</div>
                <div className="text-sm text-gray-600">
                  Providing a thorough introduction to management consultancy
                </div>
              </div>
              <div
                onClick={() => this.setState({ registerConsultancy: true })}
                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 cursor-pointer w-max"
              >
                Add consultancy
              </div>
            </div>
            <BookConsultanciesContent allow_remove={true} />
          </div>
        </ProtectedPage>
        {this.state.registerConsultancy === true && (
          <Modal
            backDrop={true}
            theme={Themes.default}
            close={() => this.setState({ registerConsultancy: false })}
            backDropClose={false}
            widthSizeClass={ModalSize.large}
            displayClose={true}
            padding={{
              title: true,
              body: true,
              footer: undefined,
            }}
            title={<div className="text-2xl">Register consultancy book</div>}
          >
            <div className="-mt-2">
              <RegisterBookConsultanciesContent
                onSubmit={() => {
                  this.props.router.reload();
                }}
              />
            </div>
          </Modal>
        )}
      </Fragment>
    );
  }
}

const BookConsultanciesPage = (): JSX.Element => {
  const router = useRouter();
  return <BookConsultancies router={router} />;
};
export default BookConsultanciesPage;
