import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Tooltip,
  Avatar,
  Fab,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddIcon from '@mui/icons-material/Add';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const drawerWidth = 260;

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  text: string;
  path: string;
  icon: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const location = useLocation();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems: NavItem[] = [
    {
      text: 'Dashboard',
      path: '/',
      icon: <DashboardOutlinedIcon />
    },
    {
      text: 'Nowe zgłoszenie',
      path: '/request',
      icon: <AddIcon />
    },
    {
      text: 'Lista zgłoszeń',
      path: '/changes',
      icon: <ListAltOutlinedIcon />
    },
    {
      text: 'Raporty',
      path: '/reports',
      icon: <BarChartOutlinedIcon />
    },
    {
      text: 'Ustawienia',
      path: '/settings',
      icon: <SettingsOutlinedIcon />
    },
  ];

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      py: 2
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        mb: 4,
        px: 3
      }}>
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            fontWeight: 600,
            color: theme.palette.primary.main
          }}
        >
          ECM <Box component="span" sx={{ fontWeight: 400, color: theme.palette.text.primary }}>System</Box>
        </Typography>
      </Box>
      
      <List sx={{ px: 2, flexGrow: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  backgroundColor: isActive ? 'rgba(0, 131, 143, 0.08)' : 'transparent',
                  color: isActive ? 'primary.main' : 'text.primary',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 131, 143, 0.12)',
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  color: isActive ? 'primary.main' : 'text.secondary',
                  minWidth: '40px'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 500 : 400
                  }}
                />
                {isActive && (
                  <Box
                    sx={{
                      width: 4,
                      height: 32,
                      borderRadius: '4px 0 0 4px',
                      bgcolor: 'primary.main',
                      position: 'absolute',
                      right: 0,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      
      <Box sx={{ 
        mt: 2, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        px: 2
      }}>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<LogoutOutlinedIcon />}
          size="large"
          fullWidth
          sx={{ 
            borderRadius: 2,
            justifyContent: 'flex-start',
            py: 1,
            textAlign: 'left',
            color: theme.palette.text.secondary
          }}
        >
          Wyloguj
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              display: { xs: 'none', md: 'block' },
              color: theme.palette.text.primary,
              fontWeight: 500,
            }}
          >
            System Zarządzania Zmianą Inżynieryjną
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Powiadomienia">
              <IconButton color="inherit" size="large">
                <NotificationsNoneOutlinedIcon />
              </IconButton>
            </Tooltip>
            
            <Avatar 
              sx={{ 
                width: 38, 
                height: 38,
                bgcolor: theme.palette.primary.main
              }}
            >
              U
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: 'none'
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: 'none'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          position: 'relative'
        }}
      >
        <Toolbar />
        {children}
        
        {location.pathname === '/' && (
          <Fab
            color="primary"
            aria-label="add"
            component={RouterLink}
            to="/request"
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              boxShadow: 3,
            }}
          >
            <AddIcon />
          </Fab>
        )}
      </Box>
    </Box>
  );
};

export default Layout;