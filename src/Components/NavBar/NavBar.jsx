import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//Components imports
import "./NavBar.scss";
import Login from "../LoginModal";
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
import authService from "../../Services/login/auth.service";



function ResponsiveAppBar() {
  
  const [isLogged, setIsLogged] = useState(false)
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  
  const pages = ["Home", "Oficinas", "Coches", "Servicios", "Acceso", isLogged ? "Admin": null];
  const settings = isLogged ? ["Mi cuenta","Cerrar Sesión"]: ["Iniciar Sesión"];
  



  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsLogged(true);
    }
  },[])

  
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
    }else if (setting === "Cerrar Sesión") {
      authService.logout()
      setIsLogged(false);
      navigate("/")
    }
    /* typeof setting == "string" ? navigate("/" + setting.toLowerCase()) : ""; */
  };

  return (
    <AppBar position="static" className="nav">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Link to={"/"}>
            <Typography
              variant="h6"
              noWrap
              component="p"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              RentCar
            </Typography>
          </Link> */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              {pages.map((page) => page && (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              noWrap
              component="p"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                margin: 0,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              RentCar
              <img
                className="logo"
                src="/src/assets/IconGifClear.gif"
                alt="Icon RentCar"
              />
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              (
              <Button
                key={page}
                value={page}
                onClick={() => {
                  handleCloseNavMenu(page);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            )})}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={isLogged ? "https://i.pravatar.cc/150?img=3": ""} />
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
                  key={setting}
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
        <Login openModal={openModal} setOpenModal={setOpenModal} setIsLogged={setIsLogged}/>
      )}
    </AppBar>
  );
}
export default ResponsiveAppBar;
