import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const Header = () => {
  return (
    <AppBar position="static" sx={{ 
      backgroundColor: 'white', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: 4 
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 2
          }}>
            <ReceiptLongIcon sx={{ color: 'primary.main', fontSize: 40 }} />
            <Typography
              variant="h5"
              noWrap
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
              }}
            >
              Jagdamba Refrigeration 
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
