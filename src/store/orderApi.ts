import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IOrder } from "../types/interfaces";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (builder) => ({
    getOrders: builder.query<IOrder[], void>({
      query: () => "products", // Change to "orders" if that's the correct endpoint
    }),
    getOrder: builder.query<IOrder, string>({
      query: (id) => `products/${id}`, // Change to "orders/${id}" if that's the correct endpoint
    }),
    updateOrder: builder.mutation<void, Partial<IOrder>>({
      query: ({ id, ...rest }) => ({
        url: `products/${id}`, // Change to "orders/${id}" if that's the correct endpoint
        method: "PUT",
        body: rest,
      }),
    }),
    deleteOrder: builder.mutation<void, string>({
      query: (id) => ({
        url: `products/${id}`, // Change to "orders/${id}" if that's the correct endpoint
        method: "DELETE",
      }),
    }),
    createOrder: builder.mutation<void, Omit<IOrder, "id">>({
      query: (order) => ({
        url: `products`, // Change to "orders" if that's the correct endpoint
        method: "POST",
        body: order,
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useCreateOrderMutation,
} = orderApi;
