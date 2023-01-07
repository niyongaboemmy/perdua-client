import React, { Component } from "react";
import { GetBookInterface } from "../../actions/books.action";
import { BookDetails } from "../BookDetails/BookDetails";

interface BookPreviewProps {
  bookDetails: GetBookInterface;
}

interface BookPreviewState {}

export class BookPreview extends Component<BookPreviewProps, BookPreviewState> {
  render() {
    return (
      <BookDetails
        book_id={this.props.bookDetails.book_id}
        openContactUs={(status: boolean) => {}}
        pushPath={(path: string) => {}}
        type={"preview"}
      />
    );
  }
}

export default BookPreview;
