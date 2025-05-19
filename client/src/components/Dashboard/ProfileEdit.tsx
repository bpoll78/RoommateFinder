import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Slider,
  FormControlLabel,
  Switch,
  MenuItem,
  IconButton,
  Avatar,
  Stack,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';

const ProfileEdit = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    university: '',
    preferences: {
      cleanliness: 3,
      noise: 3,
      sleepSchedule: 'flexible',
      smoking: false,
      pets: false,
    },
    bio: '',
  });
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
      if (response.data.images) {
        setImages(response.data.images);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreferenceChange = (name: string, value: number | boolean | string) => {
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: value,
      },
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5001/api/users/upload-image',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setImages([...images, response.data.imageUrl]);
      setMessage('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5001/api/users/profile',
        profile,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', my: 4 }}>
      <Typography variant="h5" gutterBottom>
        Edit Profile
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
          {/* Profile Images */}
          <Box sx={{ gridColumn: '1 / -1' }}>
            <Typography variant="h6" gutterBottom>
              Profile Images
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 2, overflowX: 'auto', py: 1 }}>
              {images.map((image, index) => (
                <Avatar
                  key={index}
                  src={image}
                  sx={{ width: 100, height: 100 }}
                />
              ))}
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                sx={{ width: 100, height: 100, border: '1px dashed grey' }}
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageUpload}
                />
                <PhotoCamera />
              </IconButton>
            </Stack>
          </Box>

          {/* Basic Information */}
          <Box>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              disabled
            />
          </Box>
          <Box sx={{ gridColumn: '1 / -1' }}>
            <TextField
              fullWidth
              label="University"
              name="university"
              value={profile.university}
              onChange={handleInputChange}
              select
            >
              <MenuItem value="University of Guelph">University of Guelph</MenuItem>
              <MenuItem value="University of Waterloo">University of Waterloo</MenuItem>
              <MenuItem value="Western University">Western University</MenuItem>
            </TextField>
          </Box>
          <Box sx={{ gridColumn: '1 / -1' }}>
            <TextField
              fullWidth
              label="Bio"
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              multiline
              rows={4}
            />
          </Box>

          {/* Preferences */}
          <Box sx={{ gridColumn: '1 / -1' }}>
            <Typography variant="h6" gutterBottom>
              Preferences
            </Typography>
          </Box>
          <Box>
            <Typography gutterBottom>Cleanliness Level</Typography>
            <Slider
              value={profile.preferences.cleanliness}
              onChange={(_, value) => handlePreferenceChange('cleanliness', value)}
              min={1}
              max={5}
              marks
              valueLabelDisplay="auto"
            />
          </Box>
          <Box>
            <Typography gutterBottom>Noise Level Tolerance</Typography>
            <Slider
              value={profile.preferences.noise}
              onChange={(_, value) => handlePreferenceChange('noise', value)}
              min={1}
              max={5}
              marks
              valueLabelDisplay="auto"
            />
          </Box>
          <Box>
            <TextField
              select
              fullWidth
              label="Sleep Schedule"
              value={profile.preferences.sleepSchedule}
              onChange={(e) => handlePreferenceChange('sleepSchedule', e.target.value)}
            >
              <MenuItem value="early">Early Bird</MenuItem>
              <MenuItem value="night">Night Owl</MenuItem>
              <MenuItem value="flexible">Flexible</MenuItem>
            </TextField>
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={profile.preferences.smoking}
                  onChange={(e) => handlePreferenceChange('smoking', e.target.checked)}
                />
              }
              label="Smoking Friendly"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={profile.preferences.pets}
                  onChange={(e) => handlePreferenceChange('pets', e.target.checked)}
                />
              }
              label="Pet Friendly"
            />
          </Box>
          <Box sx={{ gridColumn: '1 / -1' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
            {message && (
              <Typography color={message.includes('Error') ? 'error' : 'success'} sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default ProfileEdit; 