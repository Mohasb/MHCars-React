import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
//Components imports
import "./NavBar.scss";
import LoginModal from "../modals/LoginModal";
//Services
import Context from "../../services/contextUser/ContextUser";
import authService from "../../services/login/auth.service";
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

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useContext(Context);

  const pages = ["Oficinas", "Coches", "Servicios", "Acceso"];
  const settings = user ? ["Mi cuenta", "Cerrar Sesión"] : ["Iniciar Sesión"];

  if (typeof user !== "undefined" && user !== null) {
    user.rol === "Admin" ? (pages[pages.length + 1] = "admin") : "";
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (typeof page == "string") {
      navigate("/" + page.toLowerCase());
      return;
    }
    if (typeof page.target.value == "string") {
      navigate("/" + page.target.value.toLowerCase());
    }
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === "Iniciar Sesión") {
      setOpenModal(!openModal);
    } else if (setting === "Cerrar Sesión") {
      authService.logout();
      setUser(null);
      if (location.pathname.startsWith("/user/")) {
        navigate("/");
      }
      navigate(location.pathname);
    } else if (setting === "Mi cuenta") {
      navigate(`/user/${user.name}`);
    }
  };

  return (
    <AppBar position="static" className="nav">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="toolbar">
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link to={"/"}>
              <Typography
                className="container-logo"
                variant="h6"
                noWrap
                component="p"
              >
                <img
                  className="logo"
                  src="/src/assets/image2vector.svg"
                  alt="Icon RentCar"
                />
                CARS
              </Typography>
            </Link>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon className="menu-icon" />
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

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Link to={"/"}>
              <Typography
                className="container-logo"
                variant="h6"
                noWrap
                component="p"
              >
                <img
                  className="logo"
                  src="/src/assets/image2vector.svg"
                  alt="Icon RentCar"
                />
                CARS
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                className="button-nav"
                key={page}
                value={page}
                onClick={() => {
                  handleCloseNavMenu(window.event, page);
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Perfil">
              <IconButton size="large" onClick={handleOpenUserMenu}>
                <Avatar
                  className="avatar"
                  alt={user && user.image ? `image${user.name}` : ""}
                  src={user && user.image ? `${user.image}` : ""}
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
        <LoginModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </AppBar>
  );
}
export default ResponsiveAppBar;
