import React, { Component } from "react";
import { IconType } from "react-icons";
import { BsCheckCircleFill, BsInfoCircleFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { MdSmsFailed } from "react-icons/md";
import { RiFolderWarningFill } from "react-icons/ri";

interface AlertProps {
  title: string;
  description?: string;
  type: "success" | "danger" | "info" | "warning";
  allow_time_out?: boolean;
  onClose: () => void;
}
interface AlertState {
  view_alert: boolean;
  animate_class: "zoomIn" | "zoomOutUp" | "shakeX";
}

export class Alert extends Component<AlertProps, AlertState> {
  constructor(props: AlertProps) {
    super(props);

    this.state = {
      view_alert: true,
      animate_class: "zoomIn",
    };
  }
  GetIcon = (): IconType => {
    if (this.props.type === "success") {
      return BsCheckCircleFill;
    }
    if (this.props.type === "danger") {
      return MdSmsFailed;
    }
    if (this.props.type === "info") {
      return BsInfoCircleFill;
    }
    return RiFolderWarningFill;
  };
  GetColor = (): string => {
    if (this.props.type === "success") {
      return "green";
    }
    if (this.props.type === "danger") {
      return "red";
    }
    if (this.props.type === "info") {
      return "blue";
    }
    return "yellow";
  };
  componentDidMount = () => {
    // Setting timeout
    if (this.props.allow_time_out === true) {
      setTimeout(() => {
        this.setState({ animate_class: "zoomOutUp" });
      }, 4000);
      setTimeout(() => {
        this.setState({ view_alert: false });
        this.props.onClose();
      }, 5000);
    }
  };
  render() {
    const IconSelected = this.GetIcon();
    const selectedClassName =
      this.GetColor() === "red" && this.state.animate_class !== "zoomOutUp"
        ? "shakeX"
        : this.state.animate_class;
    if (this.state.view_alert === false) {
      return "";
    }
    return (
      <div
        className={`bg-${this.GetColor()}-50 text-${this.GetColor()}-700 p-3 rounded-md animate__animated animate__${selectedClassName}`}
      >
        <div className="flex flex-row items-center gap-3 justify-between w-full">
          <div className="flex flex-row items-center gap-4 w-full">
            <div>
              <IconSelected className="text-4xl" />
            </div>
            <div className="flex flex-col text-black">
              <div className="font-semibold text-base">{this.props.title}</div>
              {this.props.description !== undefined ? (
                <div className="-mt-1 text-sm">{this.props.description}</div>
              ) : (
                ""
              )}
            </div>
          </div>
          {
            <div>
              <div
                onClick={this.props.onClose}
                className="bg-red-50 text-red-700 hover:bg-red-700 hover:text-white h-9 w-9 rounded-full flex items-center justify-center cursor-pointer"
              >
                <IoClose className="text-2xl" />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}
