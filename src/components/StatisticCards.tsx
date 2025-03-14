import React from 'react';
import { Grid, Paper, Typography, Box, useTheme } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Change } from '../types/change';
import { motion } from 'framer-motion';

interface StatisticCardsProps {
  changes: Change[];
}

const StatisticCards: React.FC<StatisticCardsProps> = ({ changes }) => {
  const theme = useTheme();

  // Kalkulacja statystyk
  const pendingVotes = changes.filter(c => 
    c.votingStatus === 'Pending' || c.votingStatus === 'InProgress'
  ).length;
  
  const inProgress = changes.filter(c => 
    c.status === 'InProgress' || c.status === 'Implementing'
  ).length;
  
  const approved = changes.filter(c => c.status === 'Approved').length;
  const rejected = changes.filter(c => c.status === 'Rejected').length;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const cards = [
    { 
      title: 'Pending Votes', 
      value: pendingVotes, 
      icon: <AccessTimeIcon fontSize="large" />, 
      color: theme.palette.info.main,
      index: 0
    },
    { 
      title: 'In Progress', 
      value: inProgress, 
      icon: <AssessmentIcon fontSize="large" />, 
      color: theme.palette.warning.main,
      index: 1
    },
    { 
      title: 'Approved', 
      value: approved, 
      icon: <CheckCircleIcon fontSize="large" />, 
      color: theme.palette.success.main,
      index: 2
    },
    { 
      title: 'Rejected', 
      value: rejected, 
      icon: <ErrorIcon fontSize="large" />, 
      color: theme.palette.error.main,
      index: 3
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.title}>
          <motion.div
            custom={card.index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  width: 48,
                  height: 48,
                  backgroundColor: `${card.color}15`,
                  color: card.color,
                  mr: 2
                }}
              >
                {card.icon}
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {card.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.title}
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatisticCards;