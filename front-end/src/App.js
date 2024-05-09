import React from 'react'; 
import Home from './pages/Home';
import Books from './pages/Library';
import Course from  './pages/Course';
import ShareCourse from  './pages/ShareCourse';
import ShareBook from './pages/ShareBook';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Books />} />
                <Route path="/course/:courseId" element={<Course/>} />
                <Route path="/shareCourse/:userName" element={<ShareCourse/>} />
                <Route path="/shareBook/:userName" element={<ShareBook/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

