import React, { Component } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { GetBookDetailsInterface } from "../../actions/books.action";

interface BookReviewProps {
  book_details: GetBookDetailsInterface;
  onClose: () => void;
}
interface BookReviewState {
  loading: boolean;
  ranking: 1 | 2 | 3 | 4 | 5;
  comment: string;
}

export class BookReview extends Component<BookReviewProps, BookReviewState> {
  constructor(props: BookReviewProps) {
    super(props);

    this.state = {
      loading: false,
      ranking: 3,
      comment: "",
    };
  }
  render() {
    return (
      <div>
        <div className="flex flex-row items-center gap-3 mb-3">
          <div>
            <div
              onClick={this.props.onClose}
              className="flex items-center justify-center h-10 w-10 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-full"
            >
              <BsArrowLeft className="text-2xl" />
            </div>
          </div>
          <div>
            <div className="font-bold text-xl">Submit Book Review</div>
            <div className="text-sm text-gray-500">
              Fill the following inputs to submit your review for this book
            </div>
          </div>
        </div>
        <div>
          {/* Form here */}
          <form>
            <div className="flex flex-col">
              <div>Product rating</div>
              <div className="h-10 w-full bg-gray-100 rounded"></div>
            </div>
            <div className="flex flex-col mt-4">
              <div>Comment</div>
              <div className="h-10 w-full bg-gray-100 rounded"></div>
            </div>
            <div className="px-3 py-2 rounded-md bg-green-600 hover:bg-green-700 w-max mt-3 text-white cursor-pointer">
              Submit Review
            </div>
          </form>
        </div>
      </div>
    );
  }
}
