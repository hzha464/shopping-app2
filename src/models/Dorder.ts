import { DProductItem } from "./DProductItem";
import { OrderStatus } from "./OrderStatus";

export interface Dorder {
  id: number;
  item?: DProductItem[];
  status: OrderStatus;
}
