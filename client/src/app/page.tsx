"use client";

import { useContext, useState } from "react";
import { Typography, TextField, Button, Paper, Avatar } from "@mui/material";
import { AuthContext } from "@/context/authContext";

const LoginPage = () => {
  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Paper
      elevation={6}
      sx={{
        p: { xs: 4, sm: 8 },
        borderRadius: 0,
        width: { xs: "auto", sm: "70vw", md: "60vw" },
        height: { xs: "80vh", sm: "100vh" },
        position: "relative",
      }}
    >
      <Avatar
        sx={{
          bgcolor: "primary.main",
          mb: 2,
          padding: 1,
          position: "absolute",
          right: { xs: -10, sm: -150 },
          top: { xs: "auto", sm: "50%" },
          bottom: { xs: -100, sm: "auto" },
          transform: { xs: "auto", sm: "translateY(-50%)" },
          width: 200,
          height: 200,
        }}
      ></Avatar>
      <h1>Iniciar Sesión</h1>
      {error && (
        <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <form
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          login(email, password);
        }}
      >
        <TextField
          label="Correo Electrónico"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Contraseña"
          type={"password"}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, py: 1.5, fontSize: "1rem" }}
        >
          Iniciar Sesión
        </Button>
      </form>
    </Paper>
  );
};

export default LoginPage;
