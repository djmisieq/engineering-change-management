import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
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
  Stack,
  useTheme,
  Stepper,
  Step,
  StepLabel,
  alpha,
  Chip,
  IconButton,
  Tooltip,
  Breadcrumbs,
  Link,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { submitChangeRequest } from '../services/mockApi';
import PageTransition from '../components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';

const steps = ['Informacje podstawowe', 'Szczegóły techniczne', 'Przegląd i zatwierdzenie'];

const RequestForChange: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    impactArea: 'Production',
    requiredDate: '',
    justification: '',
    affectedComponents: [],
    technicalDescription: '',
    testingProcedure: '',
    rollbackPlan: '',
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const formVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };
  
  const formItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <PageTransition>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link 
              color="inherit" 
              href="#" 
              underline="hover" 
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
            >
              Dashboard
            </Link>
            <Typography color="text.primary">Nowe zgłoszenie zmiany</Typography>
          </Breadcrumbs>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                sx={{ 
                  color: theme.palette.text.secondary,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2
                }}
                onClick={() => navigate('/')}
              >
                <ArrowBackIcon />
              </IconButton>
            </motion.div>
            
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 600,
                fontSize: '1.75rem'
              }}
            >
              Nowe zgłoszenie zmiany inżynieryjnej
            </Typography>
          </Box>
        </Box>

        <Paper 
          elevation={0}
          sx={{ 
            borderRadius: 3,
            overflow: 'hidden',
            border: `1px solid ${theme.palette.divider}`,
            mb: 4
          }}
        >
          <Box sx={{ 
            bgcolor: alpha(theme.palette.primary.main, 0.04),
            py: 3,
            px: 4,
            borderBottom: `1px solid ${theme.palette.divider}`
          }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconProps={{
                      style: {
                        color: activeStep === index 
                          ? theme.palette.primary.main
                          : activeStep > index
                            ? theme.palette.success.main
                            : undefined
                      }
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: activeStep === index ? 600 : 400,
                        color: activeStep === index ? 'primary.main' : 'text.primary'
                      }}
                    >
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box sx={{ p: 4 }}>
            <AnimatePresence mode="wait">
              <motion.form
                key={activeStep}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={activeStep === 2 ? handleSubmit : handleNext}
              >
                {activeStep === 0 && (
                  <Stack spacing={4}>
                    <motion.div variants={formItemVariants}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          Informacje podstawowe
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Wprowadź kluczowe informacje o zgłaszanej zmianie inżynieryjnej.
                        </Typography>
                      </Box>
                    </motion.div>
                    
                    <motion.div variants={formItemVariants}>
                      <TextField
                        required
                        fullWidth
                        label="Tytuł zmiany"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Np. Zmiana materiału obudowy silnika SR-200"
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                    </motion.div>

                    <motion.div variants={formItemVariants}>
                      <TextField
                        required
                        fullWidth
                        multiline
                        rows={4}
                        label="Opis zmiany"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Opisz zakres i cel proponowanej zmiany..."
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                    </motion.div>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <motion.div variants={formItemVariants}>
                          <FormControl fullWidth required>
                            <InputLabel>Priorytet</InputLabel>
                            <Select
                              name="priority"
                              value={formData.priority}
                              label="Priorytet"
                              onChange={handleSelectChange}
                              sx={{ borderRadius: 2 }}
                            >
                              <MenuItem value="Low">Niski</MenuItem>
                              <MenuItem value="Medium">Średni</MenuItem>
                              <MenuItem value="High">Wysoki</MenuItem>
                              <MenuItem value="Critical">Krytyczny</MenuItem>
                            </Select>
                          </FormControl>
                        </motion.div>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <motion.div variants={formItemVariants}>
                          <FormControl fullWidth required>
                            <InputLabel>Obszar wpływu</InputLabel>
                            <Select
                              name="impactArea"
                              value={formData.impactArea}
                              label="Obszar wpływu"
                              onChange={handleSelectChange}
                              sx={{ borderRadius: 2 }}
                            >
                              <MenuItem value="Design">Projekt</MenuItem>
                              <MenuItem value="Production">Produkcja</MenuItem>
                              <MenuItem value="Quality">Jakość</MenuItem>
                              <MenuItem value="Documentation">Dokumentacja</MenuItem>
                              <MenuItem value="Other">Inny</MenuItem>
                            </Select>
                          </FormControl>
                        </motion.div>
                      </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <motion.div variants={formItemVariants}>
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
                            InputProps={{
                              sx: { borderRadius: 2 }
                            }}
                          />
                        </motion.div>
                      </Grid>
                    </Grid>

                    <motion.div variants={formItemVariants}>
                      <TextField
                        required
                        fullWidth
                        multiline
                        rows={3}
                        label="Uzasadnienie zmiany"
                        name="justification"
                        value={formData.justification}
                        onChange={handleChange}
                        placeholder="Wyjaśnij, dlaczego ta zmiana jest potrzebna..."
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                    </motion.div>
                  </Stack>
                )}

                {activeStep === 1 && (
                  <Stack spacing={4}>
                    <motion.div variants={formItemVariants}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          Szczegóły techniczne
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Podaj techniczne szczegóły zmiany oraz plan wdrożenia i testów.
                        </Typography>
                      </Box>
                    </motion.div>
                    
                    <motion.div variants={formItemVariants}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Szczegółowy opis techniczny"
                        name="technicalDescription"
                        value={formData.technicalDescription}
                        onChange={handleChange}
                        placeholder="Opisz szczegóły techniczne proponowanej zmiany..."
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                    </motion.div>
                    
                    <motion.div variants={formItemVariants}>
                      <Box sx={{ 
                        border: `1px dashed ${theme.palette.divider}`,
                        borderRadius: 2,
                        p: 3,
                        textAlign: 'center',
                        bgcolor: alpha(theme.palette.primary.main, 0.02)
                      }}>
                        <CloudUploadOutlinedIcon 
                          sx={{ 
                            fontSize: 40, 
                            color: theme.palette.text.secondary,
                            mb: 1
                          }} 
                        />
                        <Typography variant="subtitle1" gutterBottom>
                          Załącz dokumentację techniczną
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Przeciągnij i upuść pliki lub kliknij, aby wybrać
                        </Typography>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outlined"
                            component="label"
                            startIcon={<AttachFileOutlinedIcon />}
                            sx={{ 
                              borderRadius: 2,
                              textTransform: 'none'
                            }}
                          >
                            Wybierz pliki
                            <input
                              type="file"
                              hidden
                              multiple
                            />
                          </Button>
                        </motion.div>
                      </Box>
                    </motion.div>

                    <motion.div variants={formItemVariants}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Procedura testowania"
                        name="testingProcedure"
                        value={formData.testingProcedure}
                        onChange={handleChange}
                        placeholder="Opisz, jak będzie testowana zmiana przed wdrożeniem produkcyjnym..."
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                    </motion.div>

                    <motion.div variants={formItemVariants}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Plan wycofania zmiany"
                        name="rollbackPlan"
                        value={formData.rollbackPlan}
                        onChange={handleChange}
                        placeholder="Opisz plan wycofania zmiany w przypadku problemów..."
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                    </motion.div>
                  </Stack>
                )}

                {activeStep === 2 && (
                  <Stack spacing={4}>
                    <motion.div variants={formItemVariants}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          Przegląd i zatwierdzenie
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Sprawdź wprowadzone informacje przed wysłaniem zgłoszenia.
                        </Typography>
                      </Box>
                    </motion.div>

                    <motion.div variants={formItemVariants}>
                      <Paper 
                        variant="outlined" 
                        sx={{ 
                          p: 3,
                          borderRadius: 2
                        }}
                      >
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              Tytuł
                            </Typography>
                            <Typography variant="body1" paragraph>
                              {formData.title || '(nie określono)'}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              Priorytet
                            </Typography>
                            <Chip 
                              label={formData.priority} 
                              size="small"
                              sx={{ 
                                borderRadius: 1,
                                bgcolor: formData.priority === 'Critical' 
                                  ? alpha(theme.palette.error.main, 0.1)
                                  : formData.priority === 'High'
                                    ? alpha(theme.palette.warning.main, 0.1)
                                    : alpha(theme.palette.info.main, 0.1),
                                color: formData.priority === 'Critical' 
                                  ? theme.palette.error.main
                                  : formData.priority === 'High'
                                    ? theme.palette.warning.main
                                    : theme.palette.info.main
                              }}
                            />
                          </Grid>
                          
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              Obszar wpływu
                            </Typography>
                            <Typography variant="body1" paragraph>
                              {formData.impactArea || '(nie określono)'}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              Wymagana data wdrożenia
                            </Typography>
                            <Typography variant="body1" paragraph>
                              {formData.requiredDate || '(nie określono)'}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                          
                          <Grid item xs={12}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              Opis zmiany
                            </Typography>
                            <Typography variant="body1" paragraph>
                              {formData.description || '(nie określono)'}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={12}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              Uzasadnienie zmiany
                            </Typography>
                            <Typography variant="body1" paragraph>
                              {formData.justification || '(nie określono)'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </motion.div>
                    
                    <motion.div variants={formItemVariants}>
                      <Box sx={{ 
                        p: 3, 
                        bgcolor: alpha(theme.palette.warning.main, 0.05),
                        borderRadius: 2,
                        border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`
                      }}>
                        <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <HelpOutlineOutlinedIcon fontSize="small" color="warning" />
                          Uwaga
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Po zatwierdzeniu zgłoszenia, zostanie ono przesłane do Product Council w celu
                          wstępnej weryfikacji. Możesz śledzić status zgłoszenia na dashboardzie.
                        </Typography>
                      </Box>
                    </motion.div>
                  </Stack>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      variant="outlined"
                      onClick={activeStep === 0 ? () => navigate('/') : handleBack}
                      sx={{ 
                        borderRadius: 2,
                        px: 4
                      }}
                    >
                      {activeStep === 0 ? 'Anuluj' : 'Wstecz'}
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ 
                        borderRadius: 2,
                        px: 4
                      }}
                    >
                      {activeStep === steps.length - 1 ? 'Zatwierdź i wyślij' : 'Dalej'}
                    </Button>
                  </motion.div>
                </Box>
              </motion.form>
            </AnimatePresence>
          </Box>
        </Paper>

        <Snackbar 
          open={openSnackbar} 
          autoHideDuration={6000} 
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setOpenSnackbar(false)} 
            severity="success" 
            variant="filled"
            sx={{ width: '100%' }}
          >
            Formularz zmiany został pomyślnie przesłany!
          </Alert>
        </Snackbar>
      </Box>
    </PageTransition>
  );
};

export default RequestForChange;