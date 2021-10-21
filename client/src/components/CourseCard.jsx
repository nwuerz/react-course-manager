import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/CourseCard.css';
import Context from '../context'

//Navigates to page and updates path based upon click. 
const CourseCard = props => {

    const { value: { user: { authenticated } } } = useContext(Context);
    const { title, href } = props;


    return (
        <NavLink className="cc-loggedOut course--module"  to={`/courses/${href}`}>
            <h2 id="h2LoggedOut" className="course--label">Course</h2>
            <h3 className="course--title">{title}</h3>
        </NavLink>
    )

}

export default CourseCard;