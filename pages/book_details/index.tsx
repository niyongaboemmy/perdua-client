import React, { Fragment, useState } from "react";
import { BookDetails } from "../../components/BookDetails/BookDetails";
import { useRouter } from "next/router";
import Container from "../../components/Container/Container";
import { RiErrorWarningFill } from "react-icons/ri";
import Link from "next/link";
import PageContainer from "../../components/PageContainer/PageContainer";
import { API_URL } from "../../utils/api";
import { ImageFolder } from "../../actions/books.action";
import Modal, {
  ModalMarginTop,
  ModalSize,
  Themes,
} from "../../components/Modal/Modal";
import ContactPage from "../contact";
import { BsArrowLeft } from "react-icons/bs";

const BookDetailsPage = () => {
  const router = useRouter();
  const { book, product_title, product_image } = router.query;
  const [openContactUs, setOpenContactUs] = useState<boolean>(false);
  if (
    book === undefined ||
    product_title === undefined ||
    product_image === undefined
  ) {
    return (
      <div className="mt-20 pt-6">
        <Container>
          <div className="flex flex-col items-center justify-center gap-2 p-6 bg-white rounded-md animate__animated animate__shakeX">
            <div>
              <div>
                <RiErrorWarningFill className="text-7xl text-yellow-700 animate__animated animate__zoomIn" />
              </div>
            </div>
            <div className="text-3xl font-bold">Page Not Found!</div>
            <div className="text-gray-600">
              The page that you are trying to visit is not valid, Please make
              sure you visit the right page
            </div>
            <div className="flex flex-row items-center justify-center gap-3">
              <Link
                href={"/"}
                className="bg-gray-100 hover:bg-gray-200 rounded-md px-4 py-2 w-max font-bold"
              >
                Homepage
              </Link>
              <Link
                href={"/store"}
                className="bg-green-100 rounded-md px-4 py-2 w-max font-bold text-green-800 hover:bg-green-700 hover:text-white"
              >
                Visit book store
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <Fragment>
      <PageContainer
        page_title={`${product_title} | Perdua Publishers`}
        logo={
          product_image !== null && product_image !== undefined
            ? `${API_URL}/${ImageFolder.cover}/${product_image as string}`
            : undefined
        }
      >
        <div className="pt-20">
          {book !== undefined && (
            <BookDetails
              book_id={book as string}
              openContactUs={setOpenContactUs}
              pushPath={(path: string) => {
                router.push(path);
              }}
            />
          )}
        </div>
      </PageContainer>
      {openContactUs === true && (
        <Modal
          backDrop={true}
          theme={Themes.default}
          close={() => setOpenContactUs(false)}
          backDropClose={true}
          widthSizeClass={ModalSize.maxWidth}
          marginTop={ModalMarginTop.small}
          displayClose={true}
          padding={{
            title: true,
            body: undefined,
            footer: undefined,
          }}
          title={
            <div className="flex flex-row items-center gap-2">
              <div>
                <div
                  onClick={() => setOpenContactUs(false)}
                  className="flex items-center justify-center h-10 w-10 bg-gray-100 rounded-full cursor-pointer hover:bg-green-700 hover:text-white"
                >
                  <BsArrowLeft className="text-2xl" />
                </div>
              </div>
              <div className="text-2xl text-green-600">
                Contact us information
              </div>
            </div>
          }
        >
          <div className="border-b border-gray-300"></div>
          <ContactPage is_component={true} />
        </Modal>
      )}
    </Fragment>
  );
};

export default BookDetailsPage;
