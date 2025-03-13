import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Chip,
  Button,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Alert,
  TextField,
  Snackbar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getChangeById, updateChangeStatus } from '../services/mockApi';
import { Change } from '../types/change';

const steps = [
  'Zgłoszenie zmiany',
  'Weryfikacja przez Product Council',
  'Weryfikacja inżynieryjna',
  'Zatwierdzenie',
  'Wdrożenie zmiany',
  'Zakończone'
];

const getStepIndex = (status: string): number => {
  switch (status) {
    case 'New':
      return 0;
    case 'UnderReview':
      return 1;
    case 'InProgress':
      return 2;
    case 'Approved':
      return 3;
    case 'Implementing':
      return 4;
    case 'Resolved':
      return 5;
    default:
      return 0;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'New':
      return 'primary';
    case 'InProgress':
    case 'UnderReview':
    case 'Implementing':
      return 'warning';
    case 'Approved':
    case 'Resolved':
      return 'success';
    case 'Rejected':
      return 'error';
    default:
      return 'default';
  }
};

const ChangeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [change, setChange] = useState<Change | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [comment, setComment] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  useEffect(() => {
    const fetchChange = async () => {
      try {
        if (id) {
          const data = await getChangeById(id);
          setChange(data);
        }
      } catch (error) {
        console.error('Error fetching change details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChange();
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    try {
      if (id) {
        await updateChangeStatus(id, newStatus);
        setChange((prev) => prev ? { ...prev, status: newStatus } : null);
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      // W rzeczywistej implementacji, wysłanie komentarza do API
      console.log('Submitting comment:', comment);
      setComment('');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Typography>Ładowanie...</Typography>
      </Container>
    );
  }

  if (!change) {
    return (
      <Container maxWidth="md">
        <Alert severity="error">Nie znaleziono zmiany o ID: {id}</Alert>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Powrót do Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/')}
          sx={{ mr: 2 }}
        >
          Powrót
        </Button>
        <Typography variant="h4" component="h1">
          Szczegóły zmiany #{change.id}
        </Typography>
      </Box>

      <Paper sx={{ mb: 4, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" component="h2" gutterBottom>
              {change.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {change.description}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">Status</Typography>
                <Chip 
                  label={change.status} 
                  color={getStatusColor(change.status) as any} 
                  sx={{ mt: 1 }}
                />
                
                <Typography variant="subtitle2" color="textSecondary" sx={{ mt: 2 }}>Priorytet</Typography>
                <Typography variant="body1">{change.priority}</Typography>
                
                <Typography variant="subtitle2" color="textSecondary" sx={{ mt: 2 }}>Autor</Typography>
                <Typography variant="body1">{change.author}</Typography>
                
                <Typography variant="subtitle2" color="textSecondary" sx={{ mt: 2 }}>Data utworzenia</Typography>
                <Typography variant="body1">{new Date(change.createdAt).toLocaleDateString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ mb: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Postęp procesu
        </Typography>
        <Stepper activeStep={getStepIndex(change.status)} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          {change.status === 'New' && (
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleStatusChange('UnderReview')}
            >
              Rozpocznij weryfikację
            </Button>
          )}
          {change.status === 'UnderReview' && (
            <>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={() => handleStatusChange('Rejected')}
              >
                Odrzuć zmianę
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleStatusChange('InProgress')}
              >
                Zaakceptuj i wyślij do weryfikacji inżynieryjnej
              </Button>
            </>
          )}
          {change.status === 'InProgress' && (
            <>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={() => handleStatusChange('Rejected')}
              >
                Odrzuć zmianę
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleStatusChange('Approved')}
              >
                Zatwierdź zmianę
              </Button>
            </>
          )}
          {change.status === 'Approved' && (
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleStatusChange('Implementing')}
            >
              Rozpocznij wdrażanie
            </Button>
          )}
          {change.status === 'Implementing' && (
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => handleStatusChange('Resolved')}
            >
              Zakończ wdrażanie
            </Button>
          )}
        </Box>
      </Paper>

      <Paper sx={{ mb: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Komentarze i historia zmian
        </Typography>
        
        <List>
          <ListItem divider>
            <ListItemText
              primary="System"
              secondary={`Zmiana utworzona przez ${change.author} dnia ${new Date(change.createdAt).toLocaleDateString()}`}
            />
          </ListItem>
          {/* Tu będą wyświetlane komentarze i historia zmian */}
        </List>
        
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Dodaj komentarz"
            multiline
            rows={2}
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button 
              variant="contained" 
              onClick={handleCommentSubmit} 
              disabled={!comment.trim()}
            >
              Dodaj komentarz
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Status zmiany został zaktualizowany!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ChangeDetails;