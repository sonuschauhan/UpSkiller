import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  InputBase,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Badge,
  Divider,
} from "@mui/material";
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  AccountCircle,
  School,
  Close as CloseIcon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";

// Styled components for search functionality
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.08),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.12),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "text.primary",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // State management
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Menu handlers
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Search handler
  const handleSearch = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery("");
      }
    }
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/");
  };

  // Profile menu
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Box>
          <Typography variant="subtitle1">{user?.username}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.role}
          </Typography>
        </Box>
      </MenuItem>
      <Divider />
      <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
        Profile
      </MenuItem>
      <MenuItem component={Link} to="/my-courses" onClick={handleMenuClose}>
        My Learning
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  // Mobile drawer content
  const mobileMenuItems = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Menu</Typography>
        <IconButton onClick={handleMobileMenuToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem component={Link} to="/" onClick={handleMobileMenuToggle}>
          <ListItemText primary="Explore" />
        </ListItem>
        
        {user && (
          <ListItem component={Link} to="/my-courses" onClick={handleMobileMenuToggle}>
            <ListItemText primary="My Learning" />
          </ListItem>
        )}
        
        <ListItem
          component={Link}
          to={
            user?.role === "instructor"
              ? "/instructor/dashboard"
              : "/become-instructor"
          }
          onClick={handleMobileMenuToggle}
        >
          <ListItemText primary="Instructor" />
        </ListItem>
        
        <Divider />
        
        {!user ? (
          <>
            <ListItem component={Link} to="/login" onClick={handleMobileMenuToggle}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem component={Link} to="/register" onClick={handleMobileMenuToggle}>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem>
              <Box>
                <Typography variant="subtitle2">{user.username}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.role}
                </Typography>
              </Box>
            </ListItem>
            <ListItem onClick={() => { handleLogout(); handleMobileMenuToggle(); }}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "background.paper", color: "text.primary", boxShadow: 1 }}>
        <Toolbar>
          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              edge="start"
              sx={{ mr: 2, color: "text.primary" }}
              aria-label="menu"
              onClick={handleMobileMenuToggle}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo/Brand */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "text.primary",
              display: "flex",
              alignItems: "center",
              mr: 2,
            }}
          >
            <School sx={{ mr: 1, color: "primary.main" }} />
            {!isMobile && "LearnHub"}
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <Button sx={{ color: "text.primary" }} component={Link} to="/">
                Explore
              </Button>
              {user && (
                <Button sx={{ color: "text.primary" }} component={Link} to="/my-courses">
                  My Learning
                </Button>
              )}
              <Button
                sx={{ color: "text.primary" }}
                component={Link}
                to={
                  user?.role === "instructor"
                    ? "/instructor/dashboard"
                    : "/become-instructor"
                }
              >
                Instructor
              </Button>
            </Box>
          )}

          {/* Search Bar */}
          <Search sx={{ flexGrow: 1, maxWidth: isMobile ? "none" : 400 }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "text.secondary" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search courses..."
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Auth Section */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {!user ? (
                <>
                  <Button 
                    sx={{ color: "text.primary", border: "1px solid", borderColor: "divider" }} 
                    component={Link} 
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    component={Link}
                    to="/register"
                    sx={{ ml: 1 }}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  sx={{ color: "text.primary" }}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user.username?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
      >
        {mobileMenuItems}
      </Drawer>

      {/* Profile Menu */}
      {renderMenu}
    </>
  );
}