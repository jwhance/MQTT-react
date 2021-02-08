import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/authors/";

export function getAuthors() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function deleteAuthor(authorId) {
  //debugger;  // #6
  return fetch(baseUrl + authorId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}

