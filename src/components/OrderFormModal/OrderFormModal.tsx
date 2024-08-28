import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { IOrder } from "../../types/interfaces";
import {
  useCreateOrderMutation,
  useUpdateOrderMutation,
} from "../../store/orderApi";

interface OrderFormModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: IOrder;
}

const OrderFormModal: React.FC<OrderFormModalProps> = ({
  open,
  onClose,
  initialData,
}) => {
  const { control, handleSubmit } = useForm<IOrder>({
    defaultValues: initialData || {
      id: 0,
      title: "",
      price: 0,
      category: "",
      date: "",
      status: "",
    },
  });

  const [notification, setNotification] = useState<{
    message: string;
    severity: "success" | "error" | "info";
  } | null>(null);

  const [updateOrder] = useUpdateOrderMutation();
  const [createOrder] = useCreateOrderMutation();

  const onSubmit = (data: IOrder) => {
    if (
      data.date?.length === 0 ||
      data.status?.length === 0 ||
      data.title.length === 0 ||
      data.price < 1
    ) {
      setNotification({
        message: "Fill the blanks",
        severity: "error",
      });
      return false;
    }
    if (initialData) {
      updateOrder({ ...data, id: initialData.id });
      onClose();
    } else {
      createOrder(data);
      onClose();
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Edit Order" : "New Order"}</DialogTitle>
      <DialogContent>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Customer Name"
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Status" fullWidth margin="normal" />
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Order Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Total Amount"
              type="number"
              fullWidth
              margin="normal"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary">
          Save
        </Button>
      </DialogActions>
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
    </Dialog>
  );
};

export default OrderFormModal;
