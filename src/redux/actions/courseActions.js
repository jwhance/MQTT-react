import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadCoursesSuccess(courses) {
    return {
        type: types.LOAD_COURSES_SUCCESS,
        courses: courses
    };
}

export function createCourseSuccess(course) {
    return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function deleteCourseOptimistic(course) {
    debugger; // #4
    return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}


// THUNK!
export function loadCourses() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi.getCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            dispatch(apiCallError(error));
            throw error;
        })
    }
}

export function saveCourse(course) {
    //eslint-disable-next-line no-unused-vars
    return function (dispatch, getState) {
        dispatch(beginApiCall());
        return courseApi.saveCourse(course)
            .then(savedCourse => course.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse)))
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    }
}

export function deleteCourse(course) {
    debugger; // #2
    return function (dispatch) {
        debugger; // #3
        // Doing an optimistic delete, so not dispatching begin/end api call
        // actions, or apiCallError actions since we're not showing theloading status for this.
        dispatch(deleteCourseOptimistic(course));
        return courseApi.deleteCourse(course.id);
    };
}
