import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ShareBook() {
    const { userName } = useParams();
    const [author, setAuthor] = useState('');
    const [bookName, setBookName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [bookFile, setBookFile] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);

            // Create a FileReader to read the file
            const reader = new FileReader();
            reader.onload = () => {
                // Set the image preview when the file is read
                setImagePreview(reader.result);
            };
            // Read the file as a data URL
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('author', author);
        formData.append('bookName', bookName);
        formData.append('type', type);
        formData.append('description', description);
        formData.append('Image', image);
        formData.append('file', bookFile);

        try {
            const response = await axios.post('http://localhost:8080/books/upload-book', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResponseMessage(response.data);
            alert("book upload success.!")
        } catch (error) {
            console.error('Error uploading book:', error);
            setResponseMessage('Failed to upload book');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Share a Book</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bookName">Book Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="bookName"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <select
                        id="type"
                        className="form-control"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
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
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        className="form-control mb-3"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        className="form-control-file mb-3"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                    {/* Image preview */}
                    {imagePreview && <img src={imagePreview} alt="Image Preview" className="img-fluid mt-3" style={{ maxWidth: '200px' }} />}
                </div>
                <div className="form-group">
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
            {responseMessage && <p className="mt-3">{responseMessage}</p>}
        </div>
    );
}

export default ShareBook;
