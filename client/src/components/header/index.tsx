import { AppBar, Toolbar, Typography } from "@mui/material";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ ml: 4 }} variant="h6">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
