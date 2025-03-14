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

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`panel-tabpanel-${index}`}
      aria-labelledby={`panel-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Dashboard: React.FC = () => {
  const [changes, setChanges] = useState<Change[]>([]);
  const [changeTypes, setChangeTypes] = useState<ChangeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [filterReasonOfChange, setFilterReasonOfChange] = useState('');
  const [filterBoatRange, setFilterBoatRange] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Równoległe pobieranie danych
        const [changesData, typesData] = await Promise.all([
          getMockChanges(),
          getChangeTypes()
        ]);
        
        setChanges(changesData);
        setChangeTypes(typesData.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFilterReasonChange = (event: SelectChangeEvent) => {
    setFilterReasonOfChange(event.target.value);
  };

  const handleFilterRangeChange = (event: SelectChangeEvent) => {
    setFilterBoatRange(event.target.value);
  };

  // Funkcja zwracająca kolor/etykietę dla typu zmiany
  const getChangeTypeInfo = (typeId: string | undefined) => {
    if (!typeId) return { code: "", label: "Nieokreślony", color: theme.palette.grey[500] };
    
    const type = changeTypes.find(t => t.id === typeId);
    if (!type) return { code: "", label: "Nieokreślony", color: theme.palette.grey[500] };
    
    const parts = type.code.split(' - ');
    const number = parts[0];
    
    let color;
    switch (number) {
      case "1":
        color = theme.palette.info.main;
        break;
      case "2":
        color = theme.palette.warning.main;
        break;
      case "3":
        color = theme.palette.success.main;
        break;
      case "4":
        color = theme.palette.secondary.main;
        break;
      default:
        color = theme.palette.primary.main;
    }
    
    return {
      code: number,
      label: parts[1] || type.name,
      color: color
    };
  };

  // Filtrowanie zmian w zależności od aktywnej zakładki
  const filteredChanges = changes.filter(change => {
    // Podstawowe filtrowanie wg zakładek
    if (tabValue === 0) { // Voting
      return change.votingStatus === 'Pending' || change.votingStatus === 'InProgress';
    } else if (tabValue === 1) { // Progress
      return change.status === 'InProgress' || change.status === 'Implementing';
    } else { // Archive
      return change.votingStatus === 'Completed' || change.votingStatus === 'Canceled';
    }
  }).filter(change => {
    // Dodatkowe filtrowanie - typ zmiany
    if (filterReasonOfChange && change.reasonOfChange !== filterReasonOfChange) {
      return false;
    }
    
    // Dodatkowe filtrowanie - zakres łodzi
    if (filterBoatRange && change.boatRange !== filterBoatRange) {
      return false;
    }
    
    return true;
  });

  return (
    <PageTransition>
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 8 }}>
        {/* Nagłówek */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ width: 240 }}>
            <SaxdorLogo />
          </Box>
          <Typography 
            variant="h4" 
            component="h1" 
            align="center"
            sx={{ 
              fontWeight: 'bold',
              flex: 1
            }}
          >
            Product Council Panel
          </Typography>
          <Box sx={{ width: 240, display: 'flex', justifyContent: 'flex-end' }}>
            <TextField
              placeholder="Search by ECR title"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2 }
              }}
              sx={{ width: 200 }}
            />
          </Box>
        </Box>
        
        <Grid container spacing={4}>
          {/* Panel boczny */}
          <Grid item xs={12} md={1}>
            <Paper 
              elevation={0}
              sx={{ 
                borderRadius: 2,
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center'
              }}
            >
              <SidebarIcon 
                icon={<Avatar src="/api/placeholder/60/60" alt="User" sx={{ width: 36, height: 36 }} />} 
                label="Product Council" 
                active={true}
              />
              <Divider flexItem />
              <SidebarIcon icon={<PersonOutlineIcon />} label="Manager Panel" />
              <SidebarIcon icon={<DescriptionOutlinedIcon />} label="Engineer" />
              <SidebarIcon icon={<ShoppingCartOutlinedIcon />} label="Sourcing" />
              <SidebarIcon icon={<AssessmentOutlinedIcon />} label="Quality" badge={3} />
              <SidebarIcon icon={<PeopleOutlineIcon />} label="Purchasing" />
              <SidebarIcon icon={<FolderOpenOutlinedIcon />} label="Finance" />
              <SidebarIcon icon={<DescriptionOutlinedIcon />} label="Product" />
              <SidebarIcon icon={<CalendarMonthOutlinedIcon />} label="Calendar" />
            </Paper>
          </Grid>
          
          {/* Główna zawartość */}
          <Grid item xs={12} md={11}>
            <Paper
              elevation={0}
              sx={{ 
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              {/* Zakładki */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange}
                  variant="fullWidth"
                >
                  <Tab label="Voting" />
                  <Tab label="Progress" />
                  <Tab label="Archive" />
                </Tabs>
              </Box>
              
              {/* Filtry */}
              <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <Select
                    value={filterReasonOfChange}
                    onChange={handleFilterReasonChange}
                    displayEmpty
                    IconComponent={KeyboardArrowDownIcon}
                    sx={{ borderRadius: 1 }}
                  >
                    <MenuItem value="">
                      <em>Reason of change</em>
                    </MenuItem>
                    <MenuItem value="reason-001">Customer Request</MenuItem>
                    <MenuItem value="reason-002">Quality Issue</MenuItem>
                    <MenuItem value="reason-003">Safety Concern</MenuItem>
                    <MenuItem value="reason-004">Cost Optimization</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select
                    value={filterBoatRange}
                    onChange={handleFilterRangeChange}
                    displayEmpty
                    IconComponent={KeyboardArrowDownIcon}
                    sx={{ borderRadius: 1 }}
                  >
                    <MenuItem value="">
                      <em>Boat range</em>
                    </MenuItem>
                    <MenuItem value="range-001">SX</MenuItem>
                    <MenuItem value="range-002">NX</MenuItem>
                    <MenuItem value="range-003">FX</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select
                    value=""
                    displayEmpty
                    IconComponent={KeyboardArrowDownIcon}
                    sx={{ borderRadius: 1 }}
                  >
                    <MenuItem value="">
                      <em>Created from</em>
                    </MenuItem>
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="yesterday">Yesterday</MenuItem>
                    <MenuItem value="lastWeek">Last week</MenuItem>
                    <MenuItem value="lastMonth">Last month</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select
                    value=""
                    displayEmpty
                    IconComponent={KeyboardArrowDownIcon}
                    sx={{ borderRadius: 1 }}
                  >
                    <MenuItem value="">
                      <em>Created until</em>
                    </MenuItem>
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="yesterday">Yesterday</MenuItem>
                    <MenuItem value="lastWeek">Last week</MenuItem>
                    <MenuItem value="lastMonth">Last month</MenuItem>
                  </Select>
                </FormControl>
              </Box>
