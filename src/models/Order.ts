import { OrderStatus } from "./OrderStatus";
import { ProductItem } from "./ProductItem";

export interface Order {
  id: number;
  item?: ProductItem[];
  status: OrderStatus;
}
