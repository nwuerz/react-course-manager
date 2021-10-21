import React, { useContext, useEffect } from 'react';
import { NavLink, useLocation, useHistory} from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import api from '../utils/api';
import Context from '../context';
import '../styles/CourseDetail.css';

const CourseDetail = () => {
    const { value } = useContext(Context);
    const history = useHistory();
    //extracts course id from url
    const index = useLocation().pathname.substring(9);

    useEffect(() => {
        const getCourse = async () => {
                try {
                    let response = await api.getCourse(`courses/${index}`)
                    const { data: { id, title, description, estimatedTime, materialsNeeded, User } } = response;
                    let course = {
                        courseId: id,
                        title: title,
                        description: description,
                        estimatedTime: estimatedTime,
                        materialsNeeded: materialsNeeded,
                        userId: User.id,
                        author: `${User.firstName} ${User.lastName}`
                    }
                    value.actions.setCourseValues(course);
                 }  catch (error) {
                    // redirect to notfound if the course doesn't exist, redirect to /error if there is a server error
                    error.response.status === 400 ? history.push('/notfound') : history.push('/error');
                }
        }
        value.actions.asyncHandler(getCourse);
        // eslint-disable-next-line
    }, [])

    //TOP UPDATE
    return (
        <>
            <div className="cd-loggedOut actions--bar">
                <div className="wrap">
                    {value.courseValues.userId === value.user.id ?
                        <>
                            <NavLink className="cd-update-button" to={`/courses/${index}/update`}>Update Course</NavLink>
                            <NavLink className="cd-delete-button" to={`/courses/${index}/delete`}>Delete Course</NavLink>
                        </>
                        :
                        null}
                    <NavLink className="cd-button" to="/">Return to List</NavLink>
                </div>
            </div>
            <div className="wrap">
                <h2 className="heading">Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{value.courseValues.title}</h4>
                            <p>By <em>{value.courseValues.author}</em></p>
                            <ReactMarkdown children={value.courseValues.description} />
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            {value.courseValues.estimatedTime ? <p>{value.courseValues.estimatedTime}</p> : <p>N/A</p>}

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {value.courseValues.materialsNeeded ? <ReactMarkdown children={value.courseValues.materialsNeeded} /> : <p>N/A</p>}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CourseDetail;