import React from "react";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../../assests/images/hero-img1.jpg";
import "./hero-section.css";

const HeroSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2 className="mb-4 hero__title">
                Anytime Anywhere Learn on  <br /> your Suitable Schedule
              </h2>
              <p className="mb-5">
                Start your journey towards a new career with <br /> an exclusive Professional Certificate <br /> from Learners<br/>              
              </p>
              <h6 className="mb-5"> 7-day free trial | Starting at $49 per month</h6>
            </div>
            <div >
              <button className="btn">Explor cariers</button>
            </div>
          </Col>

          <Col lg="6" md="6">
            <img src={heroImg} alt="" className="w-100 hero__img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
