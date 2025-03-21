"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import { Sidebar } from "./sidebar";
import { MenuButton } from "./menuButton";
import Header from "../header";

const drawerWidth = 280;

const Menu = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <Box style={{ display: "flex" }}>
      <CssBaseline />

      {isMobile && <MenuButton onClick={toggleDrawer} />}

      <Sidebar
        mobileOpen={mobileOpen}
        toggleDrawer={toggleDrawer}
        isMobile={isMobile}
      />

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
