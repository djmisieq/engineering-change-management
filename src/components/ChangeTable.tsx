import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Chip, IconButton, Typography, Box, useTheme, Avatar
} from '@mui/material';
import { VisibilityOutlined, ThumbUpAltOutlined, ThumbDownAltOutlined } from '@mui/icons-material';
import { Change } from '../types/change';
import { useNavigate } from 'react-router-dom';

interface ChangeTableProps {
  changes: Change[];
  tabType: 'voting' | 'progress' | 'archive';
  onVote?: (changeId: string, vote: 'yes' | 'no') => void;
}

const ChangeTable: React.FC<ChangeTableProps> = ({ changes, tabType, onVote }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  // Funkcja do renderowania statusu jako Chip
  const renderStatus = (status: string) => {
    let color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' = 'default';
    
    switch (status) {
      case 'New': color = 'info'; break;
      case 'UnderReview': color = 'secondary'; break;
      case 'InProgress': color = 'warning'; break;
      case 'Approved': color = 'success'; break;
      case 'Implementing': color = 'primary'; break;
      case 'Resolved': color = 'primary'; break;
      case 'Rejected': color = 'error'; break;
      default: color = 'default';
    }
    
    return <Chip label={status} color={color} size="small" />;
  };

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {changes.map((change) => (
            <TableRow 
              key={change.id}
              hover
              sx={{ 
                '&:last-child td, &:last-child th': { border: 0 },
                cursor: 'pointer'
              }}
              onClick={() => navigate(`/change/${change.id}`)}
            >
              <TableCell component="th" scope="row">
                <Typography variant="body2" fontWeight="medium">{change.id}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" noWrap sx={{ maxWidth: 250 }}>
                  {change.title}
                </Typography>
              </TableCell>
              <TableCell>{renderStatus(change.status)}</TableCell>
              <TableCell>
                <Chip 
                  label={change.priority} 
                  size="small"
                  color={
                    change.priority === 'Critical' ? 'error' :
                    change.priority === 'High' ? 'warning' :
                    change.priority === 'Medium' ? 'info' : 'default'
                  }
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                    {change.author.charAt(0)}
                  </Avatar>
                  <Typography variant="body2">{change.author}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {new Date(change.createdAt).toLocaleDateString()}
                </Typography>
              </TableCell>
              <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                {tabType === 'voting' && (
                  <Box>
                    <IconButton 
                      size="small" 
                      color="success" 
                      onClick={() => onVote && onVote(change.id, 'yes')}
                    >
                      <ThumbUpAltOutlined fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="error" 
                      onClick={() => onVote && onVote(change.id, 'no')}
                    >
                      <ThumbDownAltOutlined fontSize="small" />
                    </IconButton>
                  </Box>
                )}
                <IconButton 
                  size="small" 
                  onClick={() => navigate(`/change/${change.id}`)}
                >
                  <VisibilityOutlined fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChangeTable;