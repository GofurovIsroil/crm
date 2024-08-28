import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";
import { IFormValues } from "../../types/interfaces";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();
  const navigate = useNavigate();

  const onSubmit = (data: IFormValues) => {
    // Фиктивная аутентификация
    if (data.username === "admin" && data.password === "admin") {
      navigate("/dashboard");
    } else {
      alert("Неверное имя пользователя или пароль");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h5">Вход</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("username", {
              required: "Имя пользователя обязательно",
            })}
            label="Имя пользователя"
            variant="outlined"
            margin="normal"
            fullWidth
            autoComplete="username"
            autoFocus
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            {...register("password", { required: "Пароль обязателен" })}
            label="Пароль"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Войти
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
