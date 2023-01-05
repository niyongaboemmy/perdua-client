import React, { useEffect, useState } from "react";
import { Alert } from "../Alert/Alert";
// import { isEmptyOrSpaces } from "../../shared/dataTest";

export const isEmptyOrSpaces = (str: string): boolean => {
  return str === null || str.match(/^ *$/) !== null;
};

type PdfViewerProps = {
  file_url: string;
  class_name: string;
  frame_title: string;
  setLoadingFile: (state: boolean) => void;
  full_height?: boolean;
};

const PdfViewer: React.FC<PdfViewerProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ element: string; msg: string } | null>(
    null
  );
  useEffect(() => {
    if (loading) {
      if (isEmptyOrSpaces(props.file_url)) {
        setError({ element: "PDF_FILE", msg: "File url is required" });
      } else if (error !== null) {
        setError(null);
      }
      setLoading(false);
    }
  }, [error, loading, props.file_url]);

  return (
    <div className="w-full">
      {error ? (
        <Alert title={error.msg} type="danger" onClose={() => {}} />
      ) : (
        <object
          data={props.file_url}
          // data={
          //   "https://tmis.reb.rw/api/public/documents/1660952180_21100318066_disabilitydocs.pdf"
          // }
          type="application/pdf"
          className={props.class_name}
          onLoad={() => props.setLoadingFile(false)}
        >
          <iframe
            // src={props.file_url}
            // src={
            //   "https://tmis.reb.rw/api/public/documents/1660952180_21100318066_disabilitydocs.pdf"
            // }
            src={`https://docs.google.com/viewer?url=${props.file_url}&embedded=true`}
            className={props.class_name}
            title={props.frame_title}
            onLoad={() => props.setLoadingFile(false)}
          >
            <p className="text-2xl opacity-50">
              This browser does not support PDF!
            </p>
          </iframe>
        </object>
      )}
    </div>
  );
};

export default PdfViewer;
