"use client";

import { AuthContext } from "@/context/authContext";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  CssBaseline,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import Header from "../header";

const drawerWidth = 280;

const Menu = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const auth = useContext(AuthContext);

  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  if (pathname === "/") {
    return <>{children}</>;
  }

  const MenuContent = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: drawerWidth,
        color: "white",
      }}
    >
      <List>
        {[
          { text: "Tipos", path: "/types" },
          { text: "Propiedades", path: "/properties" },
        ].map(({ text, path }) => (
          <ListItem key={text} disablePadding>
            <Link
              href={path}
              passHref
              style={{
                width: "100%",
                textDecoration: "none",
                color: "inherit",
                padding: "5px",
                backgroundColor:
                  pathname === path ? "rgba(0, 0, 0, 0.1)" : "transparent",
              }}
            >
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      <Box sx={{ boxShadow: "0px -1px 10px rgba(0, 0, 0, 1)" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={auth.logout}>
              <ListItemText sx={{ textAlign: "center" }} primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          role="button"
          onClick={toggleDrawer}
          sx={{ position: "absolute", top: 10, left: 5, zIndex: 10 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            bgcolor: "primary.main",
            color: "white",
          },
        }}
      >
        {MenuContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isMobile ? 0 : `${drawerWidth}px`,
        }}
      >
        <Header title={pathname === "/types" ? "Tipos" : "Propiedades"} />
        <div style={{ padding: "30px" }}>{children}</div>
      </Box>
    </Box>
  );
};

export default Menu;
