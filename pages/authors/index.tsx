import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { connect } from "react-redux";
import {
  BookAuthor,
  FC_GetBasicSystemInfo,
  SystemBasicInfoData,
} from "../../actions";
import {
  FC_GetBooksByAuthor,
  GetBookInterface,
  ImageFolder,
} from "../../actions/books.action";
import { BookItem } from "../../components/BookItem/BookItem";
import Container from "../../components/Container/Container";
import { LoadingBooks } from "../../components/HomepageComponents/NewBooks";
import Loading from "../../components/Loading/Loading";
import Modal, {
  ModalMarginTop,
  ModalSize,
  Themes,
} from "../../components/Modal/Modal";
import { PageDetails } from "../../components/PageDetails/PageDetails";
import { StoreState } from "../../reducers";
import { API_URL } from "../../utils/api";
import { search } from "../../utils/functions";

interface AppProps {
  systemBasicInfo: SystemBasicInfoData;
  FC_GetBasicSystemInfo: (
    callBack: (
      loading: boolean,
      res: { type: "success" | "error"; msg: string } | null
    ) => void
  ) => void;
}

const MyComponent = (props: AppProps): JSX.Element => {
  const [selectedAuthor, setSelectedAuthor] = useState<BookAuthor | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<GetBookInterface[] | null>(null);
  const [error, setError] = useState<string>("");
  const [searchBooks, setSearchBooks] = useState<string>("");

  const router = useRouter();
  const { author_id } = router.query;

  const GetBooksListByLanguage = (author_id: string) => {
    setLoading(true);
    FC_GetBooksByAuthor(
      author_id,
      (
        loading: boolean,
        res: {
          type: "success" | "error";
          msg: string;
          data: GetBookInterface[];
        } | null
      ) => {
        setLoading(loading);
        if (res !== null && res.type === "error") {
          setLoading(false);
          setBooks([]);
          setError(res.msg);
        }
        if (res !== null && res.type === "success") {
          setLoading(false);
          setBooks(res.data);
          setError("");
        }
      }
    );
  };

  useEffect(() => {
    const getSelectedAuthor = (author_id: string): BookAuthor | null => {
      if (
        author_id !== undefined &&
        author_id !== null &&
        author_id !== "" &&
        props.systemBasicInfo.basic_info !== null
      ) {
        const selectedAuthorTemp =
          props.systemBasicInfo.basic_info.authors.find(
            (itm) => itm.author_id.toString() === author_id
          );
        return selectedAuthorTemp === undefined ? null : selectedAuthorTemp;
      }
      return null;
    };
    if (props.systemBasicInfo.basic_info === null) {
      props.FC_GetBasicSystemInfo(
        (
          loading: boolean,
          res: {
            type: "success" | "error";
            msg: string;
          } | null
        ) => {}
      );
    } else {
      if (author_id !== undefined && author_id !== null && author_id !== "") {
        setSelectedAuthor(getSelectedAuthor(author_id as string));
        GetBooksListByLanguage(author_id as string);
      }
    }
  }, [props, author_id]);

  return (
    <Fragment>
      <PageDetails
        title={`${
          selectedAuthor !== null
            ? `${selectedAuthor.author_name} books`
            : "Authors"
        }`}
        description="Perdua Publishers authors"
      >
        <div className="p-3 md:p-8">
          {props.systemBasicInfo.basic_info === null ? (
            <Loading className="bg-white" />
          ) : (
            <div className="grid grid-cols-12 gap-6">
              {props.systemBasicInfo.basic_info.authors.length === 0 ? (
                <div>No authors found!</div>
              ) : (
                props.systemBasicInfo.basic_info.authors.map((item, i) => (
                  <div
                    key={i + 1}
                    className="col-span-12 md:col-span-6 lg:col-span-3"
                  >
                    <div
                      onClick={() => {
                        setSelectedAuthor(item);
                        GetBooksListByLanguage(item.author_id);
                      }}
                      className="flex flex-col items-center justify-center w-full h-full rounded-xl bg-gray-50 hover:bg-green-50 cursor-pointer hover:text-green-700 group"
                    >
                      <div className="w-full h-full overflow-hidden rounded-t-xl bg-gray-100">
                        <Image
                          src={`${API_URL}/${ImageFolder.author}/${item.author_pic}`}
                          alt=""
                          height={300}
                          width={300}
                          className="w-auto h-auto min-h-full min-w-full object-cover"
                        />
                      </div>
                      <div className="p-3 text-left  w-full">
                        <div className="font-semibold text-lg">
                          {item.author_name}
                        </div>
                        <div className="flex flex-row items-center gap-2 text-sm mt-2">
                          <span className="text-gray-500 group-hover:text-black">
                            Phone:{" "}
                          </span>
                          <span className="">{item.phone}</span>
                        </div>
                        <div className="flex flex-row items-center gap-2 text-sm">
                          <span className="text-gray-500 group-hover:text-black">
                            Email:{" "}
                          </span>
                          <span className="">{item.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </PageDetails>
      {selectedAuthor !== null && (
        <Modal
          backDrop={true}
          theme={Themes.default}
          close={() => {
            setSelectedAuthor(null);
            setBooks(null);
            if (
              author_id !== undefined &&
              author_id !== null &&
              author_id !== ""
            ) {
              router.push("/authors");
            }
          }}
          backDropClose={true}
          widthSizeClass={ModalSize.maxWidth}
          displayClose={true}
          padding={{
            title: true,
            body: true,
            footer: undefined,
          }}
          title={
            <div className="flex flex-row items-center gap-3">
              <div>
                <div
                  onClick={() => {
                    setSelectedAuthor(null);
                    setBooks(null);
                    if (
                      author_id !== undefined &&
                      author_id !== null &&
                      author_id !== ""
                    ) {
                      router.push("/authors");
                    }
                  }}
                  className="h-10 w-10 rounded-full flex items-center justify-center text-gray-500 cursor-pointer bg-gray-100 hover:text-white hover:bg-green-600"
                >
                  <HiOutlineArrowSmLeft className="text-5xl" />
                </div>
              </div>
              <div className="text-2xl font-bold">
                {selectedAuthor.author_name}
              </div>
            </div>
          }
          marginTop={ModalMarginTop.small}
        >
          <Container>
            <div>
              {loading === true || books === null ? (
                <div className="bg-white rounded-md">
                  <LoadingBooks cols={2} />
                  <Loading />
                </div>
              ) : (
                <div>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Search book by name..."
                      className="bg-gray-100 rounded-md px-5 py-3 w-full"
                      value={searchBooks}
                      onChange={(e) => setSearchBooks(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-12 w-full gap-6">
                    {books.length === 0 ? (
                      <div className="col-span-12 text-lg">
                        No books found for{" "}
                        <span className="font-bold">
                          {selectedAuthor.author_name}
                        </span>
                      </div>
                    ) : (search(books, searchBooks) as GetBookInterface[])
                        .length === 0 ? (
                      <div className="col-span-12 text-lg">
                        No search result found for{" "}
                        <span className="font-bold">{searchBooks}</span>
                      </div>
                    ) : (
                      (search(books, searchBooks) as GetBookInterface[]).map(
                        (item, i) => (
                          <Link
                            href={`/book_details?book=${item.book_id}&product_title=${item.title}&product_image=${item.book_cover}`}
                            key={i + 1}
                            className="col-span-6 md:col-span-3 lg:col-span-2 group cursor-pointer bg-gray-100"
                          >
                            <BookItem
                              item={item}
                              onClick={() => {}}
                              hide_price={true}
                            />
                          </Link>
                        )
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </Modal>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({
  systemBasicInfo,
}: StoreState): { systemBasicInfo: SystemBasicInfoData } => {
  return { systemBasicInfo };
};

const AppPage = connect(mapStateToProps, { FC_GetBasicSystemInfo })(
  MyComponent
);

export default AppPage;
