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
  Card,
  CardContent,
  useTheme,
  alpha,
  IconButton,
  TablePagination,
  Tooltip,
  Skeleton,
  Stack,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CircleIcon from '@mui/icons-material/Circle';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { getMockChanges } from '../services/mockApi';
import { Change } from '../types/change';

const Dashboard: React.FC = () => {
  const [changes, setChanges] = useState<Change[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchChanges = async () => {
      try {
        setLoading(true);
        const data = await getMockChanges();
        setChanges(data);
      } catch (error) {
        console.error('Error fetching changes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChanges();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'New':
        return {
          color: theme.palette.primary.main,
          label: 'Nowe',
          background: alpha(theme.palette.primary.main, 0.1),
        };
      case 'InProgress':
        return {
          color: theme.palette.warning.main,
          label: 'W trakcie',
          background: alpha(theme.palette.warning.main, 0.1),
        };
      case 'Resolved':
        return {
          color: theme.palette.success.main,
          label: 'Rozwiązane',
          background: alpha(theme.palette.success.main, 0.1),
        };
      case 'Rejected':
        return {
          color: theme.palette.error.main,
          label: 'Odrzucone',
          background: alpha(theme.palette.error.main, 0.1),
        };
      case 'Approved':
        return {
          color: '#8256d0',
          label: 'Zatwierdzone',
          background: alpha('#8256d0', 0.1),
        };
      case 'Implementing':
        return {
          color: theme.palette.info.main,
          label: 'Wdrażane',
          background: alpha(theme.palette.info.main, 0.1),
        };
      default:
        return {
          color: theme.palette.grey[500],
          label: status,
          background: alpha(theme.palette.grey[500], 0.1),
        };
    }
  };

  const getPriorityInfo = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return {
          color: theme.palette.error.main,
          icon: <CircleIcon fontSize="small" />,
        };
      case 'High':
        return {
          color: theme.palette.warning.main,
          icon: <CircleIcon fontSize="small" />,
        };
      case 'Medium':
        return {
          color: theme.palette.info.main,
          icon: <CircleIcon fontSize="small" />,
        };
      case 'Low':
        return {
          color: theme.palette.success.main,
          icon: <CircleIcon fontSize="small" />,
        };
      default:
        return {
          color: theme.palette.grey[500],
          icon: <CircleIcon fontSize="small" />,
        };
    }
  };

  const countByStatus = (status: string) => {
    return changes.filter((change) => change.status === status).length;
  };

  const StatCard = ({ 
    title, 
    value, 
    trend, 
    color,
    iconBackground
  }: { 
    title: string; 
    value: number; 
    trend?: number;
    color: string;
    iconBackground: string;
  }) => (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%',
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography 
            color="text.secondary" 
            variant="subtitle2"
            sx={{ fontWeight: 500 }}
          >
            {title}
          </Typography>
          <Box 
            sx={{ 
              borderRadius: '50%', 
              width: 40, 
              height: 40, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: iconBackground,
            }}
          >
            <CircleIcon sx={{ color: color, fontSize: 10 }} />
          </Box>
        </Box>
        
        {loading ? (
          <Skeleton variant="text" width="50%" height={40} />
        ) : (
          <Typography 
            variant="h4" 
            component="div"
            sx={{ 
              fontWeight: 600,
              mb: 1,
              color: theme.palette.text.primary
            }}
          >
            {value}
          </Typography>
        )}
        
        {trend !== undefined && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            {trend >= 0 ? (
              <TrendingUpIcon 
                fontSize="small" 
                sx={{ color: theme.palette.success.main, mr: 0.5 }} 
              />
            ) : (
              <TrendingDownIcon 
                fontSize="small" 
                sx={{ color: theme.palette.error.main, mr: 0.5 }} 
              />
            )}
            <Typography 
              variant="body2" 
              component="span"
              sx={{ 
                color: trend >= 0 
                  ? theme.palette.success.main 
                  : theme.palette.error.main,
                fontWeight: 500
              }}
            >
              {Math.abs(trend)}% 
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ ml: 0.5 }}
            >
              od ostatniego miesiąca
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h1" 
          sx={{ 
            mb: 1,
            fontWeight: 600,
            fontSize: '1.75rem'
          }}
        >
          Dashboard
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ maxWidth: '650px' }}
        >
          Przegląd kluczowych metryk i ostatnich zgłoszeń zmian inżynieryjnych w systemie.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard 
            title="Nowe zgłoszenia" 
            value={countByStatus('New')} 
            trend={12}
            color={theme.palette.primary.main}
            iconBackground={alpha(theme.palette.primary.main, 0.1)}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard 
            title="W trakcie" 
            value={countByStatus('InProgress') + countByStatus('Implementing')} 
            trend={-5}
            color={theme.palette.warning.main}
            iconBackground={alpha(theme.palette.warning.main, 0.1)}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard 
            title="Rozwiązane" 
            value={countByStatus('Resolved')} 
            trend={8}
            color={theme.palette.success.main}
            iconBackground={alpha(theme.palette.success.main, 0.1)}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard 
            title="Odrzucone" 
            value={countByStatus('Rejected')} 
            trend={-2}
            color={theme.palette.error.main}
            iconBackground={alpha(theme.palette.error.main, 0.1)}
          />
        </Grid>
      </Grid>

      <Paper 
        elevation={0}
        sx={{ 
          width: '100%', 
          overflow: 'hidden',
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          mb: 4
        }}
      >
        <Box
          sx={{
            p: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography 
            variant="h3" 
            sx={{ fontWeight: 600 }}
          >
            Ostatnie zgłoszenia
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Wyszukaj">
              <IconButton size="small">
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filtruj">
              <IconButton size="small">
                <FilterAltOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        <TableContainer>
          {loading ? (
            <Box sx={{ p: 3 }}>
              <Stack spacing={2}>
                {[...Array(5)].map((_, index) => (
                  <Skeleton 
                    key={index} 
                    variant="rectangular" 
                    height={56} 
                    sx={{ borderRadius: 1 }}
                  />
                ))}
              </Stack>
            </Box>
          ) : (
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Tytuł</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Autor</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Data utworzenia</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Priorytet</TableCell>
                  <TableCell sx={{ width: 50 }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? changes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : changes
                ).map((change) => {
                  const statusInfo = getStatusInfo(change.status);
                  const priorityInfo = getPriorityInfo(change.priority);
                  
                  return (
                    <TableRow
                      hover
                      key={change.id}
                      sx={{ 
                        '&:hover': { cursor: 'pointer' },
                        '&:last-child td, &:last-child th': { border: 0 }
                      }}
                      onClick={() => navigate(`/change/${change.id}`)}
                    >
                      <TableCell 
                        sx={{ 
                          color: theme.palette.primary.main,
                          fontWeight: 500 
                        }}
                      >
                        {change.id}
                      </TableCell>
                      <TableCell>{change.title}</TableCell>
                      <TableCell>{change.author}</TableCell>
                      <TableCell>
                        {new Date(change.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={statusInfo.label}
                          size="small"
                          sx={{ 
                            backgroundColor: statusInfo.background,
                            color: statusInfo.color,
                            fontWeight: 500,
                            borderRadius: '6px',
                            '& .MuiChip-label': { px: 1.5 }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box 
                            component="span" 
                            sx={{ 
                              color: priorityInfo.color,
                              display: 'flex',
                              mr: 1,
                              transform: 'scale(0.6)'
                            }}
                          >
                            {priorityInfo.icon}
                          </Box>
                          {change.priority}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Menu options
                          }}
                        >
                          <MoreHorizIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={changes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default Dashboard;