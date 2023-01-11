import Link from "next/link";
import React, { Component } from "react";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { ImFacebook } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import Container from "../Container/Container";

interface FooterProps {}
interface FooterState {}

export class Footer extends Component<FooterProps, FooterState> {
  render() {
    return (
      <footer className="bg-gray-800 pt-20 text-white">
        <Container>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="font-bold text-2xl mb-3">About Us</div>
              <div className="text-sm text-gray-300 pr-0 md:pr-3">
                <div>
                  We publish and avail quality books which offer holistic and
                  innovative educational ends and promote the culture of reading
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="font-bold text-xl mb-3">Useful links</div>
              <div className="text-sm text-gray-200">
                <div className="flex flex-col">
                  <Link href="/" className="mb-2">
                    Homepage
                  </Link>
                  <Link href="/about" className="mb-2">
                    About Perdua
                  </Link>
                  <Link href="/store" className="mb-2">
                    Our Store
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="font-bold text-xl mb-3">Contact</div>
              <div className="text-sm text-gray-200">
                <div className="flex flex-col">
                  <Link href="/contact" className="mb-2">
                    Contact Us
                  </Link>
                  <Link href="/authors" className="mb-2">
                    Meet Our Authors
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="font-bold text-xl mb-3">Stay Connected</div>
              <div className="text-sm text-gray-200">
                Stay connected and get interesting news & coupon
              </div>
              <div className="flex flex-row items-center gap-2 mt-5">
                <Link
                  href={
                    "https://web.facebook.com/Perdua-Publishers-174267909938480"
                  }
                  target="_blank"
                  className=""
                >
                  <div className="h-10 w-10 flex items-center justify-center bg-white text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                    <ImFacebook className="text-2xl" />
                  </div>
                </Link>
                <Link href={""} target="_blank" className="">
                  <div className="h-10 w-10 flex items-center justify-center bg-white text-yellow-600 hover:bg-yellow-600 hover:text-white rounded-full">
                    <RiInstagramFill className="text-2xl" />
                  </div>
                </Link>
                <Link
                  href={"https://www.youtube.com/@perduapublishers9567"}
                  target="_blank"
                  className=""
                >
                  <div className="h-10 w-10 flex items-center justify-center bg-white text-red-600 hover:bg-red-600 hover:text-white rounded-full">
                    <IoLogoYoutube className="text-2xl" />
                  </div>
                </Link>
                <Link
                  href={"https://twitter.com/PerduaP"}
                  target="_blank"
                  className=""
                >
                  <div className="h-10 w-10 flex items-center justify-center bg-white text-blue-500 hover:bg-blue-500 hover:text-white rounded-full">
                    <BsTwitter className="text-2xl" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Container>
        <div className="py-6 bg-gray-900 mt-10 text-sm">
          <Container>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:justify-between">
              <div>
                Copyright © {new Date().getFullYear()} Perdua Publishers, All
                rights reserved.
              </div>
              <div className="text-gray-400">
                Developers:{" "}
                <Link
                  target={"_blank"}
                  className="font-bold underline text-gray-200"
                  href={"https://universalbridge.rw/"}
                >
                  UB Dev
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </footer>
    );
  }
}

export default Footer;
