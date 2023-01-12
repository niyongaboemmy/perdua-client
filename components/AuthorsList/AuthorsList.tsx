import Image from "next/image";
import React, { Component } from "react";
import {
  AuthorGetInterface,
  FC_GetAuthorsList,
} from "../../actions/author.action";
import { ImageFolder } from "../../actions/books.action";
import { API_URL } from "../../utils/api";
import Loading from "../Loading/Loading";

interface AuthorsListProps {}
interface AuthorsListState {
  loading: boolean;
  error: string;
  authors: AuthorGetInterface[] | null;
}

const initialState: AuthorsListState = {
  loading: false,
  error: "",
  authors: null,
};

export class AuthorsList extends Component<AuthorsListProps, AuthorsListState> {
  constructor(props: AuthorsListProps) {
    super(props);

    this.state = initialState;
  }
  GetAuthorsList = () => {
    this.setState({ loading: true, error: "" });
    FC_GetAuthorsList(
      (
        loading: boolean,
        res: {
          type: "success" | "error";
          msg: string;
          data: AuthorGetInterface[];
        } | null
      ) => {
        this.setState({ loading: loading, error: "" });
        if (res?.type === "success") {
          this.setState({ authors: res.data, error: "", loading: false });
        }
        if (res?.type === "error") {
          this.setState({ authors: [], error: res.msg, loading: false });
        }
      }
    );
  };
  componentDidMount = () => {
    this.state.authors === null && this.GetAuthorsList();
  };
  render() {
    if (this.state.loading === true || this.state.authors === null) {
      return (
        <div className="">
          <Loading className="bg-white" />
        </div>
      );
    }
    return (
      <div className="bg-white rounded-md p-3 mb-10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 border text-center">#</th>
              <th className="px-2 py-1 border">Picture</th>
              <th className="px-2 py-1 border">Author name</th>
              <th className="px-2 py-1 border">Phone number</th>
              <th className="px-2 py-1 border">Email</th>
            </tr>
          </thead>
          <tbody>
            {this.state.authors.map((item, i) => (
              <tr
                key={i + 1}
                className="cursor-pointer hover:text-green-600 hover:bg-green-50"
              >
                <td className="border px-2 py-1 text-center w-10">{i + 1}</td>
                <td className="border px-2 py-1 w-16">
                  <div className="h-16 w-16 rounded-md bg-gray-100 overflow-hidden">
                    <Image
                      src={`${API_URL}/${ImageFolder.author}/${item.author_pic}`}
                      alt=""
                      height={100}
                      width={100}
                      className="min-h-full min-w-full h-auto w-auto object-cover"
                    />
                  </div>
                </td>
                <td className="border px-2 py-1">{item.author_name}</td>
                <td className="border px-2 py-1">{item.phone}</td>
                <td className="border px-2 py-1">{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AuthorsList;
