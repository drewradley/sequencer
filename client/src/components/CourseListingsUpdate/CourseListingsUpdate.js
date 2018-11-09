import React from "react";
import "./CourseListingsUpdate.css";

const CourseListingsUpdate = props => (
  <div className="card">
   
    <div className="content">
      <ul>
        <li>
          <strong>Course:</strong> <p>{props.name}: {props.title}</p>
        </li>
        {/* <li>
          <strong>Title:</strong> {props.title}
        </li> */}
        {/* <li>
          <strong>Location:</strong> {props.location}
        </li> */}
      </ul>
    </div>
    <span onClick={() => props.changeCourse(props.id)} className="btn btn-primary">
      Select course
    </span>
  </div>
);

export default CourseListingsUpdate;
