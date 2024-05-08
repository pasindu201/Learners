import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";

import chooseImg from "../../assests/images/why-choose-us.png";
import "./choose-us.css";

import ReactPlayer from "react-player";

const ChooseUs = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="choose__content">
              <h2>Why Choose Us</h2>
              <p>
              At Learners, we prioritize your success and growth by offering 
              a learning experience that is unmatched. Our platform combines expertly crafted courses 
              with cutting-edge technology to deliver engaging and interactive lessons that cater to your 
              unique learning style. We partner with industry experts and top educators to bring you high-quality 
              content that is up-to-date and relevant. Plus, our flexible scheduling allows you to learn at your 
              own pace, fitting seamlessly into your busy life. Join our vibrant community of learners and benefit from 
              our dedicated support team, ready to assist you every step of the way. Choose Learners 
              for a transformative educational journey that empowers you to reach your full potential.
              </p>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="choose__img">
              {showVideo ? (
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=qFp27TR4Yew"
                  controls
                  width="100%"
                  height="350px"
                />
              ) : (
                <img src={chooseImg} alt="" className="w-100" />
              )}

              {!showVideo && (
                <span className="play__icon">
                  <i
                    class="ri-play-circle-line"
                    onClick={() => setShowVideo(!showVideo)}
                  ></i>
                </span>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ChooseUs;
