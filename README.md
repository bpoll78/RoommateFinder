# University Roommate Finder

A web application to help university students find compatible roommates based on their preferences and lifestyle.

## Features

- User authentication
- Profile creation and management
- Roommate matching based on preferences
- University-specific matching
- Real-time chat (coming soon)

## Tech Stack

- Frontend: React + Vite + TypeScript + Material-UI
- Backend: Node.js + Express
- Database: MongoDB Atlas
- Authentication: JWT

## Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/roommate-finder.git
cd roommate-finder
```

2. Setup Backend:
```bash
cd server
npm install
# Create .env file with required variables (see .env.example)
npm run dev
```

3. Setup Frontend:
```bash
cd client
npm install
# Create .env file with required variables (see .env.example)
npm run dev
```

## Environment Variables

### Backend (.env)
```
PORT=5001
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5001/api
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 