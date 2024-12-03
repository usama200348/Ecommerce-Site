import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Client, Account, Databases } from 'appwrite';

const client = new Client();
const account = new Account(client);
const databases = new Databases(client);

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('674e04cb0027715e84a7');

const databaseId = 'your-database-id';
const collectionId = 'your-collection-id';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveUserDetails = async (userId) => {
    try {
      await databases.createDocument(databaseId, collectionId, userId, {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
      });
      console.log('User details saved successfully.');
    } catch (error) {
      console.error('Failed to save user details:', error.message);
      alert('Failed to save user details. Please try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await account.create(
        'unique()',
        formData.email,
        formData.password,
        formData.name
      );
      console.log('Registration successful:', response);
      await saveUserDetails(response.$id);
      alert('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error.message);
      alert(`Registration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={11} sm={8} md={6} lg={4}>
          <Box
            sx={{
              padding: 4,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: 'white',
            }}
          >
            <Typography variant="h4" textAlign="center" mb={2}>
              Register User
            </Typography>
            <TextField
              id="outlined-name"
              name="name"
              label="Name"
              placeholder="Enter Your Full Name"
              variant="outlined"
              onChange={handleChange}
              value={formData.name}
              fullWidth
              margin="normal"
            />
            <TextField
              id="outlined-email"
              name="email"
              label="Email"
              placeholder="Enter Email"
              variant="outlined"
              onChange={handleChange}
              value={formData.email}
              fullWidth
              margin="normal"
            />
            <TextField
              id="outlined-contact"
              name="contact"
              label="Contact Number"
              placeholder="Enter Your Contact Number"
              variant="outlined"
              onChange={handleChange}
              value={formData.contact}
              fullWidth
              margin="normal"
            />
            <TextField
              id="outlined-password"
              name="password"
              label="Password"
              placeholder="Enter Strong Password"
              type="password"
              variant="outlined"
              onChange={handleChange}
              value={formData.password}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleRegister}
              disabled={loading}
              fullWidth
              sx={{ marginY: 2 }}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
            <Link style={{ textDecoration: 'none' }} to="/">
              <Typography textAlign="center" variant="subtitle1" color="primary">
                Already Have An Account?
                <br />
                <Button variant="text" color="primary">
                  Sign In
                </Button>
              </Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Register;
