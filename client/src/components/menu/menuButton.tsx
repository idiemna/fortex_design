import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  onClick: () => void;
}

export const MenuButton = ({ onClick }: Props) => {
  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      role="button"
      onClick={onClick}
      sx={{ position: "absolute", top: 10, left: 5, zIndex: 10 }}
    >
      <MenuIcon />
    </IconButton>
  );
};
