"use client";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";

const menuItems = [
  { name: "پروفایل کاربری", path: "/profile", icon: <PersonIcon /> },
  { name: "خروج", path: "logout", icon: <LogoutIcon /> },
];

export default function MenuBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();
  const { useLogout } = useAuth();
  const { mutate: logout } = useLogout();

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleMenuClick = (path: string) => {
    if (path === "logout") {
      logout();
    } else {
      router.push(path);
    }
    setIsDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', direction: 'rtl' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          top: 0,
          left: 0,
          right: 0
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={() => router.push("/")}
            >
              TA Connect
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Drawer
        variant="temporary"
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            direction: 'rtl',
            right: 0,
            left: 'auto',
          },
        }}
      >
        <Box sx={{ width: 240 }} role="presentation">
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton onClick={() => handleMenuClick(item.path)}>
                  <ListItemIcon sx={{ minWidth: 40, mr: 'auto', ml: -1 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.name} 
                    sx={{ 
                      textAlign: 'right',
                      '& .MuiTypography-root': {
                        fontFamily: 'Vazirmatn, Arial, sans-serif',
                      }
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
} 