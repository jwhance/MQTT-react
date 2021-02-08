import React from "react";
import PropTypes from "prop-types";
//import { Link } from "react-router-dom";


//                    v-Destructuring props argument
const AuthorList = ({ authors, onDeleteClick }) => (
    <table className="table">
        <thead>
            <tr>
                <th>Author</th>
                <th />
            </tr>
        </thead>
        <tbody>
            {authors.map(author => {
                return (
                    <tr key={author.id}>
                        <td>{author.name}</td>
                        <td>
                            <button className='btn btn-outline-danger' onClick={() => onDeleteClick(author)}>
                                Delete
                </button>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
);

AuthorList.propTypes = {
    authors: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default AuthorList;
