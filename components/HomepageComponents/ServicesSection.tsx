import Link from "next/link";
import React, { Component } from "react";
import { PerduaServices } from "../../pages/about";
import Container from "../Container/Container";
import ServicesImage from "../../assets/services.jpg";
import Image from "next/image";

interface ServicesSectionProps {}
interface ServicesSectionState {}

class ServicesSection extends Component<
  ServicesSectionProps,
  ServicesSectionState
> {
  render() {
    return (
      <div>
        <Container>
          <div className="grid grid-cols-12 my-6 mb-14">
            <div className="col-span-12 p-2 md:p-6 pb-0">
              <div className="flex flex-row items-center gap-3">
                {/* <div>
                  <BiTask className="text-5xl text-green-600" />
                </div> */}
                <div className="font-bold text-4xl animate__animated animate__zoomIn">
                  What we do
                </div>
              </div>
              <div className="mt-5 mb-5">
                <div className="mb-2 text-gray-00">
                  We publish and avail quality books which offer holistic and
                  innovative educational ends and promote the culture of
                  reading. (see how Imagine we presented theirs:{" "}
                  <Link
                    href={"https://imaginewe.rw/#work"}
                    target="_blank"
                    className="text-gray-400 underline hover:text-green-600"
                  >
                    https://imaginewe.rw/#work
                  </Link>
                  )
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-7 px-0 md:px-3">
              <div className="grid grid-cols-12 gap-3">
                {PerduaServices.map((item, i) => {
                  const SelectedIcon = item.icon;
                  return (
                    <div
                      key={i + 1}
                      className="col-span-12 md:col-span-6 rounded-xl m-0 md:m-2 p-4 pt-8 group bg-white"
                    >
                      <div className="flex flex-col items-center text-center gap-3">
                        <div>
                          <div className="flex items-center justify-center w-20 h-20 bg-green-600 text-white rounded-full">
                            <SelectedIcon className={`text-5xl text-white`} />
                          </div>
                        </div>
                        <div className="">{item.title}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5 md:p-4 lg:p-2 mt-4 md:mt-0">
              <div className="bg-white w-full h-full rounded-xl overflow-hidden">
                <Image
                  src={ServicesImage}
                  alt="Perdua"
                  height={500}
                  width={500}
                  className="min-w-full min-h-full h-auto w-auto object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default ServicesSection;
