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
        <div className="d-flex align-items-center">
          <h6 className="card-title me-2">{bookName}</h6>  {/* Add margin-end for space */}
          <h6 className="rating d-flex align-items-center ms-auto">
              <i className="ri-star-fill me-1"></i> {100}K
          </h6>
        </div>     
          <p className="card-text mb-1">By: {author}</p>
          <hr className="my-1" />         
          <p className="card-text mb-1">{description}</p>
          <a href={pdfDataUrl} download={`${bookName}.pdf`}>
              <button className="btn btn-primary mx-2 mb-2">Download</button>
          </a>
        </div>

      </div>
    </div>
  );
};

export default BookCard;
