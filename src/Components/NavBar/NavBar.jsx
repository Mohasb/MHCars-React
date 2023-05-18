import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
//Components imports
import "./NavBar.scss";
import LoginModal from "../modals/LoginModal";
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

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useContext(Context);

  const pages = ["Home", "Oficinas", "Coches", "Servicios", "Acceso"];
  const settings = user ? ["Mi cuenta", "Cerrar Sesión"] : ["Iniciar Sesión"];
  user ? console.log(user.name.charAt(0)) : "";

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
      navigate(location.pathname);
    } else if (setting === "Mi cuenta") {
      navigate(`/user/${user.name}`);
    }
  };

  return (
    <AppBar position="static" className="nav">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            className="container-logo"
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              lineHeight: "5rem",
            }}
          >
            <img
              className="logo"
              src="/src/assets/image2vector.svg"
              alt="Icon RentCar"
            />
            CARS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon
                sx={{
                  transform: "scale(2)",
                  color: "#fff",
                  border: "1px solid white",
                  borderRadius: "5px",
                }}
              />
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

          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <img
                className="logo"
                src="/src/assets/MHLogo.png"
                alt="Icon RentCar"
              />
            </Link>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                value={page}
                onClick={() => {
                  handleCloseNavMenu(window.event, page);
                }}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  "&:hover": {
                    color: "#005fb2",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Perfil">
              <IconButton
                size="large"
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={user ? "https://i.pravatar.cc/150" : ""}
                  sx={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#F4B408",
                    border: "3px solid white",
                    "&:hover": {
                      transition: "all 0.1s linear",
                      color: "#005fb2",
                      borderColor: "#005fb2",
                    },
                  }}
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
