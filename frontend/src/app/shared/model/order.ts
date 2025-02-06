import { LatLng } from "leaflet";
import { Cartitems } from "./cartitems";


export class Order{
  id!:number;
  items!: Cartitems[];
  totalPrice!:number;
  name!: string;
  address!: string;
  addressLatLng?:LatLng;
  paymentId!: string;
  createdAt!: string;
  status!: string;
}