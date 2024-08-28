import React, { useState } from "react";
import { Container, Box, Snackbar, Alert } from "@mui/material";
import { useGetOrdersQuery } from "../../store/orderApi";
import OrderFilter from "../OrderFilter/OrderFilter";
import OrderList from "../OrderList/OrderList";

interface OrderFilterValues {
  category: string;
  title: string;
}

const OrderManagement: React.FC = () => {
  const [filters, setFilters] = useState<OrderFilterValues>({
    category: "",
    title: "",
  });

  const [notification, setNotification] = useState<{
    message: string;
    severity: "success" | "error" | "info";
  } | null>({
    message: "You succesfully logged in",
    severity: "success",
  });

  const { data: orders = [], isLoading, error } = useGetOrdersQuery();

  const handleFilter = (filterValues: OrderFilterValues) => {
    setFilters(filterValues);
  };

  const filteredOrders = orders.filter((order) => {
    return (
      (filters.category ? order.category === filters.category : true) &&
      (filters.title
        ? order.title.toLowerCase().includes(filters.title.toLowerCase())
        : true)
    );
  });

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <OrderFilter onFilter={handleFilter} />
        <OrderList
          orders={filteredOrders}
          isLoading={isLoading}
          error={error}
        />
        {notification && (
          <Snackbar
            open
            autoHideDuration={4000}
            onClose={handleCloseNotification}
          >
            <Alert
              onClose={handleCloseNotification}
              severity={notification.severity}
            >
              {notification.message}
            </Alert>
          </Snackbar>
        )}
      </Box>
    </Container>
  );
};

export default OrderManagement;
