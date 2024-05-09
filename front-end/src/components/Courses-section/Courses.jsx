import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";
import CourseCard from "./CourseCard"; // Ensure this path is correct

const Courses = () => {
    // State for managing course data
    const [coursesData, setCoursesData] = useState([]);
    // State for managing the selected filter
    const [filter, setFilter] = useState("All");
    // State for managing any API error
    const [error, setError] = useState(null);

    // Fetch course data from API when the component mounts
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Replace the URL with your actual API endpoint for fetching courses
                const response = await axios.get("http://localhost:8080/courses/allCourses");
                setCoursesData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setError("Error fetching courses. Please try again later.");
            }
        };

        fetchCourses();
    }, []);

    // Function to apply the filter to the courses data
    const filterCourses = () => {
        if (filter === "All") {
            return coursesData;
        } else {
            // Convert both filter and course types to lowercase for case-insensitive filtering
            return coursesData.filter((course) =>
                course.type.toLowerCase().includes(filter.toLowerCase())
            );
        }
    };

    // Get filtered courses
    const filteredCourses = filterCourses();

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12" className="mb-5">
                        <div className="course__top d-flex flex-column justify-content-between align-items-center">
                            <div className="course__top__left w-50">
                                <h1>Find a career that works for you</h1>
                                <p>Discover a career path tailored to your strengths and interests.</p>
                            </div>
                            {/* Navigation bar for filtering courses */}
                            <div>
                                <nav className="filter-nav">
                                    <Button className="mr-2 rounded-0" color={filter === "All" ? "primary" : "secondary"} onClick={() => setFilter("All")}>
                                        All
                                    </Button>
                                    <Button className="mr-2 rounded-0" color={filter === "web development" ? "primary" : "secondary"} onClick={() => setFilter("web development")}>
                                        Web Design
                                    </Button>
                                    <Button className="mr-2 rounded-0" color={filter === "Computer-Science" ? "primary" : "secondary"} onClick={() => setFilter("Computer-Science")}>
                                        Computer Science
                                    </Button>
                                    <Button className="mr-2 rounded-0" color={filter === "UI/UX" ? "primary" : "secondary"} onClick={() => setFilter("UI/UX")}>
                                        UI/UX
                                    </Button>
                                    <Button className="mr-2 rounded-0" color={filter === "Science" ? "primary" : "secondary"} onClick={() => setFilter("Science")}>
                                        Science
                                    </Button>
                                </nav>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {/* Display error message if an error occurred during fetching */}
                    {error ? (
                        <Col lg="12" className="text-center">
                            <p>{error}</p>
                        </Col>
                    ) : (
                        // Display filtered courses
                        filteredCourses.map((course) => (
                            <Col key={course.id} lg="4" md="6" sm="6">
                                <CourseCard item={course} />
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </section>
    );
};

export default Courses;
