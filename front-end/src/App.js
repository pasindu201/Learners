import React from 'react'; 
import Home from './pages/Home';
import Books from './pages/Library';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Books />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

