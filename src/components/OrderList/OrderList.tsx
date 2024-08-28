import React, { useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import { IOrder } from "../../types/interfaces";
import DataTable from "../DataTable/DataTable";

const OrderList: React.FC<{
  orders: IOrder[];
  isLoading: boolean;
  error: any;
}> = ({ orders, isLoading, error }) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof IOrder>("title"); // Change to a field present in IOrder
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (property: keyof IOrder) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Box>Error loading orders</Box>;
  }

  return (
    <DataTable
      columns={[
        { label: "ID", id: "id" },
        { label: "Title", id: "title" },
        { label: "Price", id: "price" },
        { label: "Category", id: "category" },
      ]}
      data={orders}
      onSort={handleSort}
      order={order}
      orderBy={orderBy}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

export default OrderList;
