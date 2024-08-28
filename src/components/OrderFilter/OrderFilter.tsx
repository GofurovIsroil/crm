// src/components/OrderFilter.tsx
import React, { useState } from "react";
import { TextField, Button, MenuItem, Snackbar, Alert } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { IOrderFilterProps, IOrderFilterValues } from "../../types/interfaces";

const OrderFilter: React.FC<IOrderFilterProps> = ({ onFilter }) => {
  const { control, handleSubmit, reset } = useForm<IOrderFilterValues>({
    defaultValues: {
      category: "",
      title: "",
      status: "",
    },
  });
  const [notification, setNotification] = useState<{
    message: string;
    severity: "success" | "error" | "info";
  } | null>({
    message: "Hello",
    severity: "success",
  });

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const onSubmit = (data: IOrderFilterValues) => {
    onFilter(data);
    setNotification({
      message: "Succesfully filtered",
      severity: "success",
    });
  };

  const handleReset = () => {
    reset();
    onFilter({ category: "", title: "", status: "" });
    setNotification({
      message: "Filters reseted",
      severity: "info",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
      }}
    >
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Status" select sx={{ width: 120 }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
          </TextField>
        )}
      />
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Category" select sx={{ width: 120 }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="men's clothing">Men's clothing</MenuItem>
            <MenuItem value="women's clothing">Women's clothing</MenuItem>
            <MenuItem value="jewelery">Jewelery</MenuItem>
          </TextField>
        )}
      />
      <Controller
        name="title"
        control={control}
        render={({ field }) => <TextField {...field} label="Title" />}
      />
      <Button type="submit" variant="contained">
        Filter
      </Button>
      <Button type="button" onClick={handleReset}>
        Reset Filters
      </Button>
      {notification && (
        <Snackbar
          open
          autoHideDuration={2000}
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
    </form>
  );
};

export default OrderFilter;
