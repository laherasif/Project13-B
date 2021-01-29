/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type TodoInput = {
  id: string,
  name: string,
  url: string,
};

export type AddBookMarkMutationVariables = {
  book: TodoInput,
};

export type AddBookMarkMutation = {
  addBookMark:  {
    __typename: "Books",
    id: string,
    name: string,
    url: string,
  } | null,
};

export type UpdateBookMarkMutationVariables = {
  book: TodoInput,
};

export type UpdateBookMarkMutation = {
  updateBookMark:  {
    __typename: "Books",
    id: string,
    name: string,
    url: string,
  } | null,
};

export type DeleteBookMarkMutationVariables = {
  bookId: string,
};

export type DeleteBookMarkMutation = {
  deleteBookMark: string | null,
};

export type GetBooksQuery = {
  getBooks:  Array< {
    __typename: "Books",
    id: string,
    name: string,
    url: string,
  } | null > | null,
};
