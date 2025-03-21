"use client";

import { useContext, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Box,
  Skeleton,
} from "@mui/material";
import { AuthContext } from "@/context/authContext";

const paperStyle = {
  p: { xs: 4, sm: 8 },
  borderRadius: 0,
  width: { xs: "auto", sm: "70vw", md: "60vw" },
  height: { xs: "80vh", sm: "100vh" },
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const AvatarStyle = {
  bgcolor: "primary.light",
  mb: 2,
  padding: 1,
  position: "absolute",
  right: { xs: -10, sm: -150 },
  top: { xs: "auto", sm: "50%" },
  bottom: { xs: -100, sm: "auto" },
  transform: { xs: "auto", sm: "translateY(-50%)" },
  width: 200,
  height: 200,
};

const LoginPage = () => {
  const { login, error, isLoading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Paper elevation={6} sx={paperStyle}>
        <Avatar sx={AvatarStyle}></Avatar>
        <div>
          <h1>Iniciar Sesión</h1>
          {error && (
            <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <form
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
              variant="outlined"
              focused
            />
            <TextField
              label="Contraseña"
              type={"password"}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
              focused
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, py: 1.5, fontSize: "1rem" }}
            >
              {isLoading ? "Cargando..." : "Iniciar Sesión"}
            </Button>
          </form>
        </div>
      </Paper>
      <Box
        sx={{
          flex: 1,
          bgcolor: "grey.100",
          borderRadius: 2,
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          sx={{ mb: 2 }}
        />
        <Skeleton variant="text" width="80%" height={80} />
        <Skeleton variant="text" width="60%" height={30} />
        <Skeleton
          variant="rectangular"
          width="100%"
          height="10%"
          sx={{ mt: 2 }}
        />
        <Skeleton variant="text" width="80%" height={20} />
        <Skeleton variant="text" width="60%" height={300} />
        <Skeleton variant="text" width="80%" height={10} />
        <Skeleton variant="text" width="60%" height={100} />
      </Box>
    </div>
  );
};

export default LoginPage;
