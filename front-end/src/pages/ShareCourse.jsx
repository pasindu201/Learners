import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShareCourse = () => {
    const { userName } = useParams();
    const [courseName, setCourseName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [image, setImage] = useState(null);
    const [courseDuration, setCourseDuration] = useState("");
    const [minimumAnnualSalary, setMinimumAnnualSalary] = useState("");
    const [jobsAvailable, setJobsAvailable] = useState("");
    const [yourPreferences, setYourPreferences] = useState("");
    const [videos, setVideos] = useState([]);

    const addVideo = () => {
        setVideos([...videos, { course: courseName, lecture: "", video: null }]);
    };

    const handleCourseDetailChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const handleVideoChange = (index, event) => {
        const { name, value } = event.target;
        setVideos((prevVideos) => {
            const updatedVideos = [...prevVideos];
            updatedVideos[index][name] = value;
            return updatedVideos;
        });
    };

    const handleVideoFileChange = (index, event) => {
        const file = event.target.files[0];
        if (file && file.type === "video/mp4") {
            setVideos((prevVideos) => {
                const updatedVideos = [...prevVideos];
                updatedVideos[index].video = file;
                return updatedVideos;
            });
        }
    };

    const uploadCourse = async () => {
        const courseFormData = new FormData();
        courseFormData.append("courseName", courseName);
        courseFormData.append("description", description);
        courseFormData.append("tutorName", userName);
        courseFormData.append("type", type);
        courseFormData.append("profilePicture", profilePicture);
        courseFormData.append("image", image);
        courseFormData.append("courseDuration", courseDuration);
        courseFormData.append("minimumAnnualSalary", minimumAnnualSalary);
        courseFormData.append("jobsAvailable", jobsAvailable);
        courseFormData.append("yourPreferences", yourPreferences);

        try {
            // Upload the course details
            const courseResponse = await axios.post(
                "http://localhost:8080/courses/saveCourse",
                courseFormData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (courseResponse.status === 201) {
                // Upload videos if course details upload is successful
                for (const video of videos) {
                    const videoFormData = new FormData();
                    videoFormData.append("course", courseName);
                    videoFormData.append("lecture", video.lecture);
                    videoFormData.append("video", video.video);

                    // Upload each video
                    const videoResponse = await axios.post(
                        "http://localhost:8080/courses/saveVideo",
                        videoFormData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );

                    console.log(videoResponse.data);
                }
                alert("Course details and videos uploaded successfully.")
                console.log("Course details and videos uploaded successfully.");
                // Handle success response (e.g., notify user or clear form)
            } else {
                console.error("Failed to upload course details:", courseResponse.statusText);
            }
        } catch (error) {
            console.error("Error uploading details:", error);
            // Handle error response (e.g., notify user)
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Share a New Course</h2>
            
            <div className="form-group mb-3">
                <label htmlFor="courseName">Course Name</label>
                <input
                    type="text"
                    id="courseName"
                    className="form-control"
                    placeholder="Enter Name of the Course"
                    value={courseName}
                    onChange={handleCourseDetailChange(setCourseName)}
                />
            </div>
            
            <div className="form-group mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    className="form-control"
                    placeholder="Enter Course Description"
                    value={description}
                    onChange={handleCourseDetailChange(setDescription)}
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="type">Type</label>
                <select
                    id="type"
                    className="form-control"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="">Select Course Type</option>
                    <option value="Science">Science</option>
                    <option value="web development">Web Design</option>
                    <option value="Computer-Science">Computer Science</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="AI">Artifitial Inteligence</option>
                    {/* Add more options as needed */}
                </select>
            </div>

            <div className="form-group mb-3">
                <label htmlFor="profilePicture">Profile Picture</label>
                <input
                    type="file"
                    id="profilePicture"
                    className="form-control-file"
                    accept="image/*"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="image">Course Image</label>
                <input
                    type="file"
                    id="image"
                    className="form-control-file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="courseDuration">Course Duration</label>
                <input
                    type="text"
                    id="courseDuration"
                    className="form-control"
                    placeholder="Enter Course Duration"
                    value={courseDuration}
                    onChange={handleCourseDetailChange(setCourseDuration)}
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="minimumAnnualSalary">Minimum Annual Salary</label>
                <input
                    type="text"
                    id="minimumAnnualSalary"
                    className="form-control"
                    placeholder="Enter Minimum Annual Salary"
                    value={minimumAnnualSalary}
                    onChange={handleCourseDetailChange(setMinimumAnnualSalary)}
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="maximumAnnualSalary">Jobs Availability</label>
                <input
                    type="text"
                    id="maximumAnnualSalary"
                    className="form-control"
                    placeholder="Enter Jobs Availability"
                    value={jobsAvailable}
                    onChange={handleCourseDetailChange(setJobsAvailable)}
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="yourPreferences">Your Preferences</label>
                <input
                    type="text"
                    id="yourPreferences"
                    className="form-control"
                    placeholder="Enter Your Preferences"
                    value={yourPreferences}
                    onChange={handleCourseDetailChange(setYourPreferences)}
                />
            </div>

            <div className="mb-4">
                <button onClick={addVideo} className="btn btn-primary">Add New Video</button>
            </div>

            {videos.map((video, index) => (
                <div key={index} className="mb-3">
                    <div className="form-group mb-3">
                        <label htmlFor={`videoLecture${index}`}>Lecture {index + 1}</label>
                        <input
                            type="text"
                            id={`videoLecture${index}`}
                            className="form-control"
                            placeholder="Lecture Name"
                            name="lecture"
                            value={video.lecture}
                            onChange={(e) => handleVideoChange(index, e)}
                        />
                    </div>
                    
                    <div className="form-group mb-3">
                        <label htmlFor={`videoFile${index}`}>Video File</label>
                        <input
                            type="file"
                            id={`videoFile${index}`}
                            className="form-control-file"
                            accept="video/mp4"
                            onChange={(e) => handleVideoFileChange(index, e)}
                        />
                    </div>
                </div>
            ))}

            <div className="mb-4">
                <button onClick={uploadCourse} className="btn btn-success">Upload Course</button>
            </div>
        </div>
    );
};

export default ShareCourse;
