import { Inter } from "@next/font/google";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import React, { Component, ReactNode } from "react";
import { ImageFolder } from "../../actions/books.action";
import DEFAULT_ICON from "../../assets/icon.ico";
import {
  API_URL,
  MAIN_PAGE_DESCRIPTION,
  // MAIN_PAGE_LOGO_ICON_PATH,
  MAIN_PAGE_TITLE,
} from "../../utils/api";

// const inter = Inter({ subsets: ["latin"] });

interface PageContainerProps {
  page_title?: string;
  page_description?: string;
  logo?: string;
  children: ReactNode;
  className?: string;
}
interface PageContainerPageProps {
  page_title?: string;
  page_description?: string;
  logo?: string;
  bookLogo?: string;
  children: ReactNode;
  className?: string;
  router: NextRouter;
}
interface PageContainerState {}

export class PageContainerPage extends Component<
  PageContainerPageProps,
  PageContainerState
> {
  render() {
    const { book, product_title, product_image } = this.props.router.query;
    return (
      <>
        <Head>
          <title>
            {this.props.page_title === undefined || this.props.page_title === ""
              ? MAIN_PAGE_TITLE
              : this.props.page_title}
          </title>
          <meta
            property="og:image"
            content={`${API_URL}/${ImageFolder.cover}/${
              product_image as string
            }`}
          />
          {/* {console.log({
            CheckImage: `${API_URL}/${ImageFolder.cover}/${
              product_image as string
            }`,
          })} */}
          <meta
            name="title"
            content={
              this.props.page_title === undefined ||
              this.props.page_title === ""
                ? MAIN_PAGE_TITLE
                : this.props.page_title
            }
          />
          <meta
            name="description"
            content={
              this.props.page_description === undefined ||
              this.props.page_description === ""
                ? MAIN_PAGE_DESCRIPTION
                : this.props.page_description
            }
          />
          <meta
            name="keywords"
            content="Perdua publishers, Perdua, publishers, books, Rwanda, ibitabo, abana, ikinyarwanda, gusoma, kwandika, reading books"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="icon"
            href={
              this.props.logo === undefined ? DEFAULT_ICON.src : this.props.logo
            }
          />
        </Head>
        <main
          className={`${
            this.props.className !== undefined && this.props.className !== ""
              ? this.props.className
              : ""
          }`}
        >
          {this.props.children}
        </main>
      </>
    );
  }
}

const PageContainer = (props: PageContainerProps) => {
  const router = useRouter();
  return (
    <PageContainerPage
      className={props.className}
      logo={props.logo}
      page_title={props.page_title}
      page_description={props.page_description}
      router={router}
    >
      {props.children}
    </PageContainerPage>
  );
};

export default PageContainer;
