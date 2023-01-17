import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineFileImage } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { BsGoogle, BsImage, BsLinkedin, BsTwitter } from "react-icons/bs";
import { ImFacebook } from "react-icons/im";
import { IoEarthSharp } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { BookAuthor } from "../../actions";
import { ImageFolder } from "../../actions/books.action";
import { API_URL } from "../../utils/api";
import { AuthorSocialMedia } from "../RegisterAuthor/RegisterAuthor";

const AuthorItem = (props: {
  item: BookAuthor;
  setSelectedAuthorDetails: (author: BookAuthor) => void;
  setSelectedAuthor: (author: BookAuthor) => void;
  GetBooksListByLanguage: (author_id: string) => void;
  GetBookSocialMedia: (social_media: string) => AuthorSocialMedia;
}) => {
  const [loadImage, setLoadImage] = useState<boolean>(true);
  return (
    <div
      className="col-span-12 md:col-span-6 lg:col-span-3 animate__animated animate__fadeIn"
      data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="1000"
    >
      <div className="flex flex-col items-center justify-center w-full h-full rounded-xl bg-white group border hover:shadow-md hover:border-white">
        <div
          onClick={() => {
            props.setSelectedAuthorDetails(props.item);
          }}
          title="Click here to view books list"
          className="w-full h-full overflow-hidden rounded-t-xl cursor-pointer"
        >
          {props.item.author_pic === null ? (
            <div className="h-full w-full p-3">
              <div
                className="bg-gray-100 rounded-t-lg h-full w-full flex flex-col items-center justify-center text-lg text-gray-500"
                style={{ height: "290px" }}
              >
                <div>
                  <AiOutlineFileImage className="text-8xl text-gray-300" />
                </div>
                <div className="mt-3">No picture available</div>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden h-full" style={{ height: "300px" }}>
              {loadImage === true && (
                <div className="p-3 h-full w-full">
                  <div className="bg-gray-100 rounded-xl animate__animated animate__fadeIn animate__fast h-full w-full flex flex-col items-center justify-center">
                    <BsImage className="text-8xl mb-3 text-gray-300" />
                    <div className="flex flex-row items-center gap-2 text-gray-400">
                      <BiLoaderCircle className="text-2xl animate-spin" />
                      <span className="text-gray-600 animate__animated animate__fadeIn animate__slower animate__infinite">
                        Loading image...
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <Image
                src={`${API_URL}/${ImageFolder.author}/${props.item.author_pic}`}
                alt=""
                height={300}
                width={300}
                className="h-0 w-0"
                onLoadingComplete={(img: HTMLImageElement) => {
                  setLoadImage(false);
                  img.className =
                    "w-auto h-auto min-h-full min-w-full object-cover animate__animated animate__fadeIn animate__slow";
                }}
              />
            </div>
          )}
        </div>
        <div className="p-3 text-left w-full h-max flex flex-col justify-between">
          <div>
            <div className="font-semibold text-lg">
              {props.item.author_name}
            </div>
            <div className="flex flex-row items-center gap-2 text-sm mt-2">
              <span className="text-gray-500 group-hover:text-black">
                Phone:{" "}
              </span>
              <span className="">{props.item.phone}</span>
            </div>
            <div className="flex flex-row items-center gap-2 text-sm">
              <span className="text-gray-500 group-hover:text-black">
                Email:{" "}
              </span>
              <span className="">{props.item.email}</span>
            </div>
          </div>
          <div>
            <div className="flex flex-row items-center gap-2 mt-5">
              {props.GetBookSocialMedia(props.item.social_media).facebook !==
                undefined &&
                props.GetBookSocialMedia(props.item.social_media).facebook !==
                  null &&
                props.GetBookSocialMedia(props.item.social_media).facebook !==
                  "" && (
                  <Link
                    href={
                      props.GetBookSocialMedia(props.item.social_media).facebook
                    }
                    target="_blank"
                    className=""
                  >
                    <div className="h-10 w-10 flex items-center justify-center bg-white text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                      <ImFacebook className="text-2xl" />
                    </div>
                  </Link>
                )}
              {props.GetBookSocialMedia(props.item.social_media).instagram !==
                undefined &&
                props.GetBookSocialMedia(props.item.social_media).instagram !==
                  null &&
                props.GetBookSocialMedia(props.item.social_media).instagram !==
                  "" && (
                  <Link
                    href={
                      props.GetBookSocialMedia(props.item.social_media)
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
              {props.GetBookSocialMedia(props.item.social_media).twitter !==
                undefined &&
                props.GetBookSocialMedia(props.item.social_media).twitter !==
                  null &&
                props.GetBookSocialMedia(props.item.social_media).twitter !==
                  "" && (
                  <Link
                    href={
                      props.GetBookSocialMedia(props.item.social_media).twitter
                    }
                    target="_blank"
                    className=""
                  >
                    <div className="h-10 w-10 flex items-center justify-center bg-white text-red-600 hover:bg-red-600 hover:text-white rounded-full">
                      <BsTwitter className="text-2xl" />
                    </div>
                  </Link>
                )}
              {props.GetBookSocialMedia(props.item.social_media).linkedin !==
                undefined &&
                props.GetBookSocialMedia(props.item.social_media).linkedin !==
                  null &&
                props.GetBookSocialMedia(props.item.social_media).linkedin !==
                  "" && (
                  <Link
                    href={
                      props.GetBookSocialMedia(props.item.social_media).linkedin
                    }
                    target="_blank"
                    className=""
                  >
                    <div className="h-10 w-10 flex items-center justify-center bg-white text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                      <BsLinkedin className="text-2xl" />
                    </div>
                  </Link>
                )}
              {props.GetBookSocialMedia(props.item.social_media).googleSite !==
                undefined &&
                props.GetBookSocialMedia(props.item.social_media).googleSite !==
                  null &&
                props.GetBookSocialMedia(props.item.social_media).googleSite !==
                  "" && (
                  <Link
                    href={
                      props.GetBookSocialMedia(props.item.social_media)
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
              {props.GetBookSocialMedia(props.item.social_media)
                .researchGate !== undefined &&
                props.GetBookSocialMedia(props.item.social_media)
                  .researchGate !== null &&
                props.GetBookSocialMedia(props.item.social_media)
                  .researchGate !== "" && (
                  <Link
                    href={
                      props.GetBookSocialMedia(props.item.social_media)
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
                  props.setSelectedAuthorDetails(props.item);
                }}
                className="bg-gray-100 text-sm group-hover:bg-white group-hover:text-green-700 rounded-md w-full text-center px-4 py-2 text-gray-700 font-semibold cursor-pointer border border-white group-hover:border-green-600"
              >
                More info
              </div>
              <div
                onClick={() => {
                  props.setSelectedAuthor(props.item);
                  props.GetBooksListByLanguage(props.item.author_id);
                }}
                className="bg-green-50 text-sm group-hover:bg-green-700 hover:bg-green-800 group-hover:text-white rounded-md w-full text-center px-4 py-2 text-green-700 font-semibold cursor-pointer border border-white group-hover:border-green-700"
              >
                Books list
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorItem;
