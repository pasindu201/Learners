import {React, useState, useEffect} from "react";
import { Container, Row, Col, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import "./books.css";
import CourseCard from "./BookCard";

const Books = () => {
    const [booksData, setData] = useState([]);  

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch("http://localhost:8080/books/all-books"); // Assuming the base URL is the same as the API base URL
                const data = await response.json();
                setData(data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchItems();
    }, []);

    // State for managing the selected filter
    const [filter, setFilter] = useState("All");

    // State for managing the open/close state of the dropdown menu
    const [filterOpen, setFilterOpen] = useState(false);

    // Function to apply the filter to the courses data
    const filterCourses = () => {
        if (filter === "All") {
            return booksData;
        } else {
            return booksData.filter((course) => course.type.toLowerCase().includes(filter.toLowerCase()));
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
                                <h1>Find a the book need for you</h1>
                            </div>
                            {/* Navigation bar for filtering courses */}
                            <div >
                                <nav className="filter-nav">
                                    <Button className="mr-2 rounded-0" color={filter === "All" ? "primary" : "secondary"} onClick={() => setFilter("All")}>
                                        All
                                    </Button>
                                    <Button className="mr-2 rounded-0" color={filter === "Mathematics" ? "primary" : "secondary"} onClick={() => setFilter("Mathematics")}>
                                        Mathematics
                                    </Button>
                                    <Button className="mr-2 rounded-0" color={filter === "Engineering" ? "primary" : "secondary"} onClick={() => setFilter("Engineering")}>
                                        Engineering
                                    </Button>
                                    <Button className="mr-2 rounded-0" color={filter === "Graphics Design" ? "primary" : "secondary"} onClick={() => setFilter("Graphics Design")}>
                                        Graphics Design
                                    </Button>
                                    <Button className="mr-2 rounded-0" color={filter === "Bialogy" ? "primary" : "secondary"} onClick={() => setFilter("Bialogy")}>
                                        Bialogy
                                    </Button>
                                    <Button className="mr-2 rounded-0" color={filter === "Histoty" ? "primary" : "secondary"} onClick={() => setFilter("Histoty")}>
                                        Histoty
                                    </Button>
                                    <Button className="mr-2 rounded-0" color={filter === "English Literature" ? "primary" : "secondary"} onClick={() => setFilter("English Literature")}>
                                        English Literature
                                    </Button>
                                    <Button className="mr-2 rounded-0" color={filter === "Music" ? "primary" : "secondary"} onClick={() => setFilter("Music")}>
                                        Music
                                    </Button>
                                    <Button className="mr-2 rounded-0" color={filter === "Programming" ? "primary" : "secondary"} onClick={() => setFilter("Programming")}>
                                        Programming
                                    </Button>
                                    <Button className="mr-2 rounded-0" color={filter === "Text books" ? "primary" : "secondary"} onClick={() => setFilter("Text books")}>
                                        Text books
                                    </Button>
                                   
                                </nav>
                            </div>
                            
                        </div>
                    </Col>
                    {filteredCourses.map((course) => (
                        <Col key={course.id} lg="3" md="3" sm="4" >
                            <CourseCard item={course} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default Books;