import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
//Components imports
import "./NavBar.scss";
import LoginModal from "../LoginModal";
import authService from "../../Services/login/auth.service";
//Services
import Context from "../../Services/contextUser/ContextUser";
//Material UI imports
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import RegisterModal from "../../app/Register";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useContext(Context);

  const pages = ["Home", "Oficinas", "Coches", "Servicios", "Acceso", "Admin"];
  const settings = user ? ["Mi cuenta", "Cerrar Sesión"] : ["Iniciar Sesión"];

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    typeof page == "string" ? navigate("/" + page.toLowerCase()) : "";
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === "Iniciar Sesión") {
      setOpenModal(!openModal);
    } else if (setting === "Cerrar Sesión") {
      authService.logout();
      setUser(null);
      navigate(location.pathname);
    } else if (setting === "Mi cuenta") {
      navigate(`/${user.name}`);
    }
  };

  return (
    <AppBar position="fixed" className="nav">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <img
              className="logo"
              src="/src/assets/IconGifClear.gif"
              alt="Icon RentCar"
            />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              <Button
                key={page}
                value={page}
                onClick={() => {
                  handleCloseNavMenu(page);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>;
            })}
          </Box>

          <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={user ? "https://i.pravatar.cc/150" : ""}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  id={setting.split(" ")[0]}
                  key={setting.split(" ")[0]}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      {openModal && (
        <LoginModal openModal={openModal} setOpenModal={setOpenModal} setOpenRegister={setOpenRegister}/>
      )}
      {openRegister && <RegisterModal openRegister={openRegister} setOpenRegister={setOpenRegister}/>}
    </AppBar>
  );
}
export default ResponsiveAppBar;
