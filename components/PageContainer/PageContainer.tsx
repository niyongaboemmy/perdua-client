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
            content={
              product_image !== undefined && product_image !== null
                ? `${API_URL}/${ImageFolder.cover}/${product_image as string}`
                : this.props.logo !== undefined
                ? this.props.logo
                : DEFAULT_ICON.src
            }
          />
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
          {/* {window !== undefined && window.location.href !== undefined && (
            <meta property="og:url" content={window.location.href} />
          )} */}
          <meta
            property="og:title"
            content={
              this.props.page_title === undefined ||
              this.props.page_title === ""
                ? MAIN_PAGE_TITLE
                : this.props.page_title
            }
          />
          <meta
            property="og:description"
            content={
              this.props.page_description === undefined ||
              this.props.page_description === ""
                ? MAIN_PAGE_DESCRIPTION
                : this.props.page_description
            }
          />
          <meta
            property="og:image"
            content={
              product_image !== undefined && product_image !== null
                ? `${API_URL}/${ImageFolder.cover}/${product_image as string}`
                : this.props.logo !== undefined
                ? this.props.logo
                : DEFAULT_ICON.src
            }
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="icon"
            href={
              product_image !== undefined && product_image !== null
                ? `${API_URL}/${ImageFolder.cover}/${product_image as string}`
                : this.props.logo === undefined
                ? DEFAULT_ICON.src
                : this.props.logo
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
