import { useEffect, useState } from "react";
import { useGetAllProductQuery, useLazyGetAllOrderQuery } from "../api/shopapi";
import { Order } from "../models/Order";
import { ServiceResponse } from "../models/ServiceResponse";
import { useToken } from "./Navbar";
import { OrderStatus } from "../models/OrderStatus";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Dorder } from "../models/Dorder";

function Cart() {
  const { token, setToken } = useToken();
  const [orders, setOrder] = useState<Dorder[] | undefined>(undefined);
  // const {
  //   data: od,
  //   isLoading: ol,
  //   isError: ioe,
  //   error: e,
  // } = useGetAllProductQuery();

  const [getAllorder, { data, isLoading, isError, error }] =
    useLazyGetAllOrderQuery();
  useEffect(() => {
    const fetch = async () => {
      try {
        let response: ServiceResponse<Dorder[]> = await getAllorder(
          token!
        ).unwrap();
        let allList: Dorder[] = response.data!;
        // let cartOrder: Order | undefined = allList.find(
        //   (c) => c.status == OrderStatus.Cart
        // );
        setOrder(allList);
        // setOrder(response.data?.find(c => c.status == OrderStatus.Cart))
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  // if (isLoading || ol) {
  //   return <>...isLoading</>;
  // }
  // console.log(od);
  const getCart = () => {
    // console.log(
    //   "here",
    //   orders?.find((c) => c.status == OrderStatus.Cart)!.item
    // );
    if (orders) {
      return orders?.find((c) => c.status == OrderStatus.Cart)!.item;
    }
    return [];
  };
  // console.log(orders?.find((o) => o.status == OrderStatus.Cart));
  // const findOne = (id: number | undefined) => {
  //   console.log("dsa", id);
  //   return od!.data!.find((c) => c.id == id);
  // };
  // try {
  //   let response: ServiceResponse<Order[]> = await getAllorder(token!).unwrap();
  //   console.log(response.data);
  // } catch (error) {
  //   console.log(error);
  // }

  // if (!oisLoading) {
  //   console.log(odata);
  // }
  const getTotal = () => {
    let Total: number = 0;

    if (orders?.find((o) => o.status == OrderStatus.Cart)) {
      let listItem = orders.find((o) => o.status == OrderStatus.Cart)?.item!;
      for (let i of listItem) {
        Total += i.product.price * i.number;
      }
    }
    return Total;
  };
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>
              Order
            </ListGroup.Item>

            {orders &&
              orders.find((o) => o.status == OrderStatus.Cart) &&
              orders.find((o) => o.status == OrderStatus.Cart)!.item &&
              orders
                .find((o) => o.status == OrderStatus.Cart)!
                .item?.map((i) => {
                  console.log(i);
                  return (
                    <>
                      <ListGroup.Item as="li">
                        <Row>
                          <Col md={4}>
                            <Image fluid src={i.product.image} />
                          </Col>
                          <Col md={4}></Col>
                          <Col md={4}>
                            <Row> Price: {i.product.price}</Row>
                            <Row>Quality: {i.number}</Row>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </>
                  );
                })}
          </ListGroup>
          <ListGroup.Item as="li" active>
            Total: {getTotal()}
          </ListGroup.Item>
        </Col>
      </Row>
    </Container>
  );
}
export default Cart;

// {getCart() &&
//   getCart()?.map((p) => (
//     <ListGroup.Item as="li">
//       {" "}
//       <Row>
//         <Col md={4}>
//           {/* <Image src={findOne(p.ProductId)?.image} /> */}
//         </Col>
//       </Row>
//     </ListGroup.Item>
//   ))}
