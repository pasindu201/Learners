import React from "react";

const BookCard = (props) => {
  const { image, bookName, description, author, book } = props.item;

  // Create a data URL for the PDF file
  const pdfDataUrl = `data:application/pdf;base64,${book}`;

  return (
    <div className="col-lg-2 col-md-3 my-3 text-center shadow">
      <div className="card shadow" style={{ width: "14rem" }}>
        <img
          src={`data:image/jpeg;base64,${image}`}
          className="card-img-top"
          alt="..."
          style={{ height: "300px" }}
          />                     
        <div className="card-body">
          <h6 className="card-title">{bookName}</h6>
          <p className="card-text">By : {author}</p>
          <hr/>         
          <p className="card-text">{description}</p>
          <a href={pdfDataUrl} download={`${bookName}.pdf`}>
            <button className="btn btn-primary mx-3 mb-3">Download</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
