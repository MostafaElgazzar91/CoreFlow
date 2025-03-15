import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  Typography, 
  Box, 
  Button,
  Divider,
  Chip,
  Grid,
  Card,
  CardContent,
  Avatar,
  Container,
  IconButton,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { userService } from '../services/api';

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getById(id);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user details');
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.delete(id);
        navigate('/');
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <Typography variant="h6">Loading user details...</Typography>
    </Box>
  );
  
  if (error) return (
    <Container maxWidth="md">
      <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>
      <Button 
        variant="outlined" 
        onClick={() => navigate('/')}
        sx={{ mt: 2 }}
        startIcon={<ArrowBackIcon />}
      >
        Back to List
      </Button>
    </Container>
  );
  
  if (!user) return (
    <Container maxWidth="md">
      <Alert severity="warning" sx={{ mt: 4 }}>User not found</Alert>
      <Button 
        variant="outlined" 
        onClick={() => navigate('/')}
        sx={{ mt: 2 }}
        startIcon={<ArrowBackIcon />}
      >
        Back to List
      </Button>
    </Container>
  );

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 3 }}>
        <IconButton 
          onClick={() => navigate('/')}
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="span">
          User Profile
        </Typography>
      </Box>
      
      <Card elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
        <Box sx={{ 
          p: 3, 
          background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <Avatar 
            sx={{ 
              width: 100, 
              height: 100, 
              fontSize: 40,
              bgcolor: 'white',
              color: 'primary.main',
              mb: 2
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h4" gutterBottom>
            {user.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <EmailIcon sx={{ mr: 1, fontSize: 18 }} />
            <Typography variant="body1">
              {user.email}
            </Typography>
          </Box>
          <Chip 
            label={user.isActive ? 'Active Account' : 'Inactive Account'} 
            color={user.isActive ? 'success' : 'default'} 
            sx={{ mt: 1 }}
          />
        </Box>
        
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  User ID
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {user.id}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Created At
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarTodayIcon sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body1">
                    {new Date(user.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  component={RouterLink} 
                  to={`/users/${id}/edit`}
                  startIcon={<EditIcon />}
                >
                  Edit User
                </Button>
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={handleDelete}
                  startIcon={<DeleteIcon />}
                >
                  Delete User
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default UserDetails;