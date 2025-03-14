#!/bin/bash

# Setup script for Engineering Change Management in Codespace
echo "===== ECM System - Codespace Setup ====="

# Make script executable
chmod +x setup-codespace.sh

# Smart reset of local repo to match remote if no local changes
echo "Checking for local changes before resetting repository..."
git fetch origin
if [ -z "$(git status --porcelain)" ]; then
  # Only if there are no local changes
  echo "No local changes detected. Resetting to match remote..."
  git reset --hard origin/main
else
  echo "Local changes detected. Skipping hard reset to preserve your work."
  echo "If you want to reset anyway, run 'git reset --hard origin/main' manually."
fi

# Ensure public directory exists
echo "Ensuring public directory exists..."
mkdir -p public

# Create basic index.html if it doesn't exist
if [ ! -f "public/index.html" ]; then
  echo "Creating public/index.html..."
  cat > public/index.html << 'EOL'
<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#1976d2" />
    <meta
      name="description"
      content="System zarządzania zmianą inżynieryjną (ECM)"
    />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>System zarządzania zmianą inżynieryjną</title>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700&display=swap"
    />
  </head>
  <body>
    <noscript>Ta aplikacja wymaga JavaScript do działania.</noscript>
    <div id="root"></div>
  </body>
</html>
EOL
fi

# Create basic manifest.json if it doesn't exist
if [ ! -f "public/manifest.json" ]; then
  echo "Creating public/manifest.json..."
  cat > public/manifest.json << 'EOL'
{
  "short_name": "ECM System",
  "name": "System zarządzania zmianą inżynieryjną",
  "icons": [],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#1976d2",
  "background_color": "#ffffff"
}
EOL
fi

# Create basic robots.txt if it doesn't exist
if [ ! -f "public/robots.txt" ]; then
  echo "Creating public/robots.txt..."
  cat > public/robots.txt << 'EOL'
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:
EOL
fi

# Make sure all necessary dependencies are installed
echo "Installing dependencies..."
npm install

# Ensure directory structure exists
mkdir -p src/components

# Check for missing component files and create empty templates if necessary
if [ ! -f "src/components/StatisticCards.tsx" ]; then
  echo "Creating missing StatisticCards component..."
  cat > src/components/StatisticCards.tsx << 'EOL'
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { Change } from '../types/change';

interface StatisticCardsProps {
  changes: Change[];
}

const StatisticCards: React.FC<StatisticCardsProps> = ({ changes }) => {
  // Funkcja do obliczania statystyk
  const getStatistics = () => {
    const totalChanges = changes.length;
    const pendingVoting = changes.filter(c => c.votingStatus === 'Pending' || c.votingStatus === 'InProgress').length;
    const approved = changes.filter(c => c.status === 'Approved').length;
    const rejected = changes.filter(c => c.status === 'Rejected').length;
    const inProgress = changes.filter(c => c.status === 'InProgress' || c.status === 'Implementing').length;
    
    return { totalChanges, pendingVoting, approved, rejected, inProgress };
  };
  
  const stats = getStatistics();
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={2.4}>
        <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
          <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
            {stats.totalChanges}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Changes
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
          <Typography variant="h4" color="info.main" sx={{ fontWeight: 'bold' }}>
            {stats.pendingVoting}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Pending Voting
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
          <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
            {stats.approved}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Approved
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
          <Typography variant="h4" color="error.main" sx={{ fontWeight: 'bold' }}>
            {stats.rejected}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rejected
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
          <Typography variant="h4" color="warning.main" sx={{ fontWeight: 'bold' }}>
            {stats.inProgress}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            In Progress
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StatisticCards;
EOL
fi

if [ ! -f "src/components/ChangeTable.tsx" ]; then
  echo "Creating missing ChangeTable component..."
  cat > src/components/ChangeTable.tsx << 'EOL'
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Chip,
  Button,
  Typography,
  Box,
  Tooltip,
  IconButton
} from '@mui/material';
import { 
  CheckCircleOutline as ApproveIcon,
  CancelOutlined as RejectIcon,
  VisibilityOutlined as ViewIcon
} from '@mui/icons-material';
import { Change } from '../types/change';
import { hasUserVoted, getCurrentUserVote } from '../services/voteService';

interface ChangeTableProps {
  changes: Change[];
  tabType: 'voting' | 'progress' | 'archive';
  onVote?: (changeId: string, vote: 'yes' | 'no') => void;
}

const ChangeTable: React.FC<ChangeTableProps> = ({ changes, tabType, onVote }) => {
  // Funkcja do renderowania chipa statusu
  const renderStatusChip = (status: string) => {
    let color: 'success' | 'warning' | 'error' | 'info' | 'default' = 'default';
    switch (status) {
      case 'Approved':
        color = 'success';
        break;
      case 'Rejected':
        color = 'error';
        break;
      case 'InProgress':
      case 'Implementing':
        color = 'warning';
        break;
      case 'New':
      case 'UnderReview':
        color = 'info';
        break;
    }
    
    return <Chip label={status} color={color} size="small" />;
  };
  
  // Funkcja do formatowania daty
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  if (changes.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="subtitle1" color="text.secondary">
          No changes found matching the current filters.
        </Typography>
      </Box>
    );
  }
  
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            {tabType === 'voting' && <TableCell align="right">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {changes.map((change) => (
            <TableRow key={change.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {change.id}
              </TableCell>
              <TableCell>{change.title}</TableCell>
              <TableCell>{formatDate(change.createdAt)}</TableCell>
              <TableCell>{renderStatusChip(change.status)}</TableCell>
              <TableCell>
                <Chip 
                  label={change.priority} 
                  color={
                    change.priority === 'Critical' ? 'error' : 
                    change.priority === 'High' ? 'warning' : 
                    change.priority === 'Medium' ? 'info' : 'default'
                  }
                  size="small"
                />
              </TableCell>
              {tabType === 'voting' && (
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    {/* Przycisk do głosowania za - dezaktywowany, jeśli użytkownik już zagłosował */}
                    <Tooltip title="Approve">
                      <span>
                        <IconButton 
                          color="success"
                          onClick={() => onVote && onVote(change.id, 'yes')}
                          disabled={hasUserVoted(change.votes) && getCurrentUserVote(change.votes)?.decision === 'Yes'}
                        >
                          <ApproveIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    
                    {/* Przycisk do głosowania przeciw - dezaktywowany, jeśli użytkownik już zagłosował */}
                    <Tooltip title="Reject">
                      <span>
                        <IconButton 
                          color="error"
                          onClick={() => onVote && onVote(change.id, 'no')}
                          disabled={hasUserVoted(change.votes) && getCurrentUserVote(change.votes)?.decision === 'No'}
                        >
                          <RejectIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    
                    {/* Przycisk do podglądu szczegółów */}
                    <Tooltip title="View details">
                      <IconButton color="primary">
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChangeTable;
EOL
fi

echo "===== Setup Complete ====="
echo "Run 'npm start' to launch the application"
