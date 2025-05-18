import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axios';

const UNIVERSITIES = [
  'University of Guelph',
  'University of Waterloo',
  'Western University'
] as const;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    university: '',
    preferences: {
      cleanliness: 3,
      noise: 3,
      sleepSchedule: 'flexible',
      smoking: false,
      pets: false,
    },
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePreferenceChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        [field]: value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Sending registration data:', formData);
      const response = await api.post('/auth/register', formData);
      console.log('Registration response:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      setError(
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        'An error occurred during registration'
      );
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Register
          </Typography>
          {error && (
            <Typography color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Full Name"
              id="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="university-label">University</InputLabel>
              <Select
                labelId="university-label"
                id="university"
                name="university"
                value={formData.university}
                label="University"
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              >
                {UNIVERSITIES.map((university) => (
                  <MenuItem key={university} value={university}>
                    {university}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="h6" sx={{ mt: 3 }}>
              Preferences
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography component="legend">Cleanliness Level</Typography>
              <Rating
                name="cleanliness"
                value={formData.preferences.cleanliness}
                onChange={(_, value) => handlePreferenceChange('cleanliness', value || 3)}
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography component="legend">Noise Tolerance</Typography>
              <Rating
                name="noise"
                value={formData.preferences.noise}
                onChange={(_, value) => handlePreferenceChange('noise', value || 3)}
              />
            </Box>

            <FormControl fullWidth margin="normal">
              <InputLabel>Sleep Schedule</InputLabel>
              <Select
                value={formData.preferences.sleepSchedule}
                label="Sleep Schedule"
                onChange={(e) => handlePreferenceChange('sleepSchedule', e.target.value)}
              >
                <MenuItem value="early_bird">Early Bird</MenuItem>
                <MenuItem value="night_owl">Night Owl</MenuItem>
                <MenuItem value="flexible">Flexible</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={formData.preferences.smoking}
                  onChange={(e) => handlePreferenceChange('smoking', e.target.checked)}
                />
              }
              label="Smoking Friendly"
              sx={{ mt: 2 }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.preferences.pets}
                  onChange={(e) => handlePreferenceChange('pets', e.target.checked)}
                />
              }
              label="Pet Friendly"
              sx={{ mt: 1 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => navigate('/login')}
            >
              Already have an account? Sign In
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 