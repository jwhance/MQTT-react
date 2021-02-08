import * as types from '../actions/actionTypes';
import initialState from './initialState';

const authorReducer = (state = initialState.authors, action) => {
    switch (action.type) {
        case types.LOAD_AUTHORS_SUCCESS:
            return action.authors;

        case types.DELETE_AUTHOR_SUCCESS:
            //debugger;
            //console.log(state);
            //console.log(action);
            return state.filter(author => author.id !== action.author.id);  // Return all authors except the one deleted

        default:
            return state;
    }
}

export default authorReducer;