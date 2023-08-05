import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import styles from "./MainPage.module.css";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <Container>
      <Row className={styles.slide}>
        <Col>
          <Carousel>
            <Carousel.Item>
              <Link to="">
                <Image
                  // fluid
                  // style={{ height: "30em", width: "100%", objectFit: "cover" }}
                  className={styles.fixImage}
                  src="https://www.allaboutrazor.com/wp-content/uploads/2016/06/Best-waterproof-razor-715x400.jpg"
                  alt="First slide"
                />
              </Link>
              <Carousel.Caption>
                <h3>WaterProof</h3>
                <p className="">
                  Whether you prefer a quick dry shave or a refreshing wet shave
                  in the shower, our waterproof shaver is up to the task. This
                  feature also allows sfor easy and thorough cleaning under
                  running water.
                </p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <Link to="">
                <Image
                  // fluid
                  // style={{ height: "30em", width: "100%", objectFit: "cover" }}
                  className={styles.fixImage}
                  src="https://media.4rgos.it/i/Argos/5119-m0014-m007-m050-asym-m008-m022-shaver-guide-8248905?maxW=1200&qlt=75&fmt.jpeg.interlaced=true"
                  alt="Second slide"
                />
              </Link>
              <Carousel.Caption>
                <h3>FastCharge</h3>
                <p className="">
                  The SwiftTrim Pro Fast Charge Shaver is a breakthrough in
                  men's grooming technology, designed to combine speed,
                  efficiency, and versatility for a perfectly smooth shave in a
                  fraction of the time. This premium shaver is equipped with
                  state-of-the-art fast charge technology, allowing you to fully
                  charge the device in less than an hour for an incredible 60
                  minutes of cordless use.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <Row className={styles.brand + " justify-content-center  text-center"}>
        <h2>Choose by brand</h2>
      </Row>
      <Row className={styles.brand}>
        <Col>
          {" "}
          <Link to="/Brand/Philips">
            {" "}
            <Card
              style={{
                cursor: "pointer",
                height: "25rem",
                width: "16rem",
              }}
            >
              <Card.Img
                variant="top"
                src="https://i5.walmartimages.com/asr/3c3ae8ed-a100-42ed-b728-6f9fccf4b89f.7e5413e364452c5b54903490889b32cd.jpeg"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Card>
          </Link>
        </Col>
        <Col>
          {" "}
          <Link to="/Brand/Panasonic">
            <Card
              style={{
                cursor: "pointer",
                height: "25rem",
                width: "16rem",
              }}
            >
              <Card.Img
                variant="top"
                src="https://electricshaversuk.co.uk/wp-content/uploads/2016/03/Panasonic-5-Blade-shaver-boxed.jpg"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Card>
          </Link>
        </Col>

        <Col>
          {" "}
          <Link to="/Brand/Braun">
            <Card
              style={{
                cursor: "pointer",
                height: "25rem",
                width: "16rem",
              }}
            >
              <Card.Img
                variant="top"
                src="https://images-na.ssl-images-amazon.com/images/I/81IbnogIAUL.jpg"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
export default MainPage;
