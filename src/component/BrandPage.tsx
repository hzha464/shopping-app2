import { Link, useParams } from "react-router-dom";
import { useGetAllProductQuery } from "../api/shopapi";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Product } from "../models/Product";
import { useState } from "react";

function BrandPage() {
  let Allproduct: Product[] = [];
  let { brand } = useParams();
  const { data, isLoading, isError, error } = useGetAllProductQuery();
  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }
  if (data?.data) {
    Allproduct = data.data.filter((product) => product.brand == brand);
  }

  return (
    <>
      <Container>
        <Row>
          <>
            {data &&
              Allproduct.map((product) => (
                <Col className="md-4 mt-2">
                  {" "}
                  <Link to={"/Detail/" + product.id}>
                    <Card
                      style={{
                        cursor: "pointer",
                        height: "25rem",
                        width: "16rem",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={product.image}
                        style={{
                          height: "70%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <Card.Body>
                        <Card.Title>{product.model}</Card.Title>
                        <Card.Text>price:{product.price}</Card.Text>
                        <Card.Subtitle className="mb-2 text-muted">
                          rating:{product.rating}
                        </Card.Subtitle>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
          </>
        </Row>
      </Container>
    </>
  );
}
export default BrandPage;
