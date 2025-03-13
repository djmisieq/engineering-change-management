import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
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
  Box,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getMockChanges } from '../services/mockApi';
import { Change } from '../types/change';

const Dashboard: React.FC = () => {
  const [changes, setChanges] = useState<Change[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Pobierz dane z MockAPI
    const fetchChanges = async () => {
      const data = await getMockChanges();
      setChanges(data);
    };

    fetchChanges();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'primary';
      case 'InProgress':
        return 'warning';
      case 'Resolved':
        return 'success';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const countByStatus = (status: string) => {
    return changes.filter((change) => change.status === status).length;
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/request')}
        >
          Nowa zmiana
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Nowe zgłoszenia
              </Typography>
              <Typography variant="h5" component="div">
                {countByStatus('New')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                W trakcie
              </Typography>
              <Typography variant="h5" component="div">
                {countByStatus('InProgress')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Rozwiązane
              </Typography>
              <Typography variant="h5" component="div">
                {countByStatus('Resolved')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Odrzucone
              </Typography>
              <Typography variant="h5" component="div">
                {countByStatus('Rejected')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Tytuł</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Data utworzenia</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priorytet</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {changes.map((change) => (
                <TableRow
                  hover
                  key={change.id}
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                  onClick={() => navigate(`/change/${change.id}`)}
                >
                  <TableCell>{change.id}</TableCell>
                  <TableCell>{change.title}</TableCell>
                  <TableCell>{change.author}</TableCell>
                  <TableCell>{new Date(change.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={change.status}
                      color={getStatusColor(change.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{change.priority}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Dashboard;