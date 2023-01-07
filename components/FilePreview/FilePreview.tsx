import Image from "next/image";
import React from "react";
import { MdClose } from "react-icons/md";
import { FileTypes } from "../../utils/functions";
import PdfViewer from "../PdfViewer/PdfViewer";

const FilePreview = (props: {
  selectedFile: File;
  onClose: () => void;
  isComponent: boolean;
}) => {
  const { alt, src } = {
    src: URL.createObjectURL(props.selectedFile),
    alt: props.selectedFile.name,
  };
  return (
    <div>
      {props.isComponent === false && (
        <div className="bg-white p-1 pl-3 flex flex-row items-center justify-between gap-2 w-full">
          <div className="font-bold text-accent-900 text-xl">File Preview</div>
          <div>
            <div
              onClick={props.onClose}
              className="bg-accent-400 hover:bg-accent-900 rounded-full flex items-center justify-center h-10 w-10 group cursor-pointer"
            >
              <MdClose className="text-3xl text-accent-900 group-hover:text-white" />
            </div>
          </div>
        </div>
      )}
      {props.selectedFile.type === FileTypes.PDF ? (
        <PdfViewer
          file_url={`${src}`}
          class_name={"w-full h-100vh"}
          frame_title={"User document"}
          setLoadingFile={(status: boolean) => {}}
          full_height={true}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          height="200"
          width={200}
          className="w-full h-auto"
        />
      )}
    </div>
  );
};

export default FilePreview;
