import {React, useState} from "react";
import { Container, Row, Col, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import courseImg1 from "../../assests/images/web-design.png";
import courseImg2 from "../../assests/images/graphics-design.png";
import courseImg3 from "../../assests/images/ui-ux.png";
import "./books.css";
import CourseCard from "./BookCard";

const coursesData = [
  {
    id: "01",
    title: "Web Design BootCamp-2022 for Beginners",
    lesson: 12,
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg1,
  },
  {
    id: "02",
    title: "Professional Graphics Design, PhotoShop, Adobe XD, Figma",
    lesson: 12,
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg2,
  },
  {
    id: "03",
    title: "UI/UX BootCamp for Beginners in 2022",
    lesson: 12,
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg3,
  },
];

const Books = () => {
  // State for managing the selected filter
  const [filter, setFilter] = useState("All");

  // State for managing the open/close state of the dropdown menu
  const [filterOpen, setFilterOpen] = useState(false);

  // Function to apply the filter to the courses data
  const filterCourses = () => {
      if (filter === "All") {
          return coursesData;
      } else {
          return coursesData.filter((course) => course.title.toLowerCase().includes(filter.toLowerCase()));
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
                          <div >
                                <nav className="filter-nav">
                                    <Button color={filter === "All" ? "primary" : "secondary"} onClick={() => setFilter("All")}>
                                        All
                                    </Button>
                                    <Button color={filter === "Web Design" ? "primary" : "secondary"} onClick={() => setFilter("Web Design")}>
                                        Web Design
                                    </Button>
                                    <Button color={filter === "Graphics Design" ? "primary" : "secondary"} onClick={() => setFilter("Graphics Design")}>
                                        Graphics Design
                                    </Button>
                                    <Button color={filter === "UI/UX" ? "primary" : "secondary"} onClick={() => setFilter("UI/UX")}>
                                        UI/UX
                                    </Button>
                                </nav>
                          </div>
                          
                      </div>
                  </Col>
                  {filteredCourses.map((course) => (
                      <Col key={course.id} lg="4" md="6" sm="6">
                          <CourseCard item={course} />
                      </Col>
                  ))}
              </Row>
          </Container>
      </section>
  );
};

export default Books;