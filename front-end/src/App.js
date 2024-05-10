import React from 'react'; 
import Home from './pages/Home';
import Books from './pages/Library';
import Course from  './pages/Course';
import Share from  './pages/SharePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Books />} />
                <Route path="/course/:courseId" element={<Course/>} />
                <Route path="/share/:userName" element={<Share/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

