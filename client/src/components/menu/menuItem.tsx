import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  text: string;
  path: string;
}

export const MenuItem = ({ text, path }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <ListItem disablePadding>
      <Link
        href={path}
        passHref
        style={{
          width: "100%",
          textDecoration: "none",
          color: "inherit",
          padding: "5px",
          backgroundColor: isActive ? "rgba(0, 0, 0, 0.1)" : "transparent",
          boxShadow: isActive ? "inset 5px 0px 0px #fff" : "none",
        }}
      >
        <ListItemButton>
          <ListItemText primary={text} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};
