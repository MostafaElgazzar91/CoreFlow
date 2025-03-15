import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Typography, 
  Box,
  FormControlLabel,
  Switch,
  Grid,
  Card,
  CardContent,
  Container,
  Divider,
  Alert,
  IconButton,
  Avatar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import { userService } from '../services/api';

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    isActive: true
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (isEditMode) {
        try {
          const response = await userService.getById(id);
          setFormData({
            name: response.data.name,
            email: response.data.email,
            isActive: response.data.isActive
          });
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch user details');
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'isActive' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    
    try {
      if (isEditMode) {
        await userService.update(id, formData);
        setSuccess(true);
        setTimeout(() => navigate('/'), 1500);
      } else {
        await userService.create(formData);
        setSuccess(true);
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (err) {
      setError('Failed to save user');
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <Typography variant="h6">Loading user data...</Typography>
    </Box>
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
          {isEditMode ? 'Edit User' : 'Create New User'}
        </Typography>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          User {isEditMode ? 'updated' : 'created'} successfully! Redirecting...
        </Alert>
      )}
      
      <Card elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ 
          p: 3, 
          background: isEditMode 
            ? 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)' 
            : 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Avatar sx={{ bgcolor: 'white', color: isEditMode ? 'primary.main' : 'success.main', mr: 2 }}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h5">
            {isEditMode ? 'User Information' : 'New User Details'}
          </Typography>
        </Box>
        
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  placeholder="Enter user's full name"
                  helperText="Required field"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  placeholder="Enter user's email address"
                  helperText="Required field"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isActive}
                      onChange={handleChange}
                      name="isActive"
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1">User Status</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {formData.isActive ? 'Active (User can log in)' : 'Inactive (User cannot log in)'}
                      </Typography>
                    </Box>
                  }
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button 
                    variant="outlined" 
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color={isEditMode ? 'primary' : 'success'}
                    startIcon={<SaveIcon />}
                    disabled={success}
                  >
                    {isEditMode ? 'Update User' : 'Create User'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default UserForm;