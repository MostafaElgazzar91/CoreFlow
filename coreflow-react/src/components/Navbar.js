import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CoreFlow
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Users
          </Button>
          <Button color="inherit" component={RouterLink} to="/users/new">
            Add User
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
