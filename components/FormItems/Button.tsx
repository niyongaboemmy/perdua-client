import React, { Component } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  title: string;
  className?: string;
  theme?:
    | "primary"
    | "light-primary"
    | "danger"
    | "light-danger"
    | "warning"
    | "light-warning"
    | "info"
    | "light-info"
    | "success"
    | "light-success";
  onClick?: () => void;
}
interface ButtonState {}

export class Button extends Component<ButtonProps, ButtonState> {
  GetBgColor = (): string => {
    switch (this.props.theme) {
      case "danger":
        return "bg-red-700 hover:bg-red-800";
      case "light-danger":
        return "bg-red-50";
      case "success":
        return "bg-green-700 hover:bg-green-800";
      case "light-success":
        return "bg-green-50";
      case "warning":
        return "bg-yellow-700 hover:bg-yellow-800";
      case "light-warning":
        return "bg-yellow-100";
      default:
        return "bg-white";
    }
  };
  GetTextColor = (): string => {
    switch (this.props.theme) {
      case "danger":
        return "text-white";
      case "light-danger":
        return "text-red-700";
      case "success":
        return "text-white";
      case "light-success":
        return "text-green-700";
      case "warning":
        return "text-white";
      case "light-warning":
        return "text-yellow-700";
      default:
        return "text-black";
    }
  };
  render() {
    return (
      <button
        onClick={this.props.onClick}
        className={`px-4 py-2 rounded cursor-pointer text-base ${this.GetBgColor()} ${this.GetTextColor()} ${
          this.props.className !== undefined ? this.props.className : ""
        }`}
        type={this.props.type}
      >
        {this.props.title}
      </button>
    );
  }
}

export default Button;
