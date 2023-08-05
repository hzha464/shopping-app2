import { useParams } from "react-router-dom";
import {
  useAdditemMutation,
  useGetAllProductQuery,
  useLazyGetAllOrderQuery,
  useLoginMutation,
} from "../api/shopapi";
import { Product } from "../models/Product";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useToken } from "./Navbar";
import { ServiceResponse } from "../models/ServiceResponse";
import { Order } from "../models/Order";
import { ProductItem } from "../models/ProductItem";

function Detail() {
  let { id } = useParams();
  let product: Product | undefined;
  const [pop, setPop] = useState<boolean | string>(false);
  const { token, setToken } = useToken();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPop(false);
    }, 3000);

    return () => {
      clearTimeout(timer); // This will clear the timeout if the modal is closed before the timeout finishes
    };
  }, [pop]);
  const { data, isLoading, isError, error } = useGetAllProductQuery();
  const [
    AddItem,
    { data: odata, isLoading: oisloading, isError: oiserror, error: oerror },
  ] = useAdditemMutation();
  // const [
  //   getAllorder,
  //   { data: odata, isLoading: oisloading, isError: oiserror, error: oerror },
  // ] = useLazyGetAllOrderQuery();
  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }
  if (data?.data) {
    product = data.data.find((product) => product.id.toString() == id);
  }
  const addToCart = async () => {
    if (!token) {
      setPop("please log in first");
    }
    let Iid = parseInt(id!);
    let item: ProductItem = { number: 1, ProductId: Iid };
    try {
      console.log(item);
      let response: ServiceResponse<Order> = await AddItem([
        item,
        token!,
      ]).unwrap();
      console.log(response);
    } catch (err) {
      if (!token) {
        setPop("please log in first");
      } else {
        setPop("Add item failed");
      }
    }
    // try {
    //   let response: ServiceResponse<Order[]> = await getAllorder(
    //     token!
    //   ).unwrap();
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error);
    // }

    // if (!oisLoading) {
    //   console.log(odata);
    // }
  };

  return (
    <Container>
      {pop && (
        <Alert>
          <p>{pop}</p>
        </Alert>
      )}

      <Row className="mt-5">
        <Col>
          {" "}
          <Card
          // style={{
          //   cursor: "pointer",
          //   height: "25rem",
          //   width: "16rem",
          // }}
          >
            <Card.Img
              variant="top"
              src={product?.image}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Card>
        </Col>
        <Col>
          <Row>
            <Card style={{ width: "18rem" }}>
              <Card.Header>{product?.model}</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>price: {product?.price}</ListGroup.Item>
                <ListGroup.Item>rating: {product?.rating}</ListGroup.Item>
                <ListGroup.Item>stock: {product?.stock}</ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <Button onClick={addToCart}>Add to Cart</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
export default Detail;
