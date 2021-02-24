import {Carousel} from 'react-bootstrap/';
import React from 'react';


function Slide() {
  return (
    <div className="carousel" style={{marginBottom:"25px",display:"flex",justifyContent:"center",marginTop:"82px"}}>
      <Carousel style={{width:"100%"}}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./pic1.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3></h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./pic2.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3></h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./pic3.png"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3></h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Slide;
