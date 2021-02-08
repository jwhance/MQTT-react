import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
//import {saveCourse} from "../../api/courseApi";
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

export function ManageCoursePage({ courses, authors, loadAuthors, loadCourses, saveCourse, history, ...props }) {
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert('Loading courses failed ' + error);
            });
        } else {
            setCourse({ ...props.course });
        }

        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert('Loading authors failed ' + error);
            });
        }
    }, [props.course]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === 'authorId' ? parseInt(value, 10) : value
        }));
    };

    function formIsValid() {
        const { title, authorId, category } = course;
        const _errors = {};

        if (!title) _errors.title = 'Title is required.';
        if (!authorId) _errors.author = 'Author is required.';
        if (!category) _errors.category = 'Category is required.';

        setErrors(_errors);

        return Object.keys(_errors).length === 0;
    }

    const handleSave = (event) => {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        saveCourse(course).then(() => {
            toast.success('Course saved')
            history.push('/courses')
        }).catch(error => {
            setSaving(false);
            setErrors({ onSave: error.message });
        });
    };

    return (
        authors.length === 0 || courses.length === 0 ? (
            <Spinner />) : (
                <CourseForm course={course} errors={errors} authors={authors} onChange={handleChange} onSave={handleSave} saving={saving} />)
    );

}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

// Selector function
export function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {      // ownProp allows reading of own properties
    const slug = ownProps.match.params.slug;    // Get value from URL parameter
    const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;
    return {
        course: course,
        courses: state.courses,
        authors: state.authors
    };
}

const mapDispatchToProps = {
    loadCourses: courseActions.loadCourses,
    loadAuthors: authorActions.loadAuthors,
    saveCourse: courseActions.saveCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);   // ()() is just two function calls.  The first () calls the 2nd ()
