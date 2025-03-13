import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import RequestForChange from './pages/RequestForChange';
import ChangeDetails from './pages/ChangeDetails';
import { ThemeProvider } from './theme/ThemeContext';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/request" element={<RequestForChange />} />
              <Route path="/change/:id" element={<ChangeDetails />} />
            </Routes>
          </AnimatePresence>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;