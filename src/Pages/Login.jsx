import { Box, Grid, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { account } from '../lib/appwrite';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      navigate('/product');
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container justifyContent="center">
        <Grid item xs={11} sm={8} md={6} lg={4}>
          <Box
            sx={{
              padding: 4,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: 'white',
            }}
          >
            <Typography variant="h3" color="primary" textAlign="center" mb={3}>
              Login User
            </Typography>
            <TextField
              id="outlined-basic1"
              label="Email"
              placeholder="Enter Your Email Address"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              id="outlined-basic2"
              label="Password"
              placeholder="Enter Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            {error && (
              <Typography
                color="error"
                variant="body2"
                sx={{
                  textAlign: 'center',
                  marginBottom: 2,
                  padding: 1,
                  border: '1px solid red',
                  borderRadius: 2,
                  backgroundColor: '#ffe6e6',
                }}
              >
                {error}
              </Typography>
            )}
            <Button
              sx={{ marginY: 2 }}
              variant="contained"
              color="primary"
              onClick={handleLogin}
              fullWidth
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <Box textAlign="center" mt={2}>
              <Typography variant="body1">
                Don't Have An Account?{' '}
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" color="primary" size="small">
                    Sign Up
                  </Button>
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
