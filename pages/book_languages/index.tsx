import React, { Component } from "react";
import { MdLanguage } from "react-icons/md";
import { connect } from "react-redux";
import { Auth, BookLanguage, SystemBasicInfoData } from "../../actions";
import { ProtectedPage } from "../../components/ProtectedPage/ProtectedPage";
import { StoreState } from "../../reducers";
import { search } from "../../utils/functions";

interface BookLanguagesProps {
  auth: Auth;
  systemBasicInfo: SystemBasicInfoData;
}
interface BookLanguagesState {
  search_data: string;
}

class _BookLanguages extends Component<BookLanguagesProps, BookLanguagesState> {
  constructor(props: BookLanguagesProps) {
    super(props);

    this.state = {
      search_data: "",
    };
  }
  render() {
    return (
      <ProtectedPage>
        <div className="bg-white rounded-md p-2 md:p-4">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-row items-center gap-3">
              <div>
                <MdLanguage className="text-5xl text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">Books languages</div>
                <div className="text-sm">
                  List of books valid languages that can be assigned to a book
                </div>
              </div>
            </div>
          </div>
          {/* Contents here */}
          <div>
            <div className="w-full overflow-x-auto mt-5">
              <div className="mb-4">
                <input
                  type="text"
                  className="px-3 py-2 rounded-md bg-gray-100 w-full border border-gray-100"
                  placeholder="Search book by name..."
                  value={this.state.search_data}
                  onChange={(e) =>
                    this.setState({ search_data: e.target.value })
                  }
                />
              </div>
              <table className="text-sm text-left min-w-full">
                <thead>
                  <tr>
                    <th className="border px-3 py-2">#</th>
                    <th className="border px-3 py-2">Language code</th>
                    <th className="border px-3 py-2 truncate">Language name</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.systemBasicInfo.basic_info === null ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-center p-6 text-xl font-light"
                      >
                        Loading, Please wait...
                      </td>
                    </tr>
                  ) : (
                      search(
                        this.props.systemBasicInfo.basic_info.languages,
                        this.state.search_data
                      ) as BookLanguage[]
                    ).length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-center p-6 text-xl font-light"
                      >
                        No result found!
                      </td>
                    </tr>
                  ) : (
                    (
                      search(
                        this.props.systemBasicInfo.basic_info.languages,
                        this.state.search_data
                      ) as BookLanguage[]
                    ).map((item, i) => (
                      <tr
                        key={i + 1}
                        className="cursor-pointer hover:bg-gray-50 hover:text-green-700"
                      >
                        <td className="px-3 py-2 border">{i + 1}</td>
                        <td className="px-3 py-2 border">
                          {item.language_code}
                        </td>
                        <td className="px-3 py-2 border">
                          {item.language_name}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ProtectedPage>
    );
  }
}

const mapStateToProps = ({
  auth,
  systemBasicInfo,
}: StoreState): { auth: Auth; systemBasicInfo: SystemBasicInfoData } => {
  return { auth, systemBasicInfo };
};

const BookLanguages = connect(mapStateToProps, {})(_BookLanguages);

export default BookLanguages;
