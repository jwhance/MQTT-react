import * as types from './actionTypes';
import * as authorApi from '../../api/authorApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadAuthorsSuccess(authors) {
    return {
        type: types.LOAD_AUTHORS_SUCCESS,
        authors: authors
    };
}

export function deleteAuthorSuccess(author) {
    return {
        type: types.DELETE_AUTHOR_SUCCESS,
        author: author
    };
}

// THUNK!
export function loadAuthors() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return authorApi.getAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            dispatch(apiCallError(error));
            throw error;
        })
    }
}

// This action deletes an author but an author with an existing course should not be deleted.
// Here the courses are checked to see if the author is associated with any of them and if so
// a warning is displayed and the author is not deleted.
export function deleteAuthor(author) {
    //debugger;
    return function (dispatch) {
        console.log('deleteAuthor called: ' + author.name);
        dispatch(beginApiCall());
        return authorApi.deleteAuthor(author.id).then(() => {
            dispatch(deleteAuthorSuccess(author));
        });
    }
}
