import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} QuoteMaker Pro. All rights reserved.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <Link href="#" color="text.secondary" underline="hover">Privacy Policy</Link>
            <Link href="#" color="text.secondary" underline="hover">Terms of Service</Link>
            <Link href="#" color="text.secondary" underline="hover">Contact</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
