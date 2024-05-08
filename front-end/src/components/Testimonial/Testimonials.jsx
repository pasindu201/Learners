import React from "react";
import "./testimonial.css";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";

import img from "../../assests/images/testimonial01.jpg";

const Testimonials = () => {
  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="10" md="12" className="m-auto">
            <div className="testimonial__wrapper d-flex justify-content-between align-items-center ">
              <div className="testimonial__img w-50">
                <img src={img} alt="" className="image" />
              </div>

              <div className="testimonial__content w-50">
                <h2 className="mb-4">Our Students Voice</h2>

                <Slider {...settings}>
                  <div>
                    <div className="single__testimonial">
                      <h6 className="mb-3 fw-bold">
                      Boosted My Career!
                      </h6>
                      <p>
                      The certifications I earned through Learners have opened up so many 
                      doors in my career. Employers recognize the quality and value of these courses,
                      and I couldn't be happier with my decision to learn here!"
                      </p>

                      <div className="student__info mt-4">
                        <h6 className="fw-bold">Thushara Sampath</h6>
                        <p>Colombo 07, Sri lanka</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="single__testimonial">
                      <h6 className="mb-3 fw-bold">
                        Excellent course of materials
                      </h6>
                      <p>
                      Excellent course of materials! The content was comprehensive, 
                      up-to-date, and presented in an engaging way. I appreciated the 
                      clear explanations and practical examples that helped me grasp complex concepts easily.
                      </p>

                      <div className="student__info mt-4">
                        <h6 className="fw-bold">Savindu Rathnayaka</h6>
                        <p>Nuwara Eliya, Sri lanka</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="single__testimonial">
                      <h6 className="mb-3 fw-bold">
                      Transformative Experience
                      </h6>
                      <p>
                      Thanks to Leaners, I was able to quickly master new skills 
                      and transition to a new career path. The interactive lessons and expert 
                      instructors made learning both engaging and rewarding.
                      </p>

                      <div className="student__info mt-4">
                        <h6 className="fw-bold">Pasindu Sandeep</h6>
                        <p>Kandy, Sri Lanka</p>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;
