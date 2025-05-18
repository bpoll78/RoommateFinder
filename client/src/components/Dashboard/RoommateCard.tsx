import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
  Avatar,
} from '@mui/material';
import { Person, CheckCircle, Cancel } from '@mui/icons-material';

interface RoommateCardProps {
  user: {
    name: string;
    university: string;
    bio: string;
    profilePicture: string;
    preferences: {
      cleanliness: number;
      noise: number;
      sleepSchedule: string;
      smoking: boolean;
      pets: boolean;
    };
  };
  onLike: () => void;
  onDislike: () => void;
}

const RoommateCard: React.FC<RoommateCardProps> = ({ user, onLike, onDislike }) => {
  const formatSleepSchedule = (schedule: string) => {
    return schedule.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', mt: 4 }}>
      {user.profilePicture ? (
        <Box
          component="img"
          sx={{
            height: 300,
            width: '100%',
            objectFit: 'cover',
          }}
          src={user.profilePicture}
          alt={user.name}
        />
      ) : (
        <Box
          sx={{
            height: 300,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.200',
          }}
        >
          <Person sx={{ fontSize: 100, color: 'grey.400' }} />
        </Box>
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {user.university}
        </Typography>
        
        {user.bio && (
          <Typography variant="body2" color="text.secondary" paragraph>
            {user.bio}
          </Typography>
        )}

        <Box sx={{ mt: 2 }}>
          <Typography component="legend" variant="body2">
            Cleanliness
          </Typography>
          <Rating value={user.preferences.cleanliness} readOnly />
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography component="legend" variant="body2">
            Noise Tolerance
          </Typography>
          <Rating value={user.preferences.noise} readOnly />
        </Box>

        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label={formatSleepSchedule(user.preferences.sleepSchedule)}
            color="primary"
            variant="outlined"
          />
          {user.preferences.smoking && (
            <Chip label="Smoking Friendly" color="default" variant="outlined" />
          )}
          {user.preferences.pets && (
            <Chip label="Pet Friendly" color="default" variant="outlined" />
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<Cancel />}
          onClick={onDislike}
        >
          Pass
        </Button>
        <Button
          variant="contained"
          color="success"
          endIcon={<CheckCircle />}
          onClick={onLike}
        >
          Like
        </Button>
      </CardActions>
    </Card>
  );
};

export default RoommateCard; 