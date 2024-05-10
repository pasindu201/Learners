import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from "../components/Header/Header";

function SharePage() {
    const { userName } = useParams();

    // State variables for sharing a course
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [image, setImage] = useState(null);
    const [courseDuration, setCourseDuration] = useState('');
    const [minimumAnnualSalary, setMinimumAnnualSalary] = useState('');
    const [jobsAvailable, setJobsAvailable] = useState('');
    const [yourPreferences, setYourPreferences] = useState('');
    const [videos, setVideos] = useState([]);

    // State variables for sharing a book
    const [author, setAuthor] = useState('');
    const [bookName, setBookName] = useState('');
    const [bookType, setBookType] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const [bookImage, setBookImage] = useState(null);
    const [bookImagePreview, setBookImagePreview] = useState('');
    const [bookFile, setBookFile] = useState(null);

    // State variable for response message
    const [responseMessage, setResponseMessage] = useState('');

    // Functions for sharing a course
    const handleCourseDetailChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const addVideo = () => {
        setVideos([...videos, { course: courseName, lecture: '', video: null }]);
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
        if (file && file.type === 'video/mp4') {
            setVideos((prevVideos) => {
                const updatedVideos = [...prevVideos];
                updatedVideos[index].video = file;
                return updatedVideos;
            });
        }
    };

    const uploadCourse = async () => {
        const courseFormData = new FormData();
        courseFormData.append('courseName', courseName);
        courseFormData.append('description', description);
        courseFormData.append('tutorName', userName);
        courseFormData.append('type', type);
        courseFormData.append('profilePicture', profilePicture);
        courseFormData.append('image', image);
        courseFormData.append('courseDuration', courseDuration);
        courseFormData.append('minimumAnnualSalary', minimumAnnualSalary);
        courseFormData.append('jobsAvailable', jobsAvailable);
        courseFormData.append('yourPreferences', yourPreferences);

        try {
            const courseResponse = await axios.post(
                'http://localhost:8080/courses/saveCourse',
                courseFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (courseResponse.status === 201) {
                for (const video of videos) {
                    const videoFormData = new FormData();
                    videoFormData.append('course', courseName);
                    videoFormData.append('lecture', video.lecture);
                    videoFormData.append('video', video.video);

                    const videoResponse = await axios.post(
                        'http://localhost:8080/courses/saveVideo',
                        videoFormData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }
                    );

                    console.log(videoResponse.data);
                }

                alert('Course details and videos uploaded successfully.');
                console.log('Course details and videos uploaded successfully.');
                // Handle success response
            } else {
                console.error('Failed to upload course details:', courseResponse.statusText);
            }
        } catch (error) {
            console.error('Error uploading details:', error);
            // Handle error response
        }
    };

    // Functions for sharing a book
    const handleBookImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBookImage(file);

            const reader = new FileReader();
            reader.onload = () => {
                setBookImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBookDetailChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('author', author);
        formData.append('bookName', bookName);
        formData.append('type', bookType);
        formData.append('description', bookDescription);
        formData.append('Image', bookImage);
        formData.append('file', bookFile);

        try {
            const response = await axios.post('http://localhost:8080/books/upload-book', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResponseMessage(response.data);
            alert('Book upload success!');
        } catch (error) {
            console.error('Error uploading book:', error);
            setResponseMessage('Failed to upload book');
        }
    };

    return (
        <div>
            <Header/>
            <div className="container my-5">
                <h2 className="text-center mb-4">Use this page to share a your Courses and Books</h2>
                <hr/>
                <div className="row">
                    {/* Left column for sharing a course */}
                    <div className="col-md-6">
                        <div className="border-end pe-4">
                            <h3 className="text-center mb-4">Share a New Course</h3>

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
                                    <option value="Web Design">Web Design</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="UI/UX">UI/UX</option>
                                    <option value="AI">Artificial Intelligence</option>
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
                    </div>

                    {/* Right column for sharing a book */}
                    <div className="col-md-6">
                        <h3 className="text-center mb-4">Share a New Book</h3>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="author">Author:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="author"
                                    placeholder="Enter Name of the Author"
                                    value={author}
                                    onChange={handleBookDetailChange(setAuthor)}
                                    required
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="bookName">Book Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="bookName"
                                    placeholder="Enter Name of the Book"
                                    value={bookName}
                                    onChange={handleBookDetailChange(setBookName)}
                                    required
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="type">Type:</label>
                                <select
                                    id="type"
                                    className="form-control"
                                    value={bookType}
                                    onChange={handleBookDetailChange(setBookType)}
                                    required
                                >
                                    <option value="">Select a type</option>
                                    <option value="Text books">Text books</option>
                                    <option value="Programming">Programming</option>
                                    <option value="Music">Music</option>
                                    <option value="English Literature">English Literature</option>
                                    <option value="History">History</option>
                                    <option value="Biology">Biology</option>
                                    <option value="Graphics Design">Graphics Design</option>
                                    <option value="Engineering">Engineering</option>
                                </select>
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="description">Description:</label>
                                <textarea
                                    className="form-control mb-3"
                                    id="description"
                                    placeholder="Enter Name of the description"
                                    value={bookDescription}
                                    onChange={handleBookDetailChange(setBookDescription)}
                                    required
                                ></textarea>
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="image">Image:</label>
                                <input
                                    type="file"
                                    className="form-control-file mb-3"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleBookImageChange}
                                    required
                                />
                                {bookImagePreview && (
                                    <img src={bookImagePreview} alt="Image Preview" className="img-fluid mt-3" style={{ maxWidth: '200px' }} />
                                )}
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="bookFile">Book File:</label>
                                <input
                                    type="file"
                                    className="form-control-file mb-3"
                                    id="bookFile"
                                    accept="application/pdf"
                                    onChange={(e) => setBookFile(e.target.files[0])}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>

                        {responseMessage && (
                            <p className="mt-3">{responseMessage}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
       
    );
}

export default SharePage;
