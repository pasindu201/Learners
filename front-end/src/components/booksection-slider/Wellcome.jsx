import React from "react";
import "./Welcome.css";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";

import img from "../../assests/images/testimonial01.jpg";

const Wellcome = () => {
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
          <Col lg="20" md="12" className="m-auto">
            <div className="testimonial__wrapper d-flex justify-content-between align-items-center ">
              <div className="testimonial__content w-100 ">
                <h2 className="mb-4">Learners Books Store</h2>

                <Slider {...settings}>
                  <div>
                    <div className="single__testimonial1">
                    </div>
                  </div>

                  <div>
                    <div className="single__testimonial2">
                      <h4 className="p-3 fw-bold" style={{ color: 'white' }}>
                      The more that you read, the more things you will know. The more that you learn, the more places you'll go." — Dr. Seuss
                      </h4>
        
                    </div>
                  </div>

                  <div>
                    <div className="single__testimonial3 text-center">
                      <h3 className="mb-3 fw-bold p-4" style={{ color: 'black' }}>
                      Books open windows to the world and have the power to transform our perspective.
                      </h3>
                      <h2>Learners Book Store.</h2>
                      <h2>Wide Section | 25M Books | In 8+ Languages</h2>
                    </div>
                  </div>

                  <div>
                    <div className="single__testimonial4">
                      <h6 className="mb-3 fw-bold pt-4">
                      "Books are the plane, and the train, and the road. They are the destination, and the journey. They are home." — Anna Quindlen
                      </h6>
                      <p>
                      "Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers." — Charles W. Eliot
                      </p>

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

export default Wellcome;
