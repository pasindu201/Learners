import React from "react";
import Books from "../components/Book-section/Books";
import Header from "../components/Header/Header";
import SliderBar from "../components/booksection-slider/Wellcome";
import Footer from "../components/Footer/Footer";

function Library() {
  return (
    <div>
      <Header/>
      <SliderBar/>
      <Books/>
      <Footer/>
    </div>
  )
}

export default Library
