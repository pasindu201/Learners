import React, { useState, useEffect } from 'react';
import Video from '../components/video/Video';
import { useParams } from 'react-router-dom';
import Header from "../components/Header/Header";
import axios from 'axios';

const Course = () => {
  const { courseId } = useParams();
  const [videoList, setVideoList] = useState([]);
  const [courseDetails, setCourseDetails] = useState({
    description: '',
    tutorName: '',
    profilePicture: '',
    courseDuration: '',
    minimumAnnualSalary: '',
    yourPreferences: '',
    image: '',
    courseName: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/courses/getContent/${courseId}`);
        const { videoList, description, tutorName, profilePicture, courseDuration, minimumAnnualSalary, yourPreferences, image, courseName } = response.data;

        setVideoList(videoList);
        setCourseDetails({
          description,
          tutorName,
          profilePicture,
          courseDuration,
          minimumAnnualSalary,
          yourPreferences,
          image,
          courseName,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load course data');
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row mb-4 align-items-stretch">
          {/* Tutor Profile and Course Details */}
          <div className="col-md-8 d-flex flex-column">
            <div className="card shadow-sm p-3 mb-4">
              <div className="d-flex align-items-center mb-4">
                <img
                  src={`data:image/jpeg;base64,${courseDetails.profilePicture}`}
                  alt="Profile"
                  className="rounded-circle me-3"
                  style={{ width: '100px', height: '100px' }}
                />
                <div>
                  <h3>{courseDetails.tutorName}</h3>
                  <p className="text-muted mb-0">{courseDetails.courseName}</p>
                </div>
              </div>
              <div className="card-body">
                <h5 className="mb-3">Course Details</h5>
                <p>{courseDetails.description}</p>
                <p><strong>Duration:</strong> {courseDetails.courseDuration}</p>
                <p><strong>Minimum Annual Salary:</strong> {courseDetails.minimumAnnualSalary}</p>
                <p><strong>Your Preferences:</strong> {courseDetails.yourPreferences}</p>
              </div>
            </div>
          </div>

          {/* Course Image */}
          <div className="col-md-4">
            <div className="d-flex flex-column h-100">
              <img
                src={`data:image/jpeg;base64,${courseDetails.image}`}
                alt="Course Image"
                className="img-fluid rounded shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Video Tutorials Section */}
        <div className="card shadow-sm p-3">
          <h5>Video Tutorials</h5>
          <hr />
          <div>
            {videoList.map((video, index) => (
              <div key={index} className="mb-3">
                <Video video={video} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
