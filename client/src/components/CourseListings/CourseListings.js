import React from "react";
//import "./CourseListings.css";

const CourseListings = props => (
  <div className="card">
       <div className="content">
      <ul>
        <li>
          <p>{props.name}: {props.title}</p>
        </li>
        <li>
        <span onClick={() => props.changeCourse(props.id)} className="btn btn-primary">
        Select course
        </span>
        </li>
        {/* <li>
          <hr/>
        </li> */}
      </ul>
    </div>
    {/* <span onClick={() => props.changeCourse(props.id)} className="btn btn-primary">
      Select course
    </span> */}
  </div>
);

export default CourseListings;
