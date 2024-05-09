import React from "react";

const CourseCard = (props) => {
  const { image, courseName, profilePicture, tutorName, courseDuration, yourPreferences, minimumAnnualSalary, jobsAvailable,id} = props.item;

  return (
    <div className="single__course__item shadow">
      <div className="course__img">
        <img src={`data:image/jpeg;base64,${image}`} alt="" className="w-100" />
      </div>

      <div className="course__details">
        <h6 className="course__title mb-2">{courseName}</h6>

        <div className="d-flex align-items-center">
          <img 
              src={`data:image/jpeg;base64,${profilePicture}`} 
              alt="Profile" 
              className="rounded-circle img-thumbnail" 
              style={{ width: '50px', height: '50px' }}
          />
           <span className="ms-2">{tutorName}</span>
           <p className="rating d-flex align-items-center gap-1 ms-auto">
             <i className="ri-star-fill"></i> {100}K
           </p>
        </div>

        <div >
          <p class="mb-0">Duration: <strong>{courseDuration}</strong></p>
          <p class="mb-0">Great if you like: <strong>{yourPreferences}</strong></p>
          <hr/>
          <p class="mb-0"><strong>{minimumAnnualSalary}</strong> Minimum Salary, <strong>{jobsAvailable}</strong> Jobs Available</p>
        </div>

        <div className=" d-flex justify-content-between align-items-center">
          <p className="enroll d-flex align-items-center gap-1">
            <a href={`course/${id}`}> Start Now</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
