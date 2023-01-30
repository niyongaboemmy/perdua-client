import Image from "next/image";
import Link from "next/link";
import React, { Component } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { MdReadMore } from "react-icons/md";
import AboutImage from "../../assets/about.png";
import Container from "../Container/Container";

interface AboutUsProps {}
interface AboutUsState {}

export class AboutUs extends Component<AboutUsProps, AboutUsState> {
  render() {
    return (
      <div
        className="bg-white py-10"
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
      >
        <Container>
          <div className="pb-10">
            <div className="grid grid-cols-12 gap-0 md:gap-10">
              <div className="col-span-12 md:col-span-5 p-5">
                <div className="mb-5">
                  <Image src={AboutImage} className="" alt="" />
                </div>
              </div>
              <div className="col-span-12 md:col-span-7 p-4 flex flex-col justify-center">
                <div className="text-4xl font-bold mb-4">
                  About Perdua Publishers
                </div>
                <div className="mb-5 text-gray-500 text-justify">
                  We are a Rwandan Publishing house; passionate about sharing
                  best books but most importantly motivating and cultivating the
                  love of reading, with high quality books, for all age ranges
                  in Kinyarwanda, French, Swahili, and English.
                </div>
                <div className="mb-5 text-gray-500 text-justify">
                  We publish and avail quality books which offer holistic and
                  innovative educational ends and promote the culture of
                  reading. We believe that reading helps in exercising the
                  brains and we are here to assist you achieve this.
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-3 mt-5">
                  <Link
                    href={"/about"}
                    className="flex flex-row items-center justify-center gap-2 w-max text-base font-semibold bg-gray-100 hover:bg-green-700 hover:text-white px-5 py-3 rounded-md hover:shadow-2xl cursor-pointer animate__animated animate__zoomIn"
                  >
                    <span>Read more</span>
                    <div>
                      <MdReadMore className="text-2xl" />
                    </div>
                  </Link>
                  <Link
                    href={"/store"}
                    className="relative flex flex-row items-center justify-center gap-2 w-max text-base bg-primary-800 hover:bg-green-700 text-white px-5 py-3 rounded-md hover:shadow-2xl cursor-pointer animate__animated animate__zoomIn"
                  >
                    <div>
                      <AiOutlineShoppingCart className="text-2xl" />
                    </div>
                    <span className="font-semibold">Visit Our Store</span>
                    <div>
                      <BsArrowRight className="text-2xl" />
                    </div>
                    <div className="absolute right-1 h-3 w-3 rounded-full bg-white animate-ping"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default AboutUs;
