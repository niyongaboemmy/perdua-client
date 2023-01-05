import Image from "next/image";
import Link from "next/link";
import React, { Component, ReactNode } from "react";
import { BsArrowLeft } from "react-icons/bs";
import Container from "../Container/Container";
import PageHead from "../../assets/page_cover4.jpeg";
import PageContainer from "../PageContainer/PageContainer";

interface PageDetailsProps {
  title: string;
  description?: string;
  children: ReactNode;
  onBack?: () => void;
}
interface PageDetailsState {}

export class PageDetails extends Component<PageDetailsProps, PageDetailsState> {
  render() {
    return (
      <PageContainer page_title={`${this.props.title} | Perdua Publishers Ltd`}>
        <div>
          <div className="-mt-8 md:-mt-0">
            <Image src={PageHead} alt="" className="w-full" />
            <Container className="z-50 mt-8 md:-mt-20 lg:-mt-44">
              <div className="">
                <div className="flex flex-row items-center gap-3 mb-10">
                  <div>
                    <Link
                      href={"/"}
                      className="bg-white rounded-full h-12 w-12 flex items-center justify-center cursor-pointer hover:bg-green-600 hover:text-white"
                    >
                      <BsArrowLeft className="text-3xl" />
                    </Link>
                  </div>
                  <div className="">
                    <div className="text-3xl font-bold">{this.props.title}</div>
                    <div className="text-sm">{this.props.description}</div>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-4 w-full mb-5 lg:mt-8">
                  <div className="bg-white rounded-xl p-3 w-full min-h-screen animate__animated animate_fadeIn">
                    <div className="">{this.props.children}</div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </PageContainer>
    );
  }
}
