import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../models/User";
import { ServiceResponse } from "../models/ServiceResponse";
import { Product } from "../models/Product";
import { Order } from "../models/Order";
import { ProductItem } from "../models/ProductItem";
import { Dorder } from "../models/Dorder";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shoppingwebapi2.azurewebsites.net/",
  }),
  endpoints: (builder) => ({
    // Todo item endpoints
    getTodoItemById: builder.query({
      query: () => `WeatherForecast`,
    }),

    Login: builder.mutation<ServiceResponse<string>, User>({
      query: (user: User) => ({
        url: "Auth/Login",
        method: "POST",
        body: user,
      }),
    }),
    Register: builder.mutation<ServiceResponse<string>, User>({
      query: (user: User) => ({
        url: "Auth/Register",
        method: "POST",
        body: user,
      }),
    }),
    getAllProduct: builder.query<ServiceResponse<Product[]>, void>({
      query: () => "/api/Product",
    }),
    getAllOrder: builder.query<ServiceResponse<Dorder[]>, string>({
      query: (token) => ({
        url: "api/Order/GetAll",
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    Additem: builder.mutation<ServiceResponse<Order>, [ProductItem, string]>({
      query: ([item, token]) => ({
        url: "api/Order/item",
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: item,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTodoItemByIdQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetAllProductQuery,
  useLazyGetAllOrderQuery,
  useAdditemMutation,
} = api;
