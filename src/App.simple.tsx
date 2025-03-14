import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';

/**
 * Uproszczona wersja aplikacji do testowania
 * podstawowej funkcjonalności w przypadku problemów
 * z bardziej zaawansowanymi komponentami.
 */
function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Engineering Change Management System
        </Typography>
        
        <Typography variant="body1" paragraph>
          Podstawowa wersja aplikacji działa poprawnie. Jeśli widzisz ten komunikat,
          oznacza to, że React został załadowany i wyrenderowany.
        </Typography>
        
        <Typography variant="body1" paragraph>
          Jeśli ta uproszczona wersja działa poprawnie, ale pełna aplikacja nie, 
          może to wskazywać na problemy z bardziej złożonymi komponentami lub ich zależnościami.
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => alert('React działa poprawnie!')}
          >
            Test React Event
          </Button>
          
          <Button
            variant="outlined"
            color="secondary"
            component="a"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (window.confirm('Czy chcesz spróbować przywrócić pełną aplikację?')) {
                // Tu można by było dodać kod do przełączenia na pełną wersję App
                alert('Aby przywrócić pełną aplikację, zamień src/App.tsx na oryginalną wersję');
              }
            }}
          >
            Przywróć pełną aplikację
          </Button>
        </Box>
      </Paper>
      
      <Paper elevation={1} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Informacje diagnostyczne:
        </Typography>
        <Box component="pre" sx={{ 
          p: 2, 
          backgroundColor: '#f5f5f5',
          overflowX: 'auto',
          fontSize: '0.875rem'
        }}>
          {`React version: ${React.version}
Node environment: ${process.env.NODE_ENV}
Base URL: ${window.location.origin}
User Agent: ${navigator.userAgent}
Screen size: ${window.innerWidth}x${window.innerHeight}`}
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
