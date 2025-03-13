import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import { submitChangeRequest } from '../services/mockApi';

const RequestForChange: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    impactArea: 'Production',
    requiredDate: '',
    justification: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await submitChangeRequest(formData);
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <Box sx={{ p: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Formularz zgłoszenia zmiany inżynieryjnej
          </Typography>
          <Divider sx={{ mb: 4 }} />

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Tytuł zmiany"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  label="Opis zmiany"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Priorytet</InputLabel>
                  <Select
                    name="priority"
                    value={formData.priority}
                    label="Priorytet"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="Low">Niski</MenuItem>
                    <MenuItem value="Medium">Średni</MenuItem>
                    <MenuItem value="High">Wysoki</MenuItem>
                    <MenuItem value="Critical">Krytyczny</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Obszar wpływu</InputLabel>
                  <Select
                    name="impactArea"
                    value={formData.impactArea}
                    label="Obszar wpływu"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="Design">Projekt</MenuItem>
                    <MenuItem value="Production">Produkcja</MenuItem>
                    <MenuItem value="Quality">Jakość</MenuItem>
                    <MenuItem value="Documentation">Dokumentacja</MenuItem>
                    <MenuItem value="Other">Inny</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Wymagana data wdrożenia"
                  name="requiredDate"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.requiredDate}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={3}
                  label="Uzasadnienie zmiany"
                  name="justification"
                  value={formData.justification}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    onClick={() => navigate('/')}
                  >
                    Anuluj
                  </Button>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                  >
                    Zatwierdź i wyślij
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
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
          Formularz zmiany został pomyślnie przesłany!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RequestForChange;