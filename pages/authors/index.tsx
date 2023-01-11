import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { connect } from "react-redux";
import {
  BookAuthor,
  FC_GetBasicSystemInfo,
  SystemBasicInfoData,
} from "../../actions";
import { ImageFolder } from "../../actions/books.action";
import Loading from "../../components/Loading/Loading";
import Modal, {
  ModalMarginTop,
  ModalSize,
  Themes,
} from "../../components/Modal/Modal";
import { PageDetails } from "../../components/PageDetails/PageDetails";
import { StoreState } from "../../reducers";
import { API_URL } from "../../utils/api";

interface AppProps {
  systemBasicInfo: SystemBasicInfoData;
  FC_GetBasicSystemInfo: (
    callBack: (
      loading: boolean,
      res: { type: "success" | "error"; msg: string } | null
    ) => void
  ) => void;
}

const MyComponent = (props: AppProps): JSX.Element => {
  const [selectedAuthor, setSelectedAuthor] = useState<BookAuthor | null>(null);
  useEffect(() => {
    if (props.systemBasicInfo.basic_info === null) {
      props.FC_GetBasicSystemInfo(
        (
          loading: boolean,
          res: {
            type: "success" | "error";
            msg: string;
          } | null
        ) => {}
      );
    }
  }, [props]);

  return (
    <Fragment>
      <PageDetails title="Authors" description="Perdua Publishers authors">
        <div className="p-3 md:p-8">
          {props.systemBasicInfo.basic_info === null ? (
            <Loading className="bg-white" />
          ) : (
            <div className="grid grid-cols-12 gap-6">
              {props.systemBasicInfo.basic_info.authors.length === 0 ? (
                <div>No authors found!</div>
              ) : (
                props.systemBasicInfo.basic_info.authors.map((item, i) => (
                  <div
                    key={i + 1}
                    className="col-span-12 md:col-span-6 lg:col-span-3"
                  >
                    <div
                      onClick={() => setSelectedAuthor(item)}
                      className="flex flex-col items-center justify-center w-full h-full rounded-xl bg-gray-50 hover:bg-green-50 cursor-pointer hover:text-green-700 group"
                    >
                      <div className="w-full h-full overflow-hidden rounded-t-xl bg-gray-100">
                        <Image
                          src={`${API_URL}/${ImageFolder.author}/${item.author_pic}`}
                          alt=""
                          height={300}
                          width={300}
                          className="w-auto h-auto min-h-full min-w-full object-cover"
                        />
                      </div>
                      <div className="p-3 text-left  w-full">
                        <div className="font-semibold text-lg">
                          {item.author_name}
                        </div>
                        <div className="flex flex-row items-center gap-2 text-sm mt-2">
                          <span className="text-gray-500 group-hover:text-black">
                            Phone:{" "}
                          </span>
                          <span className="">{item.phone}</span>
                        </div>
                        <div className="flex flex-row items-center gap-2 text-sm">
                          <span className="text-gray-500 group-hover:text-black">
                            Email:{" "}
                          </span>
                          <span className="">{item.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </PageDetails>
      {selectedAuthor !== null && (
        <Modal
          backDrop={true}
          theme={Themes.default}
          close={() => setSelectedAuthor(null)}
          backDropClose={true}
          widthSizeClass={ModalSize.maxWidth}
          displayClose={true}
          padding={{
            title: true,
            body: true,
            footer: undefined,
          }}
          title={
            <div className="flex flex-row items-center gap-3">
              <div>
                <div
                  onClick={() => setSelectedAuthor(null)}
                  className="h-10 w-10 rounded-full flex items-center justify-center text-gray-500 cursor-pointer bg-gray-100 hover:text-white hover:bg-green-600"
                >
                  <HiOutlineArrowSmLeft className="text-5xl" />
                </div>
              </div>
              <div className="text-2xl font-bold">
                {selectedAuthor.author_name}
              </div>
            </div>
          }
          marginTop={ModalMarginTop.small}
        >
          <div className="text-5xl text-gray-400 font-bold border-t -mt-3 p-6">
            Coming soon ...
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({
  systemBasicInfo,
}: StoreState): { systemBasicInfo: SystemBasicInfoData } => {
  return { systemBasicInfo };
};

const AppPage = connect(mapStateToProps, { FC_GetBasicSystemInfo })(
  MyComponent
);

export default AppPage;
