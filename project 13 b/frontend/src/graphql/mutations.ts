/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addBookMark = /* GraphQL */ `
  mutation AddBookMark($book: TodoInput!) {
    addBookMark(book: $book) {
      id
      name
      url
    }
  }
`;
export const updateBookMark = /* GraphQL */ `
  mutation UpdateBookMark($book: TodoInput!) {
    updateBookMark(book: $book) {
      id
      name
      url
    }
  }
`;
export const deleteBookMark = /* GraphQL */ `
  mutation DeleteBookMark($bookId: String!) {
    deleteBookMark(bookId: $bookId)
  }
`;
