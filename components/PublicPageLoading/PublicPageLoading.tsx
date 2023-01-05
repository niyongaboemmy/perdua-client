import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Container from "../Container/Container";

const PublicPageLoading = () => {
  return (
    <div className="pt-16">
      <div className="mb-3">
        <Container className="h-full bg-white mt-2">
          <div
            className="h-full flex flex-col justify-between p-3 md:p-5"
            style={{ height: "calc(100vh - 100px)" }}
          >
            <div className="h-full flex flex-col justify-ceter">
              {/* <div className="h-24 w-24 bg-gray-200 rounded-full my-8 animate__animated animate__fadeIn"></div> */}
              <div className="h-10 bg-gray-100 rounded-full w-full md:w-1/2 lg:w-2/3 animate__animated animate__fadeIn animate__infinite "></div>
              <div className="h-4 bg-gray-100 rounded-full w-full md:w-1/3 lg:w-1/2 mt-3 animate__animated animate__fadeIn animate__infinite animate__faster"></div>
              <div className="h-4 bg-gray-100 rounded-full w-full md:w-1/4 lg:w-1/3 mt-3 animate__animated animate__fadeIn animate__infinite "></div>
              <div className="py-20 bg-gray-100 my-4 mt-8 rounded-md">
                <div
                  className={`flex flex-col items-center justify-center px-4 py-4 rounded-md w-full`}
                >
                  <div>
                    <div>
                      <AiOutlineLoading3Quarters className="text-7xl animate-spin" />
                    </div>
                  </div>
                  <div className="text-xl animate__animated animate__fadeIn animate__infinite mt-4 font-bold">
                    Loading page, please wait...
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6 lg:col-span-3 rounded-md bg-gray-100 h-24 w-full animate__animated animate__fadeIn animate__infinite animate__slow"></div>
              <div className="col-span-12 md:col-span-6 lg:col-span-3 rounded-md bg-gray-100 h-24 w-full animate__animated animate__fadeIn animate__infinite animate__fast"></div>
              <div className="col-span-12 md:col-span-6 lg:col-span-3 rounded-md bg-gray-100 h-24 w-full animate__animated animate__fadeIn animate__infinite"></div>
              <div className="col-span-12 md:col-span-6 lg:col-span-3 rounded-md bg-gray-100 h-24 w-full animate__animated animate__fadeIn animate__infinite animate__faster"></div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default PublicPageLoading;
