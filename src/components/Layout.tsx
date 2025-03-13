import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
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
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeContext } from '../theme/ThemeContext';

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
  const { mode, toggleTheme } = useThemeContext();

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

  const drawerVariants = {
    hidden: { x: -drawerWidth },
    visible: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1
      }
    }
  };

  const listItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (custom: number) => ({
      x: 0,
      opacity: 1,
      transition: { 
        delay: custom * 0.05,
        duration: 0.3
      }
    })
  };

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      py: 2
    }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
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
      </motion.div>
      
      <List sx={{ px: 2, flexGrow: 1 }}>
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          return (
            <motion.div
              key={item.text}
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    backgroundColor: isActive ? `${theme.palette.primary.main}10` : 'transparent',
                    color: isActive ? 'primary.main' : 'text.primary',
                    '&:hover': {
                      backgroundColor: `${theme.palette.primary.main}20`,
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
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 32 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ListItemButton>
              </ListItem>
            </motion.div>
          );
        })}
      </List>
      
      <Box sx={{ 
        mt: 2, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        px: 2,
        gap: 2
      }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <IconButton 
            onClick={toggleTheme} 
            sx={{ 
              mb: 2,
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              transition: 'background-color 0.3s ease'
            }}
          >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{ width: '100%' }}
        >
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
        </motion.div>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
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
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Tooltip title="Powiadomienia">
                <IconButton color="inherit" size="large">
                  <NotificationsNoneOutlinedIcon />
                </IconButton>
              </Tooltip>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Avatar 
                sx={{ 
                  width: 38, 
                  height: 38,
                  bgcolor: theme.palette.primary.main,
                  cursor: 'pointer'
                }}
              >
                U
              </Avatar>
            </motion.div>
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
        
        <motion.div
          variants={drawerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: isSmUp ? 'block' : 'none',
            position: 'fixed',
            height: '100%',
            zIndex: 1200
          }}
        >
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
        </motion.div>
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
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.5 
            }}
          >
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
          </motion.div>
        )}
      </Box>
    </Box>
  );
};

export default Layout;