import React, {Component} from "react";
import CourseListings from "./components/CourseListings";
import MainSequence from "./components/MainSequence";
import Wrapper from "./components/Wrapper";
import courses from "./txt/courses.json";

var curTermCoursesLeft=[];
var curTermCoursesRight=[];

// var coursesInSequence=[];
// var currentCourse=courses[0];
var ct=0; //current term (index of terms)
var cci=0; //current course (index of courses)
var cy=0; //current year (index of years)
var pt=0; //past term (index of terms)
var py=0; //past year (index of years)
var editIndex=0; //index of seqs
var editingSequence=false;
// var editingSequenceIndex=0;

var years =[];
var unitsLeft=14;

var terms = ["Fall 1","Fall 2","Spring 1","Spring 2","Summer 1","Summer 2"];
var seqs=[];
// var courseString="";
var finalTerm =0;
var finalYear=0;
// var updatingSequence = false;

StartMeUp();
function StartMeUp()
{
    ct=0;
    if(ct>=2)cy=1;
    var d = new Date();
    var n = d.getFullYear();
    var m = d.getMonth();
    if (m<5)n--;
    for(var i=n;i<n+100;i++)
    {
        years.push(i);
        
    }
    // console.log(years);
    for(let i=0;i<courses.length;i++)
    {
        if(courses[i].term===ct||courses[i].term===-1)
        {
            if(!courses[i].inSequence)
            {
                if(courses[i].column===0)curTermCoursesLeft.push(courses[i])
                else curTermCoursesRight.push(courses[i]);
            }
            
        }
    }
    // console.log(curTermCoursesLeft);
    // console.log(curTermCoursesRight);

    FinalTerm();
}

function FinalTerm()
{
 for (let i =0; i<unitsLeft-1;i++)
 {
     finalTerm++;
     if(finalTerm>5)
     {
         finalTerm=0;
     }
 }
 finalYear=years[cy+Math.ceil(unitsLeft/6)];
 if(finalTerm<2)finalYear--;
 //console.log(terms[finalTerm]+" "+finalYear)
}

function SequenceThis (term, year, course)
{
    this.term=term;
    this.year=year;
    this.course=course;
}
class App extends Component {
    
    state = {
      curID:0,
      currentCourse: 0,
      curTerm: 0,
      curYear:0,
      response: ""
    };

