import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import RequestForChange from './pages/RequestForChange';
import ChangeDetails from './pages/ChangeDetails';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/request" element={<RequestForChange />} />
            <Route path="/change/:id" element={<ChangeDetails />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;