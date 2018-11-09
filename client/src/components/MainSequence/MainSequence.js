import React from "react";
import "./MainSequence.css";

const MainSequence = props => (
  <div className="none">
   
    <div className="content">
      <ul>
        <li>
        
        <span onClick={() => props.changeTermCourse(props.index,props.term,props.year, props.id)} className="btns">{props.termActual}, {props.yearActual} [edit]:
    </span>
    
        </li>
        <li>
        <p> - {props.name}: {props.title}</p>
          {/* <p>{props.termActual}, {props.yearActual}: {props.name}: {props.title}</p> */}
        </li>
        
        
      </ul>
    </div>
   
  </div>
);

export default MainSequence;
