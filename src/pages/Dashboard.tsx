import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  useTheme,
  alpha,
  Skeleton,
  Stack,
  Divider,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Avatar,
  Badge,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { getMockChanges } from '../services/mockApi';
import { 
  getChangeTypes 
} from '../services/dictionaryApi';
import { Change } from '../types/change';
import { ChangeType } from '../types/dictionaries';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

// Logo SAXDOR
const SaxdorLogo = () => (
  <svg width="150" height="40" viewBox="0 0 150 40" fill="none">
    <path d="M35.4805 19.9997H11.1602V24.0412H35.4805V19.9997Z" fill="#0C2340"/>
    <path d="M35.4805 27.9656H11.1602V32.0071H35.4805V27.9656Z" fill="#0C2340"/>
    <path d="M35.4805 12.0337H11.1602V16.0752H35.4805V12.0337Z" fill="#0C2340"/>
    <path d="M53.2266 12.0338H47.5V32.0072H53.2266V12.0338Z" fill="#0C2340"/>
    <path d="M68.4724 12.0338L64.4307 20.6411L68.4724 29.2483V32.0072H62.7458V29.2483L58.7041 20.6411L62.7458 12.0338H68.4724Z" fill="#0C2340"/>
    <path d="M84.8989 22.0189H82.8787V17.9774H84.8989C85.999 17.9774 86.9191 18.3183 86.9191 19.9982C86.9191 21.678 85.999 22.0189 84.8989 22.0189ZM84.8989 12.0338H79.1724V32.0072H82.8787V27.9656H84.8989C90.6254 27.9656 90.6254 22.0189 90.6254 19.9982C90.6254 17.9774 90.6254 12.0338 84.8989 12.0338Z" fill="#0C2340"/>
    <path d="M106.312 12.0338C98.5654 12.0338 98.5654 15.7344 98.5654 22.0189C98.5654 28.3034 98.5654 32.0072 106.312 32.0072H107.592V27.9656H106.312C102.606 27.9656 102.272 26.2858 102.272 22.0189C102.272 17.7519 102.606 16.0752 106.312 16.0752H107.592V12.0338H106.312Z" fill="#0C2340"/>
    <path d="M118.593 12.0338C115.572 12.0338 113.552 14.0545 113.552 17.0760V32.0071H117.258V17.0760C117.258 16.0752 117.938 16.0752 118.593 16.0752H123V12.0338H118.593Z" fill="#0C2340"/>
    <path d="M143.034 25.6116L140.333 17.9774H138.313L135.612 25.6116L132.911 17.9774H129.204L134.331 32.0072H136.892L139.323 24.7131L141.754 32.0072H144.315L149.442 17.9774H145.735L143.034 25.6116Z" fill="#0C2340"/>
  </svg>
);

// Ikony dla różnych sekcji w panelu bocznym
const SidebarIcon = ({
  icon,
  label,
  active = false,
  badge = 0
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
}) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pb: 1,
        cursor: 'pointer',
        opacity: active ? 1 : 0.6,
        '&:hover': {
          opacity: 1
        }
      }}
    >
      <Badge
        badgeContent={badge > 0 ? badge : null}
        color="error"
        sx={{ mb: 0.5 }}
      >
        <Avatar
          sx={{
            bgcolor: active ? theme.palette.primary.main : 'transparent',
            color: active ? 'white' : theme.palette.text.primary,
            width: 36,
            height: 36
          }}
        >
          {icon}
        </Avatar>
      </Badge>
      <Typography
        variant="caption"
        align="center"
        sx={{
          fontSize: '0.7rem',
          color: theme.palette.text.secondary
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

// Komponent przycisku głosowania
const VoteButton = ({ type, onClick }: { type: 'yes' | 'no'; onClick?: () => void }) => {
  return (
    <Button
      variant="contained"
      size="small"
      color={type === 'yes' ? 'success' : 'error'}
      startIcon={type === 'yes' ? <CheckCircleIcon /> : <CancelIcon />}
      sx={{
        borderRadius: 1,
        px: 2
      }}
      onClick={onClick}
    >
      {type === 'yes' ? 'Yes' : 'No'}
    </Button>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}