    startApp = ()=>{
        // ct=0;
        if(ct===2)cy=1;
        this.setState({curYear:cy});
        this.setState({curTerm:ct});
    }
    changeTermCourse=(key,term,year, id)=> {
        console.log(key,term,year, id);
        editingSequence=true;
        editIndex=key;
        pt=ct;
        py=cy;
        ct=term;
        cy=year;
        if(id!==0)unitsLeft++;
        courses[id].inSequence=false;
        seqs[key].course=courses[0];
        this.setState({currentCourse: 0});
        cci=0;
        this.setState({curTerm: term});
        this.setState({curYear: year});
        this.setTerms();
        this.checkSeries();
    }
    changeCourse = id => {
        // console.log(courses[id]);
        this.setState({currentCourse:id})
        cci=id;
        };
    setTerms = ()=>{
        curTermCoursesLeft=[];
        curTermCoursesRight=[];
        for(let i=0;i<courses.length;i++)
        {
            if(courses[i].term===ct||courses[i].term===-1)
            {
                if(!courses[i].inSequence)
                {
                    if(courses[i].column===0)curTermCoursesLeft.push(courses[i])
                    else curTermCoursesRight.push(courses[i]);
                }
            }
        }
    };
    checkSeries = () => {
        for(let i=0;i<seqs.length;i++)
        {
            // console.log(seqs[i].course.series);
            if(seqs[i].course.series>0)
            {
                for(let v=0;v<curTermCoursesLeft.length;v++)
                {
                    if (seqs[i].course.series===curTermCoursesLeft[v].series)
                    {
                        alert("It is recommended that you take "+curTermCoursesLeft[v].name+": "+curTermCoursesLeft[v].title)
                    }
                }
                for(let v=0;v<curTermCoursesRight.length;v++)
                {
                    if (seqs[i].course.series===curTermCoursesRight[v].series)
                    {
                        alert("It is recommended that you take "+curTermCoursesRight[v].name+": "+curTermCoursesRight[v].title)
                    }
                }
            }
        }
    }
    advanceSequence = curTerm => {
       
        finalTerm++;
        if(finalTerm>5)
        {
            finalTerm=0;
        }
        if(finalTerm===2)finalYear++;
        if(ct<5){
            ct++;
            this.setState({curTerm:ct})

        }
        else {
            this.setState({curTerm:0})
            ct=0;
        }
        // console.log(terms[this.state.curTerm]);
        if(ct===2)
        {
            cy++;
            this.setState({curYear:cy})
            
        }
        //resest and refill curTermCoursesX/////////////
        this.setTerms();
        //check for courses that should be taken together////
        this.checkSeries();
        // console.log(curTermCoursesLeft);
        // console.log(curTermCoursesRight);
        this.setState({currentCourse:0})
        cci=0;
        // console.log(this.state.curTerm);
      };
    addToSequence = curTerm => {
        if(unitsLeft===0)return;
        var seq = new SequenceThis(this.state.curTerm,this.state.curYear,courses[this.state.currentCourse])
        seqs.push(seq);
        if(cci!==0)
        {
            unitsLeft--;
            courses[cci].inSequence=true;
            
        }
        else{
            finalTerm++;
            if(finalTerm>5)
            {
                finalTerm=0;
            }
            if(finalTerm===2)finalYear++;
        }
        if(ct<5){
            ct++;
            this.setState({curTerm:ct})

        }
        else {
            this.setState({curTerm:0})
            ct=0;
        }
        // console.log(terms[this.state.curTerm]);
        if(ct===2)
        {
            cy++;
            this.setState({curYear:cy})
            
        }
        //resest and refill curTermCoursesX/////////////
        this.setTerms();
        //check for courses that should be taken together////
        this.checkSeries();
        // console.log(curTermCoursesLeft);
        // console.log(curTermCoursesRight);
        this.setState({currentCourse:0})
        cci=0;
        // console.log(this.state.curTerm);
      };
    editSequence = curTerm => {
        if(unitsLeft===0)return;
        var seq = new SequenceThis(this.state.curTerm,this.state.curYear,courses[this.state.currentCourse])
         console.log(terms[pt]+" "+years[py]);
      
        seqs[editIndex]=seq;
        editIndex=0;
        ct=pt;
        cy=py;
        this.setState({curTerm:ct});
        this.setState({curYear:cy});
        editingSequence=false;
       
        if(cci!==0)
        {
            unitsLeft--;
            courses[cci].inSequence=true;
            
        }
        else{
            finalTerm++;
            if(finalTerm>5)
            {
                finalTerm=0;
            }
            if(finalTerm===2)finalYear++;
        }
       
        //resest and refill curTermCoursesX/////////////
        this.setTerms();
        //check for courses that should be taken together////
        this.checkSeries();
        // console.log(curTermCoursesLeft);
        // console.log(curTermCoursesRight);
        this.setState({currentCourse:0})
        cci=0;
        // console.log(this.state.curTerm);
      };
    render(){
        return (
           
            <div className="container"> 
              <div className="row mainRow">
                 <div className="col-sm-4 leftColumn">
                    <h1>Sequence</h1>
                    {unitsLeft>0 ?(<h2>{terms[this.state.curTerm]}, {years[this.state.curYear]}</h2>):<h2>Finished</h2>}
                    {seqs.length===0 ?(<span onClick={() => this.advanceSequence(this.state.curTerm)} className="remove btn btn-primary">Change Start Term</span>):("")}

                    {unitsLeft>0 ?(<p>{courses[this.state.currentCourse].name+": "+courses[this.state.currentCourse].title}</p>):("")}
                    {!editingSequence ?  (<span onClick={() => this.addToSequence(this.state.curTerm)} className="remove btn btn-primary">Add to sequence</span>)
                                        :(<span onClick={() => this.editSequence(this.state.curTerm)} className="remove btn btn-warning">Edit sequence</span>)}
                    {/* <span onClick={() => this.addToSequence(this.state.curTerm)} className="remove btn btn-primary">Add to sequence</span> */}
                    <h5>Terms left until graduation: {unitsLeft}</h5>
                    <h5>Estimated final term: {terms[finalTerm]}, {finalYear}</h5>
                    <hr/>
                    {seqs.map(seq => (
                    <MainSequence
                        changeTermCourse={this.changeTermCourse}
                        id={seq.course.id}
                        key={seqs.indexOf(seq)}
                        index={seqs.indexOf(seq)}
                        term={seq.term}
                        termActual={terms[seq.term]}
                        year={seq.year}
                        yearActual={years[seq.year]}
                        name={seq.course.name}
                        title={seq.course.title}
                    />))}
                 </div>{/* end sequence column */}


                 <div className="col-sm-8 rightColumn">
                    <h1>{terms[this.state.curTerm]} Courses</h1>
                        <div className="row courseListing">
                            <div className="col-sm-6 coreColumn">
                                <h3>Core and Breadth Courses</h3>
                                <Wrapper>
                                {curTermCoursesLeft.map(course => (
                                <CourseListings
                                    changeCourse={this.changeCourse}
                                    id={course.id}
                                    key={course.id}
                                    name={course.name}
                                    title={course.title}
                                />
                                ))}
                                </Wrapper>
                            </div>{/* end Core and Breadth Courses column */}
                            <div className="col-sm-6 progColumn">
                                <h3>Programatic Courses</h3>
                                <Wrapper>
                                {curTermCoursesRight.map(course => (
                                <CourseListings
                                    changeCourse={this.changeCourse}
                                    id={course.id}
                                    key={course.id}
                                    name={course.name}
                                    title={course.title}
                                />
                                ))}
                                </Wrapper>
                            </div>{/* end Programatic Courses column */}
                        </div>{/* end courseListing row */}
                    </div>{/* end rightColumn */}
                </div>{/* end mainRow */}
             </div>//{ end container}
        );//end return
    };//end render
}

export default App;
