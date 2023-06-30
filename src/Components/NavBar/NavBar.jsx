import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
//Components imports
import "./NavBar.scss";
import LoginModal from "../modals/LoginModal";
import Notification from "../notifications/NotificationLogin";
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
import Logo from "/src/assets/MHIcon.svg";
import ListItemIcon from "@mui/material/ListItemIcon";
import styled from "styled-components";
import { MenuDivider } from "react-rainbow-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faPowerOff } from "@fortawesome/free-solid-svg-icons";
///////////////////
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CarRentalIcon from "@mui/icons-material/CarRental";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import LoginIcon from "@mui/icons-material/Login";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

/////////////////////
const StyledUserFullnameContainer = styled.p.attrs((props) => {
  return props.theme.rainbow.palette;
})`
  color: ${(props) => props.text.main};
`;

const StyledUserEmailContainer = styled.p.attrs((props) => {
  return props.theme.rainbow.palette;
})`
  color: ${(props) => props.text.label};
`;

function ResponsiveAppBar() {
  ////////////////////////
  const [openDrawer, setOpenDrawer] = useState(false);

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={(e) => {
        setOpenDrawer(false);
        e.target.textContent === "Acceso" ? iniciar.click() :
        navigate("/" + e.target.textContent);
      }}
      onKeyDown={(e) => console.log(e)}
    >

      <List className="container-links-drawer">
        {pages.map((text) => (
          <ListItem key={text} className="link-drawer">
            <ListItemButton>
              <ListItemIcon>
                {(() => {
                  switch (text) {
                    case "Alquiler":
                      return (
                        <CarRentalIcon
                          fontSize="large"
                          className="icons-drawer"
                        />
                      );
                    case "Venta":
                      return (
                        <MinorCrashIcon
                          fontSize="large"
                          className="icons-drawer"
                        />
                      );
                    case "Acceso":
                      return (
                        <LoginIcon fontSize="large" className="icons-drawer" />
                      );
                    case "Contacto":
                      return (
                        <PermPhoneMsgIcon
                          fontSize="large"
                          className="icons-drawer"
                        />
                      );
                    case "Admin":
                      return (
                        <AdminPanelSettingsIcon
                          fontSize="large"
                          className="icons-drawer"
                        />
                      );
                    default:
                      break;
                  }
                })()}
              </ListItemIcon>
              <ListItemText primary={text} className="hover" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  ///////////////////////////////////////
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(Context);
  const pages = ["Alquiler", "Venta", "Acceso", "Contacto"];
  const settings = user ? ["Mi cuenta", "Cerrar Sesión"] : ["Iniciar Sesión"];
  if (typeof user !== "undefined" && user !== null) {
    user.rol === "Admin" ? (pages[pages.length + 1] = "Admin") : "";
    if (user) {
      const index = pages.indexOf("Acceso");
      if (index !== -1) {
        pages.splice(index, 1);
      }
    }
  }
  const iniciar =
      document.querySelector("#Iniciar") || document.querySelector("#Inicia");

  /* const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  }; */
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (typeof page == "string" || typeof page.target.value == "string") {
      if (page === "Acceso" || page.target.value === "Acceso") {
        iniciar.click();
        return;
      } else {
        navigate(
          "/" + page.target.value.toLowerCase() ||
            navigate("/" + page.target.value.toLowerCase())
        );
      }
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

  window.addEventListener("scroll", () => {
    const nav = document.querySelector("#nav");
    if (typeof nav != "undefined") {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        nav.classList.add("colored");
      } else {
        nav.classList.remove("colored");
      }
    }
  });

  const getImageAvatar = (user) => {
    console.log(user.lastName === "undefined");
    const initials =
      user.lastName !== "undefined"
        ? user.name + "+" + user.lastName
        : user.name;
    console.log(initials);
    return `https://www.gravatar.com/avatar/EMAIL_MD5?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/${initials}/512/F4B408/fff/2/0.5/false/true/true`;
  };

  return (
    <AppBar id="nav">
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
                <img className="logo" src={Logo} alt="Icon RentCar" />
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
              onClick={() => setOpenDrawer(true)}
              color="inherit"
              id="menu-button"
            >
              <MenuIcon className="menu-icon" />
            </IconButton>
            <Drawer
              anchor={"left"}
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
              className="drawer-container"
            >
              <Box
                className="logo-drawer"
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <Link to={"/"}>
                  <Typography variant="h6" noWrap component="span">
                    <img className="logo" src={Logo} alt="Icon RentCar" />
                    CARS
                  </Typography>
                </Link>
              </Box>
              <Box
                className="divider"
                sx={{ display: { xs: "flex", md: "flex" } }}
              ></Box>

              {list("left")}
              <Box
                className="divider"
                sx={{ display: { xs: "flex", md: "flex" } }}
              ></Box>
              <div className="inferior social">
                <div className="by flex">
                  <div className="icons">
                    <a
                      href="https://www.instagram.com/"
                      className="icon1 icon--instagram"
                    >
                      <i className="ri-instagram-line"></i>
                    </a>
                    <a
                      href="https://twitter.com/?lang=es"
                      className="icon1 icon--twitter"
                    >
                      <i className="ri-twitter-line"></i>
                    </a>
                    <a
                      href="https://es.linkedin.com/"
                      className="icon1 icon--linkedin"
                    >
                      <i className="ri-linkedin-line"></i>
                    </a>
                    <a
                      href="https://github.com/"
                      className="icon1 icon--github"
                    >
                      <i className="ri-github-line"></i>
                    </a>
                  </div>
                </div>
              </div>
              <label
                htmlFor="menu-control"
                className="close"
                onClick={() => setOpenDrawer(false)}
              ></label>
            </Drawer>
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
                <img className="logo" src={Logo} alt="Icon RentCar" />
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
              <IconButton size="large" onClick={handleOpenUserMenu} className="button-avatar">
                <Avatar
                  className="avatar"
                  alt={user && user.image ? `image${user.name}` : ""}
                  src={
                    user
                      ? user && user.image
                        ? `${user.image}`
                        : getImageAvatar(user)
                      : ""
                  }
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "75px" }}
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
              {user && (
                <div>
                  <li className="rainbow-p-horizontal_small rainbow-align_center rainbow-flex">
                    <Avatar
                      className="avatar"
                      alt={user && user.image ? `image${user.name}` : ""}
                      src={
                        user
                          ? user && user.image
                            ? `${user.image}`
                            : getImageAvatar(user)
                          : ""
                      }
                    />
                    <div className="rainbow-m-left_x-small">
                      <StyledUserFullnameContainer className="rainbow-font-size-text_medium">
                        {user.name}
                      </StyledUserFullnameContainer>
                      <StyledUserEmailContainer className="rainbow-font-size-text_small">
                        {user.email}
                      </StyledUserEmailContainer>
                    </div>
                  </li>
                  <MenuDivider variant="space" />
                </div>
              )}
              {settings.map((setting) => (
                <MenuItem
                  id={setting.split(" ")[0]}
                  key={setting.split(" ")[0]}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <>
                    <ListItemIcon>
                      {setting === "Mi cuenta" ? (
                        <FontAwesomeIcon icon={faPencilAlt} color="green" />
                      ) : setting === "Cerrar Sesión" ? (
                        <FontAwesomeIcon icon={faPowerOff} color="red" />
                      ) : (
                        <FontAwesomeIcon icon={faPowerOff} color="green" />
                      )}
                    </ListItemIcon>
                    <Typography textAlign="center">{setting}</Typography>
                  </>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      {openModal && (
        <LoginModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          setOpenNotification={setOpenNotification}
        />
      )}
      {user && <Notification user={user} open={openNotification} />}
    </AppBar>
  );
}
export default ResponsiveAppBar;
