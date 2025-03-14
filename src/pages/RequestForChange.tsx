import React, { useState, useEffect } from 'react';
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
  alpha,
  Chip,
  IconButton,
  Tooltip,
  Breadcrumbs,
  Link,
  InputAdornment,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { submitChangeRequest } from '../services/mockApi';
import { 
  getBoatRanges, 
  getBoatModels,
  getChangeTypes,
  getChangeReasons 
} from '../services/dictionaryApi';
import { 
  BoatRange, 
  BoatModel,
  ChangeType,
  ChangeReason 
} from '../types/dictionaries';
import PageTransition from '../components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';

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

const RequestForChange: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    impactArea: '',
    requiredDate: '',
    justification: '',
    // Nowe pola
    boatRange: '',
    model: '',
    suggestedBy: '',
    typeOfChange: '',
    reasonOfChange: '',
    estimatedCostOfLabor: '',
    estimatedCostOfParts: '',
  });
  
  // Słowniki dla list wyboru
  const [boatRanges, setBoatRanges] = useState<BoatRange[]>([]);
  const [boatModels, setBoatModels] = useState<BoatModel[]>([]);
  const [changeTypes, setChangeTypes] = useState<ChangeType[]>([]);
  const [changeReasons, setChangeReasons] = useState<ChangeReason[]>([]);
  
  // Stany ładowania dla list rozwijanych
  const [loadingRanges, setLoadingRanges] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [loadingReasons, setLoadingReasons] = useState(false);
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  // Pobieranie słowników podczas inicjalizacji komponentu
  useEffect(() => {
    const fetchDictionaries = async () => {
      try {
        setLoadingRanges(true);
        setLoadingTypes(true);
        setLoadingReasons(true);
        
        const [rangesResponse, typesResponse, reasonsResponse] = await Promise.all([
          getBoatRanges(),
          getChangeTypes(),
          getChangeReasons()
        ]);
        
        setBoatRanges(rangesResponse.items);
        setChangeTypes(typesResponse.items);
        setChangeReasons(reasonsResponse.items);
      } catch (error) {
        console.error('Błąd podczas pobierania słowników', error);
      } finally {
        setLoadingRanges(false);
        setLoadingTypes(false);
        setLoadingReasons(false);
      }
    };
    
    fetchDictionaries();
  }, []);
  
  // Pobieranie modeli dla wybranego zakresu łodzi
  useEffect(() => {
    const fetchModels = async () => {
      if (formData.boatRange) {
        try {
          setLoadingModels(true);
          const modelsResponse = await getBoatModels(formData.boatRange);
          setBoatModels(modelsResponse.items);
        } catch (error) {
          console.error('Błąd podczas pobierania modeli', error);
        } finally {
          setLoadingModels(false);
        }
      } else {
        setBoatModels([]);
      }
    };
    
    fetchModels();
  }, [formData.boatRange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    // Walidacja, aby upewnić się, że wprowadzane są tylko liczby
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles((prevFiles) => prevFiles.filter(file => file !== fileToRemove));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await submitChangeRequest({
        ...formData,
        estimatedCostOfLabor: formData.estimatedCostOfLabor ? parseFloat(formData.estimatedCostOfLabor) : 0,
        estimatedCostOfParts: formData.estimatedCostOfParts ? parseFloat(formData.estimatedCostOfParts) : 0,
      });
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <PageTransition>
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 8 }}>
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
              flex: 1,
              textTransform: 'uppercase'
            }}
          >
            HOW TO ENTER A REQUEST
          </Typography>
          <Box sx={{ width: 240 }} />
        </Box>
        
        <Grid container spacing={4}>
          {/* Lewa kolumna menu */}
          <Grid item xs={12} md={3}>
            <Paper 
              elevation={0}
              sx={{ 
                borderRadius: 2,
                overflow: 'hidden',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Stack spacing={0.5} sx={{ p: 2 }}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ 
                      borderRadius: 1,
                      justifyContent: 'flex-start',
                      p: 1.5,
                      fontWeight: 'bold',
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.05)
                    }}
                  >
                    Engineering Change Request
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ 
                      borderRadius: 1,
                      justifyContent: 'flex-start',
                      p: 1.5
                    }}
                    onClick={() => navigate('/')}
                  >
                    List of requests
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ 
                      borderRadius: 1,
                      justifyContent: 'flex-start',
                      p: 1.5
                    }}
                  >
                    BI Report
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ 
                      borderRadius: 1,
                      justifyContent: 'flex-start',
                      p: 1.5
                    }}
                  >
                    ECN Generator
                  </Button>
                </motion.div>
                
                <Box sx={{ my: 4 }} />
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ 
                      borderRadius: 1,
                      justifyContent: 'flex-start',
                      p: 1.5,
                      fontSize: '0.75rem'
                    }}
                  >
                    Request application improvements
                  </Button>
                </motion.div>
              </Stack>
            </Paper>
          </Grid>
          
          {/* Główna zawartość - formularz */}
          <Grid item xs={12} md={9}>
            <Box 
              component="form" 
              onSubmit={handleSubmit}
              sx={{ 
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: 4
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
                <Button
                  variant="outlined"
                  size="medium"
                  startIcon={<ArrowBackIosNewIcon fontSize="small" />}
                  sx={{
                    borderRadius: 4,
                    border: '1px solid #ccc',
                    color: '#555',
                    px: 2
                  }}
                >
                  Enter request
                </Button>
              </Box>
              
              <Paper 
                elevation={0}
                sx={{ 
                  borderRadius: 2,
                  border: '1px solid #ddd',
                  p: 3
                }}
              >
                <Stack spacing={3}>
                  {/* Tytuł */}
                  <Box>
                    <InputLabel 
                      required 
                      htmlFor="title"
                      sx={{ 
                        mb: 1,
                        fontWeight: 'medium',
                        fontSize: '0.875rem'
                      }}
                    >
                      Title
                    </InputLabel>
                    <TextField
                      id="title"
                      fullWidth
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1,
                        }
                      }}
                    />
                  </Box>
                  
                  {/* Boat range */}
                  <Box>
                    <InputLabel 
                      required 
                      htmlFor="boatRange"
                      sx={{ 
                        mb: 1,
                        fontWeight: 'medium',
                        fontSize: '0.875rem'
                      }}
                    >
                      Boat range
                    </InputLabel>
                    <FormControl fullWidth>
                      <Select
                        id="boatRange"
                        name="boatRange"
                        value={formData.boatRange}
                        onChange={handleSelectChange}
                        displayEmpty
                        IconComponent={KeyboardArrowDownIcon}
                        sx={{ 
                          borderRadius: 1,
                        }}
                        endAdornment={
                          loadingRanges ? (
                            <InputAdornment position="end">
                              <CircularProgress size={20} />
                            </InputAdornment>
                          ) : null
                        }
                      >
                        <MenuItem value="">
                          <em>Wybierz zakres łodzi</em>
                        </MenuItem>
                        {boatRanges.map((range) => (
                          <MenuItem key={range.id} value={range.id}>
                            {range.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  
                  {/* Model */}
                  <Box>
                    <InputLabel 
                      required 
                      htmlFor="model"
                      sx={{ 
                        mb: 1,
                        fontWeight: 'medium',
                        fontSize: '0.875rem'
                      }}
                    >
                      Model
                    </InputLabel>
                    <FormControl fullWidth>
                      <Select
                        id="model"
                        name="model"
                        value={formData.model}
                        onChange={handleSelectChange}
                        displayEmpty
                        disabled={!formData.boatRange || loadingModels}
                        IconComponent={KeyboardArrowDownIcon}
                        sx={{ 
                          borderRadius: 1,
                        }}
                        endAdornment={
                          loadingModels ? (
                            <InputAdornment position="end">
                              <CircularProgress size={20} />
                            </InputAdornment>
                          ) : null
                        }
                      >
                        <MenuItem value="">
                          <em>Wybierz model łodzi</em>
                        </MenuItem>
                        {boatModels.map((model) => (
                          <MenuItem key={model.id} value={model.id}>
                            {model.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  
                  {/* Suggested by */}
                  <Box>
                    <InputLabel 
                      htmlFor="suggestedBy"
                      sx={{ 
                        mb: 1,
                        fontWeight: 'medium',
                        fontSize: '0.875rem'
                      }}
                    >
                      Suggested by
                    </InputLabel>
                    <TextField
                      id="suggestedBy"
                      fullWidth
                      name="suggestedBy"
                      value={formData.suggestedBy}
                      onChange={handleChange}
                      placeholder="Np. Dział Inżynierii, Klient, itp."
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1,
                        }
                      }}
                    />
                  </Box>
                  
                  {/* Type of change */}
                  <Box>
                    <InputLabel 
                      required 
                      htmlFor="typeOfChange"
                      sx={{ 
                        mb: 1,
                        fontWeight: 'medium',
                        fontSize: '0.875rem'
                      }}
                    >
                      Type of change
                    </InputLabel>
                    <FormControl fullWidth>
                      <Select
                        id="typeOfChange"
                        name="typeOfChange"
                        value={formData.typeOfChange}
                        onChange={handleSelectChange}
                        displayEmpty
                        IconComponent={KeyboardArrowDownIcon}
                        sx={{ 
                          borderRadius: 1,
                        }}
                        endAdornment={
                          loadingTypes ? (
                            <InputAdornment position="end">
                              <CircularProgress size={20} />
                            </InputAdornment>
                          ) : null
                        }
                      >
                        <MenuItem value="">
                          <em>Wybierz typ zmiany</em>
                        </MenuItem>
                        {changeTypes.map((type) => (
                          <MenuItem key={type.id} value={type.id}>
                            {type.code} - {type.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  
                  {/* Reason of change */}
                  <Box>
                    <InputLabel 
                      required 
                      htmlFor="reasonOfChange"
                      sx={{ 
                        mb: 1,
                        fontWeight: 'medium',
                        fontSize: '0.875rem'
                      }}
                    >
                      Reason of change
                    </InputLabel>
                    <FormControl fullWidth>
                      <Select
                        id="reasonOfChange"
                        name="reasonOfChange"
                        value={formData.reasonOfChange}
                        onChange={handleSelectChange}
                        displayEmpty
                        IconComponent={KeyboardArrowDownIcon}
                        sx={{ 
                          borderRadius: 1,
                        }}
                        endAdornment={
                          loadingReasons ? (
                            <InputAdornment position="end">
                              <CircularProgress size={20} />
                            </InputAdornment>
                          ) : null
                        }
                      >
                        <MenuItem value="">
                          <em>Wybierz powód zmiany</em>
                        </MenuItem>
                        {changeReasons.map((reason) => (
                          <MenuItem key={reason.id} value={reason.id}>
                            {reason.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  
                  {/* Opis */}
                  <Box>
                    <InputLabel 
                      required 
                      htmlFor="description"
                      sx={{ 
                        mb: 1,
                        fontWeight: 'medium',
                        fontSize: '0.875rem'
                      }}
                    >
                      Description
                    </InputLabel>
                    <TextField
                      id="description"
                      fullWidth
                      multiline
                      rows={4}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1,
                        }
                      }}
                    />
                  </Box>
                  
                  {/* Koszty */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <InputLabel 
                        htmlFor="estimatedCostOfLabor"
                        sx={{ 
                          mb: 1,
                          fontWeight: 'medium',
                          fontSize: '0.875rem'
                        }}
                      >
                        Estimated cost of labor
                      </InputLabel>
                      <TextField
                        id="estimatedCostOfLabor"
                        fullWidth
                        name="estimatedCostOfLabor"
                        value={formData.estimatedCostOfLabor}
                        onChange={handleNumberChange}
                        type="number"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">€</InputAdornment>,
                          sx: { borderRadius: 1 }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel 
                        htmlFor="estimatedCostOfParts"
                        sx={{ 
                          mb: 1,
                          fontWeight: 'medium',
                          fontSize: '0.875rem'
                        }}
                      >
                        Estimated cost of parts
                      </InputLabel>
                      <TextField
                        id="estimatedCostOfParts"
                        fullWidth
                        name="estimatedCostOfParts"
                        value={formData.estimatedCostOfParts}
                        onChange={handleNumberChange}
                        type="number"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">€</InputAdornment>,
                          sx: { borderRadius: 1 }
                        }}
                      />
                    </Grid>
                  </Grid>
                  
                  {/* Załączniki */}
                  <Box>
                    <InputLabel 
                      htmlFor="attachments"
                      sx={{ 
                        mb: 1,
                        fontWeight: 'medium',
                        fontSize: '0.875rem'
                      }}
                    >
                      Attachments
                    </InputLabel>
                    <Box 
                      sx={{ 
                        border: `1px dashed ${theme.palette.divider}`,
                        borderRadius: 1,
                        p: 3,
                        bgcolor: alpha(theme.palette.background.default, 0.5),
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.background.default, 0.8),
                        }
                      }}
                      component="label"
                    >
                      <input
                        type="file"
                        multiple
                        hidden
                        onChange={handleFileChange}
                      />
                      <CloudUploadOutlinedIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                      <Typography variant="body1" gutterBottom>
                        Drag and drop files here
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        or
                      </Typography>
                      <Button 
                        variant="outlined" 
                        component="span"
                        sx={{ borderRadius: 1 }}
                      >
                        Browse Files
                      </Button>
                    </Box>
                    
                    {/* Lista załączników */}
                    {files.length > 0 && (
                      <Paper
                        variant="outlined"
                        sx={{
                          mt: 2,
                          borderRadius: 1,
                          overflow: 'hidden'
                        }}
                      >
                        <List dense>
                          {files.map((file, index) => (
                            <ListItem
                              key={`${file.name}-${index}`}
                              secondaryAction={
                                <IconButton 
                                  edge="end" 
                                  aria-label="delete"
                                  onClick={() => handleRemoveFile(file)}
                                >
                                  <DeleteOutlineIcon fontSize="small" />
                                </IconButton>
                              }
                            >
                              <ListItemIcon>
                                <InsertDriveFileOutlinedIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText
                                primary={file.name}
                                secondary={`${(file.size / 1024).toFixed(1)} KB`}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    )}
                  </Box>
                </Stack>
              </Paper>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/')}
                  sx={{ borderRadius: 1 }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: 1 }}
                >
                  Submit Request
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
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