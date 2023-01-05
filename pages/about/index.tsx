import Link from "next/link";
import React, { Component } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { PageDetails } from "../../components/PageDetails/PageDetails";
import { BiTask } from "react-icons/bi";
import { FiTarget } from "react-icons/fi";
import { MdOutlinePersonPin } from "react-icons/md";
import AboutImage from "../../assets/page_about.jpeg";
import Image from "next/image";
import { FaRegAddressBook } from "react-icons/fa";

export class index extends Component {
  render() {
    return (
      <PageDetails
        title="About Us"
        description="Perdua Publishers more information"
      >
        <div className="p-3 md:p-8">
          {/* -------------------- */}
          <div>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 md:col-span-8">
                <div className="flex flex-row items-center gap-7">
                  <div>
                    <MdOutlinePersonPin className="text-4xl text-green-600" />
                  </div>
                  <div className="font-bold text-2xl animate__animated animate__zoomIn">
                    Who are we
                  </div>
                </div>
                <div className="mt-5">
                  We are a Rwandan Publishing house; passionate about sharing
                  best books but most importantly motivating and cultivating the
                  love of reading, with high quality books, for all age ranges
                  in Kinyarwanda, French, Swahili, and English.
                </div>
                <div className="border-b my-10 mt-14"></div>
                {/* -------------------- */}
                <div className="mt-10">
                  <div className="flex flex-row items-center gap-3">
                    <div>
                      <FiTarget className="text-3xl text-green-600" />
                    </div>
                    <div className="font-bold text-2xl animate__animated animate__zoomIn">
                      Our Passion
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="mb-5">
                      We know that books fire imagination and have the power to
                      change our perspective and mindsets. Books spark
                      inspiration and be used as a guide to live our best life.
                      Perdua Publishers was born in 2015 to reduce the dearth of
                      books and produce high-quality age-appropriate story books
                      in content and design.{" "}
                    </div>
                    <div>
                      We believe that reading helps in exercising the brains and
                      we are here to assist you achieve this.
                    </div>
                  </div>
                </div>
                {/* ----------------------- */}
              </div>
              <div className="col-span-12 md:col-span-4 pl-8 -mr-11">
                <Image
                  src={AboutImage}
                  className="animate__animated animate__fadeIn rounded-l-2xl"
                  alt="Perdua"
                />
              </div>
            </div>
            <div className="border-b my-10"></div>
          </div>
          {/* ----------------------- */}

          {/* -------------------- */}
          <div>
            <div className="flex flex-row items-center gap-3">
              <div>
                <BiTask className="text-3xl text-green-600" />
              </div>
              <div className="font-bold text-2xl animate__animated animate__zoomIn">
                What we do
              </div>
            </div>
            <div className="mt-5">
              <div className="mb-2">
                We publish and avail quality books which offer holistic and
                innovative educational ends and promote the culture of reading.
                (see how Imagine we presented theirs:{" "}
                <Link
                  href={"https://imaginewe.rw/#work"}
                  target="_blank"
                  className="text-gray-400 underline hover:text-green-600"
                >
                  https://imaginewe.rw/#work
                </Link>
                )
              </div>
              <div className="p-2 md:p-6 flex flex-col gap-3">
                <div className="flex flex-row items-center gap-4">
                  <div>
                    <BsCheckCircleFill className="text-2xl text-green-600" />
                  </div>
                  <div>
                    We publish novels and story books of Rwandan authors.
                  </div>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <div>
                    <BsCheckCircleFill className="text-2xl text-green-600" />
                  </div>
                  <div>
                    We distribute books to different communities that are in
                    great need.
                  </div>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <div>
                    <BsCheckCircleFill className="text-2xl text-green-600" />
                  </div>
                  <div>We support authors to edit and publish their books.</div>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <div>
                    <BsCheckCircleFill className="text-2xl text-green-600" />
                  </div>
                  <div>
                    We develop modules/guide for NGOs and train their
                    beneficiaries.
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b my-10"></div>
            {/* -------------------- */}
            <div className="mt-10">
              <div className="flex flex-row items-center gap-3">
                <div>
                  <FaRegAddressBook className="text-3xl text-green-600" />
                </div>
                <div className="font-bold text-2xl animate__animated animate__zoomIn">
                  Our Address
                </div>
              </div>
              <div className="mt-5">
                <div className="mb-16 p-0 md:px-8">
                  <div className="mb-3">P.O. Box 3405 Kigali, Rwanda</div>
                  <div className="">CEO: Tel +250 782 339 567</div>
                  <div className="">
                    Managing Director: Tel +250 782 339 567
                  </div>
                  <div className="mb-3">
                    Customer Relations Officer: Tel +250 783 850 552
                  </div>
                  <div className="">E-mail: info@perduap.com</div>
                </div>
              </div>
            </div>
            {/* ----------------------- */}
            <div>
              <Link
                href={"/contact"}
                className="px-5 py-3 rounded-md bg-gray-100 font-bold hover:bg-green-700 hover:text-white"
              >
                <span>Contact Us for More Info</span>
              </Link>
            </div>
          </div>
          {/* ----------------------- */}
        </div>
      </PageDetails>
    );
  }
}

export default index;
