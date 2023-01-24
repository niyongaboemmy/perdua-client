import Image from "next/image";
import Link from "next/link";
import React, { Component } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { IoMdCall } from "react-icons/io";
import Container from "../Container/Container";
import Loading from "../Loading/Loading";
import AboutUs from "./AboutUs";
import Consultancies from "../../assets/consultancies.webp";
import Books from "../../assets/HomepageImage.png";
import { SystemBasicInfoData } from "../../actions";
import dynamic from "next/dynamic";
import { PerduaServices } from "../../pages/about";

interface HomepageContentProps {
  setShowOpenModal: (status: boolean) => void;
  FC_GetBasicSystemInfo: (
    callBack: (
      loading: boolean,
      res: { type: "success" | "error"; msg: string } | null
    ) => void
  ) => void;
  systemBasicInfo: SystemBasicInfoData;
}
interface HomepageContentState {}

const NewBooksContent = dynamic(() => import("./NewBooks"));
const BooksCategoriesContent = dynamic(() => import("./BookCategories"));
const ServicesSectionContent = dynamic(() => import("./ServicesSection"));
const BooksConsultanciesContent = dynamic(
  () => import("../BookConsultancies/BookConsultancies")
);
const BooksByAvailabilityContent = dynamic(
  () => import("./BooksByAvailability")
);
const BooksByLanguageContainerContent = dynamic(
  () => import("./BooksByLanguageContainer")
);

export class HomepageContent extends Component<
  HomepageContentProps,
  HomepageContentState
> {
  componentDidMount(): void {
    if (this.props.systemBasicInfo.basic_info === null) {
      this.setState({ loading: true });
      this.props.FC_GetBasicSystemInfo(
        (
          loading: boolean,
          res: { type: "success" | "error"; msg: string } | null
        ) => {
          this.setState({ loading: loading });
          if (res !== null && res.type === "error") {
            this.setState({ error: res.msg, loading: false });
          }
          if (res !== null && res.type === "success") {
            this.setState({ error: "", loading: false });
          }
        }
      );
    }
  }
  render() {
    return (
      <div>
        <div
          className="relative md:overflow-hidden"
          style={{ height: "100vh" }}
        >
          <Image
            src={Books}
            priority={true}
            alt="Books"
            className="h-screen min-w-full w-auto object-cover animate__animated animate__fadeIn"
            height={2000}
            width={2000}
          />
          <div className="absolute top-40 md:top-60 lg:top-0 bottom-0 right-0 left-0 flex flex-col lg:justify-center">
            <Container className="flex flex-col px-6 lg:px-0">
              <div className="text-4xl md:text-6xl font-extrabold mb-4 pr-10 md:px-0 animate__animated animate__zoomIn text-white">
                Perdua Publishers
              </div>
              <div className="text-base md:text-xl animate__animated animate__fadeIn w-full md:w-3/4 lg:w-1/2 pr-0 md:pr-32 text-white">
                Produce high-quality age appropriate story books in terms of
                content and design.
              </div>
              <div className="my-32 md:my-32 lg:my-0"></div>
              <div className="flex flex-col md:flex-row md:items-center gap-4 mt-16">
                <Link
                  href={"/store"}
                  className="relative flex flex-row items-center justify-center gap-2 w-max text-lg bg-primary-800 hover:bg-green-700 text-white px-5 py-3 rounded-md hover:shadow-2xl cursor-pointer animate__animated animate__zoomIn"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <div>
                    <AiOutlineShoppingCart className="text-2xl" />
                  </div>
                  <span className="font-semibold">Our shop</span>
                  <div>
                    <BsArrowRight className="text-2xl" />
                  </div>
                  <div className="absolute right-1 h-3 w-3 rounded-full bg-white animate-ping"></div>
                </Link>
                <Link
                  href={"/contact"}
                  className="flex flex-row items-center justify-center gap-2 w-max text-lg text-green-700 bg-white hover:bg-green-700 hover:text-white px-5 py-3 rounded-md hover:shadow-2xl cursor-pointer animate__animated animate__zoomIn"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <div>
                    <IoMdCall className="text-2xl" />
                  </div>
                  <span>Contact Us</span>
                </Link>
              </div>
              <div className="mb-20"></div>
            </Container>
          </div>
          {/* Services */}
          <Container className="md:absolute px-3 bottom-8">
            <div className="bottom-5 grid grid-cols-12 gap-5 mt-10 md:mt-0">
              {PerduaServices.map((item, i) => {
                const SelectedServiceIcon = item.icon;
                return (
                  <Link
                    key={i + 1}
                    className="col-span-12 md:col-span-6 lg:col-span-3 h-full pt-10"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    href={item.link}
                  >
                    <div className="w-full bg-black bg-opacity-40 rounded-xl p-3 h-full px-4 flex flex-col items-center gap-3 hover:bg-opacity-100">
                      <div className="-mt-12">
                        <div className="flex items-center justify-center h-16 w-16 bg-green-900 rounded-full shadow-xl animate-pulse">
                          <SelectedServiceIcon className="text-4xl text-green-500" />
                        </div>
                      </div>
                      <div className="flex flex-col text-center -mt-1">
                        <span className="text-lg font-bold text-gray-200">
                          {item.short}
                        </span>
                        <span className="text-sm text-gray-400">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </div>
        <div className="block md:hidden pt-64"></div>
        <div className="mt-52 md:mt-0 pt-64 md:pt-0">
          {/* Others services */}
          {/* <NewBooksContent /> */}
          {this.props.systemBasicInfo.basic_info !== null ? (
            <BooksByAvailabilityContent
              systemBasicInfo={this.props.systemBasicInfo.basic_info}
            />
          ) : (
            <Loading className="bg-white" />
          )}
          {this.props.systemBasicInfo.basic_info !== null ? (
            <BooksCategoriesContent
              book_languages={this.props.systemBasicInfo.basic_info.languages}
              setShowOpenModal={this.props.setShowOpenModal}
            />
          ) : (
            <Loading className="bg-white" />
          )}
          {this.props.systemBasicInfo.basic_info !== null &&
            this.props.systemBasicInfo.basic_info.languages.length > 0 &&
            this.props.systemBasicInfo.basic_info.languages.map((item, i) => (
              <BooksByLanguageContainerContent
                side={i % 2 !== 0 ? "LEFT" : "RIGHT"}
                language={item}
                key={i + 1}
              />
            ))}
          <AboutUs />
          <Container>
            <div className="py-24">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-4 lg:cols-span-2 flex items-center justify-center">
                  <div>
                    <Image
                      src={Consultancies}
                      height={500}
                      width={500}
                      alt=""
                      className="h-72 w-auto rounded-md"
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-7 lg:cols-span-9 flex flex-col justify-center">
                  <div className="text-3xl font-bold">Consultancies</div>
                  <div className="mt-5 text-gray-600 mb-6">
                    If you&apos;re a writer trying to get published, you&apos;ve
                    probably figured out by now that the book publishing journey
                    can be pretty complicated. There&apos;s designing,
                    marketing, publishing, promoting, and social networking
                    involved, and performing these tasks yourself can be
                    intimidating, to say the least. That&apos;s where a book
                    marketing consultant can help
                  </div>
                  <div>
                    <Link
                      href={"/consultancies"}
                      className="flex flex-row items-center justify-center gap-2 w-max text-lg text-white bg-green-600 hover:bg-green-800 hover:text-white px-5 py-3 rounded-md hover:shadow-2xl cursor-pointer animate__animated animate__zoomIn"
                    >
                      View consultancies
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

export default HomepageContent;
