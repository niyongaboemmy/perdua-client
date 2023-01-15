import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineFileImage } from "react-icons/ai";
import { BsGoogle, BsLinkedin, BsTwitter } from "react-icons/bs";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { ImFacebook } from "react-icons/im";
import { IoEarthSharp, IoLogoYoutube } from "react-icons/io5";
import { RiInstagramFill, RiSearchLine } from "react-icons/ri";
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
import { AuthorSocialMedia } from "../../components/RegisterAuthor/RegisterAuthor";
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
  const [selectedAuthorDetails, setSelectedAuthorDetails] =
    useState<BookAuthor | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<GetBookInterface[] | null>(null);
  const [error, setError] = useState<string>("");
  const [searchBooks, setSearchBooks] = useState<string>("");
  const [searchData, setSearchData] = useState<string>("");

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

  const GetBookSocialMedia = (socialMedia: string): AuthorSocialMedia => {
    return JSON.parse(socialMedia) as AuthorSocialMedia;
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
        <div className="mb-3">
          <div className="relative">
            <input
              type="search"
              className="bg-gray-100 rounded-md px-5 py-3 w-full pl-12"
              placeholder="Search by author name"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <RiSearchLine className="text-3xl absolute top-2 left-3" />
          </div>
        </div>
        <div className="p-2 md:p-3 bg-gray-100 rounded-md">
          {props.systemBasicInfo.basic_info === null ? (
            <Loading className="bg-white" />
          ) : (
            <div className="grid grid-cols-12 gap-6">
              {props.systemBasicInfo.basic_info.authors.length === 0 ? (
                <div>No authors found!</div>
              ) : (
                  search(
                    props.systemBasicInfo.basic_info.authors,
                    searchData
                  ) as BookAuthor[]
                ).length === 0 ? (
                <div className="col-span-12 rounded-md px-3 text-center py-0 text-xl font-light w-full">
                  No result found for{" "}
                  <span className="font-bold">{searchData}</span>
                </div>
              ) : (
                (
                  search(
                    props.systemBasicInfo.basic_info.authors,
                    searchData
                  ) as BookAuthor[]
                ).map((item, i) => (
                  <div
                    key={i + 1}
                    className="col-span-12 md:col-span-6 lg:col-span-3 animate__animated animate__fadeIn"
                    data-aos="flip-left"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="1000"
                  >
                    <div className="flex flex-col items-center justify-center w-full h-full rounded-xl bg-white group border hover:shadow-md hover:border-white">
                      <div
                        onClick={() => {
                          setSelectedAuthorDetails(item);
                        }}
                        title="Click here to view books list"
                        className="w-full h-full overflow-hidden rounded-t-xl bg-gray-50 cursor-pointer"
                      >
                        {item.author_pic === null ? (
                          <div className="bg-white border-b h-full w-full flex flex-col items-center justify-center text-lg text-gray-500">
                            <div>
                              <AiOutlineFileImage className="text-8xl text-gray-300" />
                            </div>
                            <div className="mt-3">No picture available</div>
                          </div>
                        ) : (
                          <Image
                            src={`${API_URL}/${ImageFolder.author}/${item.author_pic}`}
                            alt=""
                            height={300}
                            width={300}
                            className="w-auto h-auto min-h-full min-w-full object-cover"
                          />
                        )}
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
                        <div className="flex flex-row items-center gap-2 mt-5">
                          {GetBookSocialMedia(item.social_media).facebook !==
                            undefined &&
                            GetBookSocialMedia(item.social_media).facebook !==
                              null &&
                            GetBookSocialMedia(item.social_media).facebook !==
                              "" && (
                              <Link
                                href={
                                  GetBookSocialMedia(item.social_media).facebook
                                }
                                target="_blank"
                                className=""
                              >
                                <div className="h-10 w-10 flex items-center justify-center bg-white text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                                  <ImFacebook className="text-2xl" />
                                </div>
                              </Link>
                            )}
                          {GetBookSocialMedia(item.social_media).instagram !==
                            undefined &&
                            GetBookSocialMedia(item.social_media).instagram !==
                              null &&
                            GetBookSocialMedia(item.social_media).instagram !==
                              "" && (
                              <Link
                                href={
                                  GetBookSocialMedia(item.social_media)
                                    .instagram
                                }
                                target="_blank"
                                className=""
                              >
                                <div className="h-10 w-10 flex items-center justify-center bg-white text-yellow-600 hover:bg-yellow-600 hover:text-white rounded-full">
                                  <RiInstagramFill className="text-2xl" />
                                </div>
                              </Link>
                            )}
                          {GetBookSocialMedia(item.social_media).twitter !==
                            undefined &&
                            GetBookSocialMedia(item.social_media).twitter !==
                              null &&
                            GetBookSocialMedia(item.social_media).twitter !==
                              "" && (
                              <Link
                                href={
                                  GetBookSocialMedia(item.social_media).twitter
                                }
                                target="_blank"
                                className=""
                              >
                                <div className="h-10 w-10 flex items-center justify-center bg-white text-red-600 hover:bg-red-600 hover:text-white rounded-full">
                                  <BsTwitter className="text-2xl" />
                                </div>
                              </Link>
                            )}
                          {GetBookSocialMedia(item.social_media).linkedin !==
                            undefined &&
                            GetBookSocialMedia(item.social_media).linkedin !==
                              null &&
                            GetBookSocialMedia(item.social_media).linkedin !==
                              "" && (
                              <Link
                                href={
                                  GetBookSocialMedia(item.social_media).linkedin
                                }
                                target="_blank"
                                className=""
                              >
                                <div className="h-10 w-10 flex items-center justify-center bg-white text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                                  <BsLinkedin className="text-2xl" />
                                </div>
                              </Link>
                            )}
                          {GetBookSocialMedia(item.social_media).googleSite !==
                            undefined &&
                            GetBookSocialMedia(item.social_media).googleSite !==
                              null &&
                            GetBookSocialMedia(item.social_media).googleSite !==
                              "" && (
                              <Link
                                href={
                                  GetBookSocialMedia(item.social_media)
                                    .googleSite
                                }
                                target="_blank"
                                className=""
                              >
                                <div className="h-10 w-10 flex items-center justify-center bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-full">
                                  <BsGoogle className="text-2xl" />
                                </div>
                              </Link>
                            )}
                          {GetBookSocialMedia(item.social_media)
                            .researchGate !== undefined &&
                            GetBookSocialMedia(item.social_media)
                              .researchGate !== null &&
                            GetBookSocialMedia(item.social_media)
                              .researchGate !== "" && (
                              <Link
                                href={
                                  GetBookSocialMedia(item.social_media)
                                    .researchGate
                                }
                                target="_blank"
                                className=""
                              >
                                <div className="h-10 w-10 flex items-center justify-center bg-white text-green-500 hover:bg-green-500 hover:text-white rounded-full">
                                  <IoEarthSharp className="text-2xl" />
                                </div>
                              </Link>
                            )}
                        </div>
                        <div className="flex flex-row items-center gap-3 mt-3 w-full">
                          <div
                            onClick={() => {
                              setSelectedAuthorDetails(item);
                            }}
                            className="bg-gray-100 text-sm group-hover:bg-white group-hover:text-green-700 rounded-md w-full text-center px-4 py-2 text-gray-700 font-semibold cursor-pointer border border-white group-hover:border-green-600"
                          >
                            More info
                          </div>
                          <div
                            onClick={() => {
                              setSelectedAuthor(item);
                              GetBooksListByLanguage(item.author_id);
                            }}
                            className="bg-green-50 text-sm group-hover:bg-green-800 group-hover:text-white rounded-md w-full text-center px-4 py-2 text-green-700 font-semibold cursor-pointer border border-white group-hover:border-green-700"
                          >
                            Books list
                          </div>
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
      {selectedAuthorDetails !== null && (
        <Modal
          backDrop={true}
          theme={Themes.default}
          close={() => {
            setSelectedAuthorDetails(null);
          }}
          backDropClose={true}
          widthSizeClass={ModalSize.large}
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
                    setSelectedAuthorDetails(null);
                  }}
                  className="h-10 w-10 rounded-full flex items-center justify-center text-gray-500 cursor-pointer bg-gray-100 hover:text-white hover:bg-green-600"
                >
                  <HiOutlineArrowSmLeft className="text-5xl" />
                </div>
              </div>
              <div className="text-xl font-bold text-gray-600">
                {selectedAuthorDetails.author_name}
              </div>
            </div>
          }
        >
          <div>
            <div className="flex flex-col items-center justify-center">
              <div className="w-72 h-72 rounded-md overflow-hidden">
                {selectedAuthorDetails.author_pic === null ? (
                  <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center text-lg text-gray-500">
                    <div>
                      <AiOutlineFileImage className="text-8xl text-gray-300" />
                    </div>
                    <div className="mt-3">No picture available</div>
                  </div>
                ) : (
                  <Image
                    src={`${API_URL}/${ImageFolder.author}/${selectedAuthorDetails.author_pic}`}
                    alt=""
                    height={300}
                    width={300}
                    className="w-auto h-auto min-h-full min-w-full object-cover"
                  />
                )}
              </div>
              <div className="mb-4 w-full border-b pb-3 flex flex-row items-center justify-between">
                <div>
                  <div className="text-base text-gray-600 font-normal">
                    Names
                  </div>
                  <div className="font-semibold">
                    {selectedAuthorDetails.author_name}
                  </div>
                </div>
                <div>
                  <div
                    onClick={() => {
                      setSelectedAuthor(selectedAuthorDetails);
                      GetBooksListByLanguage(selectedAuthorDetails.author_id);
                      setSelectedAuthorDetails(null);
                    }}
                    className="bg-green-600 text-white text-sm hover:bg-green-700 rounded-md w-full text-center px-4 py-2 font-semibold cursor-pointer"
                  >
                    Author Books
                  </div>
                </div>
              </div>
              <div className="mb-4 w-full border-b pb-3">
                <div className="text-base text-gray-600 font-normal">
                  Phone number
                </div>
                <div className="font-semibold">
                  {selectedAuthorDetails.phone}
                </div>
              </div>
              <div className="mb-1 w-full border-b pb-3">
                <div className="text-base text-gray-600 font-normal">
                  Author email
                </div>
                <div className="font-semibold">
                  {selectedAuthorDetails.email}
                </div>
              </div>
              <div className="mb-4 w-full border-b pb-3">
                {/* Social medial */}
                {/* <div className="text-base text-gray-600 font-normal">
                  Author Social media
                </div> */}
                <div className="bg-gray-100 p-3 mt-2 rounded-lg">
                  <div className="flex flex-row items-center gap-2">
                    {GetBookSocialMedia(selectedAuthorDetails.social_media)
                      .facebook !== undefined &&
                      GetBookSocialMedia(selectedAuthorDetails.social_media)
                        .facebook !== null &&
                      GetBookSocialMedia(selectedAuthorDetails.social_media)
                        .facebook !== "" && (
                        <Link
                          href={
                            GetBookSocialMedia(
                              selectedAuthorDetails.social_media
                            ).facebook
                          }
                          target="_blank"
                          className=""
                        >
                          <div className="h-10 w-10 flex items-center justify-center bg-white text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                            <ImFacebook className="text-2xl" />
                          </div>
                        </Link>
                      )}
                    {GetBookSocialMedia(selectedAuthorDetails.social_media)
                      .instagram !== undefined &&
                      GetBookSocialMedia(selectedAuthorDetails.social_media)
                        .instagram !== null &&
                      GetBookSocialMedia(selectedAuthorDetails.social_media)
                        .instagram !== "" && (
                        <Link
                          href={
                            GetBookSocialMedia(
                              selectedAuthorDetails.social_media
                            ).instagram
                          }
                          target="_blank"
                          className=""
                        >
                          <div className="h-10 w-10 flex items-center justify-center bg-white text-yellow-600 hover:bg-yellow-600 hover:text-white rounded-full">
                            <RiInstagramFill className="text-2xl" />
                          </div>
                        </Link>
                      )}
                    {GetBookSocialMedia(selectedAuthorDetails.social_media)
                      .twitter !== undefined &&
                      GetBookSocialMedia(selectedAuthorDetails.social_media)
                        .twitter !== null &&
                      GetBookSocialMedia(selectedAuthorDetails.social_media)
                        .twitter !== "" && (
                        <Link
                          href={
                            GetBookSocialMedia(
                              selectedAuthorDetails.social_media
                            ).twitter
                          }
                          target="_blank"
                          className=""
                        >
                          <div className="h-10 w-10 flex items-center justify-center bg-white text-red-600 hover:bg-red-600 hover:text-white rounded-full">
                            <BsTwitter className="text-2xl" />
                          </div>
                        </Link>
                      )}
                    {GetBookSocialMedia(selectedAuthorDetails.social_media)
                      .linkedin !== undefined &&
                      GetBookSocialMedia(selectedAuthorDetails.social_media)
                        .linkedin !== null &&
                      GetBookSocialMedia(selectedAuthorDetails.social_media)
                        .linkedin !== "" && (
                        <Link
                          href={
                            GetBookSocialMedia(
                              selectedAuthorDetails.social_media
                            ).linkedin
                          }
                          target="_blank"
                          className=""
                        >
                          <div className="h-10 w-10 flex items-center justify-center bg-white text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                            <BsLinkedin className="text-2xl" />
                          </div>
                        </Link>
                      )}
                    {GetBookSocialMedia(selectedAuthorDetails.social_media)
                      .googleSite !== undefined &&
                      GetBookSocialMedia(selectedAuthorDetails.social_media)
                        .googleSite !== null &&
                      GetBookSocialMedia(selectedAuthorDetails.social_media)
                        .googleSite !== "" && (
                        <Link
                          href={
                            GetBookSocialMedia(
                              selectedAuthorDetails.social_media
                            ).googleSite
                          }
                          target="_blank"
                          className=""
                        >
                          <div className="h-10 w-10 flex items-center justify-center bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-full">
                            <BsGoogle className="text-2xl" />
                          </div>
                        </Link>
                      )}
                    {GetBookSocialMedia(selectedAuthorDetails.social_media)
                      .researchGate !== undefined &&
                      GetBookSocialMedia(selectedAuthorDetails.social_media)
                        .researchGate !== null &&
                      GetBookSocialMedia(selectedAuthorDetails.social_media)
                        .researchGate !== "" && (
                        <Link
                          href={
                            GetBookSocialMedia(
                              selectedAuthorDetails.social_media
                            ).researchGate
                          }
                          target="_blank"
                          className=""
                        >
                          <div className="h-10 w-10 flex items-center justify-center bg-white text-green-500 hover:bg-green-500 hover:text-white rounded-full">
                            <IoEarthSharp className="text-2xl" />
                          </div>
                        </Link>
                      )}
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="text-base mb-2 text-gray-500 font-bold">
                  Bibliography
                </div>
                <div className="text-sm">
                  {selectedAuthorDetails.bibliography}
                </div>
              </div>
            </div>
          </div>
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
