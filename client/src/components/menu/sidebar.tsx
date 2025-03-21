import {
  Drawer,
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { MenuItem } from "./menuItem";

const drawerWidth = 280;

interface Props {
  mobileOpen: boolean;
  toggleDrawer: () => void;
  isMobile: boolean;
}

export const Sidebar = ({ mobileOpen, toggleDrawer, isMobile }: Props) => {
  const auth = useContext(AuthContext);

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? mobileOpen : true}
      onClose={toggleDrawer}
      sx={{
        "& .MuiDrawer-paper": {
          bgcolor: "primary.main",
          color: "white",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 1)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          width: drawerWidth,
          color: "white",
        }}
      >
        <List>
          <MenuItem text="Tipos" path="/types" />
          <MenuItem text="Propiedades" path="/properties" />
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
      </Box>
    </Drawer>
  );
};
